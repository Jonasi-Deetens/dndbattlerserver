import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

// List of all D&D 5e senses
const senses = [
  {
    name: 'Blindsight',
    range: 10,
    description:
      'A creature with blindsight can perceive its surroundings without relying on sight, within a specific radius.'
  },
  {
    name: 'Darkvision',
    range: 60,
    description:
      'A creature with darkvision can see in darkness as if the darkness were dim light, so areas of darkness are only lightly obscured as far as that creature is concerned.'
  },
  {
    name: 'Superior Darkvision',
    range: 120,
    description:
      'A creature with darkvision can see in darkness as if the darkness were dim light, so areas of darkness are only lightly obscured as far as that creature is concerned.'
  },
  {
    name: 'Truesight',
    range: 120,
    description:
      'A creature with truesight can, out to a specific range, see in normal and magical darkness, see invisible creatures and objects, automatically detect visual illusions and succeed on saving throws against them, and perceive the original form of a shapechanger or a creature that is transformed by magic.'
  },
  {
    name: 'Tremorsense',
    range: 30,
    description:
      'A creature with tremorsense can detect and pinpoint the origin of vibrations within a specific radius, provided that the creature and the source of the vibrations are in contact with the same ground or substance.'
  },
  {
    name: 'Blind Beyond This Radius',
    range: 120,
    description:
      'A creature with this trait is blind beyond the specified radius and cannot perceive anything beyond this range.'
  }
];

async function main() {
  for (const sense of senses) {
    await prisma.sense.create({
      data: sense
    });
  }
  console.log('Senses seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
