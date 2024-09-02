// Define the type for the map as a 2D array of strings
type MapGrid = string[][];

// Function to generate biome clusters on the map
export const generateBiomeClusters = (
  map: MapGrid,
  type: string,
  clusterSize: number,
  count: number,
  width: number,
  height: number
): void => {
  for (let i = 0; i < count; i++) {
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);

    for (let j = 0; j < clusterSize; j++) {
      // Check boundaries to prevent placing clusters outside the map
      if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
        map[y][x] = type;
      }

      // Spread the cluster by moving randomly in x and y directions
      x += Math.floor(Math.random() * 3) - 1; // Random movement: -1, 0, or 1
      y += Math.floor(Math.random() * 3) - 1; // Random movement: -1, 0, or 1
    }
  }

  console.log(
    `Generated ${count} clusters of ${type}, each with ${clusterSize} tiles.`
  );
};
