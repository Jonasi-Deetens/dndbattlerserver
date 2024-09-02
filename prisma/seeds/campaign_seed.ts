import { PrismaClient, Prisma } from '@prisma/client';
import dotenv from 'dotenv';
import { fieldTypes } from '../models/fieldTypes.js';
import { createRiver } from '../utils/generators/riverGenerator.js';
import { createCastle } from '../utils/generators/castleGenerator.js';
import { generateBiomeClusters } from '../utils/generators/biomeGenerator.js';
import { createMainPath } from '../utils/generators/pathGenerator.js';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const campaign = await prisma.campaign.create({
    data: {
      name: 'Epic Adventure'
    }
  });

  const fields: Prisma.FieldUncheckedCreateInput[] = [];
  const width = 300;
  const height = 200;

  // Function to scatter bushes and traps randomly
  const scatterItems = (map: string[][], type: string, count: number) => {
    let scattered = 0;
    while (scattered < count) {
      let x = Math.floor(Math.random() * width);
      let y = Math.floor(Math.random() * height);
      if (map[y][x] === 'grass') {
        map[y][x] = type; // Only place on grass
        scattered++;
      }
    }
    console.log(`Scattered ${count} ${type} randomly.`);
  };

  // Generate map with realistic features
  const generateMap = (): string[][] => {
    const map: string[][] = Array.from({ length: height }, () =>
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
    createMainPath(map, width, height);

    generateBiomeClusters(map, 'water', 200, 4, width, height); // Lakes
    generateBiomeClusters(map, 'tree', 100, 8, width, height); // Forests
    generateBiomeClusters(map, 'mountain', 50, 6, width, height); // Mountain ranges

    // Create lakes, rivers, forests, and mountains
    createRiver(map, width, height);

    // Add a castle
    createCastle(map, width, height);

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
      const fieldType = fieldTypes[type];
      fields.push({
        type: fieldType.type,
        positionX: x,
        positionY: y,
        isRoof: fieldType.isRoof,
        isFloor: fieldType.isFloor,
        isDestructible: fieldType.isDestructible,
        passable: fieldType.passable,
        seeThrough: fieldType.seeThrough,
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
