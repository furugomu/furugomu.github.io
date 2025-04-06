type PixelFontProps = {
  value: string;
  filledColor?: string;
  emptyColor?: string;
  pixelSize?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

/**
 * @example
 * <PixelFont
 *   value={"11111111\n10000001\n10000001\n10000001\n11111111"}
 * />
 */
export function PixelFont({
  value,
  filledColor = "#000000",
  emptyColor = "rgba(255, 255, 255, 0)",
  pixelSize = 4,
  strokeColor = "#e5e7eb",
  strokeWidth = 0.5,
}: PixelFontProps) {
  const rows = value
    .trim()
    .split("\n")
    .map((row) => row.trim());
  const width = Math.max(...rows.map((row) => row.length));
  const height = rows.length;

  // Calculate SVG dimensions
  const svgWidth = width * pixelSize;
  const svgHeight = height * pixelSize;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {rows.map((row, rowIndex) =>
        Array.from(row).map((char, colIndex) =>
          char !== "0" ? (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * pixelSize}
              y={rowIndex * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={char === "1" ? filledColor : emptyColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          ) : null
        )
      )}
    </svg>
  );
}
