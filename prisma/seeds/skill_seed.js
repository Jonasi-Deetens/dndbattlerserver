import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// List of all D&D 5e skills
async function main() {
  // Fetch ability scores by name
  const abilityScores = await prisma.abilityScore.findMany({
    select: { id: true, name: true }
  });

  // List of skills with associated ability score names
  const skills = [
    { name: 'Acrobatics', abilityScoreName: 'Dexterity' },
    { name: 'Animal Handling', abilityScoreName: 'Wisdom' },
    { name: 'Arcana', abilityScoreName: 'Intelligence' },
    { name: 'Athletics', abilityScoreName: 'Strength' },
    { name: 'Deception', abilityScoreName: 'Charisma' },
    { name: 'History', abilityScoreName: 'Intelligence' },
    { name: 'Insight', abilityScoreName: 'Wisdom' },
    { name: 'Intimidation', abilityScoreName: 'Charisma' },
    { name: 'Investigation', abilityScoreName: 'Intelligence' },
    { name: 'Medicine', abilityScoreName: 'Wisdom' },
    { name: 'Nature', abilityScoreName: 'Intelligence' },
    { name: 'Perception', abilityScoreName: 'Wisdom' },
    { name: 'Performance', abilityScoreName: 'Charisma' },
    { name: 'Persuasion', abilityScoreName: 'Charisma' },
    { name: 'Religion', abilityScoreName: 'Intelligence' },
    { name: 'Sleight of Hand', abilityScoreName: 'Dexterity' },
    { name: 'Stealth', abilityScoreName: 'Dexterity' },
    { name: 'Survival', abilityScoreName: 'Wisdom' }
  ];

  // Create skills
  for (const skill of skills) {
    const abilityScore = abilityScores.find(
      a => a.name === skill.abilityScoreName
    );
    if (abilityScore) {
      await prisma.skill.create({
        data: {
          name: skill.name,
          abilityScoreId: abilityScore.id
        }
      });
      console.log(`Created skill: ${skill.name}`);
    } else {
      console.error(`Ability score not found for skill: ${skill.name}`);
    }
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
