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

  const fieldTypes = [
    {
      type: 'grass',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: true
    },
    {
      type: 'ceiling',
      isRoof: true,
      isFloor: false,
      isDestructible: false,
      passable: true
    },
    {
      type: 'wall',
      isRoof: false,
      isFloor: false,
      isDestructible: false,
      passable: false
    },
    {
      type: 'water',
      isRoof: false,
      isFloor: true,
      isDestructible: false,
      passable: false
    },
    {
      type: 'trap',
      isRoof: false,
      isFloor: true,
      isDestructible: true,
      passable: true
    }
  ];

  const fields = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const randomFieldType =
        fieldTypes[Math.floor(Math.random() * fieldTypes.length)];

      fields.push({
        type: randomFieldType.type,
        positionX: x,
        positionY: y,
        isRoof: randomFieldType.isRoof,
        isFloor: randomFieldType.isFloor,
        isDestructible: randomFieldType.isDestructible,
        passable: randomFieldType.passable,
        campaignId: campaign.id
      });
    }
  }

  await prisma.field.createMany({
    data: fields
  });

  console.log('Seed data has been created successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
