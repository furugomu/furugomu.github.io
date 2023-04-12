import { DragEventHandler, useState } from "react";

export const PngParser = () => {
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const handleDrop = async (file: File) => {
    console.log(file);
    const chunks = await readPngChunks(file);
    console.debug("chunks", chunks);
    setChunks(chunks);
  };
  return (
    <div>
      <DropArea onDrop={handleDrop} />
      <output>
        {chunks.length === 0 ? (
          "ここに何か出る"
        ) : (
          <ul>
            {chunks.map((chunk) => (
              <li key={chunk.crc}>
                {chunk.type} ({chunk.length}){" "}
                {chunk.type === "tEXt" &&
                  readString(chunk.chunkData, 0, chunk.length)}
              </li>
            ))}
          </ul>
        )}
      </output>
    </div>
  );
};

type Chunk = ReturnType<typeof readChunk>;

const readPngChunks = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const data = new Uint8Array(buffer);

  // ヘッダー！
  const pngHeader = data.slice(0, 8);
  if (!isPng(pngHeader)) {
    throw new Error("Not a PNG file");
  }

  // チャンク！
  const chunks: Chunk[] = [];
  let offset = 8;
  while (offset < data.length) {
    const chunk = readChunk(data, offset);
    console.debug("chunk", chunk);
    chunks.push(chunk);
    offset += 12 + chunk.length;
  }
  return chunks;
};

function isPng(header: Uint8Array) {
  const expectedHeader = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  return expectedHeader.every((value, index) => value === header[index]);
}

function readChunk(data: Uint8Array, offset: number) {
  const length = readUint32(data, offset);
  const type = readString(data, offset + 4, 4);
  console.debug("type", type, length);
  const chunkData = data.slice(offset + 8, offset + 8 + length);
  const crc = readUint32(data, offset + 8 + length);
  return { length, type, chunkData, crc };
}

function readUint32(data: Uint8Array, offset: number) {
  const view = new DataView(data.buffer, offset, 4);
  return view.getUint32(0, false);
}

function readString(data: Uint8Array, offset: number, length: number) {
  return String.fromCharCode(...data.subarray(offset, offset + length));
}

type Props = {
  onDrop: (files: File) => void;
};
const DropArea = ({ onDrop }: Props) => {
  const [active, setActive] = useState(false);
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    setActive(false);
  };
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const items = [...e.dataTransfer.items];
    if (items.some((f) => f.type === "image/png")) {
      e.dataTransfer.dropEffect = "copy";
      setActive(true);
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  };
  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setActive(false);
    const files = [...e.dataTransfer.files];
    for (const file of files) {
      if (file.type !== "image/png") continue;
      onDrop(file);
      break;
    }
  };
  return (
    <div
      style={{
        border: "dashed thin",
        borderRadius: "1ex",
        padding: "1em",
        minHeight: "5em",
        color: "black",
        background: active ? "lightblue" : "white",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      PNG ファイルをここにドロップ
    </div>
  );
};
