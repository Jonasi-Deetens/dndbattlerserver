import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Create Races
  const dwarf = await prisma.race.create({
    data: {
      name: 'Dwarf',
      description:
        'Short, stout, and durable, dwarves are known for their craftsmanship, mining, and strong sense of community. They have long beards and strong familial ties.',
      abilityScoreIncreases: { constitution: 2 },
      statIncreases: {},
      adultAge: 50,
      maxAge: 350,
      alignment: 'Lawful',
      size: 'Medium',
      speed: 25,
      proficiencies: [
        'Battleaxe',
        'Handaxe',
        'Throwing Hammer',
        'Warhammer',
        'History'
      ],
      resistances: ['Poison'],
      advantages: ['Poison'],
      raceDislikes: ['Elf', 'Halfling', 'Human'],
      languages: {
        connect: [{ name: 'Common' }, { name: 'Dwarvish' }]
      },
      senses: {
        connect: [{ name: 'Darkvision' }]
      }
    }
  });

  const hillDwarf = await prisma.subrace.create({
    data: {
      name: 'Hill Dwarf',
      description:
        'Hill Dwarves are known for their resilience and wisdom. They often live in deep mountain halls and have a strong sense of tradition.',
      abilityScoreIncreases: { wisdom: 1 },
      statIncreases: { hp: 1, maxHp: 1 },
      adultAge: 50,
      maxAge: 350,
      speed: 25,
      size: 'Medium',
      alignment: 'Lawful',
      parentRace: { connect: { id: dwarf.id } }
    }
  });

  const mountainDwarf = await prisma.subrace.create({
    data: {
      name: 'Mountain Dwarf',
      description:
        'Mountain Dwarves are hardier and stronger, often residing in fortified strongholds. They are also skilled in the arts of war.',
      abilityScoreIncreases: { strength: 2 },
      statIncreases: {},
      adultAge: 50,
      maxAge: 350,
      speed: 25,
      size: 'Medium',
      alignment: 'Lawful',
      proficiencies: ['Light Armor', 'Medium Armor'],
      parentRace: { connect: { id: dwarf.id } }
    }
  });

  const elf = await prisma.race.create({
    data: {
      name: 'Elf',
      description:
        'Graceful and magical beings with a deep connection to nature and the arcane. Elves are known for their long lives and sharp features.',
      abilityScoreIncreases: { dexterity: 2 },
      statIncreases: {},
      adultAge: 100,
      maxAge: 750,
      alignment: 'Chaotic Good',
      size: 'Medium',
      speed: 30,
      proficiencies: ['Perception'],
      resistances: ['Sleep'],
      advantages: ['Charmed'],
      raceDislikes: ['Dwarf', 'Halfling', 'Human'],
      languages: {
        connect: [{ name: 'Common' }, { name: 'Elvish' }]
      },
      senses: {
        connect: [{ name: 'Darkvision' }]
      },
      skills: {
        connect: { name: 'Trance' }
      }
    }
  });

  const highElf = await prisma.subrace.create({
    data: {
      name: 'High Elf',
      description:
        'High Elves are closely tied to magic and learning. They often come from ancient, sophisticated societies.',
      abilityScoreIncreases: { intelligence: 1 },
      statIncreases: {},
      adultAge: 100,
      maxAge: 750,
      speed: 30,
      size: 'Medium',
      alignment: 'Chaotic Good',
      proficiencies: ['Longsword', 'Shortsword', 'Shortbow', 'Longbow'],
      parentRace: { connect: { id: elf.id } }
    }
  });

  const woodElf = await prisma.subrace.create({
    data: {
      name: 'Wood Elf',
      description:
        'Wood Elves are more connected to nature and are often found in forests. They are swift and stealthy.',
      abilityScoreIncreases: { wisdom: 1 },
      statIncreases: {},
      adultAge: 100,
      maxAge: 750,
      speed: 35,
      size: 'Medium',
      alignment: 'Chaotic Good',
      proficiencies: ['Longsword', 'Shortsword', 'Shortbow', 'Longbow'],
      parentRace: { connect: { id: elf.id } },
      skills: {
        connect: { name: 'Mask of the Wild' }
      }
    }
  });

  const drow = await prisma.subrace.create({
    data: {
      name: 'Dark Elf',
      description:
        'Drow are dark-skinned elves who live underground and are associated with the evil goddess Lolth. They are known for their cunning and cruelty.',
      abilityScoreIncreases: { charisma: 1 },
      statIncreases: {},
      adultAge: 100,
      maxAge: 750,
      speed: 30,
      size: 'Medium',
      alignment: 'Chaotic Evil',
      proficiencies: ['Rapier', 'Shortsword', 'Hand Crossbow'],
      disadvantages: ['Sunlight'],
      parentRace: { connect: { id: elf.id } },
      senses: {
        connect: [{ name: 'Superior Darkvision' }]
      },
      spells: {
        connect: { name: 'Dancing Lights' }
      }
    }
  });

  const halfling = await prisma.race.create({
    data: {
      name: 'Halfling',
      description:
        'Small and nimble, halflings are cheerful and optimistic, enjoying the simple pleasures of life. They tend to be overlooked by larger races due to their small size.',
      abilityScoreIncreases: { dexterity: 2 },
      statIncreases: {},
      adultAge: 20,
      maxAge: 150,
      alignment: 'Lawful Good',
      size: 'Small',
      speed: 25,
      proficiencies: [],
      resistances: [],
      advantages: ['Frightened'],
      raceDislikes: ['Dwarf', 'Elf', 'Human'],
      languages: {
        connect: [{ name: 'Common' }, { name: 'Halfling' }]
      },
      skills: {
        connect: [{ name: 'Lucky' }, { name: 'Halfling Nimbleness' }]
      }
    }
  });

  const lightfoot = await prisma.subrace.create({
    data: {
      name: 'Lightfoot',
      description:
        'Lightfoot Halflings are more outgoing and tend to be wanderers and adventurers. They have a natural ability to remain unnoticed.',
      abilityScoreIncreases: { charisma: 1 },
      statIncreases: {},
      adultAge: 20,
      maxAge: 150,
      speed: 25,
      size: 'Small',
      alignment: 'Lawful Good',
      proficiencies: [],
      parentRace: { connect: { id: halfling.id } },
      skills: {
        connect: { name: 'Natural Stealthy' }
      }
    }
  });

  const stout = await prisma.subrace.create({
    data: {
      name: 'Stout',
      description:
        'Stout Halflings are hardier and often tougher than their Lightfoot kin. They are said to have dwarven blood in their ancestry.',
      abilityScoreIncreases: { constitution: 1 },
      statIncreases: {},
      adultAge: 20,
      maxAge: 150,
      speed: 25,
      size: 'Small',
      alignment: 'Lawful Good',
      proficiencies: [],
      resistances: ['Poison'],
      advantages: ['Poison'],
      parentRace: { connect: { id: halfling.id } }
    }
  });

  const human = await prisma.race.create({
    data: {
      name: 'Human',
      description:
        'Humans are the most adaptable and ambitious race, capable of achieving great heights in all fields. They come in various shapes, sizes, and cultures.',
      abilityScoreIncreases: {
        strength: 1,
        constitution: 1,
        dexterity: 1,
        wisdom: 1,
        intelligence: 1,
        charisma: 1
      },
      statIncreases: {},
      adultAge: 18,
      maxAge: 95,
      alignment: 'Neutral',
      size: 'Medium',
      speed: 30,
      proficiencies: [],
      resistances: [],
      advantages: [],
      raceDislikes: ['Dwarf', 'Elf', 'Halfling'],
      languages: {
        connect: { name: 'Common' }
      }
    }
  });

  const dragonborn = await prisma.race.create({
    data: {
      name: 'Dragonborn',
      description:
        'Proud and strong, dragonborn are humanoid dragons with draconic ancestry. They are known for their fierce appearance, breath weapons, and strong sense of honor.',
      abilityScoreIncreases: { strength: 2, charisma: 1 },
      statIncreases: {},
      adultAge: 15,
      maxAge: 80,
      alignment: 'Neutral',
      size: 'Medium',
      speed: 30,
      proficiencies: [],
      resistances: [],
      advantages: [],
      raceDislikes: ['Dwarf', 'Elf', 'Halfling'],
      languages: {
        connect: [{ name: 'Common' }, { name: 'Draconic' }]
      }
    }
  });

  const gnome = await prisma.race.create({
    data: {
      name: 'Gnome',
      description:
        'Inquisitive and clever, gnomes are small and mischievous, often found in forests or working on arcane inventions. They have a love of magic and knowledge.',
      abilityScoreIncreases: { intelligence: 2 },
      statIncreases: {},
      adultAge: 40,
      maxAge: 450,
      alignment: 'Good',
      size: 'Small',
      speed: 25,
      proficiencies: [],
      resistances: [],
      advantages: [],
      magicSavingThrows: ['Intelligence', 'Wisdom', 'Charisma'],
      raceDislikes: ['Dwarf', 'Elf', 'Halfling'],
      languages: {
        connect: [{ name: 'Common' }, { name: 'Gnomish' }]
      },
      senses: {
        connect: [{ name: 'Darkvision' }]
      }
    }
  });

  const forestGnome = await prisma.subrace.create({
    data: {
      name: 'Forest Gnome',
      description:
        'Forest Gnomes are connected to nature and the magical forces within it. They often dwell in hidden communities within forests.',
      abilityScoreIncreases: { dexterity: 1 },
      statIncreases: {},
      adultAge: 40,
      maxAge: 450,
      speed: 25,
      size: 'Small',
      alignment: 'Lawful Good',
      proficiencies: [],
      resistances: [],
      advantages: [],
      parentRace: { connect: { id: gnome.id } },
      spells: {
        connect: { name: 'Minor Illusion' }
      },
      skills: {
        connect: { name: 'Speak with Small Beasts' }
      }
    }
  });

  const rockGnome = await prisma.subrace.create({
    data: {
      name: 'Rock Gnome',
      description:
        'Rock Gnomes are more focused on crafting and tinkering, often building intricate devices and tools.',
      abilityScoreIncreases: { constitution: 1 },
      statIncreases: {},
      adultAge: 40,
      maxAge: 450,
      speed: 25,
      size: 'Small',
      alignment: 'Lawful Good',
      proficiencies: ["Tinker's Tools", 'History'],
      resistances: [],
      advantages: [],
      parentRace: { connect: { id: gnome.id } }
      // spells: {
      //   connect: { name: 'Tinker' }
      // }
    }
  });

  const halfElf = await prisma.race.create({
    data: {
      name: 'Half Elf',
      description:
        'Half-elves combine the best traits of their human and elven ancestry, walking between both worlds but never truly belonging to either.',
      abilityScoreIncreases: { charisma: 2 },
      statIncreases: {},
      adultAge: 20,
      maxAge: 180,
      alignment: 'Choatic Good',
      size: 'Medium',
      speed: 30,
      proficiencies: [],
      resistances: ['Sleep'],
      advantages: ['Charmed'],
      magicSavingThrows: [],
      raceDislikes: ['Dwarf', 'Elf', 'Halfling'],
      languages: {
        connect: [{ name: 'Common' }, { name: 'Elvish' }]
      },
      senses: {
        connect: [{ name: 'Darkvision' }]
      }
    }
  });

  const halfOrc = await prisma.race.create({
    data: {
      name: 'Half Orc',
      description:
        'Half-orcs are strong and fearsome, born from the union of orcs and humans. They often struggle between the savage nature of their orcish blood and the ideals of humanity.',
      abilityScoreIncreases: { strength: 2, constitution: 1 },
      statIncreases: {},
      adultAge: 14,
      maxAge: 75,
      alignment: 'Choatic Evil',
      size: 'Medium',
      speed: 30,
      proficiencies: ['Intimidation'],
      resistances: ['Sleep'],
      advantages: ['Charmed'],
      magicSavingThrows: [],
      raceDislikes: ['Dwarf', 'Elf', 'Halfling'],
      languages: {
        connect: [{ name: 'Common' }, { name: 'Orc' }]
      },
      senses: {
        connect: [{ name: 'Darkvision' }]
      },
      skills: {
        connect: [{ name: 'Relentless Endurance' }, { name: 'Savage Attacks' }]
      }
    }
  });

  const tiefling = await prisma.race.create({
    data: {
      name: 'Tiefling',
      description:
        'Tieflings are descended from humans with infernal heritage, usually due to pacts with devils. They often face prejudice due to their demonic appearance.',
      abilityScoreIncreases: { intelligence: 1, charisma: 2 },
      statIncreases: {},
      adultAge: 18,
      maxAge: 110,
      alignment: 'Choatic Neutral',
      size: 'Medium',
      speed: 30,
      proficiencies: [],
      resistances: ['FIRE'],
      advantages: ['Charmed'],
      magicSavingThrows: [],
      raceDislikes: ['Dwarf', 'Elf', 'Halfling'],
      languages: {
        connect: [{ name: 'Common' }, { name: 'Infernal' }]
      },
      senses: {
        connect: [{ name: 'Darkvision' }]
      },
      spells: {
        connect: { name: 'Thaumaturgy' }
      }
    }
  });

  console.log('Races and subraces seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
