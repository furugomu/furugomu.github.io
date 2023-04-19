import { useState } from "react";
import emperor from "./emperor.jpg";
import penguin from "./penguin.jpg";
import platypus from "./platypus.jpg";
import village from "./village.jpg";

// declare document.startViewTransition
declare global {
  type ViewTransition = {
    ready: Promise<void>;
  };
  interface Document {
    startViewTransition?: (callback: () => Promise<void>) => ViewTransition;
  }
}

// add viewTransitionName to CSSProperties
declare module "react" {
  interface CSSProperties {
    viewTransitionName?: string;
  }
}

type Item = {
  id: string;
  name: string;
  imageUrl: string;
};

const items = [
  {
    id: "penguin",
    name: "丸いペンギン",
    imageUrl: penguin,
  },
  {
    id: "emperor",
    name: "炎の中の邪悪な皇帝",
    imageUrl: emperor,
  },
  {
    id: "platypus",
    name: "高速かものはし",
    imageUrl: platypus,
  },
  {
    id: "village",
    name: "Kawaiiファッションの村",
    imageUrl: village,
  },
];

export const ViewTransition = () => {
  const [item, setItem] = useState<Item>(items[0]);

  const selectItem = async (newItem: Item) => {
    if (!document.startViewTransition) {
      setItem(newItem);
      return;
    }
    const transition = document.startViewTransition(async () => {
      setItem(newItem);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await transition.ready;
  };

  return (
    <div
      style={{
        maxWidth: "1024px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1em",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {items
          .filter((x) => x !== item)
          .map((item) => (
            <button
              key={item.imageUrl}
              style={{
                border: "none",
                background: "none",
                padding: "0",
                margin: "0",
                cursor: "pointer",
              }}
              onClick={() => selectItem(item)}
            >
              <Card item={item} />
            </button>
          ))}
      </div>
      <Detail item={item} />
    </div>
  );
};

const Detail = ({ item }: { item: Item }) => {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1/1",
        backgroundImage: `url(${item.imageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textShadow: "-.03ex .03ex .1ex black",
          fontSize: "4rem",
          viewTransitionName: item.id,
        }}
      >
        {item.name}
      </div>
    </div>
  );
};

const Card = ({ item }: { item: Item }) => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "1em",
        overflow: "hidden",
        backgroundImage: `url(${item.imageUrl})`,
        backgroundSize: "cover",
        viewTransitionName: item.id,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {item.name}
      </div>
    </div>
  );
};
