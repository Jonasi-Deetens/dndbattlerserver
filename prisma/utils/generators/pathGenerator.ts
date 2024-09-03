export const createMainPath = (
  map: string[][],
  width: number,
  height: number
) => {
  // Ensure map is correctly initialized
  if (!map || map.length !== height || map.some(row => row.length !== width)) {
    throw new Error('Map dimensions do not match specified width and height.');
  }

  // Starting point
  let x = Math.floor(Math.random() * width);
  let y = 0;
  map[y][x] = 'path'; // Use map[y][x] for correct indexing

  // Create main path
  while (y < height - 1) {
    if (Math.random() > 0.5 && x > 0 && x < width - 1) {
      // Randomly move left or right if within bounds
      x += Math.random() > 0.5 ? 1 : -1;

      if (x >= 0 && x < width) {
        map[y][x] = 'path';
      }

      y += 1;
      if (y >= 0 && y < height) {
        map[y][x] = 'path';
      }
    } else {
      // Move down in the y direction
      y += 1;

      if (y >= 0 && y < height) {
        map[y][x] = 'path';
      }

      // Optionally move left or right
      if (Math.random() > 0.5 && x > 0 && x < width - 1) {
        x += Math.random() > 0.5 ? 1 : -1;

        if (x >= 0 && x < width) {
          map[y][x] = 'path';
        }
      }
    }
  }
  console.log(`Created main path.`);
};
