import { Fragment, useState } from "react";
import {
  CharA,
  CharB,
  CharC,
  CharD,
  CharE,
  CharF,
  CharG,
  CharH,
  CharI,
  CharJ,
  CharK,
  CharL,
  CharM,
  CharN,
  CharO,
  CharP,
  CharQ,
  CharR,
  CharS,
  CharT,
  CharU,
  CharV,
  CharW,
  CharX,
  CharY,
  CharZ,
} from "./Characters";

const FOREIGN_CHARS: { [key: string]: JSX.Element } = {
  a: <CharA />,
  b: <CharB />,
  c: <CharC />,
  d: <CharD />,
  e: <CharE />,
  f: <CharF />,
  g: <CharG />,
  h: <CharH />,
  i: <CharI />,
  j: <CharJ />,
  k: <CharK />,
  l: <CharL />,
  m: <CharM />,
  n: <CharN />,
  o: <CharO />,
  p: <CharP />,
  q: <CharQ />,
  r: <CharR />,
  s: <CharS />,
  t: <CharT />,
  u: <CharU />,
  v: <CharV />,
  w: <CharW />,
  x: <CharX />,
  y: <CharY />,
  z: <CharZ />,
};

const useCaesar = (word: string) => {
  const [rotation, setRotation] = useState(0);
  const cipher = [...word.toLowerCase()]
    .map((char) => {
      const index = "abcdefghijklmnopqrstuvwxyz".indexOf(char);
      if (index === -1) return "";
      const rotatedIndex = (index + rotation) % 26;
      return "abcdefghijklmnopqrstuvwxyz"[rotatedIndex];
    })
    .join("");
  const cipher2 = [...word.toLowerCase()]
    .map((char) => {
      if (rotation === 0) return char;
      const index = "abcdefghijklmnopqrstuvwxyz".indexOf(char);
      if (index === -1) return "";
      const rotatedIndex = index + rotation;
      return "abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyz"[
        rotatedIndex
      ];
    })
    .join("");
  const shift = () => setRotation((prev) => (prev + 1) % 25);
  const unshift = () => setRotation((prev) => (prev - 1 + 25) % 26);
  const reset = () => setRotation(0);
  return { cipher, cipher2, shift, unshift, reset, rotation };
};

export function Word() {
  const [word, setWord] = useState("hello");
  const dominant = useCaesar(word);
  const foreign = useCaesar(word);
  const foreigntChars = [...foreign.cipher2].map((char, i) => {
    const lowerChar = char.toLowerCase();
    return <Fragment key={i}>{FOREIGN_CHARS[lowerChar] ?? null}</Fragment>;
  });
  return (
    <div className="flex flex-col gap-4">
      <p>
        <input
          className="input"
          type="text"
          value={word}
          pattern="[a-z]*"
          onChange={(e) => setWord(e.target.value)}
          style={{ fontSize: "20px" }}
        />
      </p>
      <p className="flex flex-row gap-2">
        <button className="btn" onClick={dominant.unshift}>
          ←
        </button>
        <button className="btn" onClick={dominant.reset}>
          x
        </button>
        <button className="btn" onClick={dominant.shift}>
          →
        </button>
        <span style={{ fontSize: "1.4rem" }}>{dominant.cipher2}</span>(
        {dominant.rotation})
      </p>
      <p className="flex flex-row gap-2">
        <button className="btn" onClick={foreign.unshift}>
          ←
        </button>
        <button className="btn" onClick={foreign.reset}>
          x
        </button>
        <button className="btn" onClick={foreign.shift}>
          →
        </button>
        <span className="bg-white flex gap-1 px-1">{foreigntChars}</span>
      </p>
    </div>
  );
}
