import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// List of all D&D 5e traits
async function main() {
  // Create Traits
  await prisma.trait.createMany({
    data: [
      {
        name: 'Dwarven Resilience',
        description:
          'Advantage on saving throws against poison, and resistance against poison damage.'
      },
      {
        name: 'Stonecunning',
        description:
          'Proficiency in Intelligence (History) checks related to the origin of stonework; double proficiency bonus on such checks.'
      },
      {
        name: 'Dwarven Toughness',
        description:
          'Hit point maximum increases by 1, and increases by 1 every level.'
      },
      {
        name: 'Dwarven Armor Training',
        description: 'Proficiency with light and medium armor.'
      },
      {
        name: 'Fey Ancestry',
        description:
          'Advantage on saving throws against being charmed, and magic can’t put you to sleep.'
      },
      {
        name: 'Keen Senses',
        description: 'Proficiency in the Perception skill.'
      },
      {
        name: 'Trance',
        description:
          'Elves don’t need to sleep; they meditate deeply for 4 hours a day.'
      },
      {
        name: 'Elf Weapon Training',
        description:
          'Proficiency with the longsword, shortsword, shortbow, and longbow.'
      },
      {
        name: 'Cantrip',
        description:
          'Know one cantrip of choice from the wizard spell list. Intelligence is the spellcasting ability.'
      },
      {
        name: 'Extra Language',
        description: 'Speak, read, and write one extra language of choice.'
      },
      {
        name: 'Fleet of Foot',
        description: 'Base walking speed increases to 35 feet.'
      },
      {
        name: 'Mask of the Wild',
        description:
          'Can attempt to hide even when lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.'
      },
      {
        name: 'Superior Darkvision',
        description: 'Darkvision with a radius of 120 feet.'
      },
      {
        name: 'Sunlight Sensitivity',
        description:
          'Disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when in direct sunlight.'
      },
      {
        name: 'Drow Magic',
        description:
          'Know the dancing lights cantrip. At 3rd level, can cast faerie fire spell once per day. At 5th level, can cast darkness spell once per day. Charisma is the spellcasting ability.'
      },
      {
        name: 'Drow Weapon Training',
        description:
          'Proficiency with rapiers, shortswords, and hand crossbows.'
      },
      {
        name: 'Lucky',
        description:
          'Reroll a 1 on the d20 for an attack roll, ability check, or saving throw, and must use the new roll.'
      },
      {
        name: 'Brave',
        description: 'Advantage on saving throws against being frightened.'
      },
      {
        name: 'Halfling Nimbleness',
        description:
          'Can move through the space of any creature that is of a size larger.'
      },
      {
        name: 'Naturally Stealthy',
        description:
          'Can attempt to hide when only obscured by a creature at least one size larger.'
      },
      {
        name: 'Stout Resilience',
        description:
          'Advantage on saving throws against poison, and resistance against poison damage.'
      },
      {
        name: 'Darkvision',
        description:
          'Superior vision in dark and dim conditions. Can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light.'
      },
      {
        name: 'Menacing',
        description: 'Proficiency in the Intimidation skill.'
      },
      {
        name: 'Relentless Endurance',
        description:
          'When reduced to 0 hit points but not killed outright, can drop to 1 hit point instead. Can’t use this feature again until a long rest.'
      },
      {
        name: 'Savage Attacks',
        description:
          'When scoring a critical hit with a melee weapon attack, roll one of the weapon’s damage dice one additional time and add it to the extra damage.'
      },
      {
        name: 'Draconic Ancestry',
        description:
          'Draconic ancestry determines the breath weapon and damage resistance.'
      },
      {
        name: 'Breath Weapon',
        description:
          'Use action to exhale destructive energy. The type is determined by draconic ancestry.'
      },
      {
        name: 'Damage Resistance',
        description:
          'Resistance to the damage type associated with draconic ancestry.'
      },
      {
        name: 'Gnome Cunning',
        description:
          'Advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.'
      },
      {
        name: 'Natural Illusionist',
        description:
          'Know the minor illusion cantrip. Intelligence is the spellcasting ability.'
      },
      {
        name: 'Speak with Small Beasts',
        description:
          'Can communicate simple ideas with Small or smaller beasts.'
      },
      {
        name: 'Artificer’s Lore',
        description:
          'Double proficiency bonus on Intelligence (History) checks related to magic items, alchemical objects, or technological devices.'
      },
      {
        name: 'Tinker',
        description:
          'Proficiency with artisan’s tools (tinker’s tools). Using them, can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp).'
      },
      { name: 'Hellish Resistance', description: 'Resistance to fire damage.' },
      {
        name: 'Infernal Legacy',
        description:
          'Know the thaumaturgy cantrip. At 3rd level, can cast hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so after a long rest. At 5th level, can cast darkness spell once with this trait and regain the ability to do so after a long rest. Charisma is the spellcasting ability.'
      },
      {
        name: 'Extra Language (Human)',
        description: 'Speak, read, and write one extra language of choice.'
      },
      {
        name: 'Skill Versatility',
        description: 'Gain proficiency in two skills of choice.'
      }
    ]
  });

  console.log('Traits seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
