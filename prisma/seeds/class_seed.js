import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// List of all D&D 5e classes
async function getSpellIdsByNames(names) {
  const spells = await prisma.spell.findMany({
    where: {
      name: { in: names }
    },
    select: { id: true }
  });
  return spells.map(spell => spell.id);
}

async function main() {
  const classes = [
    {
      name: 'Barbarian',
      hitDice: '1d12',
      primaryAbility: 'Strength',
      savingThrows: ['Strength', 'Constitution'],
      proficiencies: [
        'Armor: Light armor, medium armor, shields',
        'Weapons: Simple weapons, martial weapons',
        'Tools: None',
        'Skills: Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival'
      ],
      spellcasting: false,
      spellSlots: null,
      spellNames: []
    },
    {
      name: 'Bard',
      hitDice: '1d8',
      primaryAbility: 'Charisma',
      savingThrows: ['Dexterity', 'Charisma'],
      proficiencies: [
        'Armor: Light armor',
        'Weapons: Simple weapons, hand crossbows, longswords, rapiers, shortswords',
        'Tools: Three musical instruments of your choice',
        'Skills: Choose any three'
      ],
      spellcasting: true,
      spellSlots: {
        1: [2, 4],
        2: [2, 3],
        3: [2, 3, 2],
        4: [2, 3, 3],
        5: [2, 3, 3, 1],
        6: [2, 3, 3, 2],
        7: [2, 3, 3, 3, 1],
        8: [2, 3, 3, 3, 2],
        9: [2, 3, 3, 3, 3, 1],
        10: [2, 3, 3, 3, 3, 2],
        11: [2, 3, 3, 3, 3, 2, 1],
        12: [2, 3, 3, 3, 3, 2, 1],
        13: [2, 3, 3, 3, 3, 2, 1, 1],
        14: [2, 3, 3, 3, 3, 2, 1, 1],
        15: [2, 3, 3, 3, 3, 2, 1, 1, 1],
        16: [2, 3, 3, 3, 3, 2, 1, 1, 1],
        17: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1],
        19: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1],
        20: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1]
      },
      spellNames: [
        'Vicious Mockery',
        'Healing Word',
        'Cure Wounds',
        'Disguise Self',
        'Detect Magic',
        'Identify',
        'Lesser Restoration',
        'Shatter',
        'Silence',
        'Dimension Door',
        'Polymorph',
        'Greater Invisibility',
        'Hold Monster',
        'True Polymorph'
      ]
    },
    {
      name: 'Cleric',
      hitDice: '1d8',
      primaryAbility: 'Wisdom',
      savingThrows: ['Wisdom', 'Charisma'],
      proficiencies: [
        'Armor: Light armor, medium armor, shields',
        'Weapons: Simple weapons',
        'Tools: None',
        'Skills: Choose two from History, Insight, Medicine, Persuasion, and Religion'
      ],
      spellcasting: true,
      spellSlots: {
        1: [2, 3],
        2: [2, 3],
        3: [2, 3, 2],
        4: [2, 3, 3],
        5: [2, 3, 3, 1],
        6: [2, 3, 3, 2],
        7: [2, 3, 3, 3, 1],
        8: [2, 3, 3, 3, 2],
        9: [2, 3, 3, 3, 3, 1],
        10: [2, 3, 3, 3, 3, 2],
        11: [2, 3, 3, 3, 3, 2, 1],
        12: [2, 3, 3, 3, 3, 2, 1],
        13: [2, 3, 3, 3, 3, 2, 1, 1],
        14: [2, 3, 3, 3, 3, 2, 1, 1],
        15: [2, 3, 3, 3, 3, 2, 1, 1, 1],
        16: [2, 3, 3, 3, 3, 2, 1, 1, 1],
        17: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1],
        19: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1],
        20: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1]
      },
      spellNames: [
        'Sacred Flame',
        'Bless',
        'Cure Wounds',
        'Detect Magic',
        'Guiding Bolt',
        'Lesser Restoration',
        'Spiritual Weapon',
        'Dispel Magic',
        'Spirit Guardians',
        'Revive',
        'Greater Restoration',
        'Flame Strike',
        'Blade Barrier'
      ]
    },
    {
      name: 'Druid',
      hitDice: '1d8',
      primaryAbility: 'Wisdom',
      savingThrows: ['Intelligence', 'Wisdom'],
      proficiencies: [
        'Armor: Light armor, medium armor, shields (druids will not wear armor or use shields made of metal)',
        'Weapons: Clubs, daggers, darts, javelins, maces, quarterstaffs, scimitars, sickles, slings, spears',
        'Tools: Herbalism kit',
        'Skills: Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival'
      ],
      spellcasting: true,
      spellSlots: {
        1: [2, 2],
        2: [2, 3],
        3: [2, 3, 2],
        4: [2, 3, 3],
        5: [2, 3, 3, 1],
        6: [2, 3, 3, 2],
        7: [2, 3, 3, 3, 1],
        8: [2, 3, 3, 3, 2],
        9: [2, 3, 3, 3, 3, 1],
        10: [2, 3, 3, 3, 3, 2],
        11: [2, 3, 3, 3, 3, 2, 1],
        12: [2, 3, 3, 3, 3, 2, 1],
        13: [2, 3, 3, 3, 3, 2, 1, 1],
        14: [2, 3, 3, 3, 3, 2, 1, 1],
        15: [2, 3, 3, 3, 3, 2, 1, 1, 1],
        16: [2, 3, 3, 3, 3, 2, 1, 1, 1],
        17: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1],
        19: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1],
        20: [2, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1]
      },
      spellNames: [
        'Produce Flame',
        'Entangle',
        'Cure Wounds',
        'Detect Magic',
        'Moonbeam',
        'Lesser Restoration',
        'Call Lightning',
        'Dispel Magic',
        'Polymorph',
        'Reincarnate',
        'Heal',
        'Fire Storm',
        'Earthquake'
      ]
    },
    {
      name: 'Fighter',
      hitDice: '1d10',
      primaryAbility: 'Strength or Dexterity',
      savingThrows: ['Strength', 'Constitution'],
      proficiencies: [
        'Armor: All armor, shields',
        'Weapons: Simple weapons, martial weapons',
        'Tools: None',
        'Skills: Choose two skills from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival'
      ],
      spellcasting: false,
      spellSlots: null,
      spellNames: []
    },
    {
      name: 'Monk',
      hitDice: '1d8',
      primaryAbility: 'Dexterity and Wisdom',
      savingThrows: ['Strength', 'Dexterity'],
      proficiencies: [
        'Armor: None',
        'Weapons: Simple weapons, shortswords',
        "Tools: Choose one type of artisan's tools or one musical instrument",
        'Skills: Choose two from Acrobatics, Athletics, History, Insight, Religion, and Stealth'
      ],
      spellcasting: false,
      spellSlots: null,
      spellNames: []
    },
    {
      name: 'Paladin',
      hitDice: '1d10',
      primaryAbility: 'Strength and Charisma',
      savingThrows: ['Wisdom', 'Charisma'],
      proficiencies: [
        'Armor: All armor, shields',
        'Weapons: Simple weapons, martial weapons',
        'Tools: None',
        'Skills: Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion'
      ],
      spellcasting: true,
      spellSlots: {
        1: [2],
        2: [3],
        3: [2, 3],
        4: [2, 3],
        5: [2, 3, 2],
        6: [2, 3, 3],
        7: [2, 3, 3],
        8: [2, 3, 3, 1],
        9: [2, 3, 3, 1],
        10: [2, 3, 3, 2],
        11: [2, 3, 3, 2],
        12: [2, 3, 3, 3],
        13: [2, 3, 3, 3],
        14: [2, 3, 3, 3],
        15: [2, 3, 3, 3, 1],
        16: [2, 3, 3, 3, 1],
        17: [2, 3, 3, 3, 2],
        18: [2, 3, 3, 3, 2],
        19: [2, 3, 3, 3, 2],
        20: [2, 3, 3, 3, 2]
      },
      spellNames: [
        'Divine Favor',
        'Shield of Faith',
        'Cure Wounds',
        'Detect Magic',
        'Lesser Restoration',
        'Zone of Truth',
        'Aura of Vitality',
        'Dispel Magic',
        'Banishment',
        'Find Greater Steed',
        'Destructive Wave',
        'Banishing Smite',
        'Holy Weapon'
      ]
    },
    {
      name: 'Ranger',
      hitDice: '1d10',
      primaryAbility: 'Dexterity and Wisdom',
      savingThrows: ['Strength', 'Dexterity'],
      proficiencies: [
        'Armor: Light armor, medium armor, shields',
        'Weapons: Simple weapons, martial weapons',
        'Tools: None',
        'Skills: Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival'
      ],
      spellcasting: true,
      spellSlots: {
        1: [2],
        2: [3],
        3: [3],
        4: [3],
        5: [3],
        6: [1, 3],
        7: [1, 3],
        8: [2, 3],
        9: [2, 3],
        10: [2, 3, 1],
        11: [2, 3, 1],
        12: [2, 3, 2],
        13: [2, 3, 2],
        14: [2, 3, 2, 1],
        15: [2, 3, 2, 1],
        16: [2, 3, 2, 2],
        17: [2, 3, 2, 2],
        18: [2, 3, 2, 2],
        19: [2, 3, 2, 2],
        20: [2, 3, 2, 2]
      },
      spellNames: [
        "Hunter's Mark",
        'Cure Wounds',
        'Detect Magic',
        'Goodberry',
        'Lesser Restoration',
        'Pass without Trace',
        'Conjure Animals',
        'Lightning Arrow',
        'Grasping Vine',
        'Conjure Volley',
        'Swift Quiver',
        'Tree Stride'
      ]
    },
    {
      name: 'Rogue',
      hitDice: '1d8',
      primaryAbility: 'Dexterity',
      savingThrows: ['Dexterity', 'Intelligence'],
      proficiencies: [
        'Armor: Light armor',
        'Weapons: Simple weapons, hand crossbows, longswords, rapiers, shortswords',
        'Tools: Thieves’ tools',
        'Skills: Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth'
      ],
      spellcasting: false,
      spellSlots: null,
      spellNames: []
    },
    {
      name: 'Sorcerer',
      hitDice: '1d6',
      primaryAbility: 'Charisma',
      savingThrows: ['Constitution', 'Charisma'],
      proficiencies: [
        'Armor: None',
        'Weapons: Daggers, darts, slings, quarterstaffs, light crossbows',
        'Tools: None',
        'Skills: Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion'
      ],
      spellcasting: true,
      spellSlots: {
        1: [2],
        2: [3],
        3: [2, 3],
        4: [2, 3],
        5: [2, 3, 2],
        6: [2, 3, 3],
        7: [2, 3, 3, 1],
        8: [2, 3, 3, 2],
        9: [2, 3, 3, 3, 1],
        10: [2, 3, 3, 3, 2],
        11: [2, 3, 3, 3, 2, 1],
        12: [2, 3, 3, 3, 2, 1],
        13: [2, 3, 3, 3, 2, 1, 1],
        14: [2, 3, 3, 3, 2, 1, 1],
        15: [2, 3, 3, 3, 2, 1, 1, 1],
        16: [2, 3, 3, 3, 2, 1, 1, 1],
        17: [2, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [2, 3, 3, 3, 2, 1, 1, 1, 1],
        19: [2, 3, 3, 3, 2, 1, 1, 1, 1, 1],
        20: [2, 3, 3, 3, 2, 1, 1, 1, 1, 1]
      },
      spellNames: [
        'Fire Bolt',
        'Mage Hand',
        'Magic Missile',
        'Shield',
        'Chromatic Orb',
        'Scorching Ray',
        'Invisibility',
        'Fireball',
        'Counterspell',
        'Fly',
        'Wall of Fire',
        'Greater Invisibility',
        'Disintegrate',
        'Finger of Death',
        'Wish'
      ]
    },
    {
      name: 'Warlock',
      hitDice: '1d8',
      primaryAbility: 'Charisma',
      savingThrows: ['Wisdom', 'Charisma'],
      proficiencies: [
        'Armor: Light armor',
        'Weapons: Simple weapons',
        'Tools: None',
        'Skills: Choose two skills from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion'
      ],
      spellcasting: true,
      spellSlots: {
        1: [1],
        2: [2],
        3: [2],
        4: [2],
        5: [3],
        6: [3],
        7: [3],
        8: [3],
        9: [4],
        10: [4],
        11: [4],
        12: [4],
        13: [4],
        14: [4],
        15: [4],
        16: [4],
        17: [4],
        18: [4],
        19: [4],
        20: [4]
      },
      spellNames: [
        'Eldritch Blast',
        'Hex',
        'Armor of Agathys',
        'Charm Person',
        'Hold Person',
        'Counterspell',
        'Dispel Magic',
        'Hunger of Hadar',
        'Banishment',
        'Shadow of Moil',
        'Synaptic Static',
        'Hold Monster',
        'Circle of Death',
        'True Polymorph',
        'Power Word Kill'
      ]
    },
    {
      name: 'Wizard',
      hitDice: '1d6',
      primaryAbility: 'Intelligence',
      savingThrows: ['Intelligence', 'Wisdom'],
      proficiencies: [
        'Armor: None',
        'Weapons: Daggers, darts, slings, quarterstaffs, light crossbows',
        'Tools: None',
        'Skills: Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion'
      ],
      spellcasting: true,
      spellSlots: {
        1: [2],
        2: [3],
        3: [2, 3],
        4: [2, 3],
        5: [2, 3, 2],
        6: [2, 3, 3],
        7: [2, 3, 3, 1],
        8: [2, 3, 3, 2],
        9: [2, 3, 3, 3, 1],
        10: [2, 3, 3, 3, 2],
        11: [2, 3, 3, 3, 2, 1],
        12: [2, 3, 3, 3, 2, 1],
        13: [2, 3, 3, 3, 2, 1, 1],
        14: [2, 3, 3, 3, 2, 1, 1],
        15: [2, 3, 3, 3, 2, 1, 1, 1],
        16: [2, 3, 3, 3, 2, 1, 1, 1],
        17: [2, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [2, 3, 3, 3, 2, 1, 1, 1, 1],
        19: [2, 3, 3, 3, 2, 1, 1, 1, 1, 1],
        20: [2, 3, 3, 3, 2, 1, 1, 1, 1, 1]
      },
      spellNames: [
        'Fire Bolt',
        'Mage Hand',
        'Magic Missile',
        'Shield',
        'Burning Hands',
        'Misty Step',
        'Counterspell',
        'Fireball',
        'Fly',
        'Polymorph',
        'Wall of Force',
        'Disintegrate',
        'Teleport',
        'Meteor Swarm',
        'Wish'
      ]
    }
  ];

  for (const cls of classes) {
    const spellIds = await getSpellIdsByNames(cls.spellNames);
    const createdClass = await prisma.class.create({
      data: {
        name: cls.name,
        hitDice: cls.hitDice,
        primaryAbility: cls.primaryAbility,
        savingThrows: cls.savingThrows,
        proficiencies: cls.proficiencies,
        spellcasting: cls.spellcasting,
        spellSlots: cls.spellcasting ? cls.spellSlots : null,
        spells: {
          create: spellIds.map(spellId => ({
            spell: { connect: { id: spellId } }
          }))
        }
      }
    });
    console.log(`Created class: ${createdClass.name}`);
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
