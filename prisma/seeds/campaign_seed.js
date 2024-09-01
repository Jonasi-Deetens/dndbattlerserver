import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const campaign = await prisma.campaign.create({
    data: {
      name: 'Epic Adventure'
    }
  });

  const fieldTypes = {
    grass: {
      type: 'grass',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: true,
      seeThrough: true
    },
    path: {
      type: 'path',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: true,
      seeThrough: true
    },
    'grass-2': {
      type: 'grass-2',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: true,
      seeThrough: true
    },
    water: {
      type: 'water',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-bottom': {
      type: 'water-bottom',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-top': {
      type: 'water-top',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-left': {
      type: 'water-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-right': {
      type: 'water-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-horizontal': {
      type: 'water-horizontal',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-vertical': {
      type: 'water-vertical',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-corner-bottom-left': {
      type: 'water-corner-bottom-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-corner-bottom-right': {
      type: 'water-corner-bottom-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-corner-top-left': {
      type: 'water-corner-top-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-corner-top-right': {
      type: 'water-corner-top-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-corner-link-bottom-left': {
      type: 'water-corner-link-bottom-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-corner-link-bottom-right': {
      type: 'water-corner-link-bottom-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-corner-link-top-left': {
      type: 'water-corner-link-top-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-corner-link-top-right': {
      type: 'water-corner-link-top-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-link-top-right': {
      type: 'water-link-top-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-link-top-left': {
      type: 'water-link-top-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-link-bottom-right': {
      type: 'water-link-bottom-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-link-bottom-left': {
      type: 'water-link-bottom-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-all': {
      type: 'water-all',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-bottom-link-left': {
      type: 'water-bottom-link-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-bottom-link-right': {
      type: 'water-bottom-link-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-bottom-links': {
      type: 'water-bottom-links',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-left-link-bottom': {
      type: 'water-left-link-bottom',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-left-links': {
      type: 'water-left-links',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-left-link-top': {
      type: 'water-left-link-top',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-link-corner-bottom-left': {
      type: 'water-link-corner-bottom-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-link-corner-bottom-right': {
      type: 'water-link-corner-bottom-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-link-corner-top-left': {
      type: 'water-link-corner-top-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-link-corner-top-right': {
      type: 'water-link-corner-top-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-links-all': {
      type: 'water-links-all',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-links-bottom': {
      type: 'water-links-bottom',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-links-diagonal-down': {
      type: 'water-links-diagonal-down',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-links-diagonal-up': {
      type: 'water-links-diagonal-up',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-links-left': {
      type: 'water-links-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-links-right': {
      type: 'water-links-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-links-top': {
      type: 'water-links-top',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-right-link-bottom': {
      type: 'water-right-link-bottom',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-right-links': {
      type: 'water-right-links',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-right-link-top': {
      type: 'water-right-link-top',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-top-link-left': {
      type: 'water-top-link-left',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-top-link-right': {
      type: 'water-top-link-right',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-top-links': {
      type: 'water-top-links',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-top-end': {
      type: 'water-top-end',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-left-end': {
      type: 'water-left-end',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-right-end': {
      type: 'water-right-end',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    'water-bottom-end': {
      type: 'water-bottom-end',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    wall: {
      type: 'wall',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: false,
      seeThrough: false
    },
    mountain: {
      type: 'mountain',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: false,
      seeThrough: false
    },
    bush: {
      type: 'bush',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: false,
      seeThrough: true
    },
    tree: {
      type: 'tree',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: false,
      seeThrough: false
    },
    trap: {
      type: 'trap',
      isRoof: false,
      isFloor: true,
      isDestructible: true,
      passable: true,
      seeThrough: true
    },
    ceiling: {
      type: 'ceiling',
      isRoof: true,
      isFloor: false,
      isDestructible: false,
      passable: true,
      seeThrough: true
    },
    floor: {
      type: 'floor',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: true,
      seeThrough: true
    },
    'top-left-corner': {
      type: 'top-left-corner',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true,
      seeThrough: true
    },
    'top-right-corner': {
      type: 'top-right-corner',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true,
      seeThrough: true
    },
    'bottom-left-corner': {
      type: 'bottom-left-corner',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true,
      seeThrough: true
    },
    'bottom-right-corner': {
      type: 'bottom-right-corner',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true,
      seeThrough: true
    },
    'bottom-wall': {
      type: 'bottom-wall',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true,
      seeThrough: false
    },
    'top-wall': {
      type: 'top-wall',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true,
      seeThrough: false
    },
    'left-wall': {
      type: 'left-wall',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true,
      seeThrough: false
    },
    'right-wall': {
      type: 'right-wall',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true,
      seeThrough: false
    }
  };

  const fields = [];
  const width = 300;
  const height = 200;

  // Function to determine the correct water tile type based on adjacency
  const determineWaterType = (map, x, y) => {
    const hasWaterAbove = y > 0 && map[y - 1][x].startsWith('water');
    const hasWaterBelow = y < height - 1 && map[y + 1][x].startsWith('water');
    const hasWaterLeft = x > 0 && map[y][x - 1].startsWith('water');
    const hasWaterRight = x < width - 1 && map[y][x + 1].startsWith('water');

    // Diagonal checks
    const hasWaterTopLeft =
      x > 0 && y > 0 && map[y - 1][x - 1].startsWith('water');
    const hasWaterTopRight =
      x < width - 1 && y > 0 && map[y - 1][x + 1].startsWith('water');
    const hasWaterBottomLeft =
      x > 0 && y < height - 1 && map[y + 1][x - 1].startsWith('water');
    const hasWaterBottomRight =
      x < width - 1 && y < height - 1 && map[y + 1][x + 1].startsWith('water');

    if (!hasWaterAbove && !hasWaterBelow && !hasWaterLeft && !hasWaterRight)
      return 'water-all';
    if (!hasWaterAbove && hasWaterBelow && !hasWaterLeft && !hasWaterRight)
      return 'water-top-end';
    if (!hasWaterAbove && !hasWaterBelow && !hasWaterLeft && hasWaterRight)
      return 'water-left-end';
    if (!hasWaterAbove && !hasWaterBelow && hasWaterLeft && !hasWaterRight)
      return 'water-right-end';
    if (hasWaterAbove && !hasWaterBelow && !hasWaterLeft && !hasWaterRight)
      return 'water-bottom-end';
    // Specific corner links and complex patterns
    if (hasWaterAbove && hasWaterBelow && hasWaterLeft && hasWaterRight) {
      if (
        !hasWaterTopLeft &&
        !hasWaterTopRight &&
        !hasWaterBottomLeft &&
        !hasWaterBottomRight
      ) {
        return 'water-links-all';
      } else if (
        hasWaterTopLeft &&
        hasWaterTopRight &&
        !hasWaterBottomLeft &&
        !hasWaterBottomRight
      ) {
        return 'water-links-bottom';
      } else if (
        !hasWaterTopLeft &&
        hasWaterTopRight &&
        hasWaterBottomLeft &&
        !hasWaterBottomRight
      ) {
        return 'water-links-diagonal-down';
      } else if (
        hasWaterTopLeft &&
        !hasWaterTopRight &&
        !hasWaterBottomLeft &&
        hasWaterBottomRight
      ) {
        return 'water-links-diagonal-up';
      } else if (
        !hasWaterTopLeft &&
        hasWaterTopRight &&
        !hasWaterBottomLeft &&
        hasWaterBottomRight
      ) {
        return 'water-links-left';
      } else if (
        hasWaterTopLeft &&
        !hasWaterTopRight &&
        hasWaterBottomLeft &&
        !hasWaterBottomRight
      ) {
        return 'water-links-right';
      } else if (
        !hasWaterTopLeft &&
        !hasWaterTopRight &&
        hasWaterBottomLeft &&
        hasWaterBottomRight
      ) {
        return 'water-links-top';
      } else if (
        !hasWaterTopLeft &&
        hasWaterTopRight &&
        !hasWaterBottomLeft &&
        !hasWaterBottomRight
      ) {
        return 'water-link-corner-bottom-left';
      } else if (
        hasWaterTopLeft &&
        !hasWaterTopRight &&
        !hasWaterBottomLeft &&
        !hasWaterBottomRight
      ) {
        return 'water-link-corner-bottom-right';
      } else if (
        !hasWaterTopLeft &&
        !hasWaterTopRight &&
        !hasWaterBottomLeft &&
        hasWaterBottomRight
      ) {
        return 'water-link-corner-top-left';
      } else if (
        !hasWaterTopLeft &&
        !hasWaterTopRight &&
        hasWaterBottomLeft &&
        !hasWaterBottomRight
      ) {
        return 'water-link-corner-top-right';
      } else if (!hasWaterTopLeft) {
        return 'water-link-top-left';
      } else if (!hasWaterTopRight) {
        return 'water-link-top-right';
      } else if (!hasWaterBottomLeft) {
        return 'water-link-bottom-left';
      } else if (!hasWaterBottomRight) {
        return 'water-link-bottom-right';
      }
    }

    // Specific cases for sides with links
    if (hasWaterAbove && !hasWaterBelow && hasWaterLeft && hasWaterRight) {
      if (!hasWaterTopLeft && hasWaterTopRight) {
        return 'water-bottom-link-left';
      } else if (hasWaterTopLeft && !hasWaterTopRight) {
        return 'water-bottom-link-right';
      } else if (!hasWaterTopLeft && !hasWaterTopRight) {
        return 'water-bottom-links';
      }
    }
    if (hasWaterAbove && hasWaterBelow && !hasWaterLeft && hasWaterRight) {
      if (hasWaterTopRight && !hasWaterBottomRight) {
        return 'water-left-link-bottom';
      } else if (!hasWaterBottomRight && !hasWaterTopRight) {
        return 'water-left-links';
      } else if (hasWaterBottomRight && !hasWaterTopRight) {
        return 'water-left-link-top';
      }
    }
    if (hasWaterAbove && hasWaterBelow && hasWaterLeft && !hasWaterRight) {
      if (hasWaterTopLeft && !hasWaterBottomLeft) {
        return 'water-right-link-bottom';
      } else if (!hasWaterTopLeft && !hasWaterBottomLeft) {
        return 'water-right-links';
      } else if (!hasWaterTopLeft && hasWaterBottomLeft) {
        return 'water-right-link-top';
      }
    }
    if (!hasWaterAbove && hasWaterBelow && hasWaterLeft && hasWaterRight) {
      if (!hasWaterBottomLeft && hasWaterBottomRight) {
        return 'water-top-link-left';
      } else if (hasWaterBottomLeft && !hasWaterBottomRight) {
        return 'water-top-link-right';
      } else if (!hasWaterBottomLeft && !hasWaterBottomRight) {
        return 'water-top-links';
      }
    }

    // Less specific checks for corners and edges
    if (!hasWaterAbove && hasWaterBelow && !hasWaterLeft && hasWaterRight) {
      if (!hasWaterBottomRight) return 'water-corner-link-top-left';
      return 'water-corner-top-left';
    } else if (
      !hasWaterAbove &&
      hasWaterBelow &&
      hasWaterLeft &&
      !hasWaterRight
    ) {
      if (!hasWaterBottomLeft) return 'water-corner-link-top-right';
      return 'water-corner-top-right';
    } else if (
      hasWaterAbove &&
      !hasWaterBelow &&
      !hasWaterLeft &&
      hasWaterRight
    ) {
      if (!hasWaterTopRight) return 'water-corner-link-bottom-left';
      return 'water-corner-bottom-left';
    } else if (
      hasWaterAbove &&
      !hasWaterBelow &&
      hasWaterLeft &&
      !hasWaterRight
    ) {
      if (!hasWaterTopLeft) return 'water-corner-link-bottom-right';
      return 'water-corner-bottom-right';
    } else if (
      !hasWaterAbove &&
      !hasWaterBelow &&
      hasWaterLeft &&
      hasWaterRight
    ) {
      return 'water-horizontal';
    } else if (
      hasWaterAbove &&
      hasWaterBelow &&
      !hasWaterLeft &&
      !hasWaterRight
    ) {
      return 'water-vertical';
    }

    // Edge cases
    if (!hasWaterAbove && hasWaterBelow && hasWaterLeft && hasWaterRight) {
      return 'water-top';
    } else if (
      hasWaterAbove &&
      !hasWaterBelow &&
      hasWaterLeft &&
      hasWaterRight
    ) {
      return 'water-bottom';
    } else if (
      hasWaterAbove &&
      hasWaterBelow &&
      !hasWaterLeft &&
      hasWaterRight
    ) {
      return 'water-left';
    } else if (
      hasWaterAbove &&
      hasWaterBelow &&
      hasWaterLeft &&
      !hasWaterRight
    ) {
      return 'water-right';
    }

    // Default to generic water if no specific case matches
    return 'water';
  };

  // Function to create rivers with non-diagonal steps
  const createRiver = map => {
    let x = Math.floor(Math.random() * width);
    let y = 0;

    while (y < height) {
      map[y][x] = 'water'; // Set initial tile as generic water

      // Randomly decide direction, preferring downward flow
      const direction = Math.random();
      if (direction < 0.4 && x > 0) x--; // Move left
      else if (direction < 0.8 && x < width - 1) x++; // Move right

      y++; // Always move down
      if (y < height) {
        map[y][x] = 'water'; // Continue placing generic water
      }
    }
    console.log(`Created a river starting at (${x}, 0).`);
  };

  const adjustWaterTiles = map => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (map[y][x] === 'water') {
          map[y][x] = determineWaterType(map, x, y);
        }
      }
    }
  };

  // Function to generate biomes with clusters
  const generateBiomeClusters = (map, type, clusterSize, count) => {
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * width);
      let y = Math.floor(Math.random() * height);
      for (let j = 0; j < clusterSize; j++) {
        if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
          map[y][x] = type;
        }
        // Spread the cluster
        x += Math.floor(Math.random() * 3) - 1; // Move randomly left, right, or stay
        y += Math.floor(Math.random() * 3) - 1; // Move randomly up, down, or stay
      }
    }
    console.log(
      `Generated ${count} clusters of ${type}, each with ${clusterSize} tiles.`
    );
  };

  // Function to create the main path through the map
  const createMainPath = () => {
    const pathPoints = [];
    let x = Math.floor(Math.random() * width); // Start at a random x position
    let y = 0;
    pathPoints.push({ x, y });

    while (y < height - 1) {
      // Decide whether to move horizontally first or vertically first
      if (Math.random() > 0.5 && x > 0 && x < width - 1) {
        x += Math.random() > 0.5 ? 1 : -1; // Move left or right randomly
        pathPoints.push({ x, y });
        y += 1; // Then move down
        pathPoints.push({ x, y });
      } else {
        y += 1; // Move down first
        pathPoints.push({ x, y });
        if (Math.random() > 0.5 && x > 0 && x < width - 1) {
          x += Math.random() > 0.5 ? 1 : -1; // Move left or right
          pathPoints.push({ x, y });
        }
      }
    }

    return pathPoints;
  };

  // Function to create a castle area
  const createCastle = map => {
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

    map[y][x] = 'top-left-corner';
    map[y][x + castleWidth - 1] = 'top-right-corner';
    map[y + castleHeight - 1][x] = 'bottom-left-corner';
    map[y + castleHeight - 1][x + castleWidth - 1] = 'bottom-right-corner';
    console.log(
      `Created a castle at (${x}, ${y}) with size ${castleWidth}x${castleHeight}.`
    );
  };

  // Function to scatter bushes and traps randomly
  const scatterItems = (map, type, count) => {
    let scattered = 0;
    while (scattered < count) {
      let x = Math.floor(Math.random() * width);
      let y = Math.floor(Math.random() * height);
      if (map[y][x] === 'grass') {
        // Only place on grass
        map[y][x] = type;
        scattered++;
      }
    }
    console.log(`Scattered ${count} ${type} randomly.`);
  };

  // Generate map with realistic features
  const generateMap = () => {
    const map = Array.from({ length: height }, () =>
      Array.from({ length: width }, () =>
        Math.random() < 0.5 ? 'grass' : 'grass-2'
      )
    );

    // Set borders
    for (let x = 0; x < width; x++) {
      map[0][x] = 'top-wall';
      map[height - 1][x] = 'bottom-wall';
    }
    for (let y = 0; y < height; y++) {
      map[y][0] = 'left-wall';
      map[y][width - 1] = 'right-wall';
    }

    map[0][0] = 'top-left-corner';
    map[0][width - 1] = 'top-right-corner';
    map[height - 1][0] = 'bottom-left-corner';
    map[height - 1][width - 1] = 'bottom-right-corner';

    // Create the main path
    const pathPoints = createMainPath();
    pathPoints.forEach(point => {
      map[point.y][point.x] = 'path';
    });
    console.log(`Created main path with ${pathPoints.length} tiles.`);

    // Create lakes, rivers, forests, and mountains
    generateBiomeClusters(map, 'water', 200, 4); // Lakes
    createRiver(map); // River

    // Adjust water tiles after initial creation
    adjustWaterTiles(map);

    generateBiomeClusters(map, 'tree', 100, 8); // Forests
    generateBiomeClusters(map, 'mountain', 50, 6); // Mountain ranges

    // Add a castle
    createCastle(map);

    // Scatter bushes and traps
    scatterItems(map, 'bush', 100); // Scatter bushes
    scatterItems(map, 'trap', 50); // Scatter traps

    return map;
  };

  const mapLayout = generateMap();

  // Create the fields based on the layout
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const type = mapLayout[y][x];
      fields.push({
        type: fieldTypes[type].type,
        positionX: x,
        positionY: y,
        isRoof: fieldTypes[type].isRoof,
        isFloor: fieldTypes[type].isFloor,
        isDestructible: fieldTypes[type].isDestructible,
        passable: fieldTypes[type].passable,
        seeThrough: fieldTypes[type].seeThrough,
        campaignId: campaign.id
      });
    }
  }

  await prisma.field.createMany({
    data: fields
  });

  console.log(
    'Realistic terrain map (300x200) with biomes, bushes, and traps created successfully'
  );
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
