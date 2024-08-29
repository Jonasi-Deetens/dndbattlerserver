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
    grass: { type: 'grass', isRoof: false, isFloor: true, isDestructible: false, passable: true },
    path: { type: 'path', isRoof: false, isFloor: true, isDestructible: false, passable: true },
    water: { type: 'water', isRoof: false, isFloor: true, isDestructible: false, passable: false },
    wall: { type: 'wall', isRoof: false, isFloor: false, isDestructible: false, passable: false },
    mountain: { type: 'mountain', isRoof: false, isFloor: false, isDestructible: false, passable: false },
    trap: { type: 'trap', isRoof: false, isFloor: true, isDestructible: true, passable: true },
    ceiling: { type: 'ceiling', isRoof: true, isFloor: false, isDestructible: false, passable: true },
    floor: { type: 'floor', isRoof: false, isFloor: true, isDestructible: false, passable: true },
    'top-left-corner': { type: 'top-left-corner', isRoof: false, isFloor: false, isDestructible: false, passable: true },
    'top-right-corner': { type: 'top-right-corner', isRoof: false, isFloor: false, isDestructible: false, passable: true },
    'bottom-left-corner': { type: 'bottom-left-corner', isRoof: false, isFloor: false, isDestructible: false, passable: true },
    'bottom-right-corner': { type: 'bottom-right-corner', isRoof: false, isFloor: false, isDestructible: false, passable: true },
    'bottom-wall': { type: 'bottom-wall', isRoof: false, isFloor: false, isDestructible: false, passable: true },
    'top-wall': { type: 'top-wall', isRoof: false, isFloor: false, isDestructible: false, passable: true },
    'left-wall': { type: 'left-wall', isRoof: false, isFloor: false, isDestructible: false, passable: true },
    'right-wall': { type: 'right-wall', isRoof: false, isFloor: false, isDestructible: false, passable: true }
  };

  const fields = [];
  const width = 300;
  const height = 200;

  // Function to create the main path through the map
  const createMainPath = () => {
    const pathPoints = [];
    let x = Math.floor(Math.random() * width);
    let y = 0;
    pathPoints.push({ x, y });

    while (y < height - 1) {
      y += 1;
      if (Math.random() > 0.5 && x > 0 && x < width - 1) {
        x += Math.random() > 0.5 ? 1 : -1; // Move left or right randomly
      }
      pathPoints.push({ x, y });
    }

    return pathPoints;
  };

  // Function to populate grass around the path
  const populateGrass = (map) => {
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        if (map[y][x] === 'grass') {
          if (map[y - 1][x] === 'path' || map[y + 1][x] === 'path' || map[y][x - 1] === 'path' || map[y][x + 1] === 'path') {
            map[y][x] = Math.random() > 0.8 ? 'trap' : 'grass';
          }
        }
      }
    }
  };

  // Generate map with realistic features
  const generateMap = () => {
    const map = Array.from({ length: height }, () => Array(width).fill('grass'));
    
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

    // Populate grass around the path with realistic distribution
    populateGrass(map);

    // Add random elements, ensuring paths are not overwritten
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        if (map[y][x] === 'grass') {
          if (Math.random() < 0.05) {
            map[y][x] = 'water';
          } else if (Math.random() < 0.03) {
            map[y][x] = 'mountain';
          } else if (Math.random() < 0.02) {
            map[y][x] = 'wall';
          }
        }
      }
    }

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
        campaignId: campaign.id
      });
    }
  }

  await prisma.field.createMany({
    data: fields
  });

  console.log('Realistic terrain map (300x200) created successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
