import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch all necessary languages
  const common = await prisma.language.findUnique({
    where: { name: 'Common' }
  });
  const dwarvish = await prisma.language.findUnique({
    where: { name: 'Dwarvish' }
  });
  const elvish = await prisma.language.findUnique({
    where: { name: 'Elvish' }
  });
  const halflingish = await prisma.language.findUnique({
    where: { name: 'Halfling' }
  });
  const draconic = await prisma.language.findUnique({
    where: { name: 'Draconic' }
  });
  const gnomish = await prisma.language.findUnique({
    where: { name: 'Gnomish' }
  });
  const orc = await prisma.language.findUnique({ where: { name: 'Orc' } });
  const infernal = await prisma.language.findUnique({
    where: { name: 'Infernal' }
  });

  // Fetch all necessary senses
  const darkvision = await prisma.sense.findUnique({
    where: { name: 'Darkvision' }
  });

  // Helper to get trait by name
  const getTraitId = async name => {
    const trait = await prisma.trait.findUnique({ where: { name } });
    return trait.id;
  };

  // Create Races
  const dwarf = await prisma.race.create({
    data: {
      name: 'Dwarf',
      abilityScoreIncreases: { CON: 2 },
      age: 'Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50. On average, they live about 350 years.',
      alignment:
        'Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.',
      size: 'Medium',
      speed: 25,
      languages: {
        create: [
          { language: { connect: { id: common.id } } },
          { language: { connect: { id: dwarvish.id } } }
        ]
      },
      senses: {
        create: { sense: { connect: { id: darkvision.id } } }
      },
      racialTraits: {
        create: [
          {
            trait: { connect: { id: await getTraitId('Dwarven Resilience') } }
          },
          { trait: { connect: { id: await getTraitId('Stonecunning') } } }
        ]
      }
    }
  });

  const hillDwarf = await prisma.subrace.create({
    data: {
      name: 'Hill Dwarf',
      abilityScoreIncreases: { WIS: 1 },
      parentRace: { connect: { id: dwarf.id } },
      traits: {
        create: [
          { trait: { connect: { id: await getTraitId('Dwarven Toughness') } } }
        ]
      }
    }
  });

  const mountainDwarf = await prisma.subrace.create({
    data: {
      name: 'Mountain Dwarf',
      abilityScoreIncreases: { STR: 2 },
      parentRace: { connect: { id: dwarf.id } },
      traits: {
        create: [
          {
            trait: {
              connect: { id: await getTraitId('Dwarven Armor Training') }
            }
          }
        ]
      }
    }
  });

  const elf = await prisma.race.create({
    data: {
      name: 'Elf',
      abilityScoreIncreases: { DEX: 2 },
      age: 'Elves mature physically at the same rate as humans, but they reach adulthood around the age of 100 and can live to be 750 years old.',
      alignment:
        'Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others’ freedom as well as their own, and they are more often good than not.',
      size: 'Medium',
      speed: 30,
      languages: {
        create: [
          { language: { connect: { id: common.id } } },
          { language: { connect: { id: elvish.id } } }
        ]
      },
      senses: {
        create: { sense: { connect: { id: darkvision.id } } }
      },
      racialTraits: {
        create: [
          { trait: { connect: { id: await getTraitId('Fey Ancestry') } } },
          { trait: { connect: { id: await getTraitId('Keen Senses') } } },
          { trait: { connect: { id: await getTraitId('Trance') } } }
        ]
      }
    }
  });

  const highElf = await prisma.subrace.create({
    data: {
      name: 'High Elf',
      abilityScoreIncreases: { INT: 1 },
      parentRace: { connect: { id: elf.id } },
      traits: {
        create: [
          {
            trait: { connect: { id: await getTraitId('Elf Weapon Training') } }
          },
          { trait: { connect: { id: await getTraitId('Cantrip') } } },
          { trait: { connect: { id: await getTraitId('Extra Language') } } }
        ]
      }
    }
  });

  const woodElf = await prisma.subrace.create({
    data: {
      name: 'Wood Elf',
      abilityScoreIncreases: { WIS: 1 },
      parentRace: { connect: { id: elf.id } },
      traits: {
        create: [
          {
            trait: { connect: { id: await getTraitId('Elf Weapon Training') } }
          },
          { trait: { connect: { id: await getTraitId('Fleet of Foot') } } },
          { trait: { connect: { id: await getTraitId('Mask of the Wild') } } }
        ]
      }
    }
  });

  const drow = await prisma.subrace.create({
    data: {
      name: 'Dark Elf (Drow)',
      abilityScoreIncreases: { CHA: 1 },
      parentRace: { connect: { id: elf.id } },
      traits: {
        create: [
          {
            trait: { connect: { id: await getTraitId('Superior Darkvision') } }
          },
          {
            trait: { connect: { id: await getTraitId('Sunlight Sensitivity') } }
          },
          { trait: { connect: { id: await getTraitId('Drow Magic') } } },
          {
            trait: { connect: { id: await getTraitId('Drow Weapon Training') } }
          }
        ]
      }
    }
  });

  const halfling = await prisma.race.create({
    data: {
      name: 'Halfling',
      abilityScoreIncreases: { DEX: 2 },
      age: 'Halflings reach adulthood at age 20 and generally live into the middle of their second century.',
      alignment:
        'Most halflings are lawful good. They are kind, good-hearted, and hate to see others in pain. They have no tolerance for oppression.',
      size: 'Small',
      speed: 25,
      languages: {
        create: [
          { language: { connect: { id: common.id } } },
          { language: { connect: { id: halflingish.id } } }
        ]
      },
      racialTraits: {
        create: [
          { trait: { connect: { id: await getTraitId('Lucky') } } },
          { trait: { connect: { id: await getTraitId('Brave') } } },
          {
            trait: { connect: { id: await getTraitId('Halfling Nimbleness') } }
          }
        ]
      }
    }
  });

  const lightfoot = await prisma.subrace.create({
    data: {
      name: 'Lightfoot',
      abilityScoreIncreases: { CHA: 1 },
      parentRace: { connect: { id: halfling.id } },
      traits: {
        create: [
          { trait: { connect: { id: await getTraitId('Naturally Stealthy') } } }
        ]
      }
    }
  });

  const stout = await prisma.subrace.create({
    data: {
      name: 'Stout',
      abilityScoreIncreases: { CON: 1 },
      parentRace: { connect: { id: halfling.id } },
      traits: {
        create: [
          { trait: { connect: { id: await getTraitId('Stout Resilience') } } }
        ]
      }
    }
  });

  const human = await prisma.race.create({
    data: {
      name: 'Human',
      abilityScoreIncreases: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
      age: 'Humans reach adulthood in their late teens and live less than a century.',
      alignment:
        'Humans tend toward no particular alignment. The best and the worst are found among them.',
      size: 'Medium',
      speed: 30,
      languages: {
        create: [{ language: { connect: { id: common.id } } }]
      },
      racialTraits: {
        create: [
          {
            trait: {
              connect: { id: await getTraitId('Extra Language (Human)') }
            }
          }
        ]
      }
    }
  });

  const dragonborn = await prisma.race.create({
    data: {
      name: 'Dragonborn',
      abilityScoreIncreases: { STR: 2, CHA: 1 },
      age: 'Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.',
      alignment:
        'Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil.',
      size: 'Medium',
      speed: 30,
      languages: {
        create: [
          { language: { connect: { id: common.id } } },
          { language: { connect: { id: draconic.id } } }
        ]
      },
      racialTraits: {
        create: [
          { trait: { connect: { id: await getTraitId('Draconic Ancestry') } } },
          { trait: { connect: { id: await getTraitId('Breath Weapon') } } },
          { trait: { connect: { id: await getTraitId('Damage Resistance') } } }
        ]
      }
    }
  });

  const gnome = await prisma.race.create({
    data: {
      name: 'Gnome',
      abilityScoreIncreases: { INT: 2 },
      age: 'Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.',
      alignment:
        'Gnomes are most often good. Those who tend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who tend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.',
      size: 'Small',
      speed: 25,
      languages: {
        create: [
          { language: { connect: { id: common.id } } },
          { language: { connect: { id: gnomish.id } } }
        ]
      },
      senses: {
        create: { sense: { connect: { id: darkvision.id } } }
      },
      racialTraits: {
        create: [
          { trait: { connect: { id: await getTraitId('Gnome Cunning') } } }
        ]
      }
    }
  });

  const forestGnome = await prisma.subrace.create({
    data: {
      name: 'Forest Gnome',
      abilityScoreIncreases: { DEX: 1 },
      parentRace: { connect: { id: gnome.id } },
      traits: {
        create: [
          {
            trait: { connect: { id: await getTraitId('Natural Illusionist') } }
          },
          {
            trait: {
              connect: { id: await getTraitId('Speak with Small Beasts') }
            }
          }
        ]
      }
    }
  });

  const rockGnome = await prisma.subrace.create({
    data: {
      name: 'Rock Gnome',
      abilityScoreIncreases: { CON: 1 },
      parentRace: { connect: { id: gnome.id } },
      traits: {
        create: [
          { trait: { connect: { id: await getTraitId('Artificer’s Lore') } } },
          { trait: { connect: { id: await getTraitId('Tinker') } } }
        ]
      }
    }
  });

  const halfElf = await prisma.race.create({
    data: {
      name: 'Half-Elf',
      abilityScoreIncreases: { CHA: 2 },
      age: 'Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.',
      alignment:
        'Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers.',
      size: 'Medium',
      speed: 30,
      languages: {
        create: [
          { language: { connect: { id: common.id } } },
          { language: { connect: { id: elvish.id } } }
        ]
      },
      racialTraits: {
        create: [
          { trait: { connect: { id: await getTraitId('Darkvision') } } },
          { trait: { connect: { id: await getTraitId('Fey Ancestry') } } },
          { trait: { connect: { id: await getTraitId('Skill Versatility') } } }
        ]
      }
    }
  });

  const halfOrc = await prisma.race.create({
    data: {
      name: 'Half-Orc',
      abilityScoreIncreases: { STR: 2, CON: 1 },
      age: 'Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.',
      alignment:
        'Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good. They tend to be strong-willed and self-reliant.',
      size: 'Medium',
      speed: 30,
      languages: {
        create: [
          { language: { connect: { id: common.id } } },
          { language: { connect: { id: orc.id } } }
        ]
      },
      racialTraits: {
        create: [
          { trait: { connect: { id: await getTraitId('Darkvision') } } },
          { trait: { connect: { id: await getTraitId('Menacing') } } },
          {
            trait: { connect: { id: await getTraitId('Relentless Endurance') } }
          },
          { trait: { connect: { id: await getTraitId('Savage Attacks') } } }
        ]
      }
    }
  });

  const tiefling = await prisma.race.create({
    data: {
      name: 'Tiefling',
      abilityScoreIncreases: { CHA: 2, INT: 1 },
      age: 'Tieflings mature at the same rate as humans but live a few years longer.',
      alignment:
        'Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not, an independent nature inclines many tieflings toward a chaotic alignment.',
      size: 'Medium',
      speed: 30,
      languages: {
        create: [
          { language: { connect: { id: common.id } } },
          { language: { connect: { id: infernal.id } } }
        ]
      },
      senses: {
        create: { sense: { connect: { id: darkvision.id } } }
      },
      racialTraits: {
        create: [
          {
            trait: { connect: { id: await getTraitId('Hellish Resistance') } }
          },
          { trait: { connect: { id: await getTraitId('Infernal Legacy') } } }
        ]
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
