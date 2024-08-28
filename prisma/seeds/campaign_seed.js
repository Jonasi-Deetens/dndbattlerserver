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
    },
    floor: {
      type: 'floor',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: true
    },
    'top-left-corner': {
      type: 'top-left-corner',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true
    },
    'top-right-corner': {
      type: 'top-right-corner',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true
    },
    'bottom-left-corner': {
      type: 'bottom-left-corner',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true
    },
    'bottom-right-corner': {
      type: 'bottom-right-corner',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: true
    }
  };

  const fields = [];

  // Define the map size
  const width = 300;
  const height = 200;

  // Function to generate a row based on proximity to edges (e.g., walls on the borders)
  const generateRow = y => {
    const row = [];
    for (let x = 0; x < width; x++) {
      if (y === 0 && x === 0) {
        row.push('top-left-corner');
      } else if (y === 0 && x === width - 1) {
        row.push('top-right-corner');
      } else if (y === height - 1 && x === 0) {
        row.push('bottom-left-corner');
      } else if (y === height - 1 && x === width - 1) {
        row.push('bottom-right-corner');
      } else if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        // Walls on the borders
        row.push('wall');
      } else if (Math.random() < 0.1) {
        row.push('water');
      } else if (Math.random() < 0.1) {
        row.push('mountain');
      } else if (Math.random() < 0.05) {
        row.push('trap');
      } else if (Math.random() < 0.2) {
        row.push('path');
      } else if (Math.random() < 0.2) {
        row.push('floor');
      } else {
        row.push('grass');
      }
    }
    return row;
  };

  // Generate the map layout
  const mapLayout = [];
  for (let y = 0; y < height; y++) {
    mapLayout.push(generateRow(y));
  }

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

  console.log('Large terrain map (300x200) created successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
