export const VoidText = ({ text }: { text: string }) => {
  return (
    <div
      style={{
        lineHeight: 0,
        writingMode: "vertical-rl",
        backgroundColor: "#ddd",
        padding: "32px",
      }}
    >
      {[...text].map((letter, i) => (
        <Letter key={i} letter={letter} size="64px" />
      ))}
    </div>
  );
};

export const VoidTextTable = () => {
  const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    <div>
      {[...text].map((letter, i) => (
        <div key={letter}>
          <Letter letter={letter} size="32px" />
          {letter}
        </div>
      ))}
    </div>
  );
};

type LetterProps = {
  letter: string;
  size?: string;
};
const Letter = ({ letter, size = "16px" }: LetterProps) => {
  if (letter === " ") {
    return (
      <svg width={size} height={size} viewBox="0 0 1 1">
        <rect x={0} y={0} width={1} height={1} fill="#ddd" />
      </svg>
    );
  }
  const code = letter.charCodeAt(0) - 64;
  const w = 8;
  const h = 8;
  // 4階調*8*8
  const pixels: number[] = new Array(w * h).fill(2);
  // 枠と中身を塗る
  for (const y of range(h)) {
    for (const x of range(w)) {
      const i = y * w + x;
      if (x < 7 && y < 7) {
        if (x === 0 || y === 0) {
          pixels[i] = 1;
        } else if (x === 6 || y === 6) {
          pixels[i] = 3;
        }
      }
    }
  }
  // 文字
  const xy = (x: number, y: number) => (y * 2 + 1) * w + (x * 2 + 1);
  pixels[xy(0, 0)] = 3;
  pixels[xy(1, 2)] = code & 1 ? 3 : 1;
  pixels[xy(2, 2)] = code & 2 ? 3 : 1;
  pixels[xy(0, 2)] = code & 4 ? 3 : 1;
  pixels[xy(2, 1)] = code & 8 ? 3 : 1;
  pixels[xy(0, 1)] = code & 16 ? 3 : 1;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${w} ${h}`}>
      <rect x={0} y={0} width={w} height={h} fill="#ddd" />
      {pixels.map((color, i) => {
        const x = i % w;
        const y = Math.floor(i / w);
        return (
          <rect
            x={x}
            y={y}
            width={1}
            height={1}
            fill={["#000", "#888", "#ddd", "#fff"][color]}
          />
        );
      })}
    </svg>
  );
};

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
