import { type FormEventHandler, useState } from "react";

export const ViewTransition2 = () => {
  const [myColors, setMyColors] = useState(colors);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const text = String(data.get("text"));
    const filtered = colors.filter((c) => c.name.includes(text));

    const sort = String(data.get("sort"));
    const [k, order] = sort.split("-");
    const key = k === "name" ? "name" : "code";
    const sorted = filtered.sort((a, b) => {
      if (a[key] < b[key]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    if (!document.startViewTransition) {
      setMyColors(sorted);
      return;
    }
    const transition = document.startViewTransition(() => {
      setMyColors(sorted);
      return new Promise((resolve) => setTimeout(resolve, 0));
    });
    await transition.ready;
    //  ここでなにかする
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            名前の一部:
            <input type="text" name="text" defaultValue="" />
          </label>
        </p>
        <p>
          <label>
            並び換え:
            <select name="sort">
              <option value="name-asc">名前↓</option>
              <option value="name-desc">名前↑</option>
              <option value="code-asc">コード↓</option>
              <option value="code-desc">コード↑</option>
            </select>
          </label>
        </p>
        <p>
          <button type="submit">レッツゴ</button>
        </p>
      </form>
      {myColors.length === 0 ? (
        <p>該当なし！</p>
      ) : (
        <ul style={{ display: "flex", gap: ".5em", flexWrap: "wrap" }}>
          {myColors.map((c) => (
            <li
              key={c.name}
              style={{
                backgroundColor: c.name,
                color: "black",
                textShadow: "-1px 1px 1px white",
                viewTransitionName: c.name,
                display: "block",
                width: "fit-content",
                borderRadius: "0.2em",
                padding: "0.5em",
              }}
            >
              {c.name} ({c.code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const colors = [
  { name: "aliceblue", code: "#f0f8ff" },
  { name: "antiquewhite", code: "#faebd7" },
  { name: "aqua", code: "#00ffff" },
  { name: "aquamarine", code: "#7fffd4" },
  { name: "azure", code: "#f0ffff" },
  { name: "beige", code: "#f5f5dc" },
  { name: "bisque", code: "#ffe4c4" },
  { name: "black", code: "#000000" },
  { name: "blanchedalmond", code: "#ffebcd" },
  { name: "blue", code: "#0000ff" },
  { name: "blueviolet", code: "#8a2be2" },
  { name: "brown", code: "#a52a2a" },
  { name: "burlywood", code: "#deb887" },
  { name: "cadetblue", code: "#5f9ea0" },
  { name: "chartreuse", code: "#7fff00" },
  { name: "chocolate", code: "#d2691e" },
  { name: "coral", code: "#ff7f50" },
  { name: "cornflowerblue", code: "#6495ed" },
  { name: "cornsilk", code: "#fff8dc" },
  { name: "crimson", code: "#dc143c" },
  { name: "cyan", code: "#00ffff" },
  { name: "darkblue", code: "#00008b" },
  { name: "darkcyan", code: "#008b8b" },
  { name: "darkgoldenrod", code: "#b8860b" },
  { name: "darkgray", code: "#a9a9a9" },
  { name: "darkgreen", code: "#006400" },
  { name: "darkgrey", code: "#a9a9a9" },
  { name: "darkkhaki", code: "#bdb76b" },
  { name: "darkmagenta", code: "#8b008b" },
  { name: "darkolivegreen", code: "#556b2f" },
  { name: "darkorange", code: "#ff8c00" },
  { name: "darkorchid", code: "#9932cc" },
  { name: "darkred", code: "#8b0000" },
  { name: "darksalmon", code: "#e9967a" },
  { name: "darkseagreen", code: "#8fbc8f" },
  { name: "darkslateblue", code: "#483d8b" },
  { name: "darkslategray", code: "#2f4f4f" },
  { name: "darkslategrey", code: "#2f4f4f" },
  { name: "darkturquoise", code: "#00ced1" },
  { name: "darkviolet", code: "#9400d3" },
  { name: "deeppink", code: "#ff1493" },
  { name: "deepskyblue", code: "#00bfff" },
  { name: "dimgray", code: "#696969" },
  { name: "dimgrey", code: "#696969" },
  { name: "dodgerblue", code: "#1e90ff" },
  { name: "firebrick", code: "#b22222" },
  { name: "floralwhite", code: "#fffaf0" },
  { name: "forestgreen", code: "#228b22" },
  { name: "fuchsia", code: "#ff00ff" },
  { name: "gainsboro", code: "#dcdcdc" },
  { name: "ghostwhite", code: "#f8f8ff" },
  { name: "gold", code: "#ffd700" },
  { name: "goldenrod", code: "#daa520" },
  { name: "gray", code: "#808080" },
  { name: "green", code: "#008000" },
  { name: "greenyellow", code: "#adff2f" },
  { name: "grey", code: "#808080" },
  { name: "honeydew", code: "#f0fff0" },
  { name: "hotpink", code: "#ff69b4" },
  { name: "indianred", code: "#cd5c5c" },
  { name: "indigo", code: "#4b0082" },
  { name: "ivory", code: "#fffff0" },
  { name: "khaki", code: "#f0e68c" },
  { name: "lavender", code: "#e6e6fa" },
  { name: "lavenderblush", code: "#fff0f5" },
  { name: "lawngreen", code: "#7cfc00" },
  { name: "lemonchiffon", code: "#fffacd" },
  { name: "lightblue", code: "#add8e6" },
  { name: "lightcoral", code: "#f08080" },
  { name: "lightcyan", code: "#e0ffff" },
  { name: "lightgoldenrodyellow", code: "#fafad2" },
  { name: "lightgray", code: "#d3d3d3" },
  { name: "lightgreen", code: "#90ee90" },
  { name: "lightgrey", code: "#d3d3d3" },
  { name: "lightpink", code: "#ffb6c1" },
  { name: "lightsalmon", code: "#ffa07a" },
  { name: "lightseagreen", code: "#20b2aa" },
  { name: "lightskyblue", code: "#87cefa" },
  { name: "lightslategray", code: "#778899" },
  { name: "lightslategrey", code: "#778899" },
  { name: "lightsteelblue", code: "#b0c4de" },
  { name: "lightyellow", code: "#ffffe0" },
  { name: "lime", code: "#00ff00" },
  { name: "limegreen", code: "#32cd32" },
  { name: "linen", code: "#faf0e6" },
  { name: "magenta", code: "#ff00ff" },
  { name: "maroon", code: "#800000" },
  { name: "mediumaquamarine", code: "#66cdaa" },
  { name: "mediumblue", code: "#0000cd" },
  { name: "mediumorchid", code: "#ba55d3" },
  { name: "mediumpurple", code: "#9370db" },
  { name: "mediumseagreen", code: "#3cb371" },
  { name: "mediumslateblue", code: "#7b68ee" },
  { name: "mediumspringgreen", code: "#00fa9a" },
  { name: "mediumturquoise", code: "#48d1cc" },
  { name: "mediumvioletred", code: "#c71585" },
  { name: "midnightblue", code: "#191970" },
  { name: "mintcream", code: "#f5fffa" },
  { name: "mistyrose", code: "#ffe4e1" },
  { name: "moccasin", code: "#ffe4b5" },
  { name: "navajowhite", code: "#ffdead" },
  { name: "navy", code: "#000080" },
  { name: "oldlace", code: "#fdf5e6" },
  { name: "olive", code: "#808000" },
  { name: "olivedrab", code: "#6b8e23" },
  { name: "orange", code: "#ffa500" },
  { name: "orangered", code: "#ff4500" },
  { name: "orchid", code: "#da70d6" },
  { name: "palegoldenrod", code: "#eee8aa" },
  { name: "palegreen", code: "#98fb98" },
  { name: "paleturquoise", code: "#afeeee" },
  { name: "palevioletred", code: "#db7093" },
  { name: "papayawhip", code: "#ffefd5" },
  { name: "peachpuff", code: "#ffdab9" },
  { name: "peru", code: "#cd853f" },
  { name: "pink", code: "#ffc0cb" },
  { name: "plum", code: "#dda0dd" },
  { name: "powderblue", code: "#b0e0e6" },
  { name: "purple", code: "#800080" },
  { name: "rebeccapurple", code: "#663399" },
  { name: "red", code: "#ff0000" },
  { name: "rosybrown", code: "#bc8f8f" },
  { name: "royalblue", code: "#4169e1" },
  { name: "saddlebrown", code: "#8b4513" },
  { name: "salmon", code: "#fa8072" },
  { name: "sandybrown", code: "#f4a460" },
  { name: "seagreen", code: "#2e8b57" },
  { name: "seashell", code: "#fff5ee" },
  { name: "sienna", code: "#a0522d" },
  { name: "silver", code: "#c0c0c0" },
  { name: "skyblue", code: "#87ceeb" },
  { name: "slateblue", code: "#6a5acd" },
  { name: "slategray", code: "#708090" },
  { name: "slategrey", code: "#708090" },
  { name: "snow", code: "#fffafa" },
  { name: "springgreen", code: "#00ff7f" },
  { name: "steelblue", code: "#4682b4" },
  { name: "tan", code: "#d2b48c" },
  { name: "teal", code: "#008080" },
  { name: "thistle", code: "#d8bfd8" },
  { name: "tomato", code: "#ff6347" },
  { name: "turquoise", code: "#40e0d0" },
  { name: "violet", code: "#ee82ee" },
  { name: "wheat", code: "#f5deb3" },
  { name: "white", code: "#ffffff" },
  { name: "whitesmoke", code: "#f5f5f5" },
  { name: "yellow", code: "#ffff00" },
  { name: "yellowgreen", code: "#9acd32" },
];
