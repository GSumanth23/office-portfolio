// Pixel-art "deal with it" sunglasses, drawn on a 26x5 grid.
const BLACK = [
  [0, 0, 26],            // top bar (row, startX, length)
  [1, 1, 11], [1, 14, 11],
  [2, 2, 9], [2, 15, 9],
  [3, 3, 7], [3, 16, 7],
  [4, 4, 5], [4, 17, 5],
];
const WHITE = [[1, 3], [1, 4], [2, 3], [1, 16], [1, 17], [2, 16]];

export default function Shades({ className }) {
  return (
    <svg className={className} viewBox="0 0 26 5" shapeRendering="crispEdges" aria-hidden="true">
      {BLACK.map(([y, x, w]) => <rect key={`${y}-${x}`} x={x} y={y} width={w} height="1" fill="#000" />)}
      {WHITE.map(([y, x]) => <rect key={`w${y}-${x}`} x={x} y={y} width="1" height="1" fill="#fff" />)}
    </svg>
  );
}
