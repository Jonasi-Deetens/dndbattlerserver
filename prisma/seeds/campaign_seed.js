import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  // Create a new Campaign
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
      passable: true
    },
    path: {
      type: 'path',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: true
    },
    water: {
      type: 'water',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false
    },
    wall: {
      type: 'wall',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: false
    },
    mountain: {
      type: 'mountain',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: false
    },
    trap: {
      type: 'trap',
      isRoof: false,
      isFloor: true,
      isDestructible: true,
      passable: true
    },
    ceiling: {
      type: 'ceiling',
      isRoof: true,
      isFloor: false,
      isDestructible: false,
      passable: true
    }
  };

  const fields = [];

  // Define the map size
  const width = 15;
  const height = 10;

  // Define a basic layout
  const mapLayout = [
    [
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall'
    ],
    [
      'wall',
      'grass',
      'grass',
      'path',
      'path',
      'grass',
      'grass',
      'water',
      'water',
      'grass',
      'grass',
      'path',
      'path',
      'grass',
      'wall'
    ],
    [
      'wall',
      'grass',
      'trap',
      'path',
      'path',
      'grass',
      'water',
      'water',
      'water',
      'grass',
      'path',
      'trap',
      'grass',
      'grass',
      'wall'
    ],
    [
      'wall',
      'grass',
      'grass',
      'path',
      'path',
      'grass',
      'water',
      'mountain',
      'water',
      'grass',
      'path',
      'path',
      'grass',
      'grass',
      'wall'
    ],
    [
      'wall',
      'path',
      'path',
      'path',
      'path',
      'grass',
      'water',
      'mountain',
      'water',
      'grass',
      'path',
      'path',
      'path',
      'grass',
      'wall'
    ],
    [
      'wall',
      'grass',
      'grass',
      'path',
      'path',
      'grass',
      'water',
      'mountain',
      'water',
      'grass',
      'path',
      'path',
      'grass',
      'grass',
      'wall'
    ],
    [
      'wall',
      'grass',
      'trap',
      'path',
      'path',
      'grass',
      'water',
      'water',
      'water',
      'grass',
      'path',
      'trap',
      'grass',
      'grass',
      'wall'
    ],
    [
      'wall',
      'grass',
      'grass',
      'path',
      'path',
      'grass',
      'grass',
      'water',
      'water',
      'grass',
      'path',
      'path',
      'grass',
      'grass',
      'wall'
    ],
    [
      'wall',
      'grass',
      'grass',
      'grass',
      'grass',
      'grass',
      'grass',
      'grass',
      'grass',
      'grass',
      'grass',
      'grass',
      'grass',
      'grass',
      'wall'
    ],
    [
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall',
      'wall'
    ]
  ];

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

  console.log('Realistic terrain map created successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
