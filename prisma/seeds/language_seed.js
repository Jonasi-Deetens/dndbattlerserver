import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

// List of all D&D 5e languages
const languages = [
  { name: 'Common' },
  { name: 'Dwarvish' },
  { name: 'Elvish' },
  { name: 'Giant' },
  { name: 'Gnomish' },
  { name: 'Goblin' },
  { name: 'Halfling' },
  { name: 'Orc' },
  { name: 'Abyssal' },
  { name: 'Celestial' },
  { name: 'Draconic' },
  { name: 'Deep Speech' },
  { name: 'Infernal' },
  { name: 'Primordial' },
  { name: 'Sylvan' },
  { name: 'Undercommon' }
];

async function main() {
  for (const language of languages) {
    await prisma.language.create({
      data: language
    });
  }
  console.log('Languages seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
