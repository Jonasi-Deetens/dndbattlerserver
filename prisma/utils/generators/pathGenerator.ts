export const createMainPath = (
  map: string[][],
  width: number,
  height: number
) => {
  // Starting point
  let x = Math.floor(Math.random() * width);
  let y = 0;
  map[x][y] = 'path';

  // Create main path
  while (y < height - 1) {
    if (Math.random() > 0.5 && x > 0 && x < width - 1) {
      // Randomly move left or right if within bounds
      x += Math.random() > 0.5 ? 1 : -1;

      if (x >= 0 && x < width) {
        map[x][y] = 'path';
      }

      y += 1;
      if (y >= 0 && y < height) {
        map[x][y] = 'path';
      }
    } else {
      // Move up in the y direction
      y += 1;

      if (y >= 0 && y < height) {
        map[x][y] = 'path';
      }

      // Optionally move left or right
      if (Math.random() > 0.5 && x > 0 && x < width - 1) {
        x += Math.random() > 0.5 ? 1 : -1;

        if (x >= 0 && x < width) {
          map[x][y] = 'path';
        }
      }
    }
  }
  console.log(`Created main path.`);
};
