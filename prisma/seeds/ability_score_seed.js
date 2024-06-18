import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// List of all D&D 5e ability scores
async function main() {
  // List of ability scores
  const abilityScores = [
    { name: 'Strength' },
    { name: 'Dexterity' },
    { name: 'Constitution' },
    { name: 'Intelligence' },
    { name: 'Wisdom' },
    { name: 'Charisma' }
  ];

  // Create ability scores
  for (const abilityScore of abilityScores) {
    await prisma.abilityScore.create({
      data: abilityScore
    });
    console.log(`Created ability score: ${abilityScore.name}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
