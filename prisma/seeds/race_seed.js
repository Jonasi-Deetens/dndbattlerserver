import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Create Races
  const dwarf = await prisma.race.create({
    data: {
      name: "Dwarf",
      abilityScoreIncreases: { constitution: 2 },
      statIncreases: {},
      adultAge: 50,
      maxAge: 350,
      alignment: "Lawful",
      size: "Medium",
      speed: 25,
      proficiencies: [
        "Battleaxe",
        "Handaxe",
        "Throwing Hammer",
        "Warhammer",
        "History",
      ],
      resistances: ["Poison"],
      advantages: ["Poison"],
      raceDislikes: ["Elf", "Halfling", "Human"],
      languages: {
        connect: [{ name: "Common" }, { name: "Dwarvish" }],
      },
      senses: {
        connect: [{ name: "Darkvision" }],
      },
    },
  });

  const hillDwarf = await prisma.subrace.create({
    data: {
      name: "Hill Dwarf",
      abilityScoreIncreases: { wisdom: 1 },
      statIncreases: { hp: 1, maxHp: 1 },
      adultAge: 50,
      maxAge: 350,
      speed: 25,
      size: "Medium",
      alignment: "Lawful",
      parentRace: { connect: { id: dwarf.id } },
    },
  });

  const mountainDwarf = await prisma.subrace.create({
    data: {
      name: "Mountain Dwarf",
      abilityScoreIncreases: { strength: 2 },
      statIncreases: {},
      adultAge: 50,
      maxAge: 350,
      speed: 25,
      size: "Medium",
      alignment: "Lawful",
      proficiencies: ["Light Armor", "Medium Armor"],
      parentRace: { connect: { id: dwarf.id } },
    },
  });

  const elf = await prisma.race.create({
    data: {
      name: "Elf",
      abilityScoreIncreases: { dexterity: 2 },
      statIncreases: {},
      adultAge: 100,
      maxAge: 750,
      alignment: "Chaotic Good",
      size: "Medium",
      speed: 30,
      proficiencies: ["Perception"],
      resistances: ["Sleep"],
      advantages: ["Charmed"],
      raceDislikes: ["Dwarf", "Halfling", "Human"],
      languages: {
        connect: [{ name: "Common" }, { name: "Elvish" }],
      },
      senses: {
        connect: [{ name: "Darkvision" }],
      },
      skills: {
        connect: { name: "Trance" },
      },
    },
  });

  const highElf = await prisma.subrace.create({
    data: {
      name: "High Elf",
      abilityScoreIncreases: { intelligence: 1 },
      statIncreases: {},
      adultAge: 100,
      maxAge: 750,
      speed: 30,
      size: "Medium",
      alignment: "Chaotic Good",
      proficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
      parentRace: { connect: { id: elf.id } },
    },
  });

  const woodElf = await prisma.subrace.create({
    data: {
      name: "Wood Elf",
      abilityScoreIncreases: { wisdom: 1 },
      statIncreases: {},
      adultAge: 100,
      maxAge: 750,
      speed: 35,
      size: "Medium",
      alignment: "Chaotic Good",
      proficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
      parentRace: { connect: { id: elf.id } },
      skills: {
        connect: { name: "Mask of the Wild" },
      },
    },
  });

  const drow = await prisma.subrace.create({
    data: {
      name: "Dark Elf",
      abilityScoreIncreases: { charisma: 1 },
      statIncreases: {},
      adultAge: 100,
      maxAge: 750,
      speed: 30,
      size: "Medium",
      alignment: "Chaotic Evil",
      proficiencies: ["Rapier", "Shortsword", "Hand Crossbow"],
      disadvantages: ["Sunlight"],
      parentRace: { connect: { id: elf.id } },
      senses: {
        connect: [{ name: "Superior Darkvision" }],
      },
      spells: {
        connect: { name: "Dancing Lights" },
      },
    },
  });

  const halfling = await prisma.race.create({
    data: {
      name: "Halfling",
      abilityScoreIncreases: { dexterity: 2 },
      statIncreases: {},
      adultAge: 20,
      maxAge: 150,
      alignment: "Lawful Good",
      size: "Small",
      speed: 25,
      proficiencies: [],
      resistances: [],
      advantages: ["Frightened"],
      raceDislikes: ["Dwarf", "Elf", "Human"],
      languages: {
        connect: [{ name: "Common" }, { name: "Halfling" }],
      },
      skills: {
        connect: [{ name: "Lucky" }, { name: "Halfling Nimbleness" }],
      },
    },
  });

  const lightfoot = await prisma.subrace.create({
    data: {
      name: "Lightfoot",
      abilityScoreIncreases: { charisma: 1 },
      statIncreases: {},
      adultAge: 20,
      maxAge: 150,
      speed: 25,
      size: "Small",
      alignment: "Lawful Good",
      proficiencies: [],
      parentRace: { connect: { id: halfling.id } },
      skills: {
        connect: { name: "Natural Stealthy" },
      },
    },
  });

  const stout = await prisma.subrace.create({
    data: {
      name: "Stout",
      abilityScoreIncreases: { constitution: 1 },
      statIncreases: {},
      adultAge: 20,
      maxAge: 150,
      speed: 25,
      size: "Small",
      alignment: "Lawful Good",
      proficiencies: [],
      resistances: ["Poison"],
      advantages: ["Poison"],
      parentRace: { connect: { id: halfling.id } },
    },
  });

  const human = await prisma.race.create({
    data: {
      name: "Human",
      abilityScoreIncreases: {
        strength: 1,
        constitution: 1,
        dexterity: 1,
        wisdom: 1,
        intelligence: 1,
        charisma: 1,
      },
      statIncreases: {},
      adultAge: 18,
      maxAge: 95,
      alignment: "Neutral",
      size: "Medium",
      speed: 30,
      proficiencies: [],
      resistances: [],
      advantages: [],
      raceDislikes: ["Dwarf", "Elf", "Halfling"],
      languages: {
        connect: { name: "Common" },
      },
    },
  });

  const dragonborn = await prisma.race.create({
    data: {
      name: "Dragonborn",
      abilityScoreIncreases: { strength: 2, charisma: 1 },
      statIncreases: {},
      adultAge: 15,
      maxAge: 80,
      alignment: "Neutral",
      size: "Medium",
      speed: 30,
      proficiencies: [],
      resistances: [],
      advantages: [],
      raceDislikes: ["Dwarf", "Elf", "Halfling"],
      languages: {
        connect: [{ name: "Common" }, { name: "Draconic" }],
      },
    },
  });

  const gnome = await prisma.race.create({
    data: {
      name: "Gnome",
      abilityScoreIncreases: { intelligence: 2 },
      statIncreases: {},
      adultAge: 40,
      maxAge: 450,
      alignment: "Good",
      size: "Small",
      speed: 25,
      proficiencies: [],
      resistances: [],
      advantages: [],
      magicSavingThrows: ["Intelligence", "Wisdom", "Charisma"],
      raceDislikes: ["Dwarf", "Elf", "Halfling"],
      languages: {
        connect: [{ name: "Common" }, { name: "Gnomish" }],
      },
      senses: {
        connect: [{ name: "Darkvision" }],
      },
    },
  });

  const forestGnome = await prisma.subrace.create({
    data: {
      name: "Forest Gnome",
      abilityScoreIncreases: { dexterity: 1 },
      statIncreases: {},
      adultAge: 40,
      maxAge: 450,
      speed: 25,
      size: "Small",
      alignment: "Lawful Good",
      proficiencies: [],
      resistances: [],
      advantages: [],
      parentRace: { connect: { id: gnome.id } },
      spells: {
        connect: { name: "Minor Illusion" },
      },
      skills: {
        connect: { name: "Speak with Small Beasts" },
      },
    },
  });

  const rockGnome = await prisma.subrace.create({
    data: {
      name: "Rock Gnome",
      abilityScoreIncreases: { constitution: 1 },
      statIncreases: {},
      adultAge: 40,
      maxAge: 450,
      speed: 25,
      size: "Small",
      alignment: "Lawful Good",
      proficiencies: ["Tinker's Tools", "History"],
      resistances: [],
      advantages: [],
      parentRace: { connect: { id: gnome.id } },
      // spells: {
      //   connect: { name: 'Tinker' }
      // }
    },
  });

  const halfElf = await prisma.race.create({
    data: {
      name: "Half Elf",
      abilityScoreIncreases: { charisma: 2 },
      statIncreases: {},
      adultAge: 20,
      maxAge: 180,
      alignment: "Choatic Good",
      size: "Medium",
      speed: 30,
      proficiencies: [],
      resistances: ["Sleep"],
      advantages: ["Charmed"],
      magicSavingThrows: [],
      raceDislikes: ["Dwarf", "Elf", "Halfling"],
      languages: {
        connect: [{ name: "Common" }, { name: "Elvish" }],
      },
      senses: {
        connect: [{ name: "Darkvision" }],
      },
    },
  });

  const halfOrc = await prisma.race.create({
    data: {
      name: "Half Orc",
      abilityScoreIncreases: { strength: 2, constitution: 1 },
      statIncreases: {},
      adultAge: 14,
      maxAge: 75,
      alignment: "Choatic Evil",
      size: "Medium",
      speed: 30,
      proficiencies: ["Intimidation"],
      resistances: ["Sleep"],
      advantages: ["Charmed"],
      magicSavingThrows: [],
      raceDislikes: ["Dwarf", "Elf", "Halfling"],
      languages: {
        connect: [{ name: "Common" }, { name: "Orc" }],
      },
      senses: {
        connect: [{ name: "Darkvision" }],
      },
      skills: {
        connect: [{ name: "Relentless Endurance" }, { name: "Savage Attacks" }],
      },
    },
  });

  const tiefling = await prisma.race.create({
    data: {
      name: "Tiefling",
      abilityScoreIncreases: { intelligence: 1, charisma: 2 },
      statIncreases: {},
      adultAge: 18,
      maxAge: 110,
      alignment: "Choatic Neutral",
      size: "Medium",
      speed: 30,
      proficiencies: [],
      resistances: ["FIRE"],
      advantages: ["Charmed"],
      magicSavingThrows: [],
      raceDislikes: ["Dwarf", "Elf", "Halfling"],
      languages: {
        connect: [{ name: "Common" }, { name: "Infernal" }],
      },
      senses: {
        connect: [{ name: "Darkvision" }],
      },
      spells: {
        connect: { name: "Thaumaturgy" },
      },
    },
  });

  console.log("Races and subraces seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
