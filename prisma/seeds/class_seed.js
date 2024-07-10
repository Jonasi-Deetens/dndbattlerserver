import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

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
  //BARBARIAN
  const barbarian = await prisma.class.create({
    data: {
      name: 'Barbarian',
      description:
        'A fierce warrior of primitive background who can enter a battle rage',
      hitDice: 'D12',
      proficiencies: [
        'Light Armor',
        'Medium Armor',
        'Shield',
        'Simple Weapon',
        'Martial Weapon'
      ],
      savingThrowProficiencies: ['STR', 'CON'],
      items: {
        connect: [
          // Add items appropriate for wizards here
        ]
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      numberOfRagesByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 3,
        4: 3,
        5: 3,
        6: 4,
        7: 4,
        8: 4,
        9: 4,
        10: 4,
        11: 4,
        12: 5,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: -1
      }),
      abilitiesByLevel: JSON.stringify({
        1: ['Rage']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'STR',
      pimarySpellAbilityScoreModifier: null,
      rageDamageByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 2,
        6: 2,
        7: 2,
        8: 2,
        9: 3,
        10: 3,
        11: 3,
        12: 3,
        13: 3,
        14: 3,
        15: 3,
        16: 4,
        17: 4,
        18: 4,
        19: 4,
        20: 4
      }),
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      spellSlotsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        1: ['Unarmored Defense'],
        2: ['Danger Sense', 'Reckless Attack'],
        5: ['Extra Attack', 'Fast Movement'],
        7: ['Feral Instinct'],
        9: ['Brutal Critical'],
        11: ['Relentless Rage'],
        15: ['Persistent Rage'],
        18: ['Indomitable Might']
      }),
      subClassAvailableAtLevel: 3,
      unusableItems: [],
      fightingStyles: [],
      movementSpeedBonusByLevel: JSON.stringify({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 10,
        6: 10,
        7: 10,
        8: 10,
        9: 10,
        10: 15,
        11: 15,
        12: 15,
        13: 15,
        14: 15,
        15: 20,
        16: 20,
        17: 20,
        18: 20,
        19: 20,
        20: 20
      }),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: null,
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({}),
      spellsKnownByLevel: JSON.stringify({})
    }
  });

  const pathOfTheBerserker = await prisma.subclass.create({
    data: {
      name: 'Path of the Berserker',
      description:
        'A barbarian who embraces their rage in battle, becoming a savage warrior.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        3: ['Frenzy'],
        6: ['Mindless Rage']
      }),
      abilitiesByLevel: JSON.stringify({
        10: ['Intimidating Presence'],
        14: ['Retaliation']
      }),
      parentClass: {
        connect: { name: 'Barbarian' }
      }
    }
  });

  const pathOfTheTotemWarrior = await prisma.subclass.create({
    data: {
      name: 'Path of the Totem Warrior',
      description: 'A barbarian who draws power from totem spirits.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({
        3: ['Beast Sense', 'Speak with Animals'],
        10: ['Commune with Nature']
      }),
      skillsByLevel: JSON.stringify({}),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Barbarian' }
      }
    }
  });

  //BARD
  const bard = await prisma.class.create({
    data: {
      name: 'Bard',
      description:
        'An inspiring magician whose power echoes the music of creation',
      hitDice: 'D8',
      proficiencies: [
        'Light Armor',
        'Simple Weapon',
        'Hand Crossbow',
        'Longsword',
        'Rapier',
        'Shortsword'
      ],
      savingThrowProficiencies: ['DEX', 'CHA'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({
        1: ['Bardic Inspiration'],
        6: ['Countercharm']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'CHA',
      pimarySpellAbilityScoreModifier: 'CHA',
      rageDamageByLevel: JSON.stringify({}),
      spells: {
        connect: [
          { name: 'Charm Person' },
          { name: 'Comprehend Languages' },
          { name: 'Cure Wounds' },
          { name: 'Detect Magic' },
          { name: 'Disguise Self' },
          { name: 'Faerie Fire' },
          { name: 'Feather Fall' },
          { name: 'Healing Word' },
          { name: 'Identify' },
          { name: 'Illusory Script' },
          { name: 'Longstrider' },
          { name: 'Silent Image' },
          { name: 'Sleep' },
          { name: 'Speak with Animals' },
          { name: "Tasha's Hideous Laughter" },
          { name: 'Thunderwave' },
          { name: 'Unseen Servant' },
          { name: 'Animal Messenger' },
          { name: 'Blindness/Deafness' },
          { name: 'Calm Emotions' },
          { name: 'Cloud of Daggers' },
          { name: 'Crown of Madness' },
          { name: 'Detect Thoughts' },
          { name: 'Enhance Ability' },
          { name: 'Enthrall' },
          { name: 'Heat Metal' },
          { name: 'Hold Person' },
          { name: 'Invisibility' },
          { name: 'Knock' },
          { name: 'Lesser Restoration' },
          { name: 'Locate Animals or Plants' },
          { name: 'Locate Object' },
          { name: 'Magic Mouth' },
          { name: 'Phantasmal Force' },
          { name: 'See Invisibility' },
          { name: 'Shatter' },
          { name: 'Silence' },
          { name: 'Suggestion' },
          { name: 'Zone of Truth' },
          { name: 'Bestow Curse' },
          { name: 'Clairvoyance' },
          { name: 'Dispel Magic' },
          { name: 'Fear' },
          { name: 'Feign Death' },
          { name: 'Glyph of Warding' },
          { name: 'Hypnotic Pattern' },
          { name: "Leomund's Tiny Hut" },
          { name: 'Major Image' },
          { name: 'Nondetection' },
          { name: 'Plant Growth' },
          { name: 'Sending' },
          { name: 'Speak with Dead' },
          { name: 'Speak with Plants' },
          { name: 'Stinking Cloud' },
          { name: 'Tongues' },
          { name: 'Compulsion' },
          { name: 'Confusion' },
          { name: 'Dimension Door' },
          { name: 'Freedom of Movement' },
          { name: 'Greater Invisibility' },
          { name: 'Hallucinatory Terrain' },
          { name: 'Locate Creature' },
          { name: 'Polymorph' },
          { name: 'Animate Objects' },
          { name: 'Awaken' },
          { name: 'Dominate Person' },
          { name: 'Dream' },
          { name: 'Geas' },
          { name: 'Greater Restoration' },
          { name: 'Hold Monster' },
          { name: 'Legend Lore' },
          { name: 'Mass Cure Wounds' },
          { name: 'Mislead' },
          { name: 'Modify Memory' },
          { name: 'Planar Binding' },
          { name: 'Raise Dead' },
          { name: 'Scrying' },
          { name: 'Seeming' },
          { name: 'Teleportation Circle' },
          { name: 'Eyebite' },
          { name: 'Find the Path' },
          { name: "Heroes' Feast" },
          { name: 'Programmed Illusion' },
          { name: 'True Seeing' },
          { name: 'Etherealness' },
          { name: 'Forcecage' },
          { name: 'Mirage Arcane' },
          { name: "Mordenkainen's Magnificent Mansion" },
          { name: "Mordenkainen's Sword" },
          { name: 'Project Image' },
          { name: 'Regenerate' },
          { name: 'Resurrection' },
          { name: 'Symbol' },
          { name: 'Antipathy/Sympathy' },
          { name: 'Clone' },
          { name: 'Control Weather' },
          { name: 'Demiplane' },
          { name: 'Dominate Monster' },
          { name: 'Feeblemind' },
          { name: 'Glibness' },
          { name: 'Mind Blank' },
          { name: 'Power Word Stun' },
          { name: 'Foresight' },
          { name: 'Power Word Heal' },
          { name: 'Power Word Kill' },
          { name: 'True Polymorph' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: [
          'Charm Person',
          'Comprehend Languages',
          'Cure Wounds',
          'Detect Magic',
          'Disguise Self',
          'Faerie Fire',
          'Feather Fall',
          'Healing Word',
          'Identify',
          'Illusory Script',
          'Longstrider',
          'Silent Image',
          'Sleep',
          'Speak with Animals',
          "Tasha's Hideous Laughter",
          'Thunderwave',
          'Unseen Servant'
        ],
        2: [
          'Animal Messenger',
          'Blindness/Deafness',
          'Calm Emotions',
          'Cloud of Daggers',
          'Crown of Madness',
          'Detect Thoughts',
          'Enhance Ability',
          'Enthrall',
          'Heat Metal',
          'Hold Person',
          'Invisibility',
          'Knock',
          'Lesser Restoration',
          'Locate Animals or Plants',
          'Locate Object',
          'Magic Mouth',
          'Phantasmal Force',
          'See Invisibility',
          'Shatter',
          'Silence',
          'Suggestion',
          'Zone of Truth'
        ],
        3: [
          'Bestow Curse',
          'Clairvoyance',
          'Dispel Magic',
          'Fear',
          'Feign Death',
          'Glyph of Warding',
          'Hypnotic Pattern',
          "Leomund's Tiny Hut",
          'Major Image',
          'Nondetection',
          'Plant Growth',
          'Sending',
          'Speak with Dead',
          'Speak with Plants',
          'Stinking Cloud',
          'Tongues'
        ],
        4: [
          'Compulsion',
          'Confusion',
          'Dimension Door',
          'Freedom of Movement',
          'Greater Invisibility',
          'Hallucinatory Terrain',
          'Locate Creature',
          'Polymorph'
        ],
        5: [
          'Animate Objects',
          'Awaken',
          'Dominate Person',
          'Dream',
          'Geas',
          'Greater Restoration',
          'Hold Monster',
          'Legend Lore',
          'Mass Cure Wounds',
          'Mislead',
          'Modify Memory',
          'Planar Binding',
          'Raise Dead',
          'Scrying',
          'Seeming',
          'Teleportation Circle'
        ],
        6: [
          'Eyebite',
          'Find the Path',
          "Heroes' Feast",
          'Programmed Illusion',
          'True Seeing'
        ],
        7: [
          'Etherealness',
          'Forcecage',
          'Mirage Arcane',
          "Mordenkainen's Magnificent Mansion",
          "Mordenkainen's Sword",
          'Project Image',
          'Regenerate',
          'Resurrection',
          'Symbol'
        ],
        8: [
          'Antipathy/Sympathy',
          'Clone',
          'Control Weather',
          'Demiplane',
          'Dominate Monster',
          'Feeblemind',
          'Glibness',
          'Mind Blank',
          'Power Word Stun'
        ],
        9: ['Foresight', 'Power Word Heal', 'Power Word Kill', 'True Polymorph']
      }),
      spellSlotsByLevel: JSON.stringify({
        1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
        11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
        19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
        20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
      }),
      skillsByLevel: JSON.stringify({
        2: ['Jack of All Trades', 'Song of Rest'],
        5: ['Font of Inspiration'],
        20: ['Superior Inspiration']
      }),
      subClassAvailableAtLevel: 3,
      unusableItems: [],
      fightingStyles: [],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: JSON.stringify({}),
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 3,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 3,
        10: 4,
        11: 4,
        12: 4,
        13: 4,
        14: 4,
        15: 4,
        16: 4,
        17: 4,
        18: 4,
        19: 4,
        20: 5
      }),
      spellsKnownByLevel: JSON.stringify({
        1: 4,
        2: 5,
        3: 6,
        4: 7,
        5: 8,
        6: 9,
        7: 10,
        8: 11,
        9: 12,
        10: 14,
        11: 15,
        13: 16,
        14: 18,
        15: 19,
        17: 20,
        18: 22,
        19: 22,
        20: 22
      })
    }
  });

  const collegeOfLore = await prisma.subclass.create({
    data: {
      name: 'College of Lore',
      description:
        'Bards who value knowledge and seek to uncover the secrets of the multiverse.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        3: ['Cutting Words'],
        14: ['Peerless Skill']
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Bard' }
      }
    }
  });

  const collegeOfValor = await prisma.subclass.create({
    data: {
      name: 'College of Valor',
      description:
        'Bards who are inspired by the heroic deeds and seek to emulate their bravery in battle.',
      proficiencies: ['Medium Armor', 'Shield', 'Martial Weapon'],
      savingThrowProficiencies: [],
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        3: ['Combat Inspiration'],
        6: ['Extra Attack'],
        14: ['Battle Magic']
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Bard' }
      }
    }
  });

  //CLERIC
  const cleric = await prisma.class.create({
    data: {
      name: 'Cleric',
      description:
        'A priestly champion who wields divine magic in service of a higher power',
      hitDice: 'D8',
      proficiencies: ['Light Armor', 'Medium Armor', 'Shield', 'Simple Weapon'],
      savingThrowProficiencies: ['WIS', 'CHA'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({
        2: ['Channel Divinity'],
        6: ['Channel Divinity: Turn Undead'],
        8: ['Divine Intervention']
      }),
      skillsByLevel: JSON.stringify({
        5: ['Destroy Undead']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'WIS',
      pimarySpellAbilityScoreModifier: 'WIS',
      subClassAvailableAtLevel: 1,
      unusableItems: [],
      fightingStyles: [],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: null,
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({
        1: 3,
        2: 3,
        3: 3,
        4: 4,
        5: 4,
        6: 4,
        7: 4,
        8: 4,
        9: 4,
        10: 5,
        11: 5,
        12: 5,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 5,
        18: 5,
        19: 5,
        20: 5
      }),
      spellsKnownByLevel: JSON.stringify({
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7,
        7: 8,
        8: 9,
        9: 10,
        10: 11,
        11: 12,
        12: 12,
        13: 13,
        14: 14,
        15: 15,
        16: 15,
        17: 16,
        18: 17,
        19: 18,
        20: 18
      }),
      spellSlotsByLevel: JSON.stringify({
        1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
        11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
        19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
        20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
      }),
      spells: {
        connect: [
          { name: 'Guidance' },
          { name: 'Light' },
          { name: 'Mending' },
          { name: 'Resistance' },
          { name: 'Sacred Flame' },
          { name: 'Spare the Dying' },
          { name: 'Thaumaturgy' },
          { name: 'Bless' },
          { name: 'Command' },
          { name: 'Create or Destroy Water' },
          { name: 'Cure Wounds' },
          { name: 'Detect Magic' },
          { name: 'Detect Poison and Disease' },
          { name: 'Guiding Bolt' },
          { name: 'Healing Word' },
          { name: 'Inflict Wounds' },
          { name: 'Protection from Evil and Good' },
          { name: 'Purify Food and Drink' },
          { name: 'Sanctuary' },
          { name: 'Shield of Faith' },
          { name: 'Aid' },
          { name: 'Augury' },
          { name: 'Blindness/Deafness' },
          { name: 'Calm Emotions' },
          { name: 'Continual Flame' },
          { name: 'Enhance Ability' },
          { name: 'Find Traps' },
          { name: 'Gentle Repose' },
          { name: 'Hold Person' },
          { name: 'Lesser Restoration' },
          { name: 'Locate Object' },
          { name: 'Prayer of Healing' },
          { name: 'Protection from Poison' },
          { name: 'Silence' },
          { name: 'Spiritual Weapon' },
          { name: 'Warding Bond' },
          { name: 'Beacon of Hope' },
          { name: 'Bestow Curse' },
          { name: 'Clairvoyance' },
          { name: 'Create Food and Water' },
          { name: 'Daylight' },
          { name: 'Dispel Magic' },
          { name: 'Feign Death' },
          { name: 'Glyph of Warding' },
          { name: 'Magic Circle' },
          { name: 'Mass Healing Word' },
          { name: 'Meld into Stone' },
          { name: 'Protection from Energy' },
          { name: 'Remove Curse' },
          { name: 'Revivify' },
          { name: 'Sending' },
          { name: 'Speak with Dead' },
          { name: 'Spirit Guardians' },
          { name: 'Tongues' },
          { name: 'Water Walk' },
          { name: 'Banishment' },
          { name: 'Control Water' },
          { name: 'Death Ward' },
          { name: 'Divination' },
          { name: 'Freedom of Movement' },
          { name: 'Guardian of Faith' },
          { name: 'Locate Creature' },
          { name: 'Stone Shape' },
          { name: 'Commune' },
          { name: 'Contagion' },
          { name: 'Dispel Evil and Good' },
          { name: 'Flame Strike' },
          { name: 'Greater Restoration' },
          { name: 'Hallow' },
          { name: 'Insect Plague' },
          { name: 'Legend Lore' },
          { name: 'Mass Cure Wounds' },
          { name: 'Planar Binding' },
          { name: 'Raise Dead' },
          { name: 'Scrying' },
          { name: 'Blade Barrier' },
          { name: 'Create Undead' },
          { name: 'Find the Path' },
          { name: 'Forbiddance' },
          { name: 'Harm' },
          { name: 'Heal' },
          { name: "Heroes' Feast" },
          { name: 'Planar Ally' },
          { name: 'True Seeing' },
          { name: 'Word of Recall' },
          { name: 'Conjure Celestial' },
          { name: 'Divine Word' },
          { name: 'Etherealness' },
          { name: 'Fire Storm' },
          { name: 'Plane Shift' },
          { name: 'Regenerate' },
          { name: 'Resurrection' },
          { name: 'Symbol' },
          { name: 'Astral Projection' },
          { name: 'Gate' },
          { name: 'Mass Heal' },
          { name: 'True Resurrection' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: [
          'Bless',
          'Command',
          'Create or Destroy Water',
          'Cure Wounds',
          'Detect Magic',
          'Detect Poison and Disease',
          'Guiding Bolt',
          'Healing Word',
          'Inflict Wounds',
          'Protection from Evil and Good',
          'Purify Food and Drink',
          'Sanctuary',
          'Shield of Faith'
        ],
        2: [
          'Aid',
          'Augury',
          'Blindness/Deafness',
          'Calm Emotions',
          'Continual Flame',
          'Enhance Ability',
          'Find Traps',
          'Gentle Repose',
          'Hold Person',
          'Lesser Restoration',
          'Locate Object',
          'Prayer of Healing',
          'Protection from Poison',
          'Silence',
          'Spiritual Weapon',
          'Warding Bond'
        ],
        3: [
          'Beacon of Hope',
          'Bestow Curse',
          'Clairvoyance',
          'Create Food and Water',
          'Daylight',
          'Dispel Magic',
          'Feign Death',
          'Glyph of Warding',
          'Magic Circle',
          'Mass Healing Word',
          'Meld into Stone',
          'Protection from Energy',
          'Remove Curse',
          'Revivify',
          'Sending',
          'Speak with Dead',
          'Spirit Guardians',
          'Tongues',
          'Water Walk'
        ],
        4: [
          'Banishment',
          'Control Water',
          'Death Ward',
          'Divination',
          'Freedom of Movement',
          'Guardian of Faith',
          'Locate Creature',
          'Stone Shape'
        ],
        5: [
          'Commune',
          'Contagion',
          'Dispel Evil and Good',
          'Flame Strike',
          'Greater Restoration',
          'Hallow',
          'Insect Plague',
          'Legend Lore',
          'Mass Cure Wounds',
          'Planar Binding',
          'Raise Dead',
          'Scrying'
        ],
        6: [
          'Blade Barrier',
          'Create Undead',
          'Find the Path',
          'Forbiddance',
          'Harm',
          'Heal',
          "Heroes' Feast",
          'Planar Ally',
          'True Seeing',
          'Word of Recall'
        ],
        7: [
          'Conjure Celestial',
          'Divine Word',
          'Etherealness',
          'Fire Storm',
          'Plane Shift',
          'Regenerate',
          'Resurrection',
          'Symbol'
        ],
        8: ['Astral Projection', 'Gate', 'Mass Heal', 'True Resurrection']
      })
    }
  });

  const knowledgeDomain = await prisma.subclass.create({
    data: {
      name: 'Knowledge Domain',
      description:
        'Clerics who value learning and understanding, often serving as scholars and sages.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Command' },
          { name: 'Identify' },
          { name: 'Augury' },
          { name: 'Suggestion' },
          { name: 'Nondetection' },
          { name: 'Speak with Dead' },
          { name: 'Arcane Eye' },
          { name: 'Confusion' },
          { name: 'Legend Lore' },
          { name: 'Scrying' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: ['Command', 'Identify'],
        3: ['Augury', 'Suggestion'],
        5: ['Nondetection', 'Speak with Dead'],
        7: ['Arcane Eye', 'Confusion'],
        9: ['Legend Lore', 'Scrying']
      }),
      skillsByLevel: JSON.stringify({
        8: ['Potent Spellcasting']
      }),
      abilitiesByLevel: JSON.stringify({
        1: ['Blessings of Knowledge'],
        2: ['Channel Divinity: Knowledge of the Ages'],
        6: ['Channel Divinity: Read Thoughts'],
        17: ['Visions of the Past']
      }),
      parentClass: {
        connect: { name: 'Cleric' }
      }
    }
  });

  const lifeDomain = await prisma.subclass.create({
    data: {
      name: 'Life Domain',
      description:
        'Clerics dedicated to preserving life and healing the wounded.',
      proficiencies: ['Heavy Armor'],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Bless' },
          { name: 'Cure Wounds' },
          { name: 'Lesser Restoration' },
          { name: 'Spiritual Weapon' },
          { name: 'Beacon of Hope' },
          { name: 'Revivify' },
          { name: 'Death Ward' },
          { name: 'Guardian of Faith' },
          { name: 'Mass Cure Wounds' },
          { name: 'Raise Dead' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: ['Bless', 'Cure Wounds'],
        3: ['Lesser Restoration', 'Spiritual Weapon'],
        5: ['Beacon of Hope', 'Revivify'],
        7: ['Death Ward', 'Guardian of Faith'],
        9: ['Mass Cure Wounds', 'Raise Dead']
      }),
      skillsByLevel: JSON.stringify({
        1: ['Disciple of Life'],
        6: ['Blessed Healer'],
        17: ['Supreme Healing']
      }),
      abilitiesByLevel: JSON.stringify({
        2: ['Channel Divinity: Preserve Life'],
        8: ['Divine Strike']
      }),
      parentClass: {
        connect: { name: 'Cleric' }
      }
    }
  });

  const lightDomain = await prisma.subclass.create({
    data: {
      name: 'Light Domain',
      description:
        'Clerics who worship gods of light and use their power to fight darkness and ignorance.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Burning Hands' },
          { name: 'Faerie Fire' },
          { name: 'Flaming Sphere' },
          { name: 'Scorching Ray' },
          { name: 'Daylight' },
          { name: 'Fireball' },
          { name: 'Guardian of Faith' },
          { name: 'Wall of Fire' },
          { name: 'Flame Strike' },
          { name: 'Scrying' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: ['Light', 'Burning Hands', 'Faerie Fire'],
        3: ['Flaming Sphere', 'Scorching Ray'],
        5: ['Daylight', 'Fireball'],
        7: ['Guardian of Faith', 'Wall of Fire'],
        9: ['Flame Strike', 'Scrying']
      }),
      skillsByLevel: JSON.stringify({
        6: ['Improved Flare'],
        8: ['Potent Spellcasting']
      }),
      abilitiesByLevel: JSON.stringify({
        1: ['Warding Flare'],
        2: ['Channel Divinity: Radiance of the Dawn'],
        17: ['Corona of Light']
      }),
      parentClass: {
        connect: { name: 'Cleric' }
      }
    }
  });

  const natureDomain = await prisma.subclass.create({
    data: {
      name: 'Nature Domain',
      description:
        'Clerics who revere nature and use their powers to protect and preserve it.',
      proficiencies: ['Heavy Armor'],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Animal Friendship' },
          { name: 'Speak with Animals' },
          { name: 'Barkskin' },
          { name: 'Spike Growth' },
          { name: 'Plant Growth' },
          { name: 'Wind Wall' },
          { name: 'Dominate Beast' },
          { name: 'Grasping Vine' },
          { name: 'Insect Plague' },
          { name: 'Tree Stride' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: ['Animal Friendship', 'Speak with Animals'],
        3: ['Barkskin', 'Spike Growth'],
        5: ['Plant Growth', 'Wind Wall'],
        7: ['Dominate Beast', 'Grasping Vine'],
        9: ['Insect Plague', 'Tree Stride']
      }),
      skillsByLevel: JSON.stringify({}),
      abilitiesByLevel: JSON.stringify({
        2: ['Channel Divinity: Charm Animals and Plants'],
        6: ['Dampen Elements'],
        8: ['Divine Strike'],
        17: ['Master of Nature']
      }),
      parentClass: {
        connect: { name: 'Cleric' }
      }
    }
  });

  const tempestDomain = await prisma.subclass.create({
    data: {
      name: 'Tempest Domain',
      description:
        'Clerics who worship gods of storms and use their powers to control the weather and the seas.',
      proficiencies: ['Martial Weapon', 'Heavy Armor'],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Fog Cloud' },
          { name: 'Thunderwave' },
          { name: 'Gust of Wind' },
          { name: 'Shatter' },
          { name: 'Call Lightning' },
          { name: 'Sleet Storm' },
          { name: 'Control Water' },
          { name: 'Ice Storm' },
          { name: 'Destructive Wave' },
          { name: 'Insect Plague' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: ['Fog Cloud', 'Thunderwave'],
        3: ['Gust of Wind', 'Shatter'],
        5: ['Call Lightning', 'Sleet Storm'],
        7: ['Control Water', 'Ice Storm'],
        9: ['Destructive Wave', 'Insect Plague']
      }),
      skillsByLevel: JSON.stringify({
        6: ['Thunderbolt Strike'],
        17: ['Stormborn']
      }),
      abilitiesByLevel: JSON.stringify({
        1: ['Wrath of the Storm'],
        2: ['Channel Divinity: Destructive Wrath'],
        8: ['Divine Strike']
      }),
      parentClass: {
        connect: { name: 'Cleric' }
      }
    }
  });

  const trickeryDomain = await prisma.subclass.create({
    data: {
      name: 'Trickery Domain',
      description:
        'Clerics who follow gods of mischief and deception, using their powers to sow chaos and confusion.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Charm Person' },
          { name: 'Disguise Self' },
          { name: 'Mirror Image' },
          { name: 'Pass Without Trace' },
          { name: 'Blink' },
          { name: 'Dispel Magic' },
          { name: 'Dimension Door' },
          { name: 'Polymorph' },
          { name: 'Dominate Person' },
          { name: 'Modify Memory' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: ['Charm Person', 'Disguise Self'],
        3: ['Mirror Image', 'Pass Without Trace'],
        5: ['Blink', 'Dispel Magic'],
        7: ['Dimension Door', 'Polymorph'],
        9: ['Dominate Person', 'Modify Memory']
      }),
      skillsByLevel: JSON.stringify({
        1: ['Blessing of the Trickster']
      }),
      abilitiesByLevel: JSON.stringify({
        2: ['Channel Divinity: Invoke Duplicity'],
        6: ['Channel Divinity: Cloak of Shadows'],
        8: ['Divine Strike'],
        17: ['Improved Duplicity']
      }),
      parentClass: {
        connect: { name: 'Cleric' }
      }
    }
  });

  const warDomain = await prisma.subclass.create({
    data: {
      name: 'War Domain',
      description:
        'Clerics who serve gods of war, wielding their divine power in battle.',
      proficiencies: ['Martial Weapon', 'Heavy Armor'],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Divine Favor' },
          { name: 'Shield of Faith' },
          { name: 'Magic Weapon' },
          { name: 'Spiritual Weapon' },
          { name: "Crusader's Mantle" },
          { name: 'Spirit Guardians' },
          { name: 'Freedom of Movement' },
          { name: 'Stoneskin' },
          { name: 'Flame Strike' },
          { name: 'Hold Monster' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: ['Divine Favor', 'Shield of Faith'],
        3: ['Magic Weapon', 'Spiritual Weapon'],
        5: ["Crusader's Mantle", 'Spirit Guardians'],
        7: ['Freedom of Movement', 'Stoneskin'],
        9: ['Flame Strike', 'Hold Monster']
      }),
      skillsByLevel: JSON.stringify({
        1: ['War Priest']
      }),
      abilitiesByLevel: JSON.stringify({
        2: ['Channel Divinity: Guided Strike'],
        6: ["Channel Divinity: War God's Blessing"],
        8: ['Divine Strike']
      }),
      parentClass: {
        connect: { name: 'Cleric' }
      }
    }
  });

  //DRUID
  const druid = await prisma.class.create({
    data: {
      name: 'Druid',
      description:
        'A priest of the Old Faith, wielding the powers of nature and adopting animal forms',
      hitDice: 'D8',
      proficiencies: [
        'Light Armor',
        'Medium Armor',
        'Shields',
        'Clubs',
        'Daggers',
        'Darts',
        'Javelins',
        'Maces',
        'Quarterstaffs',
        'Scimitars',
        'Sickles',
        'Slings',
        'Spears',
        'Herbalism Kit'
      ],
      savingThrowProficiencies: ['INT', 'WIS'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({
        2: ['Wild Shape']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'WIS',
      pimarySpellAbilityScoreModifier: 'WIS',
      rageDamageByLevel: JSON.stringify({}),
      spells: {
        connect: [
          { name: 'Animal Friendship' },
          { name: 'Create or Destroy Water' },
          { name: 'Cure Wounds' },
          { name: 'Detect Magic' },
          { name: 'Detect Poison and Disease' },
          { name: 'Entangle' },
          { name: 'Faerie Fire' },
          { name: 'Fog Cloud' },
          { name: 'Goodberry' },
          { name: 'Healing Word' },
          { name: 'Jump' },
          { name: 'Longstrider' },
          { name: 'Purify Food and Drink' },
          { name: 'Speak with Animals' },
          { name: 'Thunderwave' },
          { name: 'Barkskin' },
          { name: 'Beast Sense' },
          { name: 'Darkvision' },
          { name: 'Enhance Ability' },
          { name: 'Find Traps' },
          { name: 'Flame Blade' },
          { name: 'Flaming Sphere' },
          { name: 'Gust of Wind' },
          { name: 'Heat Metal' },
          { name: 'Hold Person' },
          { name: 'Lesser Restoration' },
          { name: 'Locate Animals or Plants' },
          { name: 'Locate Object' },
          { name: 'Moonbeam' },
          { name: 'Pass Without Trace' },
          { name: 'Protection from Poison' },
          { name: 'Spike Growth' },
          { name: 'Call Lightning' },
          { name: 'Conjure Animals' },
          { name: 'Daylight' },
          { name: 'Dispel Magic' },
          { name: 'Feign Death' },
          { name: 'Meld into Stone' },
          { name: 'Plant Growth' },
          { name: 'Protection from Energy' },
          { name: 'Sleet Storm' },
          { name: 'Speak with Plants' },
          { name: 'Water Breathing' },
          { name: 'Water Walk' },
          { name: 'Wind Wall' },
          { name: 'Blight' },
          { name: 'Confusion' },
          { name: 'Conjure Minor Elementals' },
          { name: 'Conjure Woodland Beings' },
          { name: 'Control Water' },
          { name: 'Divination' },
          { name: 'Freedom of Movement' },
          { name: 'Giant Insect' },
          { name: 'Grasping Vine' },
          { name: 'Hallucinatory Terrain' },
          { name: 'Ice Storm' },
          { name: 'Locate Creature' },
          { name: 'Polymorph' },
          { name: 'Stone Shape' },
          { name: 'Wall of Fire' },
          { name: 'Antilife Shell' },
          { name: 'Commune with Nature' },
          { name: 'Conjure Elemental' },
          { name: 'Contagion' },
          { name: 'Geas' },
          { name: 'Greater Restoration' },
          { name: 'Insect Plague' },
          { name: 'Mass Cure Wounds' },
          { name: 'Planar Binding' },
          { name: 'Reincarnate' },
          { name: 'Scrying' },
          { name: 'Tree Stride' },
          { name: 'Wall of Stone' },
          { name: 'Conjure Fey' },
          { name: 'Find the Path' },
          { name: 'Heal' },
          { name: "Heroes' Feast" },
          { name: 'Move Earth' },
          { name: 'Sunbeam' },
          { name: 'Transport via Plants' },
          { name: 'Wall of Thorns' },
          { name: 'Wind Walk' },
          { name: 'Fire Storm' },
          { name: 'Mirage Arcane' },
          { name: 'Plane Shift' },
          { name: 'Regenerate' },
          { name: 'Reverse Gravity' },
          { name: 'Animal Shapes' },
          { name: 'Antipathy/Sympathy' },
          { name: 'Control Weather' },
          { name: 'Earthquake' },
          { name: 'Sunburst' },
          { name: 'Tsunami' },
          { name: 'Foresight' },
          { name: 'Shapechange' },
          { name: 'Storm of Vengeance' },
          { name: 'True Resurrection' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: [
          'Animal Friendship',
          'Create or Destroy Water',
          'Cure Wounds',
          'Detect Magic',
          'Detect Poison and Disease',
          'Entangle',
          'Faerie Fire',
          'Fog Cloud',
          'Goodberry',
          'Healing Word',
          'Jump',
          'Longstrider',
          'Purify Food and Drink',
          'Speak with Animals',
          'Thunderwave'
        ],
        2: [
          'Barkskin',
          'Beast Sense',
          'Darkvision',
          'Enhance Ability',
          'Find Traps',
          'Flame Blade',
          'Flaming Sphere',
          'Gust of Wind',
          'Heat Metal',
          'Hold Person',
          'Lesser Restoration',
          'Locate Animals or Plants',
          'Locate Object',
          'Moonbeam',
          'Pass Without Trace',
          'Protection from Poison',
          'Spike Growth'
        ],
        3: [
          'Call Lightning',
          'Conjure Animals',
          'Daylight',
          'Dispel Magic',
          'Feign Death',
          'Meld into Stone',
          'Plant Growth',
          'Protection from Energy',
          'Sleet Storm',
          'Speak with Plants',
          'Water Breathing',
          'Water Walk',
          'Wind Wall'
        ],
        4: [
          'Blight',
          'Confusion',
          'Conjure Minor Elementals',
          'Conjure Woodland Beings',
          'Control Water',
          'Divination',
          'Freedom of Movement',
          'Giant Insect',
          'Grasping Vine',
          'Hallucinatory Terrain',
          'Ice Storm',
          'Locate Creature',
          'Polymorph',
          'Stone Shape',
          'Wall of Fire'
        ],
        5: [
          'Antilife Shell',
          'Commune with Nature',
          'Conjure Elemental',
          'Contagion',
          'Geas',
          'Greater Restoration',
          'Insect Plague',
          'Mass Cure Wounds',
          'Planar Binding',
          'Reincarnate',
          'Scrying',
          'Tree Stride',
          'Wall of Stone'
        ],
        6: [
          'Conjure Fey',
          'Find the Path',
          'Heal',
          "Heroes' Feast",
          'Move Earth',
          'Sunbeam',
          'Transport via Plants',
          'Wall of Thorns',
          'Wind Walk'
        ],
        7: [
          'Fire Storm',
          'Mirage Arcane',
          'Plane Shift',
          'Regenerate',
          'Reverse Gravity'
        ],
        8: [
          'Animal Shapes',
          'Antipathy/Sympathy',
          'Control Weather',
          'Earthquake',
          'Sunburst',
          'Tsunami'
        ],
        9: [
          'Foresight',
          'Shapechange',
          'Storm of Vengeance',
          'True Resurrection'
        ]
      }),
      spellSlotsByLevel: JSON.stringify({
        1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
        11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
        19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
        20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
      }),
      skillsByLevel: JSON.stringify({
        1: ['Druidic'],
        18: ['Timeless Body'],
        18: ['Beast Spells'],
        20: ['Archdruid']
      }),
      subClassAvailableAtLevel: 2,
      unusableItems: [],
      fightingStyles: [],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: JSON.stringify({}),
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 3,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 3,
        10: 4,
        11: 4,
        12: 4,
        13: 4,
        14: 4,
        15: 4,
        16: 4,
        17: 4,
        18: 4,
        19: 4,
        20: 4
      }),
      spellsKnownByLevel: JSON.stringify({
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7,
        7: 8,
        8: 9,
        9: 10,
        10: 11,
        11: 12,
        12: 12,
        13: 13,
        14: 14,
        15: 15,
        16: 15,
        17: 16,
        18: 17,
        19: 18,
        20: 18
      })
    }
  });

  const circleOfTheLand = await prisma.subclass.create({
    data: {
      name: 'Circle of the Land',
      description:
        'Druids of the Circle of the Land are keepers of ancient knowledge and rites that give them mystical abilities to communicate with nature and to use its power to protect it.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Animal Friendship' },
          { name: 'Speak with Animals' },
          { name: 'Barkskin' },
          { name: 'Spider Climb' },
          { name: 'Call Lightning' },
          { name: 'Plant Growth' },
          { name: 'Divination' },
          { name: 'Freedom of Movement' },
          { name: 'Commune with Nature' },
          { name: 'Tree Stride' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: ['Animal Friendship', 'Speak with Animals'],
        3: ['Barkskin', 'Spider Climb'],
        5: ['Call Lightning', 'Plant Growth'],
        7: ['Divination', 'Freedom of Movement'],
        9: ['Commune with Nature', 'Tree Stride']
      }),
      skillsByLevel: JSON.stringify({
        2: ['Natural Recovery'],
        6: ["Land's Stride"],
        14: ["Nature's Sanctuary"]
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Druid' }
      }
    }
  });

  const circleOfTheMoon = await prisma.subclass.create({
    data: {
      name: 'Circle of the Moon',
      description:
        'Druids of the Circle of the Moon are fierce guardians of the wilds. Their order gathers under the full moon to share news and trade warnings. They are more at home in the wild than in civilization.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({
        14: ['Alter Self']
      }),
      skillsByLevel: JSON.stringify({
        2: ['Circle Forms', 'Combat Wild Shape'],
        6: ['Primal Strike'],
        14: ['Thousand Forms']
      }),
      abilitiesByLevel: JSON.stringify({
        10: ['Elemental Wild Shape']
      }),
      parentClass: {
        connect: { name: 'Druid' }
      }
    }
  });

  //FIGHTER
  const fighter = await prisma.class.create({
    data: {
      name: 'Fighter',
      description:
        'A master of martial combat, skilled with a variety of weapons and armor',
      hitDice: 'D10',
      proficiencies: [
        'Light Armor',
        'Medium Armor',
        'Heavy Armor',
        'Shield',
        'Simple Weapon',
        'Martial Weapon'
      ],
      savingThrowProficiencies: ['STR', 'CON'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({
        1: ['Second Wind']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'STR',
      pimarySpellAbilityScoreModifier: null,
      rageDamageByLevel: JSON.stringify({}),
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      spellSlotsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        2: ['Action Surge'],
        5: ['Extra Attack'],
        9: ['Indomitable']
      }),
      subClassAvailableAtLevel: 3,
      unusableItems: [],
      fightingStyles: [
        'ARCHERY',
        'DEFENSE',
        'DUELING',
        'GREAT_WEAPON_FIGHTING',
        'PROTECTION',
        'TWO_WEAPON_FIGHTING'
      ],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: JSON.stringify({}),
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({}),
      spellsKnownByLevel: JSON.stringify({})
    }
  });

  const champion = await prisma.subclass.create({
    data: {
      name: 'Champion',
      description:
        'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        3: ['Improved Critical'],
        7: ['Remarkable Athlete'],
        15: ['Superior Critical'],
        18: ['Survivor']
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Fighter' }
      }
    }
  });

  const battleMaster = await prisma.subclass.create({
    data: {
      name: 'Battle Master',
      description:
        'Battle Masters employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weapon smithing and calligraphy.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        7: ['Know Your Enemy'],
        15: ['Relentless']
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Fighter' }
      }
    }
  });

  const eldritchKnight = await prisma.subclass.create({
    data: {
      name: 'Eldritch Knight',
      description:
        'Eldritch Knights use magical techniques similar to those practiced by wizards. They focus their study on two of the eight schools of magic: abjuration and evocation.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Shield' },
          { name: 'Magic Missile' },
          { name: 'Mage Armor' },
          { name: 'Thunderwave' }
        ]
      },
      cantripsKnownByLevel: JSON.stringify({
        3: 2,
        4: 2,
        5: 2,
        6: 2,
        7: 2,
        8: 2,
        9: 2,
        10: 3,
        11: 3,
        12: 3,
        13: 3,
        14: 3,
        15: 3,
        16: 3,
        17: 3,
        18: 3,
        19: 3,
        20: 3
      }),
      spellsKnownByLevel: JSON.stringify({
        3: 3,
        4: 4,
        5: 4,
        6: 4,
        7: 5,
        8: 6,
        9: 6,
        10: 7,
        11: 8,
        12: 8,
        13: 9,
        14: 10,
        15: 10,
        16: 11,
        17: 11,
        18: 11,
        19: 12,
        20: 13
      }),
      spellslotsBySpellLevelByLevel: JSON.stringify({
        3: { 1: 2 },
        4: { 1: 3 },
        5: { 1: 3 },
        6: { 1: 3 },
        7: { 1: 4, 2: 2 },
        8: { 1: 4, 2: 2 },
        9: { 1: 4, 2: 2 },
        10: { 1: 4, 2: 3 },
        11: { 1: 4, 2: 3 },
        12: { 1: 4, 2: 3 },
        13: { 1: 4, 2: 3, 3: 2 },
        14: { 1: 4, 2: 3, 3: 2 },
        15: { 1: 4, 2: 3, 3: 2 },
        16: { 1: 4, 2: 3, 3: 3 },
        17: { 1: 4, 2: 3, 3: 3 },
        18: { 1: 4, 2: 3, 3: 3 },
        19: { 1: 4, 2: 3, 3: 3, 4: 1 },
        20: { 1: 4, 2: 3, 3: 3, 4: 1 }
      }),
      spellsByLevel: JSON.stringify({
        3: ['Shield', 'Magic Missile'],
        7: ['Mage Armor'],
        11: ['Thunderwave']
      }),
      skillsByLevel: JSON.stringify({
        10: ['Eldritch Strike']
      }),
      abilitiesByLevel: JSON.stringify({
        3: ['Weapon Bond'], // Might be a spell ??
        7: ['War Magic'],
        15: ['Arcane Charge'],
        18: ['Improved War Magic']
      }),
      pimarySpellAbilityScoreModifier: 'INT',
      parentClass: {
        connect: { name: 'Fighter' }
      }
    }
  });

  //MONK

  const monk = await prisma.class.create({
    data: {
      name: 'Monk',
      description:
        'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection',
      hitDice: 'D8',
      proficiencies: ['Simple Weapon', 'Shortsword'],
      savingThrowProficiencies: ['STR', 'DEX'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({
        3: ['Deflect Missiles'],
        18: ['Empty Body']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'DEX',
      pimarySpellAbilityScoreModifier: null,
      rageDamageByLevel: JSON.stringify({}),
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      spellSlotsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        1: ['Unarmored Defense', 'Martial Arts'],
        2: ['Ki', 'Unarmored Movement'],
        4: ['Slow Fall'],
        5: ['Extra Attack', 'Stunning Strike'],
        6: ['Ki-Empowered Strikes'],
        7: ['Evasion', 'Stillness of Mind'],
        10: ['Purity of Body'],
        13: ['Tongue of the Sun and Moon'],
        14: ['Diamond Soul'],
        15: ['Timeless Body - Monk'],
        20: ['Perfect Self']
      }),
      subClassAvailableAtLevel: 3,
      unusableItems: [],
      fightingStyles: [],
      movementSpeedBonusByLevel: JSON.stringify({
        1: 0,
        2: 10,
        3: 10,
        4: 10,
        5: 10,
        6: 15,
        7: 15,
        8: 15,
        9: 15,
        10: 20,
        11: 20,
        12: 20,
        13: 20,
        14: 25,
        15: 25,
        16: 25,
        17: 25,
        18: 30,
        19: 30,
        20: 30
      }),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({
        1: 0,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 12,
        13: 13,
        14: 14,
        15: 15,
        16: 16,
        17: 17,
        18: 18,
        19: 19,
        20: 20
      }),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: JSON.stringify({}),
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({}),
      spellsKnownByLevel: JSON.stringify({})
    }
  });

  const wayOfTheOpenHand = await prisma.subclass.create({
    data: {
      name: 'Way of the Open Hand',
      description:
        'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat, whether armed or unarmed. They learn techniques to push and trip their opponents, manipulate ki to heal damage to their bodies, and practice advanced meditation that can protect them from harm.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        3: ['Open Hand Technique'],
        11: ['Tranquility']
      }),
      abilitiesByLevel: JSON.stringify({
        6: ['Wholeness of Body'],
        17: ['Quivering Palm']
      }),
      parentClass: {
        connect: { name: 'Monk' }
      }
    }
  });

  const wayOfShadow = await prisma.subclass.create({
    data: {
      name: 'Way of Shadow',
      description:
        'Monks of the Way of Shadow follow a tradition that values stealth and subterfuge. These monks are rogues among monks. They prefer to sneak unseen, strike suddenly, and disappear into the shadows.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Darkness' },
          { name: 'Darkvision' },
          { name: 'Pass Without Trace' },
          { name: 'Silence' },
          { name: 'Minor Illusion' },
          { name: 'Teleport' }
        ]
      },
      spellsByLevel: JSON.stringify({
        3: [
          'Minor Illusion',
          'Darkness',
          'Darkvision',
          'Pass Without Trace',
          'Silence'
        ],
        6: ['Teleport']
      }),
      skillsByLevel: JSON.stringify({
        3: ['Shadow Arts'],
        6: ['Shadow Step']
      }),
      abilitiesByLevel: JSON.stringify({
        11: ['Cloak of Shadows'],
        17: ['Opportunist']
      }),
      parentClass: {
        connect: { name: 'Monk' }
      }
    }
  });

  //PALADIN
  const paladin = await prisma.class.create({
    data: {
      name: 'Paladin',
      description: 'A holy warrior bound to a sacred oath',
      hitDice: 'D10',
      proficiencies: [
        'Light Armor',
        'Medium Armor',
        'Heavy Armor',
        'Shield',
        'Simple Weapon',
        'Martial Weapon'
      ],
      savingThrowProficiencies: ['WIS', 'CHA'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({
        1: ['Divine Sense', 'Lay on Hands'],
        2: ['Divine Smite'],
        14: ['Cleansing Touch']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'STR',
      pimarySpellAbilityScoreModifier: 'CHA',
      rageDamageByLevel: JSON.stringify({}),
      spells: {
        connect: [
          { name: 'Bless' },
          { name: 'Command' },
          { name: 'Cure Wounds' },
          { name: 'Detect Magic' },
          { name: 'Detect Poison and Disease' },
          { name: 'Divine Favor' },
          { name: 'Heroism' },
          { name: 'Protection from Evil and Good' },
          { name: 'Purify Food and Drink' },
          { name: 'Shield of Faith' },
          { name: 'Aid' },
          { name: 'Branding Smite' },
          { name: 'Find Steed' },
          { name: 'Lesser Restoration' },
          { name: 'Locate Object' },
          { name: 'Magic Weapon' },
          { name: 'Prayer of Healing' },
          { name: 'Protection from Poison' },
          { name: 'Zone of Truth' },
          { name: 'Blinding Smite' },
          { name: 'Create Food and Water' },
          { name: 'Daylight' },
          { name: 'Dispel Magic' },
          { name: 'Magic Circle' },
          { name: 'Remove Curse' },
          { name: 'Revivify' },
          { name: 'Beacon of Hope' },
          { name: 'Aura of Life' },
          { name: 'Aura of Purity' },
          { name: 'Banishment' },
          { name: 'Death Ward' },
          { name: 'Locate Creature' },
          { name: 'Staggering Smite' },
          { name: 'Banishing Smite' },
          { name: 'Destructive Wave' },
          { name: 'Dispel Evil and Good' },
          { name: 'Geas' },
          { name: 'Raise Dead' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: [
          'Bless',
          'Command',
          'Cure Wounds',
          'Detect Magic',
          'Detect Poison and Disease',
          'Divine Favor',
          'Heroism',
          'Protection from Evil and Good',
          'Purify Food and Drink',
          'Shield of Faith'
        ],
        2: [
          'Aid',
          'Branding Smite',
          'Find Steed',
          'Lesser Restoration',
          'Locate Object',
          'Magic Weapon',
          'Prayer of Healing',
          'Protection from Poison',
          'Zone of Truth'
        ],
        3: [
          'Blinding Smite',
          'Create Food and Water',
          'Daylight',
          'Dispel Magic',
          'Magic Circle',
          'Remove Curse',
          'Revivify',
          'Beacon of Hope',
          'Aura of Life',
          'Aura of Purity',
          'Banishment',
          'Death Ward',
          'Locate Creature',
          'Staggering Smite'
        ],
        4: [
          'Banishing Smite',
          'Destructive Wave',
          'Dispel Evil and Good',
          'Geas',
          'Raise Dead'
        ]
      }),
      spellSlotsByLevel: JSON.stringify({
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        6: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        8: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        9: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        10: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        11: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        12: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        13: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        14: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        15: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        16: [4, 3, 3, 3, 0, 0, 0, 0, 0],
        17: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        18: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        19: [4, 3, 3, 3, 2, 0, 0, 0, 0],
        20: [4, 3, 3, 3, 2, 0, 0, 0, 0]
      }),
      skillsByLevel: JSON.stringify({
        5: ['Extra Attack'],
        6: ['Aura of Protection'],
        10: ['Aura of Courage'],
        11: ['Improved Divine Smite']
      }),
      subClassAvailableAtLevel: 3,
      unusableItems: [],
      fightingStyles: [
        'DEFENSE',
        'DUELING',
        'GREAT_WEAPON_FIGHTING',
        'PROTECTION'
      ],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: JSON.stringify({}),
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({}),
      spellsKnownByLevel: JSON.stringify({})
    }
  });

  const oathOfDevotion = await prisma.subclass.create({
    data: {
      name: 'Oath of Devotion',
      description:
        'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order. Sometimes called cavaliers, paladins who swear this oath dedicate themselves to following the tenets of honesty, courage, compassion, honor, and duty.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Protection from Evil and Good' },
          { name: 'Sanctuary' },
          { name: 'Lesser Restoration' },
          { name: 'Zone of Truth' },
          { name: 'Beacon of Hope' },
          { name: 'Dispel Magic' },
          { name: 'Freedom of Movement' },
          { name: 'Guardian of Faith' },
          { name: 'Commune' },
          { name: 'Flame Strike' }
        ]
      },
      spellsByLevel: JSON.stringify({
        3: ['Protection from Evil and Good', 'Sanctuary'],
        5: ['Lesser Restoration', 'Zone of Truth'],
        9: ['Beacon of Hope', 'Dispel Magic'],
        13: ['Freedom of Movement', 'Guardian of Faith'],
        17: ['Commune', 'Flame Strike']
      }),
      skillsByLevel: JSON.stringify({
        7: ['Aura of Devotion']
      }),
      abilitiesByLevel: JSON.stringify({
        3: ['Sacred Weapon', 'Turn the Unholy'],
        20: ['Holy Nimbus']
      }),
      parentClass: {
        connect: { name: 'Paladin' }
      }
    }
  });

  const oathOfTheAncients = await prisma.subclass.create({
    data: {
      name: 'Oath of the Ancients',
      description:
        'The Oath of the Ancients is as old as the race of elves and the rituals of the druids. Sometimes called fey knights, green knights, or horned knights, paladins who swear this oath cast their lot with the side of the light in the cosmic struggle against darkness because they love the beautiful and life-giving things of the world, not necessarily because they believe in principles of honor, courage, and justice.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Ensnaring Strike' },
          { name: 'Speak with Animals' },
          { name: 'Misty Step' },
          { name: 'Moonbeam' },
          { name: 'Plant Growth' },
          { name: 'Protection from Energy' },
          { name: 'Ice Storm' },
          { name: 'Stoneskin' },
          { name: 'Commune with Nature' },
          { name: 'Tree Stride' }
        ]
      },
      spellsByLevel: JSON.stringify({
        3: ['Ensnaring Strike', 'Speak with Animals'],
        5: ['Misty Step', 'Moonbeam'],
        9: ['Plant Growth', 'Protection from Energy'],
        13: ['Ice Storm', 'Stoneskin'],
        17: ['Commune with Nature', 'Tree Stride']
      }),
      skillsByLevel: JSON.stringify({
        7: ['Aura of Warding'],
        15: ['Undying Sentinel']
      }),
      abilitiesByLevel: JSON.stringify({
        3: ["Nature's Wrath", 'Turn the Faithless'],
        20: ['Elder Champion']
      }),
      parentClass: {
        connect: { name: 'Paladin' }
      }
    }
  });

  const oathOfVengeance = await prisma.subclass.create({
    data: {
      name: 'Oath of Vengeance',
      description:
        "The Oath of Vengeance is a solemn commitment to punish those who have committed a grievous sin. When evil forces slaughter helpless villagers, when an entire people turns against the will of the gods, when a thieves' guild grows too violent and powerful, when a dragon rampages through the countryside—at times like these, paladins arise and swear an Oath of Vengeance to set right that which has gone wrong.",
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [
          { name: 'Bane' },
          { name: "Hunter's Mark" },
          { name: 'Hold Person' },
          { name: 'Misty Step' },
          { name: 'Haste' },
          { name: 'Protection from Energy' },
          { name: 'Banishment' },
          { name: 'Dimension Door' },
          { name: 'Hold Monster' },
          { name: 'Scrying' }
        ]
      },
      spellsByLevel: JSON.stringify({
        3: ['Bane', "Hunter's Mark"],
        5: ['Hold Person', 'Misty Step'],
        9: ['Haste', 'Protection from Energy'],
        13: ['Banishment', 'Dimension Door'],
        17: ['Hold Monster', 'Scrying']
      }),
      skillsByLevel: JSON.stringify({
        7: ['Relentless Avenger'],
        15: ['Soul of Vengeance']
      }),
      abilitiesByLevel: JSON.stringify({
        3: ['Abjure Enemy', 'Vow of Enmity'],
        20: ['Avenging Angel']
      }),
      parentClass: {
        connect: { name: 'Paladin' }
      }
    }
  });

  //RANGER
  const ranger = await prisma.class.create({
    data: {
      name: 'Ranger',
      description:
        'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization',
      hitDice: 'D10',
      proficiencies: [
        'Light Armor',
        'Medium Armor',
        'Shield',
        'Simple Weapon',
        'Martial Weapon'
      ],
      savingThrowProficiencies: ['STR', 'DEX'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({
        3: ['Primeval Awareness'],
        10: ['Hide in Plain Sight']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'DEX',
      pimarySpellAbilityScoreModifier: 'WIS',
      rageDamageByLevel: JSON.stringify({}),
      spells: {
        connect: [
          { name: 'Alarm' },
          { name: 'Animal Friendship' },
          { name: 'Cure Wounds' },
          { name: 'Detect Magic' },
          { name: 'Detect Poison and Disease' },
          { name: 'Ensnaring Strike' },
          { name: 'Fog Cloud' },
          { name: 'Goodberry' },
          { name: 'Hail of Thorns' },
          { name: "Hunter's Mark" },
          { name: 'Jump' },
          { name: 'Longstrider' },
          { name: 'Speak with Animals' },
          { name: 'Animal Messenger' },
          { name: 'Barkskin' },
          { name: 'Beast Sense' },
          { name: 'Cordon of Arrows' },
          { name: 'Darkvision' },
          { name: 'Find Traps' },
          { name: 'Lesser Restoration' },
          { name: 'Locate Animals or Plants' },
          { name: 'Locate Object' },
          { name: 'Pass Without Trace' },
          { name: 'Protection from Poison' },
          { name: 'Silence' },
          { name: 'Spike Growth' },
          { name: 'Conjure Animals' },
          { name: 'Conjure Barrage' },
          { name: 'Daylight' },
          { name: 'Lightning Arrow' },
          { name: 'Nondetection' },
          { name: 'Plant Growth' },
          { name: 'Protection from Energy' },
          { name: 'Speak with Plants' },
          { name: 'Water Breathing' },
          { name: 'Water Walk' },
          { name: 'Wind Wall' },
          { name: 'Conjure Woodland Beings' },
          { name: 'Freedom of Movement' },
          { name: 'Grasping Vine' },
          { name: 'Locate Creature' },
          { name: 'Stoneskin' },
          { name: 'Commune with Nature' },
          { name: 'Conjure Volley' },
          { name: 'Swift Quiver' },
          { name: 'Tree Stride' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: [
          'Alarm',
          'Animal Friendship',
          'Cure Wounds',
          'Detect Magic',
          'Detect Poison and Disease',
          'Ensnaring Strike',
          'Fog Cloud',
          'Goodberry',
          'Hail of Thorns',
          "Hunter's Mark",
          'Jump',
          'Longstrider',
          'Speak with Animals'
        ],
        2: [
          'Animal Messenger',
          'Barkskin',
          'Beast Sense',
          'Cordon of Arrows',
          'Darkvision',
          'Find Traps',
          'Lesser Restoration',
          'Locate Animals or Plants',
          'Locate Object',
          'Pass Without Trace',
          'Protection from Poison',
          'Silence',
          'Spike Growth'
        ],
        3: [
          'Conjure Animals',
          'Conjure Barrage',
          'Daylight',
          'Lightning Arrow',
          'Nondetection',
          'Plant Growth',
          'Protection from Energy',
          'Speak with Plants',
          'Water Breathing',
          'Water Walk',
          'Wind Wall'
        ],
        4: [
          'Conjure Woodland Beings',
          'Freedom of Movement',
          'Grasping Vine',
          'Locate Creature',
          'Stoneskin'
        ],
        5: [
          'Commune with Nature',
          'Conjure Volley',
          'Swift Quiver',
          'Tree Stride'
        ]
      }),
      spellSlotsByLevel: JSON.stringify({
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        6: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        8: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        9: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        10: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        11: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        12: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        13: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        14: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        15: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        16: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        17: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        18: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        19: [4, 3, 3, 3, 2, 0, 0, 0, 0],
        20: [4, 3, 3, 3, 2, 0, 0, 0, 0]
      }),
      skillsByLevel: JSON.stringify({
        1: ['Favored Enemy', 'Natural Explorer'],
        5: ['Extra Attack'],
        8: ["Land's Stride"],
        14: ['Vanish'],
        18: ['Feral Senses'],
        20: ['Foe Slayer']
      }),
      subClassAvailableAtLevel: 3,
      unusableItems: [],
      fightingStyles: ['ARCHERY', 'DEFENSE', 'DUELING', 'TWO_WEAPON_FIGHTING'],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: JSON.stringify({}),
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({}),
      spellsKnownByLevel: JSON.stringify({
        1: 0,
        2: 2,
        3: 3,
        4: 3,
        5: 4,
        6: 4,
        7: 5,
        8: 5,
        9: 6,
        10: 6,
        11: 7,
        12: 7,
        13: 8,
        14: 8,
        15: 9,
        16: 9,
        17: 10,
        18: 10,
        19: 11,
        20: 11
      })
    }
  });

  const hunter = await prisma.subclass.create({
    data: {
      name: 'Hunter',
      description:
        "Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness. As you walk the Hunter's path, you learn specialized techniques for fighting the threats you face, from rampaging ogres and hordes of orcs to towering giants and terrifying dragons.",
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({}),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Ranger' }
      }
    }
  });

  const beastMaster = await prisma.subclass.create({
    data: {
      name: 'Beast Master',
      description:
        'The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world. United in focus, beast and ranger work as one to fight the monstrous foes that threaten civilization and the wilderness alike. Emulating the Beast Master archetype means committing yourself to this ideal, working in partnership with an animal as its companion and friend.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        3: ["Ranger's Companion"],
        7: ['Exceptional Training'],
        11: ['Bestial Fury'],
        15: ['Share Spells']
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Ranger' }
      }
    }
  });

  //ROGUE
  const rogue = await prisma.class.create({
    data: {
      name: 'Rogue',
      description:
        'A scoundrel who uses stealth and trickery to overcome obstacles and enemies',
      hitDice: 'D8',
      proficiencies: [
        'Light Armor',
        'Simple Weapon',
        'Hand Crossbow',
        'Longsword',
        'Rapier',
        'Shortsword',
        "Thieves' Tools"
      ],
      savingThrowProficiencies: ['DEX', 'INT'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({
        1: ['Sneak Attack'],
        14: ['Blindsense']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'DEX',
      pimarySpellAbilityScoreModifier: null,
      rageDamageByLevel: JSON.stringify({}),
      spells: {
        connect: []
      },
      spellsByLevel: JSON.stringify({}),
      spellSlotsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        1: ["Thieves' Cant"],
        2: ['Cunning Action'],
        5: ['Uncanny Dodge'],
        7: ['Evasion'],
        11: ['Reliable Talent'],
        18: ['Elusive'],
        20: ['Stroke of Luck']
      }),
      subClassAvailableAtLevel: 3,
      unusableItems: [],
      fightingStyles: [],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: JSON.stringify({
        1: '1d6',
        2: '1d6',
        3: '2d6',
        4: '2d6',
        5: '3d6',
        6: '3d6',
        7: '4d6',
        8: '4d6',
        9: '5d6',
        10: '5d6',
        11: '6d6',
        12: '6d6',
        13: '7d6',
        14: '7d6',
        15: '8d6',
        16: '8d6',
        17: '9d6',
        18: '9d6',
        19: '10d6',
        20: '10d6'
      }),
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({}),
      spellsKnownByLevel: JSON.stringify({})
    }
  });

  const thief = await prisma.subclass.create({
    data: {
      name: 'Thief',
      description:
        "You hone your skills in the larcenous arts. Burglars, bandits, cutpurses, and other criminals typically follow this archetype, but so do rogues who prefer to think of themselves as professional treasure seekers, explorers, delvers, and investigators. In addition to improving your agility and stealth, you learn skills useful for delving into ancient ruins, reading unfamiliar languages, and using magic items you normally couldn't employ.",
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        3: ['Fast Hands', 'Second-Story Work'],
        9: ['Supreme Sneak'],
        13: ['Use Magic Device'],
        17: ["Thief's Reflexes"]
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Rogue' }
      }
    }
  });

  const assassin = await prisma.subclass.create({
    data: {
      name: 'Assassin',
      description:
        'You focus your training on the grim art of death. Those who adhere to this archetype are diverse: hired killers, spies, bounty hunters, and even specially anointed priests trained to exterminate the enemies of their deity. Stealth, poison, and disguise help you eliminate your foes with deadly efficiency.',
      proficiencies: ['Disguise Kit', "Poisoner's Kit"],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        3: ['Assassinate'],
        17: ['Death Strike']
      }),
      abilitiesByLevel: JSON.stringify({
        9: ['Infiltration Expertise'],
        13: ['Impostor']
      }),
      parentClass: {
        connect: { name: 'Rogue' }
      }
    }
  });

  const arcaneTrickster = await prisma.subclass.create({
    data: {
      name: 'Arcane Trickster',
      description:
        'Some rogues enhance their fine-honed skills of stealth and agility with magic, learning tricks of enchantment and illusion. These rogues include pickpockets and burglars, but also pranksters, mischief-makers, and a significant number of adventurers.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [{ name: 'Mage Hand' }]
      },
      cantripsKnownByLevel: JSON.stringify({
        3: 3,
        4: 3,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 3,
        10: 4,
        11: 4,
        12: 4,
        13: 4,
        14: 4,
        15: 4,
        16: 4,
        17: 4,
        18: 4,
        19: 4,
        20: 4
      }),
      spellsKnownByLevel: JSON.stringify({
        3: 3,
        4: 4,
        5: 4,
        6: 4,
        7: 5,
        8: 6,
        9: 6,
        10: 7,
        11: 8,
        12: 8,
        13: 9,
        14: 10,
        15: 10,
        16: 11,
        17: 11,
        18: 11,
        19: 12,
        20: 13
      }),
      spellslotsBySpellLevelByLevel: JSON.stringify({
        3: { 1: 2 },
        4: { 1: 3 },
        5: { 1: 3 },
        6: { 1: 3 },
        7: { 1: 4, 2: 2 },
        8: { 1: 4, 2: 2 },
        9: { 1: 4, 2: 2 },
        10: { 1: 4, 2: 3 },
        11: { 1: 4, 2: 3 },
        12: { 1: 4, 2: 3 },
        13: { 1: 4, 2: 3, 3: 2 },
        14: { 1: 4, 2: 3, 3: 2 },
        15: { 1: 4, 2: 3, 3: 2 },
        16: { 1: 4, 2: 3, 3: 3 },
        17: { 1: 4, 2: 3, 3: 3 },
        18: { 1: 4, 2: 3, 3: 3 },
        19: { 1: 4, 2: 3, 3: 3, 4: 1 },
        20: { 1: 4, 2: 3, 3: 3, 4: 1 }
      }),
      spellsByLevel: JSON.stringify({
        3: ['Mage Hand']
      }),
      skillsByLevel: JSON.stringify({
        3: ['Mage Hand Legerdemain'],
        9: ['Magical Ambush'],
        13: ['Versatile Trickster']
      }),
      abilitiesByLevel: JSON.stringify({
        17: ['Spell Thief']
      }),
      pimarySpellAbilityScoreModifier: 'INT',
      parentClass: {
        connect: { name: 'Rogue' }
      }
    }
  });

  //SORCERER
  const sorcerer = await prisma.class.create({
    data: {
      name: 'Sorcerer',
      description:
        'A spellcaster who draws on inherent magic from a gift or bloodline',
      hitDice: 'D6',
      proficiencies: [
        'Dagger',
        'Dart',
        'Sling',
        'Quarterstaff',
        'Light Crossbow'
      ],
      savingThrowProficiencies: ['CON', 'CHA'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({}),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'CHA',
      pimarySpellAbilityScoreModifier: 'CHA',
      rageDamageByLevel: JSON.stringify({}),
      spells: {
        connect: [
          { name: 'Acid Splash' },
          { name: 'Blade Ward' },
          { name: 'Chill Touch' },
          { name: 'Dancing Lights' },
          { name: 'Fire Bolt' },
          { name: 'Friends' },
          { name: 'Light' },
          { name: 'Mage Hand' },
          { name: 'Mending' },
          { name: 'Message' },
          { name: 'Minor Illusion' },
          { name: 'Poison Spray' },
          { name: 'Prestidigitation' },
          { name: 'Ray of Frost' },
          { name: 'Shocking Grasp' },
          { name: 'True Strike' },
          { name: 'Burning Hands' },
          { name: 'Charm Person' },
          { name: 'Chromatic Orb' },
          { name: 'Color Spray' },
          { name: 'Comprehend Languages' },
          { name: 'Detect Magic' },
          { name: 'Disguise Self' },
          { name: 'Expeditious Retreat' },
          { name: 'False Life' },
          { name: 'Feather Fall' },
          { name: 'Fog Cloud' },
          { name: 'Jump' },
          { name: 'Mage Armor' },
          { name: 'Magic Missile' },
          { name: 'Shield' },
          { name: 'Silent Image' },
          { name: 'Sleep' },
          { name: 'Thunderwave' },
          { name: 'Witch Bolt' },
          { name: 'Alter Self' },
          { name: 'Blindness/Deafness' },
          { name: 'Blur' },
          { name: 'Cloud of Daggers' },
          { name: 'Crown of Madness' },
          { name: 'Darkness' },
          { name: 'Detect Thoughts' },
          { name: 'Enhance Ability' },
          { name: 'Enlarge/Reduce' },
          { name: 'Gust of Wind' },
          { name: 'Hold Person' },
          { name: 'Invisibility' },
          { name: 'Knock' },
          { name: 'Levitate' },
          { name: 'Mirror Image' },
          { name: 'Misty Step' },
          { name: 'Ray of Enfeeblement' },
          { name: 'Scorching Ray' },
          { name: 'Shatter' },
          { name: 'Spider Climb' },
          { name: 'Suggestion' },
          { name: 'Web' },
          { name: 'Counterspell' },
          { name: 'Daylight' },
          { name: 'Dispel Magic' },
          { name: 'Fear' },
          { name: 'Fireball' },
          { name: 'Fly' },
          { name: 'Gaseous Form' },
          { name: 'Haste' },
          { name: 'Lightning Bolt' },
          { name: 'Major Image' },
          { name: 'Protection from Energy' },
          { name: 'Sleet Storm' },
          { name: 'Slow' },
          { name: 'Stinking Cloud' },
          { name: 'Tongues' },
          { name: 'Water Breathing' },
          { name: 'Water Walk' },
          { name: 'Banishment' },
          { name: 'Blight' },
          { name: 'Confusion' },
          { name: 'Dimension Door' },
          { name: 'Dominate Beast' },
          { name: 'Greater Invisibility' },
          { name: 'Ice Storm' },
          { name: 'Polymorph' },
          { name: 'Stoneskin' },
          { name: 'Wall of Fire' },
          { name: 'Cloudkill' },
          { name: 'Cone of Cold' },
          { name: 'Creation' },
          { name: 'Dominate Person' },
          { name: 'Hold Monster' },
          { name: 'Insect Plague' },
          { name: 'Seeming' },
          { name: 'Teleportation Circle' },
          { name: 'Eyebite' },
          { name: 'Mass Suggestion' },
          { name: 'Move Earth' },
          { name: 'Sunbeam' },
          { name: 'True Seeing' },
          { name: 'Delayed Blast Fireball' },
          { name: 'Etherealness' },
          { name: 'Finger of Death' },
          { name: 'Fire Storm' },
          { name: 'Plane Shift' },
          { name: 'Teleport' },
          { name: 'Dominate Monster' },
          { name: 'Earthquake' },
          { name: 'Incendiary Cloud' },
          { name: 'Power Word Stun' },
          { name: 'Sunburst' },
          { name: 'Gate' },
          { name: 'Meteor Swarm' },
          { name: 'Power Word Kill' },
          { name: 'Time Stop' },
          { name: 'Wish' }
        ]
      },
      spellsByLevel: JSON.stringify({
        0: [
          'Acid Splash',
          'Blade Ward',
          'Chill Touch',
          'Dancing Lights',
          'Fire Bolt',
          'Friends',
          'Light',
          'Mage Hand',
          'Mending',
          'Message',
          'Minor Illusion',
          'Poison Spray',
          'Prestidigitation',
          'Ray of Frost',
          'Shocking Grasp',
          'True Strike'
        ],
        1: [
          'Burning Hands',
          'Charm Person',
          'Chromatic Orb',
          'Color Spray',
          'Comprehend Languages',
          'Detect Magic',
          'Disguise Self',
          'Expeditious Retreat',
          'False Life',
          'Feather Fall',
          'Fog Cloud',
          'Jump',
          'Mage Armor',
          'Magic Missile',
          'Shield',
          'Silent Image',
          'Sleep',
          'Thunderwave',
          'Witch Bolt'
        ],
        2: [
          'Alter Self',
          'Blindness/Deafness',
          'Blur',
          'Cloud of Daggers',
          'Crown of Madness',
          'Darkness',
          'Detect Thoughts',
          'Enhance Ability',
          'Enlarge/Reduce',
          'Gust of Wind',
          'Hold Person',
          'Invisibility',
          'Knock',
          'Levitate',
          'Mirror Image',
          'Misty Step',
          'Ray of Enfeeblement',
          'Scorching Ray',
          'Shatter',
          'Spider Climb',
          'Suggestion',
          'Web'
        ],
        3: [
          'Counterspell',
          'Daylight',
          'Dispel Magic',
          'Fear',
          'Fireball',
          'Fly',
          'Gaseous Form',
          'Haste',
          'Lightning Bolt',
          'Major Image',
          'Protection from Energy',
          'Sleet Storm',
          'Slow',
          'Stinking Cloud',
          'Tongues',
          'Water Breathing',
          'Water Walk'
        ],
        4: [
          'Banishment',
          'Blight',
          'Confusion',
          'Dimension Door',
          'Dominate Beast',
          'Greater Invisibility',
          'Ice Storm',
          'Polymorph',
          'Stoneskin',
          'Wall of Fire'
        ],
        5: [
          'Cloudkill',
          'Cone of Cold',
          'Creation',
          'Dominate Person',
          'Hold Monster',
          'Insect Plague',
          'Seeming',
          'Teleportation Circle'
        ],
        6: [
          'Arcane Gate',
          'Chain Lightning',
          'Circle of Death',
          'Disintegrate',
          'Eyebite',
          'Globe of Invulnerability',
          'Mass Suggestion',
          'Move Earth',
          'Sunbeam',
          'True Seeing'
        ],
        7: [
          'Delayed Blast Fireball',
          'Etherealness',
          'Finger of Death',
          'Fire Storm',
          'Plane Shift',
          'Prismatic Spray',
          'Reverse Gravity',
          'Teleport'
        ],
        8: [
          'Dominate Monster',
          'Earthquake',
          'Incendiary Cloud',
          'Power Word Stun',
          'Sunburst'
        ],
        9: ['Gate', 'Meteor Swarm', 'Power Word Kill', 'Time Stop', 'Wish']
      }),
      spellSlotsByLevel: JSON.stringify({
        1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
        11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
        19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
        20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
      }),
      skillsByLevel: JSON.stringify({
        2: ['Font of Magic'],
        20: ['Sorcerous Restoration']
      }),
      subClassAvailableAtLevel: 1,
      unusableItems: [],
      fightingStyles: [],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({
        1: 0,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 12,
        13: 13,
        14: 14,
        15: 15,
        16: 16,
        17: 17,
        18: 18,
        19: 19,
        20: 20
      }),
      sneakAttackByLevel: null,
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({
        1: 4,
        2: 4,
        3: 4,
        4: 5,
        5: 5,
        6: 5,
        7: 5,
        8: 5,
        9: 5,
        10: 6,
        11: 6,
        12: 6,
        13: 6,
        14: 6,
        15: 6,
        16: 6,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      spellsKnownByLevel: JSON.stringify({
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7,
        7: 8,
        8: 9,
        9: 10,
        10: 11,
        11: 12,
        12: 12,
        13: 13,
        14: 13,
        15: 14,
        16: 14,
        17: 15,
        18: 15,
        19: 15,
        20: 15
      })
    }
  });

  const draconicBloodline = await prisma.subclass.create({
    data: {
      name: 'Draconic Bloodline',
      description:
        'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors. Most often, sorcerers with this origin trace their descent back to a mighty sorcerer of ancient times who made a bargain with a dragon or who might even have claimed a dragon parent.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        1: ['Draconic Resilience'],
        6: ['Elemental Affinity']
      }),
      abilitiesByLevel: JSON.stringify({
        14: ['Dragon Wings'],
        18: ['Draconic Presence']
      }),
      parentClass: {
        connect: { name: 'Sorcerer' }
      }
    }
  });

  const wildMagic = await prisma.subclass.create({
    data: {
      name: 'Wild Magic',
      description:
        'Your innate magic comes from the forces of chaos that underlie the order of creation. You might have endured exposure to some form of raw magic, perhaps through a planar portal leading to Limbo, the Elemental Planes, or the Far Realm. Perhaps you were blessed by a fey being or marked by a demon. Or your magic could be a fluke of your birth, with no apparent cause or reason.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        1: ['Wild Magic Surge', 'Tides of Chaos'],
        6: ['Bend Luck'],
        14: ['Controlled Chaos'],
        18: ['Spell Bombardment']
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Sorcerer' }
      }
    }
  });

  // WARLOCK
  const warlock = await prisma.class.create({
    data: {
      name: 'Warlock',
      description:
        'A wielder of magic that is derived from a bargain with an extraplanar entity',
      hitDice: 'D8',
      proficiencies: ['Light Armor', 'Simple Weapon'],
      savingThrowProficiencies: ['WIS', 'CHA'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({
        1: ['Eldritch Blast'],
        20: ['Eldritch Master']
      }),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'CHA',
      pimarySpellAbilityScoreModifier: 'CHA',
      rageDamageByLevel: JSON.stringify({}),
      spells: {
        connect: [
          { name: 'Armor of Agathys' },
          { name: 'Eldritch Blast' },
          { name: 'Arms of Hadar' },
          { name: 'Charm Person' },
          { name: 'Comprehend Languages' },
          { name: 'Expeditious Retreat' },
          { name: 'Hellish Rebuke' },
          { name: 'Hex' },
          { name: 'Illusory Script' },
          { name: 'Protection from Evil and Good' },
          { name: 'Unseen Servant' },
          { name: 'Witch Bolt' },
          { name: 'Cloud of Daggers' },
          { name: 'Crown of Madness' },
          { name: 'Darkness' },
          { name: 'Enthrall' },
          { name: 'Hold Person' },
          { name: 'Invisibility' },
          { name: 'Mirror Image' },
          { name: 'Misty Step' },
          { name: 'Ray of Enfeeblement' },
          { name: 'Shatter' },
          { name: 'Spider Climb' },
          { name: 'Suggestion' },
          { name: 'Counterspell' },
          { name: 'Dispel Magic' },
          { name: 'Fear' },
          { name: 'Fly' },
          { name: 'Gaseous Form' },
          { name: 'Hunger of Hadar' },
          { name: 'Hypnotic Pattern' },
          { name: 'Magic Circle' },
          { name: 'Major Image' },
          { name: 'Remove Curse' },
          { name: 'Tongues' },
          { name: 'Vampiric Touch' },
          { name: 'Banishment' },
          { name: 'Blight' },
          { name: 'Dimension Door' },
          { name: 'Hallucinatory Terrain' },
          { name: 'Phantasmal Killer' },
          { name: 'Wall of Fire' },
          { name: 'Contact Other Plane' },
          { name: 'Dream' },
          { name: 'Hold Monster' },
          { name: 'Scrying' },
          { name: 'Circle of Death' },
          { name: 'Conjure Fey' },
          { name: 'Create Undead' },
          { name: 'Eyebite' },
          { name: 'Flesh to Stone' },
          { name: 'Mass Suggestion' },
          { name: 'True Seeing' },
          { name: 'Finger of Death' },
          { name: 'Forcecage' },
          { name: 'Plane Shift' },
          { name: 'Demiplane' },
          { name: 'Etherealness' },
          { name: 'Maddening Darkness' },
          { name: 'Power Word Stun' },
          { name: 'Feeblemind' },
          { name: 'Imprisonment' },
          { name: 'True Polymorph' },
          { name: 'Foresight' },
          { name: 'Power Word Kill' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: [
          'Armor of Agathys',
          'Arms of Hadar',
          'Eldritch Blast',
          'Charm Person',
          'Comprehend Languages',
          'Expeditious Retreat',
          'Hellish Rebuke',
          'Hex',
          'Illusory Script',
          'Protection from Evil and Good',
          'Unseen Servant',
          'Witch Bolt'
        ],
        2: [
          'Cloud of Daggers',
          'Crown of Madness',
          'Darkness',
          'Enthrall',
          'Hold Person',
          'Invisibility',
          'Mirror Image',
          'Misty Step',
          'Ray of Enfeeblement',
          'Shatter',
          'Spider Climb',
          'Suggestion'
        ],
        3: [
          'Counterspell',
          'Dispel Magic',
          'Fear',
          'Fly',
          'Gaseous Form',
          'Hunger of Hadar',
          'Hypnotic Pattern',
          'Magic Circle',
          'Major Image',
          'Remove Curse',
          'Tongues',
          'Vampiric Touch'
        ],
        4: [
          'Banishment',
          'Blight',
          'Dimension Door',
          'Hallucinatory Terrain',
          'Phantasmal Killer',
          'Wall of Fire'
        ],
        5: ['Contact Other Plane', 'Dream', 'Hold Monster', 'Scrying'],
        6: [
          'Circle of Death',
          'Conjure Fey',
          'Create Undead',
          'Eyebite',
          'Flesh to Stone',
          'Mass Suggestion',
          'True Seeing'
        ],
        7: ['Finger of Death', 'Forcecage', 'Plane Shift'],
        8: [
          'Demiplane',
          'Etherealness',
          'Maddening Darkness',
          'Power Word Stun'
        ],
        9: [
          'Feeblemind',
          'Imprisonment',
          'True Polymorph',
          'Foresight',
          'Power Word Kill'
        ]
      }),
      spellSlotsByLevel: JSON.stringify({
        1: [1, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [0, 2, 0, 0, 0, 0, 0, 0, 0],
        4: [0, 2, 0, 0, 0, 0, 0, 0, 0],
        5: [0, 0, 2, 0, 0, 0, 0, 0, 0],
        6: [0, 0, 2, 0, 0, 0, 0, 0, 0],
        7: [0, 0, 0, 2, 0, 0, 0, 0, 0],
        8: [0, 0, 0, 2, 0, 0, 0, 0, 0],
        9: [0, 0, 0, 0, 2, 0, 0, 0, 0],
        10: [0, 0, 0, 0, 2, 0, 0, 0, 0],
        11: [0, 0, 0, 0, 3, 0, 0, 0, 0],
        12: [0, 0, 0, 0, 3, 0, 0, 0, 0],
        13: [0, 0, 0, 0, 3, 0, 0, 0, 0],
        14: [0, 0, 0, 0, 3, 0, 0, 0, 0],
        15: [0, 0, 0, 0, 3, 0, 0, 0, 0],
        16: [0, 0, 0, 0, 3, 0, 0, 0, 0],
        17: [0, 0, 0, 0, 4, 0, 0, 0, 0],
        18: [0, 0, 0, 0, 4, 0, 0, 0, 0],
        19: [0, 0, 0, 0, 4, 0, 0, 0, 0],
        20: [0, 0, 0, 0, 4, 0, 0, 0, 0]
      }),
      skillsByLevel: JSON.stringify({
        11: ['Mystic Arcanum']
      }),
      subClassAvailableAtLevel: 1,
      unusableItems: [],
      fightingStyles: [],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: JSON.stringify({}),
      invocationsKnownByLevel: JSON.stringify({
        1: 0,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 4,
        8: 4,
        9: 5,
        10: 5,
        11: 5,
        12: 6,
        13: 6,
        14: 6,
        15: 7,
        16: 7,
        17: 7,
        18: 8,
        19: 8,
        20: 8
      }),
      cantripsKnownByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 3,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 3,
        10: 4,
        11: 4,
        12: 4,
        13: 4,
        14: 4,
        15: 4,
        16: 4,
        17: 4,
        18: 4,
        19: 4,
        20: 4
      }),
      spellsKnownByLevel: JSON.stringify({
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7,
        7: 8,
        8: 9,
        9: 10,
        10: 10,
        11: 11,
        12: 11,
        13: 12,
        14: 12,
        15: 13,
        16: 13,
        17: 14,
        18: 14,
        19: 15,
        20: 15
      })
    }
  });

  const archfey = await prisma.subclass.create({
    data: {
      name: 'Archfey',
      description:
        'Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before the mortal races were born.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({
        1: ['Faerie Fire', 'Sleep'],
        2: ['Calm Emotions', 'Phantasmal Force'],
        3: ['Blink', 'Plant Growth'],
        4: ['Dominate Beast', 'Greater Invisibility'],
        5: ['Dominate Person', 'Seeming']
      }),
      skillsByLevel: JSON.stringify({}),
      abilitiesByLevel: JSON.stringify({
        1: ['Fey Presence'],
        6: ['Misty Escape'],
        10: ['Beguiling Defenses'],
        14: ['Dark Delirium']
      }),
      parentClass: {
        connect: { name: 'Warlock' }
      }
    }
  });

  const fiend = await prisma.subclass.create({
    data: {
      name: 'Fiend',
      description:
        'You have made a pact with a fiend from the lower planes of existence, a being whose aims are evil, even if you strive against those aims.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({
        1: ['Burning Hands', 'Command'],
        2: ['Blindness/Deafness', 'Scorching Ray'],
        3: ['Fireball', 'Stinking Cloud'],
        4: ['Fire Shield', 'Wall of Fire'],
        5: ['Flame Strike', 'Hallow']
      }),
      skillsByLevel: JSON.stringify({
        1: ["Dark One's Blessing"],
        6: ["Dark One's Own Luck"],
        10: ['Fiendish Resilience']
      }),
      abilitiesByLevel: JSON.stringify({
        14: ['Hurl Through Hell']
      }),
      parentClass: {
        connect: { name: 'Warlock' }
      }
    }
  });

  const greatOldOne = await prisma.subclass.create({
    data: {
      name: 'Great Old One',
      description:
        'Your patron is a mysterious entity whose nature is utterly foreign to the fabric of reality. It might come from the Far Realm, the space beyond reality, or it could be one of the elder gods known only in legends.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({
        1: ['Dissonant Whispers', "Tasha's Hideous Laughter"],
        2: ['Detect Thoughts', 'Phantasmal Force'],
        3: ['Clairvoyance', 'Sending'],
        4: ['Dominate Beast', "Evard's Black Tentacles"],
        5: ['Dominate Person', 'Telekinesis']
      }),
      skillsByLevel: JSON.stringify({
        1: ['Awakened Mind'],
        6: ['Entropic Ward'],
        10: ['Thought Shield']
      }),
      abilitiesByLevel: JSON.stringify({
        14: ['Create Thrall']
      }),
      parentClass: {
        connect: { name: 'Warlock' }
      }
    }
  });

  //WIZARD
  const wizard = await prisma.class.create({
    data: {
      name: 'Wizard',
      description:
        'A scholarly magic-user capable of manipulating the structures of reality',
      hitDice: 'D6',
      proficiencies: [
        'Dagger',
        'Dart',
        'Sling',
        'Quarterstaff',
        'Light Crossbow'
      ],
      savingThrowProficiencies: ['INT', 'WIS'],
      items: {
        connect: []
      },
      proficiencyBonusByLevel: JSON.stringify({
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 4,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      }),
      abilitiesByLevel: JSON.stringify({}),
      buffsByLevel: JSON.stringify({}),
      primaryAbilityScoreModifier: 'INT',
      pimarySpellAbilityScoreModifier: 'INT',
      spells: {
        connect: [
          { name: 'Acid Splash' },
          { name: 'Blade Ward' },
          { name: 'Chill Touch' },
          { name: 'Dancing Lights' },
          { name: 'Fire Bolt' },
          { name: 'Friends' },
          { name: 'Light' },
          { name: 'Mage Hand' },
          { name: 'Mending' },
          { name: 'Message' },
          { name: 'Minor Illusion' },
          { name: 'Poison Spray' },
          { name: 'Prestidigitation' },
          { name: 'Ray of Frost' },
          { name: 'Shocking Grasp' },
          { name: 'True Strike' },
          { name: 'Alarm' },
          { name: 'Burning Hands' },
          { name: 'Charm Person' },
          { name: 'Color Spray' },
          { name: 'Comprehend Languages' },
          { name: 'Detect Magic' },
          { name: 'Disguise Self' },
          { name: 'Expeditious Retreat' },
          { name: 'False Life' },
          { name: 'Feather Fall' },
          { name: 'Find Familiar' },
          { name: 'Fog Cloud' },
          { name: 'Grease' },
          { name: 'Identify' },
          { name: 'Illusory Script' },
          { name: 'Jump' },
          { name: 'Longstrider' },
          { name: 'Mage Armor' },
          { name: 'Magic Missile' },
          { name: 'Protection from Evil and Good' },
          { name: 'Shield' },
          { name: 'Silent Image' },
          { name: 'Sleep' },
          { name: "Tasha's Hideous Laughter" },
          { name: "Tenser's Floating Disk" },
          { name: 'Thunderwave' },
          { name: 'Unseen Servant' },
          { name: 'Witch Bolt' },
          { name: 'Alter Self' },
          { name: 'Arcane Lock' },
          { name: 'Blindness/Deafness' },
          { name: 'Blur' },
          { name: 'Cloud of Daggers' },
          { name: 'Continual Flame' },
          { name: 'Crown of Madness' },
          { name: 'Darkness' },
          { name: 'Darkvision' },
          { name: 'Detect Thoughts' },
          { name: 'Enlarge/Reduce' },
          { name: 'Flaming Sphere' },
          { name: 'Gentle Repose' },
          { name: 'Gust of Wind' },
          { name: 'Hold Person' },
          { name: 'Invisibility' },
          { name: 'Knock' },
          { name: 'Levitate' },
          { name: 'Locate Object' },
          { name: 'Magic Mouth' },
          { name: 'Magic Weapon' },
          { name: "Melf's Acid Arrow" },
          { name: 'Mirror Image' },
          { name: 'Misty Step' },
          { name: "Nystul's Magic Aura" },
          { name: 'Phantasmal Force' },
          { name: 'Ray of Enfeeblement' },
          { name: 'Rope Trick' },
          { name: 'Scorching Ray' },
          { name: 'See Invisibility' },
          { name: 'Shatter' },
          { name: 'Spider Climb' },
          { name: 'Suggestion' },
          { name: 'Web' },
          { name: 'Blink' },
          { name: 'Clairvoyance' },
          { name: 'Counterspell' },
          { name: 'Dispel Magic' },
          { name: 'Fear' },
          { name: 'Fireball' },
          { name: 'Fly' },
          { name: 'Gaseous Form' },
          { name: 'Haste' },
          { name: 'Hypnotic Pattern' },
          { name: "Leomund's Tiny Hut" },
          { name: 'Lightning Bolt' },
          { name: 'Magic Circle' },
          { name: 'Major Image' },
          { name: 'Nondetection' },
          { name: 'Phantom Steed' },
          { name: 'Protection from Energy' },
          { name: 'Remove Curse' },
          { name: 'Sending' },
          { name: 'Sleet Storm' },
          { name: 'Slow' },
          { name: 'Stinking Cloud' },
          { name: 'Tongues' },
          { name: 'Vampiric Touch' },
          { name: 'Water Breathing' },
          { name: 'Water Walk' },
          { name: 'Animate Dead' },
          { name: 'Arcane Eye' },
          { name: 'Banishment' },
          { name: "Evard's Black Tentacles" },
          { name: 'Blight' },
          { name: 'Confusion' },
          { name: 'Conjure Minor Elementals' },
          { name: 'Conjure Woodland Beings' },
          { name: 'Control Water' },
          { name: 'Dimension Door' },
          { name: 'Divination' },
          { name: 'Fabricate' },
          { name: 'Fire Shield' },
          { name: 'Greater Invisibility' },
          { name: 'Ice Storm' },
          { name: "Leomund's Secret Chest" },
          { name: 'Locate Creature' },
          { name: "Mordenkainen's Faithful Hound" },
          { name: "Mordenkainen's Private Sanctum" },
          { name: "Otiluke's Resilient Sphere" },
          { name: 'Phantasmal Killer' },
          { name: 'Polymorph' },
          { name: 'Stone Shape' },
          { name: 'Stoneskin' },
          { name: 'Wall of Fire' },
          { name: 'Animate Objects' },
          { name: 'Cloudkill' },
          { name: 'Cone of Cold' },
          { name: 'Conjure Elemental' },
          { name: 'Contact Other Plane' },
          { name: 'Creation' },
          { name: 'Dominate Person' },
          { name: 'Dream' },
          { name: 'Geas' },
          { name: 'Hold Monster' },
          { name: 'Legend Lore' },
          { name: 'Mislead' },
          { name: 'Modify Memory' },
          { name: 'Passwall' },
          { name: 'Planar Binding' },
          { name: 'Scrying' },
          { name: 'Seeming' },
          { name: 'Telekinesis' },
          { name: 'Teleportation Circle' },
          { name: 'Wall of Force' },
          { name: 'Wall of Stone' },
          { name: 'Arcane Gate' },
          { name: 'Chain Lightning' },
          { name: 'Circle of Death' },
          { name: 'Contingency' },
          { name: 'Create Undead' },
          { name: 'Disintegrate' },
          { name: "Drawmij's Instant Summons" },
          { name: 'Eyebite' },
          { name: 'Flesh to Stone' },
          { name: 'Globe of Invulnerability' },
          { name: 'Guards and Wards' },
          { name: 'Magic Jar' },
          { name: 'Mass Suggestion' },
          { name: 'Move Earth' },
          { name: "Otiluke's Freezing Sphere" },
          { name: "Otto's Irresistible Dance" },
          { name: 'Programmed Illusion' },
          { name: 'Scatter' },
          { name: 'Sequester' },
          { name: 'Simulacrum' },
          { name: 'Symbol' },
          { name: 'Teleport' },
          { name: 'Antimagic Field' },
          { name: 'Antipathy/Sympathy' },
          { name: 'Clone' },
          { name: 'Control Weather' },
          { name: 'Demiplane' },
          { name: 'Dominate Monster' },
          { name: 'Feeblemind' },
          { name: 'Glibness' },
          { name: 'Incendiary Cloud' },
          { name: 'Maze' },
          { name: 'Mind Blank' },
          { name: 'Power Word Stun' },
          { name: 'Shapechange' },
          { name: 'Time Stop' },
          { name: 'True Polymorph' },
          { name: 'Weird' },
          { name: 'Astral Projection' },
          { name: 'Foresight' },
          { name: 'Gate' },
          { name: 'Imprisonment' },
          { name: 'Meteor Swarm' },
          { name: 'Power Word Kill' },
          { name: 'Prismatic Wall' },
          { name: 'Wish' }
        ]
      },
      spellsByLevel: JSON.stringify({
        1: [
          'Alarm',
          'Burning Hands',
          'Charm Person',
          'Color Spray',
          'Comprehend Languages',
          'Detect Magic',
          'Disguise Self',
          'Expeditious Retreat',
          'False Life',
          'Feather Fall',
          'Find Familiar',
          'Fog Cloud',
          'Grease',
          'Identify',
          'Illusory Script',
          'Jump',
          'Longstrider',
          'Mage Armor',
          'Magic Missile',
          'Protection from Evil and Good',
          'Shield',
          'Silent Image',
          'Sleep',
          "Tasha's Hideous Laughter",
          "Tenser's Floating Disk",
          'Thunderwave',
          'Unseen Servant',
          'Witch Bolt'
        ],
        2: [
          'Alter Self',
          'Arcane Lock',
          'Blindness/Deafness',
          'Blur',
          'Cloud of Daggers',
          'Continual Flame',
          'Crown of Madness',
          'Darkness',
          'Darkvision',
          'Detect Thoughts',
          'Enlarge/Reduce',
          'Flaming Sphere',
          'Gentle Repose',
          'Gust of Wind',
          'Hold Person',
          'Invisibility',
          'Knock',
          'Levitate',
          'Locate Object',
          'Magic Mouth',
          'Magic Weapon',
          "Melf's Acid Arrow",
          'Mirror Image',
          'Misty Step',
          "Nystul's Magic Aura",
          'Phantasmal Force',
          'Ray of Enfeeblement',
          'Rope Trick',
          'Scorching Ray',
          'See Invisibility',
          'Shatter',
          'Spider Climb',
          'Suggestion',
          'Web'
        ],
        3: [
          'Blink',
          'Clairvoyance',
          'Counterspell',
          'Dispel Magic',
          'Fear',
          'Fireball',
          'Fly',
          'Gaseous Form',
          'Haste',
          'Hypnotic Pattern',
          "Leomund's Tiny Hut",
          'Lightning Bolt',
          'Magic Circle',
          'Major Image',
          'Nondetection',
          'Phantom Steed',
          'Protection from Energy',
          'Remove Curse',
          'Sending',
          'Sleet Storm',
          'Slow',
          'Stinking Cloud',
          'Tongues',
          'Vampiric Touch',
          'Water Breathing',
          'Water Walk'
        ],
        4: [
          'Arcane Eye',
          'Banishment',
          'Black Tentacles',
          'Blight',
          'Confusion',
          'Conjure Minor Elementals',
          'Conjure Woodland Beings',
          'Control Water',
          'Dimension Door',
          'Divination',
          "Evard's Black Tentacles",
          'Fabricate',
          'Faithful Hound',
          'Fire Shield',
          'Greater Invisibility',
          'Ice Storm',
          "Leomund's Secret Chest",
          'Locate Creature',
          "Mordenkainen's Faithful Hound",
          "Mordenkainen's Private Sanctum",
          "Otiluke's Resilient Sphere",
          'Phantasmal Killer',
          'Polymorph',
          'Secret Chest',
          'Stone Shape',
          'Stoneskin',
          'Wall of Fire'
        ],
        5: [
          'Animate Objects',
          'Cloudkill',
          'Cone of Cold',
          'Conjure Elemental',
          'Contact Other Plane',
          'Creation',
          'Dominate Person',
          'Dream',
          'Geas',
          'Hold Monster',
          'Legend Lore',
          'Mislead',
          'Modify Memory',
          'Passwall',
          'Planar Binding',
          'Scrying',
          'Seeming',
          'Telekinesis',
          'Teleportation Circle',
          'Wall of Force',
          'Wall of Stone'
        ],
        6: [
          'Arcane Gate',
          'Chain Lightning',
          'Circle of Death',
          'Contingency',
          'Create Undead',
          'Disintegrate',
          "Drawmij's Instant Summons",
          'Eyebite',
          'Flesh to Stone',
          'Globe of Invulnerability',
          'Guards and Wards',
          'Magic Jar',
          'Mass Suggestion',
          'Move Earth',
          "Otiluke's Freezing Sphere",
          "Otto's Irresistible Dance",
          'Programmed Illusion',
          'Scatter',
          'Sequester',
          'Simulacrum',
          'True Seeing'
        ],
        7: [
          'Delayed Blast Fireball',
          'Etherealness',
          'Finger of Death',
          'Forcecage',
          'Magnificent Mansion',
          'Mirage Arcane',
          "Mordenkainen's Sword",
          'Plane Shift',
          'Prismatic Spray',
          'Project Image',
          'Reverse Gravity',
          'Sequester',
          'Simulacrum',
          'Symbol',
          'Teleport'
        ],
        8: [
          'Antimagic Field',
          'Antipathy/Sympathy',
          'Clone',
          'Control Weather',
          'Demiplane',
          'Dominate Monster',
          'Feeblemind',
          'Incendiary Cloud',
          'Maze',
          'Mind Blank',
          'Power Word Stun',
          'Sunburst',
          'Telepathy'
        ],
        9: [
          'Astral Projection',
          'Foresight',
          'Gate',
          'Imprisonment',
          'Meteor Swarm',
          'Power Word Kill',
          'Prismatic Wall',
          'Shapechange',
          'Time Stop',
          'True Polymorph',
          'Weird',
          'Wish'
        ]
      }),
      spellSlotsByLevel: JSON.stringify({
        1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
        4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
        5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
        7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
        8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
        9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
        10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
        11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
        13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
        15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
        17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
        18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
        19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
        20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
      }),
      skillsByLevel: JSON.stringify({
        1: ['Arcane Recovery'],
        18: ['Spell Mastery'],
        20: ['Signature Spells']
      }),
      subClassAvailableAtLevel: 2,
      unusableItems: [],
      fightingStyles: [],
      movementSpeedBonusByLevel: JSON.stringify({}),
      exhaustionLevel: 0,
      kiPointsByLevel: JSON.stringify({}),
      sorceryPointsByLevel: JSON.stringify({}),
      sneakAttackByLevel: JSON.stringify({}),
      invocationsKnownByLevel: JSON.stringify({}),
      cantripsKnownByLevel: JSON.stringify({
        1: 3,
        2: 3,
        3: 3,
        4: 4,
        5: 4,
        6: 4,
        7: 4,
        8: 4,
        9: 4,
        10: 5,
        11: 5,
        12: 5,
        13: 5,
        14: 5,
        15: 5,
        16: 5,
        17: 5,
        18: 5,
        19: 5,
        20: 5
      }),
      spellsKnownByLevel: JSON.stringify({})
    }
  });

  const abjuration = await prisma.subclass.create({
    data: {
      name: 'School of Abjuration',
      description:
        'The School of Abjuration emphasizes magic that blocks, banishes, and protects.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        2: ['Abjuration Savant'],
        10: ['Improved Abjuration'],
        14: ['Spell Resistance']
      }),
      abilitiesByLevel: JSON.stringify({
        2: ['Arcane Ward'],
        6: ['Projected Ward']
      }),
      parentClass: {
        connect: { name: 'Wizard' }
      }
    }
  });

  const conjuration = await prisma.subclass.create({
    data: {
      name: 'School of Conjuration',
      description:
        'The School of Conjuration focuses on spells that produce objects and creatures out of thin air.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        2: ['Conjuration Savant'],
        10: ['Focused Conjuration'],
        14: ['Durable Summons']
      }),
      abilitiesByLevel: JSON.stringify({
        2: ['Minor Conjuration'],
        6: ['Benign Transposition']
      }),
      parentClass: {
        connect: { name: 'Wizard' }
      }
    }
  });

  const divination = await prisma.subclass.create({
    data: {
      name: 'School of Divination',
      description:
        'The School of Divination is concerned with divining the future and discovering hidden knowledge.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        2: ['Divination Savant', 'Portent'],
        6: ['Expert Divination'],
        14: ['Greater Portent']
      }),
      abilitiesByLevel: JSON.stringify({
        10: ['The Third Eye']
      }),
      parentClass: {
        connect: { name: 'Wizard' }
      }
    }
  });

  const enchantment = await prisma.subclass.create({
    data: {
      name: 'School of Enchantment',
      description:
        'The School of Enchantment is focused on spells that entrance and beguile other creatures.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        2: ['Enchantment Savant'],
        10: ['Split Enchantment'],
        14: ['Alter Memories']
      }),
      abilitiesByLevel: JSON.stringify({
        2: ['Hypnotic Gaze'],
        6: ['Instinctive Charm']
      }),
      parentClass: {
        connect: { name: 'Wizard' }
      }
    }
  });

  const evocation = await prisma.subclass.create({
    data: {
      name: 'School of Evocation',
      description:
        'The School of Evocation specializes in spells that create powerful elemental effects.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {},
      spellsByLevel: JSON.stringify({}),
      skillsByLevel: JSON.stringify({
        2: ['Evocation Savant', 'Sculpt Spells'],
        6: ['Potent Cantrip'],
        10: ['Empowered Evocation'],
        14: ['Overchannel']
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Wizard' }
      }
    }
  });

  const illusion = await prisma.subclass.create({
    data: {
      name: 'School of Illusion',
      description:
        'The School of Illusion focuses on creating illusions to deceive the senses.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [{ name: 'Minor Illusion' }]
      },
      spellsByLevel: JSON.stringify({
        2: ['Minor Illusion']
      }),
      skillsByLevel: JSON.stringify({
        2: ['Illusion Savant', 'Improved Minor Illusion'],
        6: ['Malleable Illusions'],
        10: ['Illusory Self'],
        14: ['Illusory Reality']
      }),
      abilitiesByLevel: JSON.stringify({}),
      parentClass: {
        connect: { name: 'Wizard' }
      }
    }
  });

  const necromancy = await prisma.subclass.create({
    data: {
      name: 'School of Necromancy',
      description:
        'The School of Necromancy is devoted to spells that manipulate the power of death.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [{ name: 'Animate Dead' }]
      },
      spellsByLevel: JSON.stringify({
        6: ['Animate Dead']
      }),
      skillsByLevel: JSON.stringify({
        2: ['Necromancy Savant', 'Grim Harvest'],
        6: ['Undead Thralls'],
        10: ['Inured to Undeath']
      }),
      abilitiesByLevel: JSON.stringify({
        14: ['Command Undead']
      }),
      parentClass: {
        connect: { name: 'Wizard' }
      }
    }
  });

  const transmutation = await prisma.subclass.create({
    data: {
      name: 'School of Transmutation',
      description:
        'The School of Transmutation is focused on spells that change the properties of matter.',
      proficiencies: [],
      savingThrowProficiencies: [],
      spells: {
        connect: [{ name: 'Polymorph' }]
      },
      spellsByLevel: JSON.stringify({
        10: ['Polymorph']
      }),
      skillsByLevel: JSON.stringify({
        2: ['Transmutation Savant', 'Minor Alchemy'],
        10: ['Shapechanger']
      }),
      abilitiesByLevel: JSON.stringify({
        6: ["Transmuter's Stone"],
        14: ['Master Transmuter']
      }),
      parentClass: {
        connect: { name: 'Wizard' }
      }
    }
  });

  console.log('Classes seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
