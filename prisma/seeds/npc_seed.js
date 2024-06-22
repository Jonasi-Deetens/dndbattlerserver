import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Helper function to fetch a random race
  const getRandomRace = async () => {
    const races = await prisma.race.findMany();
    return races[Math.floor(Math.random() * races.length)];
  };

  // Helper function to fetch a random class
  const getRandomClass = async () => {
    const classes = await prisma.class.findMany();
    return classes[Math.floor(Math.random() * classes.length)];
  };

  // Helper function to fetch a random subrace for a given race
  const getRandomSubrace = async raceId => {
    const subraces = await prisma.subrace.findMany({
      where: { parentRaceId: raceId }
    });
    return subraces.length > 0
      ? subraces[Math.floor(Math.random() * subraces.length)]
      : null;
  };

  // Helper function to fetch random languages
  const getRandomLanguages = async () => {
    const languages = await prisma.language.findMany();
    const numLanguages = Math.floor(Math.random() * 3) + 1; // Randomly choose 1 to 3 languages
    return languages.sort(() => 0.5 - Math.random()).slice(0, numLanguages);
  };

  // Helper function to fetch random skills
  const getRandomSkills = async () => {
    const skills = await prisma.skill.findMany();
    const numSkills = Math.floor(Math.random() * 4) + 1; // Randomly choose 1 to 4 skills
    return skills.sort(() => 0.5 - Math.random()).slice(0, numSkills);
  };

  // Helper function to fetch random items
  const getRandomItems = async () => {
    const items = await prisma.item.findMany();
    const numItems = Math.floor(Math.random() * 3) + 1; // Randomly choose 1 to 3 items
    return items.sort(() => 0.5 - Math.random()).slice(0, numItems);
  };

  // Define NPCs data
  const npcs = [
    { name: 'Gorim Ironfist', background: 'Soldier', alignment: 'Lawful Good' },
    {
      name: 'Elyndra Moonwhisper',
      background: 'Sage',
      alignment: 'Chaotic Good'
    },
    { name: 'Hobart Bumblefoot', background: 'Thief', alignment: 'Neutral' },
    {
      name: 'Seraphina Glenfellow',
      background: 'Bard',
      alignment: 'Chaotic Neutral'
    },
    {
      name: 'Tharivol Silverfrond',
      background: 'Ranger',
      alignment: 'Neutral Good'
    },
    {
      name: 'Roscoe Tealeaf',
      background: 'Artisan',
      alignment: 'Lawful Neutral'
    },
    {
      name: 'Astrid Brightwood',
      background: 'Acolyte',
      alignment: 'Neutral Good'
    },
    {
      name: 'Korag Stoneskin',
      background: 'Barbarian',
      alignment: 'Chaotic Evil'
    },
    {
      name: 'Liliana Darkbane',
      background: 'Warlock',
      alignment: 'Neutral Evil'
    },
    { name: 'Finnian Fleetfoot', background: 'Mercenary', alignment: 'Neutral' }
  ];

  // Create NPCs
  for (const npc of npcs) {
    const race = await getRandomRace();
    const characterClass = await getRandomClass();
    const subrace = await getRandomSubrace(race.id);
    const languages = await getRandomLanguages();
    const skills = await getRandomSkills();
    const items = await getRandomItems();

    await prisma.character.create({
      data: {
        name: npc.name,
        background: npc.background,
        alignment: npc.alignment,
        race: { connect: { id: race.id } },
        class: { connect: { id: characterClass.id } },
        subrace: subrace ? { connect: { id: subrace.id } } : undefined,
        primaryGoal: 'Survive and thrive',
        secondaryGoals: ['Find treasure', 'Make allies'],
        backstory: 'An adventurer with a mysterious past.',
        currentLocation: 'Village of Greenrest',
        appearance: 'A distinctive appearance with unique clothing and gear.',
        level: Math.floor(Math.random() * 20) + 1,
        experience: Math.floor(Math.random() * 100000),
        health: Math.floor(Math.random() * 100) + 10,
        stats: {
          HP: Math.floor(Math.random() * 100) + 10,
          AC: Math.floor(Math.random() * 20) + 10
        },
        languages: {
          create: languages.map(language => ({
            language: { connect: { id: language.id } }
          }))
        },
        primarySkills: {
          create: skills.map(skill => ({
            skill: { connect: { id: skill.id } },
            proficiency: Math.floor(Math.random() * 3) // 0: not proficient, 1: proficient, 2: expertise
          }))
        },
        items: {
          create: items.map(item => ({
            item: { connect: { id: item.id } }
          }))
        },
        user: {
          connect: { id: '1a79f8fd-9873-4c2d-9f28-87f6afad64cd' }
        }
      }
    });
  }

  console.log('NPCs seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
