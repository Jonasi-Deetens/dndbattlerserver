export const createCastle = (
  map: string[][],
  width: number,
  height: number
) => {
  const castleWidth = 10;
  const castleHeight = 10;
  const x = Math.floor(Math.random() * (width - castleWidth - 10)) + 5; // Avoid edges
  const y = Math.floor(Math.random() * (height - castleHeight - 10)) + 5; // Avoid edges

  for (let i = 0; i < castleHeight; i++) {
    for (let j = 0; j < castleWidth; j++) {
      if (
        i === 0 ||
        i === castleHeight - 1 ||
        j === 0 ||
        j === castleWidth - 1
      ) {
        map[y + i][x + j] = 'wall';
      } else {
        map[y + i][x + j] = 'floor';
      }
    }
  }

  map[y][x] = 'wall';
  map[y][x + castleWidth - 1] = 'wall';
  map[y + castleHeight - 1][x] = 'wall';
  map[y + castleHeight - 1][x + castleWidth - 1] = 'wall';
  console.log(
    `Created a castle at (${x}, ${y}) with size ${castleWidth}x${castleHeight}.`
  );
};
