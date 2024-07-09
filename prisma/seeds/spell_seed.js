import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const cantrips = [
    {
      name: 'Acid Splash',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 60,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S'],
      savingThrows: 'DEX',
      description:
        'You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other.',
      damageType: 'ACID',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d6', 5: '2d6', 11: '3d6', 17: '4d6' }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      boostedBySpellModifier: false,
      maxSpaceBetweenTargets: 5,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              maxTargets: 2,
              maxDistanceBetweenTargets: 5
            })
          }
        ]
      }
    },
    {
      name: 'Chill Touch',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 120,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'You create a ghostly, skeletal hand in the space of a creature within range.',
      damageType: 'NECROTIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d8', 5: '2d8', 11: '3d8', 17: '4d8' }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({})
          }
        ]
      }
    },
    {
      name: 'Dancing Lights',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 120,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration.',
      effectType: 'UTILITY',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({ light: 'torch' })
          }
        ]
      }
    },
    {
      name: 'Fire Bolt',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 120,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'You hurl a mote of fire at a creature or object within range.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d10', 5: '2d10', 11: '3d10', 17: '4d10' }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({})
          }
        ]
      }
    },
    {
      name: 'Light',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 0, // Touch
      area: 20, // 20-foot radius
      school: 'EVOCATION',
      components: ['V', 'M'],
      description:
        'You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet.',
      effectType: 'UTILITY',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({ light: 'bright', radius: 20 })
          }
        ]
      }
    },
    {
      name: 'Mage Hand',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 30,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action.',
      effectType: 'UTILITY',
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({ action: 'manipulate', duration: 60 })
          }
        ]
      }
    },
    {
      name: 'Mending',
      spellLevel: 0,
      castingTime: 1, // 1 minute
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({ repair: 'single break or tear' })
          }
        ]
      }
    },
    {
      name: 'Message',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 120,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.',
      effectType: 'UTILITY',
      duration: 0, // 1 round
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'UTILITY',
            value: JSON.stringify({ communication: 'whisper', range: 120 })
          }
        ]
      }
    },
    {
      name: 'Minor Illusion',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 30,
      area: 5, // 5-foot cube
      school: 'ILLUSION',
      components: ['S', 'M'],
      description:
        'You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.',
      effectType: 'ILLUSION',
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'ILLUSION',
            value: JSON.stringify({
              sound: 'any',
              image: 'object',
              size: '5-foot cube'
            })
          }
        ]
      }
    },
    {
      name: 'Poison Spray',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 10,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S'],
      savingThrows: 'CON',
      description:
        'You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm.',
      damageType: 'POISON',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d12', 5: '2d12', 11: '3d12', 17: '4d12' }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({})
          }
        ]
      }
    },
    {
      name: 'Prestidigitation',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 10,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range:...',
      effectType: 'UTILITY',
      duration: 60, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({ effect: 'various' })
          }
        ]
      }
    },
    {
      name: 'Ray of Frost',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 60,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.',
      damageType: 'COLD',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d8', 5: '2d8', 11: '3d8', 17: '4d8' }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({})
          }
        ]
      }
    },
    {
      name: 'Shocking Grasp',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 0, // Touch
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can’t take reactions until the start of its next turn.',
      damageType: 'LIGHTNING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d8', 5: '2d8', 11: '3d8', 17: '4d8' }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({})
          }
        ]
      }
    },
    {
      name: 'Spare the Dying',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 0, // Touch
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.',
      effectType: 'HEALING',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'HEALING',
            value: JSON.stringify({ effect: 'stabilize' })
          }
        ]
      }
    },
    {
      name: 'Thaumaturgy',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 30,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V'],
      description:
        'You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range:...',
      effectType: 'UTILITY',
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({ effect: 'various' })
          }
        ]
      }
    },
    {
      name: 'True Strike',
      spellLevel: 0,
      castingTime: 0, // Action
      range: 30,
      area: 0,
      school: 'DIVINATION',
      components: ['S'],
      description:
        'You point a finger at a target in range. Your magic grants you a brief insight into the target’s defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn’t ended.',
      effectType: 'UTILITY',
      duration: 1, // 1 round
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'UTILITY',
            value: JSON.stringify({ advantage: 'next attack roll' })
          }
        ]
      }
    }
  ];

  const firstLevelSpells = [
    {
      name: 'Absorb Elements',
      spellLevel: 1,
      castingTime: 0, // 1 reaction
      range: 0, // Self
      area: 0,
      school: 'ABJURATION',
      components: ['S'],
      description:
        'The spell captures some of the incoming energy, lessening its effect on you and storing it for your next melee attack. You have resistance to the triggering damage type until the start of your next turn. Also, the first time you hit with a melee attack on your next turn, the target takes an extra 1d6 damage of the triggering type, and the spell ends.',
      damageType: 'VARIES',
      effectType: 'PROTECTION',
      rolls: JSON.stringify({ 1: '1d6' }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 6, // 1 round
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'PROTECTION',
            value: JSON.stringify({ absorbElements: true, duration: 6 })
          },
          {
            targetType: 'Self',
            effectType: 'DAMAGE',
            value: JSON.stringify({ damage: 'varies', duration: 6 })
          }
        ]
      }
    },
    {
      name: 'Alarm',
      spellLevel: 1,
      castingTime: 60, // 1 minute
      range: 30,
      area: 20, // 20-foot cube
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area.',
      effectType: 'UTILITY',
      duration: 28800, // 8 hours
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({
              alarm: true,
              areaSize: '20-foot cube',
              duration: 28800
            })
          }
        ]
      }
    },
    {
      name: 'Animal Friendship',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast’s Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a Wisdom saving throw or be charmed by you for the spell’s duration. If you or one of your companions harms the target, the spell ends.',
      effectType: 'CONTROL',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({ charmed: true, duration: 86400 })
          }
        ]
      }
    },
    {
      name: 'Arms of Hadar',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Self (10-foot radius)
      area: 10, // 10-foot radius
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'You invoke the power of Hadar, the Dark Hunger. Tendrils of dark energy erupt from you and batter all creatures within 10 feet of you. Each creature in that area must make a Strength saving throw. On a failed save, a target takes 2d6 necrotic damage and can’t take reactions until its next turn. On a successful save, the creature takes half damage, but suffers no other effect.',
      damageType: 'NECROTIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '2d6' }),
      rollsBySpellSlot: JSON.stringify({
        1: '2d6',
        2: '3d6',
        3: '4d6',
        4: '5d6',
        5: '6d6',
        6: '7d6',
        7: '8d6',
        8: '9d6',
        9: '10d6'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'necrotic',
              areaSize: '10-foot radius',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Bane',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'Up to three creatures of your choice that you can see within range must make Charisma saving throws. Whenever a target that fails this saving throw makes an attack roll or a saving throw before the spell ends, the target must roll a d4 and subtract the number rolled from the attack roll or saving throw.',
      effectType: 'DEBUFF',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creatures',
            effectType: 'DEBUFF',
            value: JSON.stringify({ bane: true, duration: 60 })
          }
        ]
      }
    },
    {
      name: 'Bless',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.',
      effectType: 'BUFF',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creatures',
            effectType: 'BUFF',
            value: JSON.stringify({ bless: true, duration: 60 })
          }
        ]
      }
    },
    {
      name: 'Burning Hands',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Self (15-foot cone)
      area: 15, // 15-foot cone
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '3d6' }),
      rollsBySpellSlot: JSON.stringify({
        1: '3d6',
        2: '4d6',
        3: '5d6',
        4: '6d6',
        5: '7d6',
        6: '8d6',
        7: '9d6',
        8: '10d6',
        9: '11d6'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire',
              areaSize: '15-foot cone',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Charm Person',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S'],
      description:
        'You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you.',
      effectType: 'CONTROL',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Humanoid',
            effectType: 'CONTROL',
            value: JSON.stringify({ charmed: true, duration: 3600 })
          }
        ]
      }
    },
    {
      name: 'Chromatic Orb',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 90,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'You hurl a 4-inch-diameter sphere of energy at a creature that you can see within range. You choose acid, cold, fire, lightning, poison, or thunder for the type of orb you create, and then make a ranged spell attack against the target. If the attack hits, the creature takes 3d8 damage of the type you chose.',
      damageType: 'VARIES',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '3d8' }),
      rollsBySpellSlot: JSON.stringify({
        1: '3d8',
        2: '4d8',
        3: '5d8',
        4: '6d8',
        5: '7d8',
        6: '8d8',
        7: '9d8',
        8: '10d8',
        9: '11d8'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'varies',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Color Spray',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Self (15-foot cone)
      area: 15, // 15-foot cone
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'A dazzling array of flashing, colored light springs from your hand. Roll 6d10; the total is how many hit points of creatures this spell can affect. Creatures in a 15-foot cone originating from you are affected in ascending order of their current hit points (ignoring unconscious creatures and creatures that can’t see).',
      effectType: 'CONTROL',
      rolls: JSON.stringify({ 1: '6d10' }),
      rollsBySpellSlot: JSON.stringify({
        1: '6d10',
        2: '8d10',
        3: '10d10',
        4: '12d10',
        5: '14d10',
        6: '16d10',
        7: '18d10',
        8: '20d10',
        9: '22d10'
      }),
      rollByCharacterLevel: false,
      duration: 1, // 1 round
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              hitPointsAffected: '6d10',
              areaSize: '15-foot cone',
              duration: 1
            })
          }
        ]
      }
    },
    {
      name: 'Command',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V'],
      description:
        'You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn’t understand your language, or if your command is directly harmful to it.',
      effectType: 'CONTROL',
      duration: 6, // 1 round
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({ command: true, duration: 6 })
          }
        ]
      }
    },
    {
      name: 'Compelled Duel',
      spellLevel: 1,
      castingTime: 0, // 1 bonus action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V'],
      description:
        'You attempt to compel a creature into a duel. One creature that you can see within range must make a Wisdom saving throw. On a failed save, the creature is drawn to you, compelled by your divine demand. For the duration, it has disadvantage on attack rolls against creatures other than you, and must make a Wisdom saving throw each time it attempts to move to a space that is more than 30 feet away from you. If it succeeds on this saving throw, the spell doesn’t restrict the target’s movement for that turn.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({ compelledDuel: true, duration: 60 })
          }
        ]
      }
    },
    {
      name: 'Comprehend Languages',
      spellLevel: 1,
      castingTime: 1,
      range: 0,
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text.',
      effectType: 'UTILITY',
      duration: 60,
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'UTILITY',
            value: JSON.stringify({
              description:
                'Understand the literal meaning of any spoken language and any written language that you see.',
              duration: 3600,
              area: 'Self'
            })
          }
        ]
      }
    },
    {
      name: 'Create or Destroy Water',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 30,
      area: 30, // 30-foot cube
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You either create or destroy water. Create Water: You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot cube within range, extinguishing exposed flames in the area. Destroy Water: You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot cube within range.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({
              createOrDestroyWater: true,
              areaSize: '30-foot cube',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Cure Wounds',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.',
      effectType: 'HEALING',
      rolls: JSON.stringify({ 1: '1d8 + spellcasting modifier' }),
      rollsBySpellSlot: JSON.stringify({
        1: '1d8 + spellcasting modifier',
        2: '2d8 + spellcasting modifier',
        3: '3d8 + spellcasting modifier',
        4: '4d8 + spellcasting modifier',
        5: '5d8 + spellcasting modifier',
        6: '6d8 + spellcasting modifier',
        7: '7d8 + spellcasting modifier',
        8: '8d8 + spellcasting modifier',
        9: '9d8 + spellcasting modifier'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'HEALING',
            value: JSON.stringify({
              healing: '1d8 + spellcasting modifier',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Detect Magic',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 30, // 30-foot radius
      school: 'DIVINATION',
      components: ['V', 'S'],
      description:
        'For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any. The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.',
      effectType: 'DETECTION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'DETECTION',
            value: JSON.stringify({
              detectMagic: true,
              areaSize: '30-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Disguise Self',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S'],
      description:
        'You make yourself—including your clothing, armor, weapons, and other belongings on your person—look different until the spell ends or until you use your action to dismiss it. You can seem 1 foot shorter or taller and can appear thin, fat, or in between. You can’t change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you.',
      effectType: 'ILLUSION',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'ILLUSION',
            value: JSON.stringify({ disguiseSelf: true, duration: 3600 })
          }
        ]
      }
    },
    {
      name: 'Divine Favor',
      spellLevel: 1,
      castingTime: 0, // 1 bonus action
      range: 0, // Self
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit.',
      damageType: 'RADIANT',
      effectType: 'BUFF',
      rolls: JSON.stringify({ 1: '1d4' }),
      rollsBySpellSlot: JSON.stringify({
        1: '1d4',
        2: '2d4',
        3: '3d4',
        4: '4d4',
        5: '5d4',
        6: '6d4',
        7: '7d4',
        8: '8d4',
        9: '9d4'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'BUFF',
            value: JSON.stringify({
              damage: 'radiant',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Ensnaring Strike',
      spellLevel: 1,
      castingTime: 0, // 1 bonus action
      range: 0, // Self
      area: 0,
      school: 'CONJURATION',
      components: ['V'],
      description:
        'The next time you hit a creature with a weapon attack before this spell ends, a writhing mass of thorny vines appears at the point of impact, and the target must succeed on a Strength saving throw or be restrained by the magical vines until the spell ends.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({ restrained: true, duration: 60 })
          }
        ]
      }
    },
    {
      name: 'Faerie Fire',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 60,
      area: 20, // 20-foot cube
      school: 'EVOCATION',
      components: ['V'],
      description:
        'Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice). Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius. Any attack roll against an affected creature or object has advantage if the attacker can see it, and the affected creature or object can’t benefit from being invisible.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              faerieFire: true,
              areaSize: '20-foot cube',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'False Life',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'Bolstering yourself with a necromantic facsimile of life, you gain 1d4 + 4 temporary hit points for the duration.',
      effectType: 'BUFF',
      rolls: JSON.stringify({ 1: '1d4 + 4' }),
      rollsBySpellSlot: JSON.stringify({
        1: '1d4 + 4',
        2: '2d4 + 4',
        3: '3d4 + 4',
        4: '4d4 + 4',
        5: '5d4 + 4',
        6: '6d4 + 4',
        7: '7d4 + 4',
        8: '8d4 + 4',
        9: '9d4 + 4'
      }),
      rollByCharacterLevel: false,
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'BUFF',
            value: JSON.stringify({
              tempHp: '1d4 + 4',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Feather Fall',
      spellLevel: 1,
      castingTime: -1, // 1 reaction
      range: 60,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'M'],
      description:
        'Choose up to five falling creatures within range. A falling creature’s rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage and can land on its feet, and the spell ends for that creature.',
      effectType: 'PROTECTION',
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creatures',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              featherFall: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Fog Cloud',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 120,
      area: 20, // 20-foot radius sphere
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.',
      effectType: 'CONTROL',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              fogCloud: true,
              areaSize: '20-foot radius sphere',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Grease',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 60,
      area: 10, // 10-foot square
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'Slick grease covers the ground in a 10-foot square centered on a point within range and turns it into difficult terrain for the duration. When the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or ends its turn there must also succeed on a Dexterity saving throw or fall prone.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              grease: true,
              areaSize: '10-foot square',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Healing Word',
      spellLevel: 1,
      castingTime: 0, // 1 bonus action
      range: 60,
      area: 0,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs.',
      effectType: 'HEALING',
      rolls: JSON.stringify({ 1: '1d4 + spellcasting modifier' }),
      rollsBySpellSlot: JSON.stringify({
        1: '1d4 + spellcasting modifier',
        2: '2d4 + spellcasting modifier',
        3: '3d4 + spellcasting modifier',
        4: '4d4 + spellcasting modifier',
        5: '5d4 + spellcasting modifier',
        6: '6d4 + spellcasting modifier',
        7: '7d4 + spellcasting modifier',
        8: '8d4 + spellcasting modifier',
        9: '9d4 + spellcasting modifier'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'HEALING',
            value: JSON.stringify({
              healing: '1d4 + spellcasting modifier',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Heroism',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S'],
      description:
        'A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns. When the spell ends, the target loses any remaining temporary hit points from this spell.',
      effectType: 'BUFF',
      rolls: JSON.stringify({ 1: 'spellcasting modifier' }),
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              tempHp: 'spellcasting modifier',
              immune: 'frightened',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Identify',
      spellLevel: 1,
      castingTime: 600, // 10 minutes
      range: 0, // Touch
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'You choose one object that you must touch throughout the casting of the spell. If it is a magic item or some other magic-imbued object, you learn its properties and how to use them, whether it requires attunement to use, and how many charges it has, if any. You learn whether any spells are affecting the item and what they are. If the item was created by a spell, you learn which spell created it.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              identify: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Illusory Script',
      spellLevel: 1,
      castingTime: 60, // 1 minute
      range: 0, // Touch
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'You write on parchment, paper, or some other suitable writing material and imbue it with a potent illusion that lasts for the duration. To you and any creatures you designate when you cast the spell, the writing appears normal, written in your hand, and conveys whatever meaning you intended when you wrote the text. To all others, the writing appears as if it were written in an unknown or magical script that is unintelligible. Alternatively, you can cause the writing to appear to be an entirely different message, written in a different hand and language, though the language must be one you know. Should the spell be dispelled, the original script and the illusion both disappear.',
      effectType: 'ILLUSION',
      duration: 86400, // 10 days
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'ILLUSION',
            value: JSON.stringify({
              illusoryScript: true,
              duration: 864000
            })
          }
        ]
      }
    },
    {
      name: 'Inflict Wounds',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'Make a melee spell attack against a creature you can reach. On a hit, the target takes 3d10 necrotic damage.',
      damageType: 'NECROTIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '3d10' }),
      rollsBySpellSlot: JSON.stringify({
        1: '3d10',
        2: '4d10',
        3: '5d10',
        4: '6d10',
        5: '7d10',
        6: '8d10',
        7: '9d10',
        8: '10d10',
        9: '11d10'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'necrotic',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Jump',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a creature. The creature’s jump distance is tripled until the spell ends.',
      effectType: 'MOVEMENT',
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              jump: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Longstrider',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a creature. The target’s speed increases by 10 feet until the spell ends.',
      effectType: 'BUFF',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              speedIncrease: '10 feet',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Mage Armor',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a willing creature who isn’t wearing armor, and a protective magical force surrounds it until the spell ends. The target’s base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action.',
      effectType: 'PROTECTION',
      duration: 28800, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              mageArmor: true,
              duration: 28800
            })
          }
        ]
      }
    },
    {
      name: 'Magic Missile',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4+1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.',
      damageType: 'FORCE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d4+1' }),
      rollsBySpellSlot: JSON.stringify({
        1: '1d4+1',
        2: '2d4+2',
        3: '3d4+3',
        4: '4d4+4',
        5: '5d4+5',
        6: '6d4+6',
        7: '7d4+7',
        8: '8d4+8',
        9: '9d4+9'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'force',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Protection from Evil and Good',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'Until the spell ends, one willing creature you touch is protected against certain types of creatures: aberrations, celestials, elementals, fey, fiends, and undead. The protection grants several benefits. Creatures of those types have disadvantage on attack rolls against the target. The target also can’t be charmed, frightened, or possessed by them. If the target is already charmed, frightened, or possessed by such a creature, the target has advantage on any new saving throw against the relevant effect.',
      effectType: 'PROTECTION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              protectionFrom: [
                'aberrations',
                'celestials',
                'elementals',
                'fey',
                'fiends',
                'undead'
              ],
              disadvantageOnAttacks: true,
              immuneToCharm: true,
              immuneToFrighten: true,
              immuneToPossession: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Purify Food and Drink',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 10,
      area: 5, // 5-foot radius sphere
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'All nonmagical food and drink within a 5-foot-radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({
              purifyFoodAndDrink: true,
              areaSize: '5-foot radius sphere',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Ray of Sickness',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'A ray of sickening greenish energy lashes out toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 poison damage and must make a Constitution saving throw. On a failed save, it is also poisoned until the end of your next turn.',
      damageType: 'POISON',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '2d8' }),
      rollsBySpellSlot: JSON.stringify({
        1: '2d8',
        2: '3d8',
        3: '4d8',
        4: '5d8',
        5: '6d8',
        6: '7d8',
        7: '8d8',
        8: '9d8',
        9: '10d8'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'poison',
              poisoned: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Sanctuary',
      spellLevel: 1,
      castingTime: 0, // 1 bonus action
      range: 30,
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You ward a creature within range against attack. Until the spell ends, any creature who targets the warded creature with an attack or a harmful spell must first make a Wisdom saving throw. On a failed save, the creature must choose a new target or lose the attack or spell. This spell doesn’t protect the warded creature from area effects, such as the explosion of a fireball.',
      effectType: 'PROTECTION',
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              sanctuary: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Shield',
      spellLevel: 1,
      castingTime: -1, // 1 reaction
      range: 0, // Self
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.',
      effectType: 'PROTECTION',
      duration: 1, // 1 round
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              shield: true,
              acBonus: 5,
              immuneToMagicMissile: true,
              duration: 1
            })
          }
        ]
      }
    },
    {
      name: 'Shield of Faith',
      spellLevel: 1,
      castingTime: 0, // 1 bonus action
      range: 60,
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'A shimmering field appears and surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration.',
      effectType: 'BUFF',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              shieldOfFaith: true,
              acBonus: 2,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Silent Image',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 60,
      area: 15, // 15-foot cube
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn’t accompanied by sound, smell, or other sensory effects.',
      effectType: 'ILLUSION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'ILLUSION',
            value: JSON.stringify({
              silentImage: true,
              areaSize: '15-foot cube',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Sleep',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 90,
      area: 20, // 20-foot radius sphere
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures).',
      effectType: 'CONTROL',
      rolls: JSON.stringify({ 1: '5d8' }),
      rollsBySpellSlot: JSON.stringify({
        1: '5d8',
        2: '7d8',
        3: '9d8',
        4: '11d8',
        5: '13d8',
        6: '15d8',
        7: '17d8',
        8: '19d8',
        9: '21d8'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              sleep: true,
              hitPointsAffected: '5d8',
              areaSize: '20-foot radius sphere',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Speak with Animals',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S'],
      description:
        'You gain the ability to comprehend and verbally communicate with beasts for the duration. The knowledge and awareness of many beasts is limited by their intelligence, but at minimum, beasts can give you information about nearby locations and monsters, including whatever they can perceive or have perceived within the past day. You might be able to persuade a beast to perform a small favor for you, at the GM’s discretion.',
      effectType: 'UTILITY',
      duration: 600, // 10 minutes
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'UTILITY',
            value: JSON.stringify({
              speakWithAnimals: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Tasha’s Hideous Laughter',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. The target must succeed on a Wisdom saving throw or fall prone, becoming incapacitated and unable to stand up for the duration.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              incapacitated: true,
              prone: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Tenser’s Floating Disk',
      spellLevel: 1,
      castingTime: 60, // 1 minute
      range: 30,
      area: 3, // 3-foot diameter disk
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration, and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground. The disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. If you move more than 100 feet from it (typically because it can’t move around an obstacle to follow you), the spell ends.',
      effectType: 'UTILITY',
      duration: 36000, // 1 hour
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'UTILITY',
            value: JSON.stringify({
              floatingDisk: true,
              duration: 36000
            })
          }
        ]
      }
    },
    {
      name: 'Thunderwave',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 0, // Self (15-foot cube)
      area: 15, // 15-foot cube
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed.',
      damageType: 'THUNDER',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '2d8' }),
      rollsBySpellSlot: JSON.stringify({
        1: '2d8',
        2: '3d8',
        3: '4d8',
        4: '5d8',
        5: '6d8',
        6: '7d8',
        7: '8d8',
        8: '9d8',
        9: '10d8'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'thunder',
              areaSize: '15-foot cube',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Unseen Servant',
      spellLevel: 1,
      castingTime: 60, // 1 minute
      range: 60,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell creates an invisible, mindless, shapeless force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 hit point, and a Strength of 2, and it can’t attack. If it drops to 0 hit points, the spell ends. Once on each of your turns as a bonus action, you can mentally command the servant to move up to 15 feet and interact with an object.',
      effectType: 'UTILITY',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'UTILITY',
            value: JSON.stringify({
              unseenServant: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Witch Bolt',
      spellLevel: 1,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A beam of crackling, blue energy lances out toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against that creature. On a hit, the target takes 1d12 lightning damage, and on each of your turns for the duration, you can use your action to deal 1d12 lightning damage to the target automatically.',
      damageType: 'LIGHTNING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d12' }),
      rollsBySpellSlot: JSON.stringify({
        1: '1d12',
        2: '2d12',
        3: '3d12',
        4: '4d12',
        5: '5d12',
        6: '6d12',
        7: '7d12',
        8: '8d12',
        9: '9d12'
      }),
      rollByCharacterLevel: false,
      duration: 600, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'lightning',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Wrathful Smite',
      spellLevel: 1,
      castingTime: 0, // 1 bonus action
      range: 0, // Self
      area: 0,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'The next time you hit with a melee weapon attack during this spell’s duration, your attack deals an extra 1d6 psychic damage. Additionally, if the target is a creature, it must make a Wisdom saving throw or be frightened of you until the spell ends.',
      damageType: 'PSYCHIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d6' }),
      rollsBySpellSlot: JSON.stringify({
        1: '1d6',
        2: '2d6',
        3: '3d6',
        4: '4d6',
        5: '5d6',
        6: '6d6',
        7: '7d6',
        8: '8d6',
        9: '9d6'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'psychic',
              duration: 60
            })
          },
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              frightened: true,
              duration: 60
            })
          }
        ]
      }
    }
  ];

  const secondLevelSpells = [
    {
      name: 'Acid Arrow',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 90,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.',
      damageType: 'ACID',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '4d4' }),
      rollsBySpellSlot: JSON.stringify({
        1: '4d4',
        2: '5d4',
        3: '6d4',
        4: '7d4',
        5: '8d4',
        6: '9d4',
        7: '10d4',
        8: '11d4',
        9: '12d4'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'acid',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Aid',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target’s hit point maximum and current hit points increase by 5 for the duration.',
      effectType: 'BUFF',
      duration: 4800, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'BUFF',
            value: JSON.stringify({
              hitPointsIncrease: 5,
              duration: 4800
            })
          }
        ]
      }
    },
    {
      name: 'Alter Self',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'You assume a different form. When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. You can end one option as an action to gain the benefits of a different one: Aquatic Adaptation, Change Appearance, Natural Weapons.',
      effectType: 'TRANSFORMATION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              options: [
                'Aquatic Adaptation',
                'Change Appearance',
                'Natural Weapons'
              ],
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Animal Messenger',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'By means of this spell, you use an animal to deliver a message. Choose a Tiny beast you can see within range, such as a squirrel, a blue jay, or a bat. You specify a location, which the creature knows, and deliver a message of up to twenty-five words. The beast travels for the duration of the spell towards the specified location, covering about 50 miles per 24 hours for a flying messenger, or 25 miles for other animals.',
      effectType: 'UTILITY',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'UTILITY',
            value: JSON.stringify({
              animalMessenger: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Arcane Lock',
      spellLevel: 2,
      castingTime: 600, // 10 minutes
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a closed door, window, gate, chest, or other entryway, and it becomes locked for the duration. You and the creatures you designate when you cast this spell can open the object normally. You can also set a password that, when spoken within 5 feet of the object, suppresses this spell for 1 minute. Otherwise, it is impassable until it is broken or the spell is dispelled or suppressed.',
      effectType: 'UTILITY',
      duration: 0, // Permanent until dispelled
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              arcaneLock: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Augury',
      spellLevel: 2,
      castingTime: 60, // 1 minute
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'By casting gem-inlaid sticks, rolling dragon bones, laying out ornate cards, or employing some other divining tool, you receive an omen from an otherworldly entity about the results of a specific course of action that you plan to take within the next 30 minutes. The GM chooses from the following possible omens: Weal, Woe, Weal and woe, Nothing.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'UTILITY',
            value: JSON.stringify({
              augury: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Barkskin',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a willing creature. Until the spell ends, the target’s skin has a rough, bark-like appearance, and the target’s AC can’t be less than 16, regardless of what kind of armor it is wearing.',
      effectType: 'BUFF',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              barkskin: true,
              acMin: 16,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Blindness/Deafness',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'NECROMANCY',
      components: ['V'],
      description:
        'You can blind or deafen a foe. Choose one creature that you can see within range to make a Constitution saving throw. If it fails, the target is either blinded or deafened (your choice) for the duration. At the end of each of its turns, the target can make a Constitution saving throw. On a success, the spell ends.',
      effectType: 'DEBUFF',
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DEBUFF',
            value: JSON.stringify({
              blindness: true,
              deafness: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Blur',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'ILLUSION',
      components: ['V'],
      description:
        'Your body becomes blurred, shifting and wavering to all who can see you. For the duration, any creature has disadvantage on attack rolls against you. An attacker is immune to this effect if it doesn’t rely on sight, as with blindsight, or can see through illusions, as with truesight.',
      effectType: 'PROTECTION',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              blur: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Branding Smite',
      spellLevel: 2,
      castingTime: 0, // 1 bonus action
      range: 0, // Self
      area: 0,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'The next time you hit a creature with a weapon attack before this spell ends, the weapon gleams with astral radiance as you strike. The attack deals an extra 2d6 radiant damage to the target, which becomes visible if it’s invisible, and the target sheds dim light in a 5-foot radius and can’t become invisible until the spell ends.',
      damageType: 'RADIANT',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '2d6' }),
      rollsBySpellSlot: JSON.stringify({
        1: '2d6',
        2: '3d6',
        3: '4d6',
        4: '5d6',
        5: '6d6',
        6: '7d6',
        7: '8d6',
        8: '9d6',
        9: '10d6'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'radiant',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Cloud of Daggers',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 5, // 5-foot cube
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You fill the air with spinning daggers in a cube 5 feet on each side, centered on a point you choose within range. A creature takes 4d4 slashing damage when it enters the spell’s area for the first time on a turn or starts its turn there.',
      damageType: 'SLASHING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '4d4' }),
      rollsBySpellSlot: JSON.stringify({
        1: '4d4',
        2: '6d4',
        3: '8d4',
        4: '10d4',
        5: '12d4',
        6: '14d4',
        7: '16d4',
        8: '18d4',
        9: '20d4'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'slashing',
              areaSize: '5-foot cube',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Continual Flame',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A flame, equivalent in brightness to a torch, springs forth from an object that you touch. The effect looks like a regular flame, but it creates no heat and doesn’t use oxygen. A continual flame can be covered or hidden but not smothered or quenched.',
      effectType: 'UTILITY',
      duration: 0, // Permanent until dispelled
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              continualFlame: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Cordon of Arrows',
      spellLevel: 2,
      castingTime: 60, // 1 minute
      range: 5,
      area: 5, // 5-foot radius
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You plant four pieces of nonmagical ammunition – arrows or crossbow bolts – in the ground within range and lay magic upon them to protect an area. Until the spell ends, whenever a creature other than you comes within 30 feet of the ammunition for the first time on a turn or ends its turn there, one piece of ammunition flies up to strike it. The creature must succeed on a Dexterity saving throw or take 1d6 piercing damage.',
      damageType: 'PIERCING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d6' }),
      rollsBySpellSlot: JSON.stringify({
        1: '1d6',
        2: '2d6',
        3: '3d6',
        4: '4d6',
        5: '5d6',
        6: '6d6',
        7: '7d6',
        8: '8d6',
        9: '9d6'
      }),
      rollByCharacterLevel: false,
      duration: 4800, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'piercing',
              areaSize: '5-foot radius',
              duration: 4800
            })
          }
        ]
      }
    },
    {
      name: 'Darkness',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 15, // 15-foot radius sphere
      school: 'EVOCATION',
      components: ['V', 'M'],
      description:
        'Magical darkness spreads from a point you choose within range to fill a 15-foot-radius sphere for the duration. The darkness spreads around corners. A creature with darkvision can’t see through this darkness, and nonmagical light can’t illuminate it.',
      effectType: 'CONTROL',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              darkness: true,
              areaSize: '15-foot radius sphere',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Darkvision',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a willing creature to grant it the ability to see in the dark. For the duration, that creature has darkvision out to a range of 60 feet.',
      effectType: 'BUFF',
      duration: 28800, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              darkvision: 60,
              duration: 28800
            })
          }
        ]
      }
    },
    {
      name: 'Detect Thoughts',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'For the duration, you can read the thoughts of certain creatures. When you cast the spell and as your action on each turn until the spell ends, you can focus your mind on any one creature that you can see within 30 feet of you. If the creature you choose has an Intelligence of 3 or lower or doesn’t speak any language, the creature is unaffected.',
      effectType: 'UTILITY',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'UTILITY',
            value: JSON.stringify({
              detectThoughts: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Enhance Ability',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a creature and bestow upon it a magical enhancement. Choose one of the following effects; the target gains the effect until the spell ends: Bear’s Endurance, Bull’s Strength, Cat’s Grace, Eagle’s Splendor, Fox’s Cunning, Owl’s Wisdom.',
      effectType: 'BUFF',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              options: [
                'Bear’s Endurance',
                'Bull’s Strength',
                'Cat’s Grace',
                'Eagle’s Splendor',
                'Fox’s Cunning',
                'Owl’s Wisdom'
              ],
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Enlarge/Reduce',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You cause a creature or an object you can see within range to grow larger or smaller for the duration. Choose either a creature or an object that is neither worn nor carried. If the target is unwilling, it can make a Constitution saving throw. On a success, the spell has no effect.',
      effectType: 'TRANSFORMATION',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              enlargeReduce: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Flame Blade',
      spellLevel: 2,
      castingTime: 0, // 1 bonus action
      range: 0, // Self
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke the blade again as a bonus action.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '3d6' }),
      rollsBySpellSlot: JSON.stringify({
        2: '3d6',
        3: '4d6',
        4: '5d6',
        5: '6d6',
        6: '7d6',
        7: '8d6',
        8: '9d6',
        9: '10d6'
      }),
      rollByCharacterLevel: false,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Find Traps',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S'],
      description:
        'You sense the presence of any trap within range that is within line of sight. A trap, for the purpose of this spell, includes anything that would inflict a sudden or unexpected effect you consider harmful or undesirable, which was specifically intended as such by its creator.',
      effectType: 'DETECTION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DETECTION',
            value: JSON.stringify({
              findTraps: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Flaming Sphere',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 5, // 5-foot diameter sphere
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'A 5-foot-diameter sphere of fire appears in an unoccupied space of your choice within range and lasts for the duration. Any creature that ends its turn within 5 feet of the sphere must make a Dexterity saving throw. The creature takes 2d6 fire damage on a failed save, or half as much damage on a successful one.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '2d6' }),
      rollsBySpellSlot: JSON.stringify({
        2: '2d6',
        3: '3d6',
        4: '4d6',
        5: '5d6',
        6: '6d6',
        7: '7d6',
        8: '8d6',
        9: '9d6'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire',
              areaSize: '5-foot diameter sphere',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Gust of Wind',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 10, // 10 feet wide
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the spell’s duration. Each creature that starts its turn in the line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the line.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              gustOfWind: true,
              areaSize: '60 feet long, 10 feet wide',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Hold Person',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends on the target.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              holdPerson: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Invisibility',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person. The spell ends for a target that attacks or casts a spell.',
      effectType: 'UTILITY',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'UTILITY',
            value: JSON.stringify({
              invisibility: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Knock',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V'],
      description:
        'Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access. A target that is held shut by a mundane lock or that is stuck or barred becomes unlocked, unstuck, or unbarred.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              knock: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Lesser Restoration',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned.',
      effectType: 'RESTORATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'RESTORATION',
            value: JSON.stringify({
              lesserRestoration: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Levitate',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'One creature or object of your choice that you can see within range rises vertically, up to 20 feet, and remains suspended there for the duration. The spell can levitate a target that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected.',
      effectType: 'CONTROL',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature/Object',
            effectType: 'CONTROL',
            value: JSON.stringify({
              levitate: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Locate Object',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 1000,
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'Describe or name an object that is familiar to you. You sense the direction to the object’s location, as long as that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement.',
      effectType: 'DETECTION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'DETECTION',
            value: JSON.stringify({
              locateObject: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Magic Mouth',
      spellLevel: 2,
      castingTime: 600, // 10 minutes
      range: 30,
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'You implant a message within an object in range, a message that is uttered when a trigger condition is met. The message must be 25 words or less, though it can be delivered over as long as 10 minutes.',
      effectType: 'UTILITY',
      duration: 0, // Permanent until dispelled
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              magicMouth: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Mirror Image',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S'],
      description:
        'Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it’s impossible to track which image is real.',
      effectType: 'PROTECTION',
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              mirrorImage: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Misty Step',
      spellLevel: 2,
      castingTime: -1, // 1 bonus action
      range: 0, // Self
      area: 0,
      school: 'CONJURATION',
      components: ['V'],
      description:
        'Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.',
      effectType: 'MOVEMENT',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              mistyStep: true,
              distance: 30,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Moonbeam',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 120,
      area: 5, // 5-foot radius
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A silvery beam of pale light shines down in a 5-foot-radius, 40-foot-high cylinder centered on a point within range. Until the spell ends, dim light fills the cylinder. When a creature enters the spell’s area for the first time on a turn or starts its turn there, it is engulfed in ghostly flames that cause searing pain, and it must make a Constitution saving throw. It takes 2d10 radiant damage on a failed save, or half as much damage on a successful one.',
      damageType: 'RADIANT',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '2d10' }),
      rollsBySpellSlot: JSON.stringify({
        2: '2d10',
        3: '3d10',
        4: '4d10',
        5: '5d10',
        6: '6d10',
        7: '7d10',
        8: '8d10',
        9: '9d10'
      }),
      rollByCharacterLevel: false,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'radiant',
              areaSize: '5-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Pass Without Trace',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 30, // 30-foot radius
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, each creature you choose within 30 feet of you (including you) has a +10 bonus to Dexterity (Stealth) checks and can’t be tracked except by magical means. A creature that receives this bonus leaves behind no tracks or other traces of its passage.',
      effectType: 'BUFF',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'BUFF',
            value: JSON.stringify({
              passWithoutTrace: true,
              stealthBonus: 10,
              areaSize: '30-foot radius',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Prayer of Healing',
      spellLevel: 2,
      castingTime: 600, // 10 minutes
      range: 30,
      area: 0,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'Up to six creatures of your choice that you can see within range each regain hit points equal to 2d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.',
      effectType: 'HEALING',
      rolls: JSON.stringify({ 1: '2d8' }),
      rollsBySpellSlot: JSON.stringify({
        2: '2d8',
        3: '3d8',
        4: '4d8',
        5: '5d8',
        6: '6d8',
        7: '7d8',
        8: '8d8',
        9: '9d8'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'HEALING',
            value: JSON.stringify({
              healing: '2d8 + spellcasting ability modifier',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Protection from Poison',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'You touch a creature. If it is poisoned, you neutralize the poison. If more than one poison afflicts the target, you neutralize one poison that you know is present, or you neutralize one at random. For the duration, the target has advantage on saving throws against being poisoned, and it has resistance to poison damage.',
      effectType: 'PROTECTION',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              neutralizePoison: true,
              advantageOnSavingThrowsAgainstPoison: true,
              resistanceToPoisonDamage: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Ray of Enfeeblement',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'A black beam of enervating energy springs from your finger toward a creature within range. Make a ranged spell attack against the target. On a hit, the target deals only half damage with weapon attacks that use Strength until the spell ends.',
      effectType: 'DEBUFF',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DEBUFF',
            value: JSON.stringify({
              rayOfEnfeeblement: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Rope Trick',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a length of rope that is up to 60 feet long. One end of the rope then rises into the air until the whole rope hangs perpendicular to the ground. At the upper end of the rope, an invisible entrance opens to an extradimensional space that lasts until the spell ends.',
      effectType: 'UTILITY',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              ropeTrick: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Scorching Ray',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'You create three rays of fire and hurl them at targets within range. You can hurl them at one target or several. Make a ranged spell attack for each ray. On a hit, the target takes 2d6 fire damage.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '2d6', 2: '2d6', 3: '2d6' }),
      rollsBySpellSlot: JSON.stringify({
        2: '2d6',
        3: '3d6',
        4: '4d6',
        5: '5d6',
        6: '6d6',
        7: '7d6',
        8: '8d6',
        9: '9d6'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'See Invisibility',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'For the duration, you see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane. Ethereal creatures and objects appear ghostly and translucent.',
      effectType: 'DETECTION',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'DETECTION',
            value: JSON.stringify({
              seeInvisibility: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Shatter',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 10, // 10-foot radius sphere
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A sudden loud ringing noise, painfully intense, erupts from a point of your choice within range. Each creature in a 10-foot-radius sphere centered on that point must make a Constitution saving throw. A creature takes 3d8 thunder damage on a failed save, or half as much damage on a successful one.',
      damageType: 'THUNDER',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '3d8' }),
      rollsBySpellSlot: JSON.stringify({
        2: '3d8',
        3: '4d8',
        4: '5d8',
        5: '6d8',
        6: '7d8',
        7: '8d8',
        8: '9d8',
        9: '10d8'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'thunder',
              areaSize: '10-foot radius sphere',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Silence',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 120,
      area: 20, // 20-foot radius sphere
      school: 'ILLUSION',
      components: ['V', 'S'],
      description:
        'For the duration, no sound can be created within or pass through a 20-foot-radius sphere centered on a point you choose within range. Any creature or object entirely inside the sphere is immune to thunder damage, and creatures are deafened while entirely inside it.',
      effectType: 'CONTROL',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              silence: true,
              areaSize: '20-foot radius sphere',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Spider Climb',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'Until the spell ends, one willing creature you touch gains the ability to move up, down, and across vertical surfaces and upside down along ceilings, while leaving its hands free. The target also gains a climbing speed equal to its walking speed.',
      effectType: 'BUFF',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              spiderClimb: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Spike Growth',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 150,
      area: 20, // 20-foot radius
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'The ground in a 20-foot radius centered on a point within range twists and sprouts hard spikes and thorns. The area becomes difficult terrain for the duration. When a creature moves into or within the area, it takes 2d4 piercing damage for every 5 feet it travels.',
      damageType: 'PIERCING',
      effectType: 'CONTROL',
      rolls: JSON.stringify({ 1: '2d4' }),
      rollsBySpellSlot: JSON.stringify({
        2: '2d4',
        3: '3d4',
        4: '4d4',
        5: '5d4',
        6: '6d4',
        7: '7d4',
        8: '8d4',
        9: '9d4'
      }),
      rollByCharacterLevel: false,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              spikeGrowth: true,
              areaSize: '20-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Spiritual Weapon',
      spellLevel: 2,
      castingTime: -1, // 1 bonus action
      range: 60,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'You create a floating, spectral weapon within range that lasts for the duration or until you cast this spell again. When you cast the spell, you can make a melee spell attack against a creature within 5 feet of the weapon. On a hit, the target takes force damage equal to 1d8 + your spellcasting ability modifier.',
      damageType: 'FORCE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '1d8' }),
      rollsBySpellSlot: JSON.stringify({
        2: '1d8',
        3: '2d8',
        4: '3d8',
        5: '4d8',
        6: '5d8',
        7: '6d8',
        8: '7d8',
        9: '8d8'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'force',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Suggestion',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'M'],
      description:
        'You suggest a course of activity (limited to a sentence or two) and magically influence a creature you can see within range that can hear and understand you. Creatures that can’t be charmed are immune to this effect.',
      effectType: 'CONTROL',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              suggestion: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Warding Bond',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell wards a willing creature you touch and creates a mystic connection between you and the target until the spell ends. While the target is within 60 feet of you, it gains a +1 bonus to AC and saving throws, and it has resistance to all damage.',
      effectType: 'PROTECTION',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              wardingBond: true,
              acBonus: 1,
              savingThrowBonus: 1,
              resistanceToAllDamage: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Web',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 20, // 20-foot cube
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube from that point for the duration. The webs are difficult terrain and lightly obscure their area. If the webs aren’t anchored between two solid masses (such as walls or trees) or layered across a floor, wall, or ceiling, the conjured web collapses on itself, and the spell ends at the start of your next turn. Webs layered over a flat surface have a depth of 5 feet. Each creature that starts its turn in the webs or that enters them during its turn must make a Dexterity saving throw. On a failed save, the creature is restrained as long as it remains in the webs or until it breaks free.',
      effectType: 'CONTROL',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              web: true,
              areaSize: '20-foot cube',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Zone of Truth',
      spellLevel: 2,
      castingTime: 0, // 1 action
      range: 60,
      area: 15, // 15-foot radius
      school: 'ENCHANTMENT',
      components: ['V', 'S'],
      description:
        'You create a magical zone that guards against deception in a 15-foot-radius sphere centered on a point of your choice within range. Until the spell ends, a creature that enters the spell’s area for the first time on a turn or starts its turn there must make a Charisma saving throw. On a failed save, a creature can’t speak a deliberate lie while in the radius. You know whether each creature succeeds or fails on its saving throw.',
      effectType: 'CONTROL',
      duration: 600, // 10 minutes
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              zoneOfTruth: true,
              areaSize: '15-foot radius',
              duration: 600
            })
          }
        ]
      }
    }
  ];

  const thirdLevelSpells = [
    {
      name: 'Animate Dead',
      spellLevel: 3,
      castingTime: 600, // 1 minute
      range: 10,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'This spell creates an undead servant. Choose a pile of bones or a corpse of a Medium or Small humanoid within range. Your spell imbues the target with a foul mimicry of life, raising it as an undead creature. The target becomes a skeleton if you choose bones or a zombie if you choose a corpse.',
      effectType: 'SUMMONING',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'SUMMONING',
            value: JSON.stringify({
              animateDead: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Bestow Curse',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'You place a curse on a creature that you can see within range. The target must succeed on a Wisdom saving throw or become cursed for the duration of the spell. When you cast this spell, choose the nature of the curse from the following options: (1) Disadvantage on ability checks and saving throws of one ability score. (2) Disadvantage on attack rolls against you. (3) Wastes action to do nothing. (4) Your attacks deal an extra 1d8 necrotic damage.',
      effectType: 'DEBUFF',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DEBUFF',
            value: JSON.stringify({
              bestowCurse: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Counterspell',
      spellLevel: 3,
      castingTime: -1, // 1 reaction
      range: 60,
      area: 0,
      school: 'ABJURATION',
      components: ['S'],
      description:
        'You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell’s level. On a success, the creature’s spell fails and has no effect.',
      effectType: 'CONTROL',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              counterspell: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Dispel Magic',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability. The DC equals 10 + the spell’s level. On a successful check, the spell ends.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature/Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              dispelMagic: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Fear',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'You project a phantasmal image of the most fearsome creature imaginable. Each creature in a 30-foot cone must succeed on a Wisdom saving throw or drop whatever it is holding and become frightened for the duration.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              fear: true,
              areaSize: '30-foot cone',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Fireball',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 150,
      area: 20, // 20-foot radius
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '8d6' }),
      rollsBySpellSlot: JSON.stringify({
        3: '8d6',
        4: '9d6',
        5: '10d6',
        6: '11d6',
        7: '12d6',
        8: '13d6',
        9: '14d6'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire',
              areaSize: '20-foot radius',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Fly',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall.',
      effectType: 'MOVEMENT',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              fly: true,
              flyingSpeed: 60,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Gaseous Form',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You transform a willing creature you touch, along with everything it’s wearing and carrying, into a misty cloud for the duration. The spell ends if the creature drops to 0 hit points. An incorporeal creature has resistance to nonmagical damage and advantage on Strength, Dexterity, and Constitution saving throws.',
      effectType: 'TRANSFORMATION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              gaseousForm: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Haste',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'Choose a willing creature that you can see within range. Until the spell ends, the target’s speed is doubled, it gains a +2 bonus to AC, it has advantage on Dexterity saving throws, and it gains an additional action on each of its turns.',
      effectType: 'BUFF',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              haste: true,
              speedBonus: 'doubled',
              acBonus: 2,
              advantageOnDexteritySavingThrows: true,
              additionalAction: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Hypnotic Pattern',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 120,
      area: 30, // 30-foot cube
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'You create a twisting pattern of colors that weaves through the air inside a 30-foot cube within range. The pattern appears for a moment and vanishes. Each creature in the area who sees the pattern must make a Wisdom saving throw. On a failed save, the creature becomes charmed for the duration.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              hypnoticPattern: true,
              areaSize: '30-foot cube',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Lightning Bolt',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 100, // Self (100-foot line)
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 8d6 lightning damage on a failed save, or half as much damage on a successful one.',
      damageType: 'LIGHTNING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '8d6' }),
      rollsBySpellSlot: JSON.stringify({
        3: '8d6',
        4: '9d6',
        5: '10d6',
        6: '11d6',
        7: '12d6',
        8: '13d6',
        9: '14d6'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'lightning',
              areaSize: '100-foot line',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Major Image',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 120,
      area: 20, // 20-foot cube
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 20-foot cube. The image appears at a spot within range and lasts for the duration. It seems completely real, including sounds, smells, and temperature appropriate to the thing depicted. You can’t create sufficient heat or cold to cause damage, a sound loud enough to deal thunder damage or deafen a creature, or a smell that might sicken a creature (like a troglodyte’s stench).',
      effectType: 'UTILITY',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({
              majorImage: true,
              areaSize: '20-foot cube',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Mass Healing Word',
      spellLevel: 3,
      castingTime: -1, // 1 bonus action
      range: 60,
      area: 0,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'As you call out words of restoration, up to six creatures of your choice that you can see within range regain hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs.',
      effectType: 'HEALING',
      rolls: JSON.stringify({ 1: '1d4' }),
      rollsBySpellSlot: JSON.stringify({
        3: '1d4',
        4: '2d4',
        5: '3d4',
        6: '4d4',
        7: '5d4',
        8: '6d4',
        9: '7d4'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'HEALING',
            value: JSON.stringify({
              healing: '1d4 + spellcasting ability modifier',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Meld into Stone',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You step into a stone object or surface large enough to fully contain your body, melding yourself and all the equipment you carry with the stone for the duration. Using your movement, you step into the stone at a point you can touch. Nothing of your presence remains visible or otherwise detectable by nonmagical senses.',
      effectType: 'UTILITY',
      duration: 600, // 10 minutes
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'UTILITY',
            value: JSON.stringify({
              meldIntoStone: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Protection from Energy',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'For the duration, the willing creature you touch has resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder.',
      effectType: 'PROTECTION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              protectionFromEnergy: true,
              resistanceType: 'acid, cold, fire, lightning, or thunder',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Remove Curse',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner’s attunement to the object so it can be removed or discarded.',
      effectType: 'RESTORATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature/Object',
            effectType: 'RESTORATION',
            value: JSON.stringify({
              removeCurse: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Revivify',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can’t return to life a creature that has died of old age, nor can it restore any missing body parts.',
      effectType: 'RESTORATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'RESTORATION',
            value: JSON.stringify({
              revivify: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Sending',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 0, // Unlimited
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'You send a short message of twenty-five words or less to a creature with which you are familiar. The creature hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately.',
      effectType: 'COMMUNICATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'COMMUNICATION',
            value: JSON.stringify({
              sending: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Sleet Storm',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 150,
      area: 40, // 40-foot radius
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'Until the spell ends, freezing rain and sleet fall in a 20-foot-tall cylinder with a 40-foot radius centered on a point you choose within range. The area is heavily obscured, and exposed flames in the area are doused. The ground in the area is covered with slick ice, making it difficult terrain. When a creature enters the spell’s area for the first time on a turn or starts its turn there, it must make a Dexterity saving throw. On a failed save, it falls prone.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              sleetStorm: true,
              areaSize: '40-foot radius',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Slow',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 120,
      area: 40, // 40-foot cube
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You alter time around up to six creatures of your choice in a 40-foot cube within range. Each target must succeed on a Wisdom saving throw or be affected by this spell for the duration. An affected target’s speed is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can’t use reactions. On its turn, it can use either an action or a bonus action, not both. Regardless of the creature’s abilities or magic items, it can’t make more than one melee or ranged attack during its turn.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'CONTROL',
            value: JSON.stringify({
              slow: true,
              areaSize: '40-foot cube',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Spirit Guardians',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 15,
      area: 15, // 15-foot radius
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You call forth spirits to protect you. They flit around you to a distance of 15 feet for the duration. If you are good or neutral, their spectral form appears angelic or fey (your choice). If you are evil, they appear fiendish. When you cast this spell, you can designate any number of creatures you can see to be unaffected by it. An affected creature’s speed is halved in the area, and when the creature enters the area for the first time on a turn or starts its turn there, it must make a Wisdom saving throw. On a failed save, the creature takes 3d8 radiant (good and neutral) or necrotic (evil) damage. On a successful save, the creature takes half as much damage.',
      damageType: 'RADIANT',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '3d8' }),
      rollsBySpellSlot: JSON.stringify({
        3: '3d8',
        4: '4d8',
        5: '5d8',
        6: '6d8',
        7: '7d8',
        8: '8d8',
        9: '9d8'
      }),
      rollByCharacterLevel: false,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'radiant or necrotic',
              areaSize: '15-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Stinking Cloud',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 90,
      area: 20, // 20-foot radius
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You create a 20-foot-radius sphere of yellow, nauseating gas centered on a point within range. The cloud spreads around corners, and its area is heavily obscured. The cloud lingers in the air for the duration. Each creature that is completely within the cloud at the start of its turn must make a Constitution saving throw against poison. On a failed save, the creature spends its action that turn retching and reeling. Creatures that don’t need to breathe or are immune to poison automatically succeed on this saving throw.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              stinkingCloud: true,
              areaSize: '20-foot radius',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Tongues',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'M'],
      description:
        'This spell grants the creature you touch the ability to understand any spoken language it hears. Moreover, when the target speaks, any creature that knows at least one language and can hear the target understands what it says.',
      effectType: 'UTILITY',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'UTILITY',
            value: JSON.stringify({
              tongues: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Vampiric Touch',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'The touch of your shadow-wreathed hand can siphon life force from others to heal your wounds. Make a melee spell attack against a creature within your reach. On a hit, the target takes 3d6 necrotic damage, and you regain hit points equal to half the amount of necrotic damage dealt. Until the spell ends, you can make the attack again on each of your turns as an action.',
      damageType: 'NECROTIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '3d6' }),
      rollsBySpellSlot: JSON.stringify({
        3: '3d6',
        4: '4d6',
        5: '5d6',
        6: '6d6',
        7: '7d6',
        8: '8d6',
        9: '9d6'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'necrotic',
              healing: 'half damage dealt',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Water Breathing',
      spellLevel: 3,
      castingTime: 600, // 10 minutes
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell grants up to ten willing creatures you can see within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration.',
      effectType: 'UTILITY',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'UTILITY',
            value: JSON.stringify({
              waterBreathing: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Water Walk',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell grants the ability to move across any liquid surface—such as water, acid, mud, snow, quicksand, or lava—as if it were harmless solid ground (creatures crossing molten lava can still take damage from the heat). Up to ten willing creatures you can see within range gain this ability for the duration.',
      effectType: 'UTILITY',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'UTILITY',
            value: JSON.stringify({
              waterWalk: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Wind Wall',
      spellLevel: 3,
      castingTime: 0, // 1 action
      range: 120,
      area: 50, // 50-foot length
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick. The wall lasts for the duration. When the wall appears, each creature within its area must make a Strength saving throw. A creature takes 3d8 bludgeoning damage on a failed save, or half as much damage on a successful one. The strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying creatures or objects can’t pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and automatically miss. (Boulders hurled by giants or siege engines, and similar projectiles, are unaffected.) Creatures in gaseous form can’t pass through it.',
      damageType: 'BLUDGEONING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '3d8' }),
      rollsBySpellSlot: JSON.stringify({
        3: '3d8',
        4: '4d8',
        5: '5d8',
        6: '6d8',
        7: '7d8',
        8: '8d8',
        9: '9d8'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'bludgeoning',
              areaSize: '50-foot length',
              duration: 60
            })
          }
        ]
      }
    }
  ];

  const fourthLevelSpells = [
    {
      name: 'Arcane Eye',
      spellLevel: 4,
      castingTime: 600, // 10 minutes
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'You create an invisible, magical eye within range that hovers in the air for the duration. You mentally receive visual information from the eye, which has normal vision and darkvision out to 30 feet. The eye can look in every direction. As an action, you can move the eye up to 30 feet in any direction.',
      effectType: 'UTILITY',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'UTILITY',
            value: JSON.stringify({
              arcaneEye: true,
              vision: 'normal and darkvision (30 feet)',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Aura of Life',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 0, // Self (30-foot radius)
      area: 30, // 30-foot radius
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'Life-preserving energy radiates from you in an aura with a 30-foot radius. Until the spell ends, the aura moves with you, centered on you. Each nonhostile creature in the aura (including you) has resistance to necrotic damage, and its hit point maximum can’t be reduced. In addition, a nonhostile, living creature regains 1 hit point when it starts its turn in the aura with 0 hit points.',
      effectType: 'BUFF',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'BUFF',
            value: JSON.stringify({
              auraOfLife: true,
              areaSize: '30-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Aura of Purity',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 0, // Self (30-foot radius)
      area: 30, // 30-foot radius
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'Purifying energy radiates from you in an aura with a 30-foot radius. Until the spell ends, the aura moves with you, centered on you. Each nonhostile creature in the aura (including you) can’t become diseased, has resistance to poison damage, and has advantage on saving throws against effects that cause any of the following conditions: blinded, charmed, deafened, frightened, paralyzed, poisoned, and stunned.',
      effectType: 'BUFF',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'BUFF',
            value: JSON.stringify({
              auraOfPurity: true,
              areaSize: '30-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Banishment',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You attempt to send one creature that you can see within range to another plane of existence. The target must succeed on a Charisma saving throw or be banished. If the target is native to the plane of existence you’re on, you banish the target to a harmless demiplane. While there, the target is incapacitated. The target remains there until the spell ends, at which point the target reappears in the space it left or in the nearest unoccupied space if that space is occupied. If the target is native to a different plane of existence than the one you’re on, the target is banished with a faint popping noise, returning to its home plane. If the spell ends before 1 minute has passed, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied. Otherwise, the target doesn’t return.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              banishment: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Blight',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'Necromantic energy washes over a creature of your choice that you can see within range, draining moisture and vitality from it. The target must make a Constitution saving throw. On a failed save, the target takes 8d8 necrotic damage, or half as much damage on a successful save. This spell has no effect on undead or constructs.',
      damageType: 'NECROTIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '8d8' }),
      rollsBySpellSlot: JSON.stringify({
        4: '8d8',
        5: '9d8',
        6: '10d8',
        7: '11d8',
        8: '12d8',
        9: '13d8'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'necrotic',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Compulsion',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S'],
      description:
        'Creatures of your choice that you can see within range and that can hear you must make a Wisdom saving throw. A target automatically succeeds on this saving throw if it can’t be charmed. On a failed save, a target is affected by this spell. Until the spell ends, you can use a bonus action on each of your turns to designate a direction that is horizontal to you. Each affected target must use as much of its movement as possible to move in that direction on its next turn. It can take its action before it moves. After moving in this way, it can make another Wisdom saving throw to try to end the effect.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'CONTROL',
            value: JSON.stringify({
              compulsion: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Confusion',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 90,
      area: 10, // 10-foot radius
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'This spell assaults and twists creatures’ minds, spawning delusions and provoking uncontrolled action. Each creature in a 10-foot-radius sphere centered on a point you choose within range must succeed on a Wisdom saving throw when you cast this spell or be affected by it. An affected target can’t take reactions and must roll a d10 at the start of each of its turns to determine its behavior for that turn.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              confusion: true,
              areaSize: '10-foot radius',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Conjure Minor Elementals',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 90,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You summon elementals that appear in unoccupied spaces that you can see within range. Choose one of the following options for what appears: One elemental of challenge rating 2 or lower, Two elementals of challenge rating 1 or lower, Four elementals of challenge rating 1/2 or lower, Eight elementals of challenge rating 1/4 or lower.',
      effectType: 'SUMMONING',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'SUMMONING',
            value: JSON.stringify({
              summonedCreatures: 'elementals',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Conjure Woodland Beings',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You summon fey creatures that appear in unoccupied spaces that you can see within range. Choose one of the following options for what appears: One fey creature of challenge rating 2 or lower, Two fey creatures of challenge rating 1 or lower, Four fey creatures of challenge rating 1/2 or lower, Eight fey creatures of challenge rating 1/4 or lower.',
      effectType: 'SUMMONING',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'SUMMONING',
            value: JSON.stringify({
              summonedCreatures: 'fey',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Control Water',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 300,
      area: 100, // 100-foot cube
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'Until the spell ends, you control any freestanding water inside an area you choose that is a cube up to 100 feet on a side. You can choose from any of the following effects when you cast this spell. As an action on your turn, you can repeat the same effect or choose a different one.',
      effectType: 'CONTROL',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              controlWater: true,
              areaSize: '100-foot cube',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Death Ward',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'You touch a creature and grant it a measure of protection from death. The first time the target would drop to 0 hit points as a result of taking damage, the target instead drops to 1 hit point, and the spell ends. If the spell is still in effect when the target is subjected to an effect that would kill it instantaneously without dealing damage, that effect is instead negated against the target, and the spell ends.',
      effectType: 'PROTECTION',
      duration: 28800, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              deathWard: true,
              duration: 28800
            })
          }
        ]
      }
    },
    {
      name: 'Dimension Door',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 500,
      area: 0,
      school: 'CONJURATION',
      components: ['V'],
      description:
        'You teleport yourself from your current location to any other spot within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction.',
      effectType: 'MOVEMENT',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              teleportation: true,
              range: '500 feet',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Divination',
      spellLevel: 4,
      castingTime: 600, // 10 minutes
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'Your magic and an offering put you in contact with a god or a god’s servants. You ask a single question concerning a specific goal, event, or activity to occur within 7 days. The GM offers a truthful reply. The reply might be a short phrase, a cryptic rhyme, or an omen.',
      effectType: 'COMMUNICATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'COMMUNICATION',
            value: JSON.stringify({
              divination: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Dominate Beast',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S'],
      description:
        'You attempt to beguile a beast that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw. While the beast is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as “Attack that creature,” “Run over there,” or “Fetch that object.” If the beast completes the order and doesn’t receive further direction from you, it defends and preserves itself to the best of its ability. You can use your action to take total and precise control of the target. Until the end of your next turn, the creature takes only the actions you choose, and doesn’t do anything that you don’t allow it to do. During this time, you can also cause the creature to use a reaction, but this requires you to use your own reaction as well.',
      effectType: 'CONTROL',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              dominateBeast: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: "Evard's Black Tentacles",
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 90,
      area: 20, // 20-foot square
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'Squirming, ebony tentacles fill a 20-foot square on ground that you can see within range. For the duration, these tentacles turn the ground in the area into difficult terrain. When a creature enters the affected area for the first time on a turn or starts its turn there, the creature must succeed on a Dexterity saving throw or take 3d6 bludgeoning damage and be restrained by the tentacles until the spell ends. A creature that starts its turn in the area and is already restrained by the tentacles takes 3d6 bludgeoning damage. A creature restrained by the tentacles can use its action to make a Strength or Dexterity check (its choice) against your spell save DC. On a success, it frees itself.',
      damageType: 'BLUDGEONING',
      effectType: 'CONTROL',
      rolls: JSON.stringify({ 1: '3d6' }),
      rollsBySpellSlot: JSON.stringify({
        4: '3d6'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              damage: 'bludgeoning',
              areaSize: '20-foot square',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Fabricate',
      spellLevel: 4,
      castingTime: 600, // 10 minutes
      range: 120,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'You convert raw materials into products of the same material. For example, you can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, and clothes from flax or wool. Choose raw materials that you can see within range. You can fabricate a Large or smaller object (contained within a 10-foot cube), or eight connected Medium or smaller objects (contained within eight 5-foot cubes). If you are working with metal, stone, or another mineral substance, however, the fabricated object can be no larger than Medium (contained within a single 5-foot cube). The quality of objects made by the spell is commensurate with the quality of the raw materials.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object(s)',
            effectType: 'UTILITY',
            value: JSON.stringify({
              fabricate: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Fire Shield',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'Thin and wispy flames wreathe your body for the duration, shedding bright light in a 10-foot radius and dim light for an additional 10 feet. You can end the spell early by using an action to dismiss it. The flames provide you with a warm shield or a chill shield, as you choose. The warm shield grants you resistance to cold damage, and the chill shield grants you resistance to fire damage.',
      effectType: 'PROTECTION',
      duration: 600, // 10 minutes
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              fireShield: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Freedom of Movement',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a willing creature. For the duration, the target’s movement is unaffected by difficult terrain, and spells and other magical effects can neither reduce the target’s speed nor cause the target to be paralyzed or restrained.',
      effectType: 'BUFF',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              freedomOfMovement: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Giant Insect',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'You transform up to ten centipedes, three spiders, five wasps, or one scorpion within range into giant versions of their natural forms for the duration.',
      effectType: 'TRANSFORMATION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature(s)',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              giantInsect: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Greater Invisibility',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S'],
      description:
        'You or a creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person.',
      effectType: 'UTILITY',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'UTILITY',
            value: JSON.stringify({
              invisibility: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Guardian of Faith',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'CONJURATION',
      components: ['V'],
      description:
        'A Large spectral guardian appears and hovers for the duration in an unoccupied space of your choice that you can see within range. The guardian occupies that space and is indistinct except for a gleaming sword and shield emblazoned with the symbol of your deity. Any creature hostile to you that moves to a space within 10 feet of the guardian for the first time on a turn must succeed on a Dexterity saving throw. The creature takes 20 radiant damage on a failed save, or half as much damage on a successful one. The guardian vanishes when it has dealt a total of 60 damage.',
      damageType: 'RADIANT',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '20' }),
      rollByCharacterLevel: false,
      rollBySpellSlot: false,
      duration: 480, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'radiant',
              duration: 480
            })
          }
        ]
      }
    },
    {
      name: 'Hallucinatory Terrain',
      spellLevel: 4,
      castingTime: 600, // 10 minutes
      range: 300,
      area: 150, // 150-foot cube
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'You make natural terrain in a 150-foot cube in range look, sound, and smell like some other sort of natural terrain. The terrain’s general shape remains the same; however, open fields or a road could be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain.',
      effectType: 'UTILITY',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({
              hallucinatoryTerrain: true,
              areaSize: '150-foot cube',
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Ice Storm',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 300,
      area: 20, // 20-foot radius
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A hail of rock-hard ice pounds to the ground in a 20-foot-radius, 40-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a Dexterity saving throw. A creature takes 2d8 bludgeoning damage and 4d6 cold damage on a failed save, or half as much damage on a successful one. Hailstones turn the storm’s area of effect into difficult terrain until the end of your next turn.',
      damageType: 'BLUDGEONING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '2d8 + 4d6' }),
      rollsBySpellSlot: JSON.stringify({
        4: '2d8 + 4d6',
        5: '2d8 + 5d6',
        6: '2d8 + 6d6',
        7: '2d8 + 7d6',
        8: '2d8 + 8d6',
        9: '2d8 + 9d6'
      }),
      rollByCharacterLevel: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'bludgeoning and cold',
              areaSize: '20-foot radius',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: "Leomund's Secret Chest",
      spellLevel: 4,
      castingTime: 600, // 10 minutes
      range: 0, // Touch
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You hide a chest, and all its contents, on the Ethereal Plane. You must touch the chest and the miniature replica that serves as a material component for the spell. The chest can contain up to 12 cubic feet of nonliving material (3 feet by 2 feet by 2 feet). While the chest remains on the Ethereal Plane, you can use an action and touch the replica to recall the chest. It appears in an unoccupied space on the ground within 5 feet of you. You can send the chest back to the Ethereal Plane by using an action and touching both the chest and the replica.',
      effectType: 'UTILITY',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              etherealStorage: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Locate Creature',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 1000,
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'Describe or name a creature that is familiar to you. You sense the direction to the creature’s location, as long as that creature is within 1000 feet of you. If the creature is moving, you know the direction of its movement.',
      effectType: 'DETECTION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DETECTION',
            value: JSON.stringify({
              locateCreature: true,
              range: '1000 feet',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Phantasmal Killer',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S'],
      description:
        'You tap into the nightmares of a creature you can see within range and create an illusory manifestation of its deepest fears, visible only to that creature. The target must make a Wisdom saving throw. On a failed save, the target becomes frightened for the duration. At the end of each of the target’s turns before the spell ends, the target must succeed on a Wisdom saving throw or take 4d10 psychic damage. On a successful save, the spell ends.',
      damageType: 'PSYCHIC',
      effectType: 'CONTROL',
      rolls: JSON.stringify({ 1: '4d10' }),
      rollsBySpellSlot: JSON.stringify({
        4: '4d10',
        5: '5d10',
        6: '6d10',
        7: '7d10',
        8: '8d10',
        9: '9d10'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              damage: 'psychic',
              fear: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Polymorph',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell transforms a creature that you can see within range into a new form. An unwilling creature must make a Wisdom saving throw to avoid the effect. The transformation lasts for the duration, or until the target drops to 0 hit points or dies. The new form can be any beast whose challenge rating is equal to or less than the target’s (or the target’s level, if it doesn’t have a challenge rating). The target’s game statistics, including mental ability scores, are replaced by the statistics of the chosen beast. It retains its alignment and personality.',
      effectType: 'TRANSFORMATION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              polymorph: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Staggering Smite',
      spellLevel: 4,
      castingTime: 0, // 1 bonus action
      range: 0, // Self
      area: 0,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'The next time you hit a creature with a melee weapon attack during this spell’s duration, your weapon pierces both body and mind, and the attack deals an extra 4d6 psychic damage to the target. The target must make a Wisdom saving throw. On a failed save, it has disadvantage on attack rolls and ability checks, and can’t take reactions, until the end of its next turn.',
      damageType: 'PSYCHIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '4d6' }),
      rollsBySpellSlot: JSON.stringify({
        4: '4d6'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'psychic',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Stone Shape',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a stone object of Medium size or smaller or a section of stone no more than 5 feet in any dimension and form it into any shape that suits your purpose. So, for example, you could shape a large rock into a weapon, idol, or coffer, or make a small passage through a wall, as long as the wall is less than 5 feet thick.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              stoneShape: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Stoneskin',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell turns the flesh of a willing creature you touch as hard as stone. Until the spell ends, the target has resistance to nonmagical bludgeoning, piercing, and slashing damage.',
      effectType: 'PROTECTION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              stoneskin: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Wall of Fire',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 120,
      area: 60, // Up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'You create a wall of fire on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall is opaque and lasts for the duration. When the wall appears, each creature within its area must make a Dexterity saving throw. On a failed save, a creature takes 5d8 fire damage, or half as much damage on a successful save. One side of the wall, selected by you when you cast this spell, deals 5d8 fire damage to each creature that ends its turn within 10 feet of that side or inside the wall. A creature takes the same damage when it enters the wall for the first time on a turn or ends its turn there.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '5d8' }),
      rollsBySpellSlot: JSON.stringify({
        4: '5d8',
        5: '6d8',
        6: '7d8',
        7: '8d8',
        8: '9d8',
        9: '10d8'
      }),
      rollByCharacterLevel: false,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire',
              areaSize:
                'Up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Watery Sphere',
      spellLevel: 4,
      castingTime: 0, // 1 action
      range: 90,
      area: 10, // 10-foot radius
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You conjure up a sphere of water with a 10-foot radius at a point you can see within range. The sphere can hover but no more than 10 feet off the ground. The sphere remains for the spell’s duration. Any creature in the sphere’s space must make a Strength saving throw. On a successful save, a creature is ejected from that space to the nearest unoccupied space outside the sphere. A Huge or larger creature succeeds automatically, and a Large or smaller creature can choose to fail the save. On a failed save, a creature is restrained by the sphere and engulfed by the water. At the end of each of its turns, a restrained target can repeat the saving throw.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              waterySphere: true,
              areaSize: '10-foot radius',
              duration: 60
            })
          }
        ]
      }
    }
  ];
  const fifthLevelSpells = [
    {
      name: 'Animate Objects',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'Objects come to life at your command. Choose up to ten nonmagical objects within range that are not being worn or carried. Medium targets count as two objects, Large targets count as four objects, Huge targets count as eight objects. You can’t animate any object larger than Huge. Each target animates and becomes a creature under your control until the spell ends or until reduced to 0 hit points.',
      effectType: 'SUMMONING',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object(s)',
            effectType: 'SUMMONING',
            value: JSON.stringify({
              animateObjects: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Antilife Shell',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 0, // Self (10-foot radius)
      area: 10, // 10-foot radius
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'A shimmering barrier extends out from you in a 10-foot radius and moves with you, remaining centered on you and hedging out creatures other than undead and constructs. The barrier lasts for the duration.',
      effectType: 'PROTECTION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              antilifeShell: true,
              areaSize: '10-foot radius',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: "Bigby's Hand",
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'You create a Large hand of shimmering, translucent force in an unoccupied space that you can see within range. The hand lasts for the duration and moves at your command, mimicking the movements of your own hand. The hand can perform various actions, including punching a target, grappling a creature, interposing itself between you and a creature, and more.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'CONTROL',
            value: JSON.stringify({
              bigbysHand: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Cloudkill',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 120,
      area: 20, // 20-foot radius
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You create a 20-foot-radius sphere of poisonous, yellow-green fog centered on a point you choose within range. The fog spreads around corners. It lasts for the duration or until strong wind disperses the fog, ending the spell. Its area is heavily obscured. When a creature enters the spell’s area for the first time on a turn or starts its turn there, that creature must make a Constitution saving throw. The creature takes 5d8 poison damage on a failed save, or half as much damage on a successful one.',
      damageType: 'POISON',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '5d8' }),
      rollsBySpellSlot: JSON.stringify({
        5: '5d8',
        6: '6d8',
        7: '7d8',
        8: '8d8',
        9: '9d8'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'poison',
              areaSize: '20-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Commune',
      spellLevel: 5,
      castingTime: 1, // 1 minute
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'You contact your deity or a divine proxy and ask up to three questions that can be answered with a yes or no. You must ask your questions before the spell ends. You receive a correct answer for each question. Divine beings aren’t necessarily omniscient, so you might receive “unclear” as an answer if a question pertains to information that lies beyond the deity’s knowledge.',
      effectType: 'COMMUNICATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'COMMUNICATION',
            value: JSON.stringify({
              commune: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Commune with Nature',
      spellLevel: 5,
      castingTime: 1, // 1 minute
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'You briefly become one with nature and gain knowledge of the surrounding territory. In the outdoors, the spell gives you knowledge of the land within 3 miles of you. In caves and other natural underground settings, the radius is limited to 300 feet. The spell doesn’t function where nature has been replaced by construction, such as in dungeons and towns.',
      effectType: 'DETECTION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: true,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'DETECTION',
            value: JSON.stringify({
              communeWithNature: true,
              range: '3 miles outdoors, 300 feet underground',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Cone of Cold',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 0, // Self (60-foot cone)
      area: 60, // 60-foot cone
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A blast of cold air erupts from your hands. Each creature in a 60-foot cone must make a Constitution saving throw. A creature takes 8d8 cold damage on a failed save, or half as much damage on a successful one.',
      damageType: 'COLD',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '8d8' }),
      rollsBySpellSlot: JSON.stringify({
        5: '8d8',
        6: '9d8',
        7: '10d8',
        8: '11d8',
        9: '12d8'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'cold',
              areaSize: '60-foot cone',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Conjure Elemental',
      spellLevel: 5,
      castingTime: 0, // 1 minute
      range: 90,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You call forth an elemental servant. Choose an area of air, earth, fire, or water that fills a 10-foot cube within range. An elemental of challenge rating 5 or lower appropriate to the area you chose appears in an unoccupied space within 10 feet of it. For example, a fire elemental emerges from a bonfire, and an earth elemental rises up from the ground. The elemental disappears when it drops to 0 hit points or when the spell ends.',
      effectType: 'SUMMONING',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Elemental',
            effectType: 'SUMMONING',
            value: JSON.stringify({
              conjureElemental: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Contact Other Plane',
      spellLevel: 5,
      castingTime: 600, // 10 minutes
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'You mentally contact a demigod, the spirit of a long-dead sage, or some other mysterious entity from another plane. Contacting this extraplanar intelligence can strain or even break your mind. When you cast this spell, make a DC 15 Intelligence saving throw. On a failure, you take 6d6 psychic damage and are insane until you finish a long rest. While insane, you can’t take actions, can’t understand what other creatures say, can’t read, and speak only in gibberish. A greater restoration spell or similar magic can end the insanity.',
      effectType: 'COMMUNICATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'COMMUNICATION',
            value: JSON.stringify({
              contactOtherPlane: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Creation',
      spellLevel: 5,
      castingTime: 600, // 10 minutes
      range: 30,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You pull wisps of shadow material from the Shadowfell to create a nonliving object of vegetable matter within range: soft goods, rope, wood, or something similar. You can also use this spell to create mineral objects such as stone, crystal, or metal. The object created must be no larger than a 5-foot cube, and the object must be something you have seen before. The duration depends on the material.',
      effectType: 'UTILITY',
      duration: 0, // Special
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              creation: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Dispel Evil and Good',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'Shimmering energy surrounds and protects you from fey, undead, and creatures originating from beyond the Material Plane. For the duration, celestials, elementals, fey, fiends, and undead have disadvantage on attack rolls against you. You can end the spell early by using either of the following special functions. Break Enchantment. As your action, you touch a creature you can reach that is charmed, frightened, or possessed by a celestial, an elemental, a fey, a fiend, or an undead. The creature you touch is no longer charmed, frightened, or possessed by such creatures. Dismissal. As your action, make a melee spell attack against a celestial, an elemental, a fey, a fiend, or an undead you can reach. On a hit, you attempt to drive the creature back to its home plane. The creature must succeed on a Charisma saving throw or be sent back to its home plane (if it isn’t there already). If they succeed, they can’t be sent back again by this spell for 24 hours.',
      effectType: 'PROTECTION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              dispelEvilAndGood: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Dominate Person',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S'],
      description:
        'You attempt to beguile a humanoid that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw. While the target is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the creature while you are conscious (no action required), which it does its best to obey. You can specify a simple and general course of action, such as “Attack that creature,” “Run over there,” or “Fetch that object.” If the creature completes the order and doesn’t receive further direction from you, it defends and preserves itself to the best of its ability.',
      effectType: 'CONTROL',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Humanoid',
            effectType: 'CONTROL',
            value: JSON.stringify({
              dominatePerson: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Dream',
      spellLevel: 5,
      castingTime: 600, // 10 minutes
      range: 0, // Special
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'This spell shapes a creature’s dreams. Choose a creature known to you as the target of this spell. The target must be on the same plane of existence as you. Creatures that don’t sleep, such as elves, can’t be contacted by this spell. You, or a willing creature you touch, enters a trance state, acting as a messenger. While in the trance, the messenger is aware of their surroundings, but can’t take actions or move. If the target is asleep, the messenger appears in their dreams and can converse with the target as long as it remains asleep, through the duration of the spell. The messenger can also shape the environment of the dream, creating landscapes, objects, and other images. The messenger can emerge from the trance at any time, ending the effect early. The target recalls the dream perfectly upon waking. If the target is awake when you cast the spell, the messenger knows it and can either end the trance (and the spell) or wait for the target to fall asleep, at which point the messenger appears in the target’s dreams.',
      effectType: 'COMMUNICATION',
      duration: 480, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'COMMUNICATION',
            value: JSON.stringify({
              dream: true,
              duration: 480
            })
          }
        ]
      }
    },
    {
      name: 'Geas',
      spellLevel: 5,
      castingTime: 60, // 1 minute
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V'],
      description:
        'You place a magical command on a creature that you can see within range, forcing it to carry out some service or refrain from some action or course of activity as you decide. If the creature can understand you, it must succeed on a Wisdom saving throw or become charmed by you for the duration. While the creature is charmed by you, it takes 5d10 psychic damage each time it acts in a manner directly counter to your instructions, but no more than once each day. A creature that can’t understand you is unaffected by the spell.',
      effectType: 'CONTROL',
      duration: 2592000, // 30 days
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              geas: true,
              duration: 2592000
            })
          }
        ]
      }
    },
    {
      name: 'Greater Restoration',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You imbue a creature you touch with positive energy to undo a debilitating effect. You can reduce the target’s exhaustion level by one, or end one of the following effects on the target: One effect that charmed or petrified the target, one curse (including the target’s attunement to a cursed magic item), any reduction to one of the target’s ability scores, or one effect reducing the target’s hit point maximum.',
      effectType: 'RESTORATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'RESTORATION',
            value: JSON.stringify({
              greaterRestoration: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Hallow',
      spellLevel: 5,
      castingTime: 14400, // 24 hours
      range: 0, // Touch
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a point and infuse an area around it with holy (or unholy) power. The area can have a radius up to 60 feet, and the spell fails if the radius includes an area already under the effect of a hallow spell. The affected area is subject to the following effects. First, celestials, elementals, fey, fiends, and undead can’t enter the area, nor can such creatures charm, frighten, or possess creatures within it. Any creature charmed, frightened, or possessed by such a creature is no longer charmed, frightened, or possessed upon entering the area. You can exclude one or more of those types of creatures from this effect. Second, you can bind an extra effect to the area. Choose the effect from the following list, or choose an effect offered by the DM. Some of these effects require saving throws.',
      effectType: 'PROTECTION',
      duration: 0, // Until dispelled
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              hallow: true,
              areaSize: '60-foot radius',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Hold Monster',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 90,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'Choose a creature that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. This spell has no effect on undead. At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends on the target.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              holdMonster: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Legend Lore',
      spellLevel: 5,
      castingTime: 600, // 10 minutes
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'Name or describe a person, place, or object. The spell brings to your mind a brief summary of the significant lore about the thing you named. The lore might consist of current tales, forgotten stories, or even secret lore that has never been widely known. If the thing you named isn’t of legendary importance, you gain no information. The more information you already have about the thing, the more precise and detailed the information you receive is. The information you learn is accurate, but might be couched in figurative language.',
      effectType: 'DETECTION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'DETECTION',
            value: JSON.stringify({
              legendLore: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Mass Cure Wounds',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 60,
      area: 30, // 30-foot radius
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'A wave of healing energy washes out from a point of your choice within range. Choose up to six creatures in a 30-foot-radius sphere centered on that point. Each target regains hit points equal to 3d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.',
      effectType: 'HEALING',
      rolls: JSON.stringify({ 1: '3d8' }),
      rollsBySpellSlot: JSON.stringify({
        5: '3d8',
        6: '4d8',
        7: '5d8',
        8: '6d8',
        9: '7d8'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'HEALING',
            value: JSON.stringify({
              healing: true,
              areaSize: '30-foot radius',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Planar Binding',
      spellLevel: 5,
      castingTime: 3600, // 1 hour
      range: 30,
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'With this spell, you attempt to bind a celestial, an elemental, a fey, or a fiend to your service. The creature must be within range for the entire casting of the spell. If the target fails its Charisma saving throw, it is bound to serve you for the duration. If the creature was summoned or created by another spell, that spell’s duration is extended to match the duration of this spell. A bound creature must follow your instructions to the best of its ability. You might command the creature to accompany you on an adventure, to guard a location, or to deliver a message. The creature obeys to the best of its ability, but it is still bound by its nature and alignment. The creature can try to follow your instructions while subverting them if it can.',
      effectType: 'CONTROL',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              planarBinding: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Raise Dead',
      spellLevel: 5,
      castingTime: 3600, // 1 hour
      range: 0, // Touch
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'You return a dead creature you touch to life, provided that it has been dead no longer than 10 days. If the creature’s soul is both willing and at liberty to rejoin the body, the creature returns to life with 1 hit point. This spell also neutralizes any poisons and cures nonmagical diseases that affected the creature at the time it died. This spell doesn’t, however, remove magical diseases, curses, or similar effects; if these aren’t first removed prior to casting the spell, they take effect when the creature returns to life. The spell can’t return an undead creature to life.',
      effectType: 'RESTORATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'RESTORATION',
            value: JSON.stringify({
              raiseDead: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Reincarnate',
      spellLevel: 5,
      castingTime: 3600, // 1 hour
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a dead humanoid or a piece of a dead humanoid. Provided that the creature has been dead no longer than 10 days, the spell forms a new adult body for it and then calls the soul to enter that body. If the target’s soul isn’t free or willing to do so, the spell fails. The magic fashions a new body for the creature to inhabit, which likely causes the creature’s race to change.',
      effectType: 'TRANSFORMATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              reincarnate: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Scrying',
      spellLevel: 5,
      castingTime: 600, // 10 minutes
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'You can see and hear a particular creature you choose that is on the same plane of existence as you. The target must make a Wisdom saving throw, which is modified by how well you know the target and the sort of physical connection you have to it. If a target knows you’re casting this spell, it can fail the saving throw voluntarily if it wants to be observed.',
      effectType: 'DETECTION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DETECTION',
            value: JSON.stringify({
              scrying: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Seeming',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S'],
      description:
        'This spell allows you to change the appearance of any number of creatures that you can see within range. You give each target you choose a new, illusory appearance. An unwilling target can make a Charisma saving throw, and if it succeeds, it is unaffected by this spell.',
      effectType: 'TRANSFORMATION',
      duration: 28800, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              seeming: true,
              duration: 28800
            })
          }
        ]
      }
    },
    {
      name: 'Telekinesis',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'You gain the ability to move or manipulate creatures or objects by thought. When you cast the spell, and as your action each round for the duration, you can exert your will on one creature or object that you can see within range, causing the appropriate effect below. You can affect the same target round after round, or choose a new one at any time. If you switch targets, the prior target is no longer affected by the spell.',
      effectType: 'CONTROL',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              telekinesis: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Teleportation Circle',
      spellLevel: 5,
      castingTime: 60, // 1 minute
      range: 10,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'As you cast the spell, you draw a 10-foot-diameter circle on the ground inscribed with sigils that link your location to a permanent teleportation circle of your choice whose sigil sequence you know and that is on the same plane of existence as you. A shimmering portal opens within the circle you drew and remains open until the end of your next turn.',
      effectType: 'MOVEMENT',
      duration: 1, // 1 round
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              teleportationCircle: true,
              areaSize: '10-foot diameter',
              duration: 1
            })
          }
        ]
      }
    },
    {
      name: 'Wall of Force',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'An invisible wall of force springs into existence at a point you choose within range. The wall appears in any orientation you choose, as a horizontal or vertical barrier or at an angle. It can be free floating or resting on a solid surface. You can form it into a hemispherical dome or a sphere with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-by-10-foot panels. Each panel must be contiguous with another panel. In any form, the wall is 1/4 inch thick. It lasts for the duration.',
      effectType: 'PROTECTION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              wallOfForce: true,
              areaSize: '10-foot panels',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Wall of Stone',
      spellLevel: 5,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A nonmagical wall of solid stone springs into existence at a point you choose within range. The wall is 6 inches thick and is composed of ten 10-foot-by-10-foot panels. Each panel must be contiguous with at least one other panel. If the wall cuts through a creature’s space when it appears, the creature is pushed to one side of the wall (your choice which side). If a creature would be surrounded on all sides by the wall (or the wall and another solid surface), that creature can make a Dexterity saving throw. On a success, it can use its reaction to move up to its speed so that it is no longer enclosed by the wall.',
      effectType: 'PROTECTION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              wallOfStone: true,
              areaSize: '10-foot panels',
              duration: 600
            })
          }
        ]
      }
    }
  ];

  const sixthLevelSpells = [
    {
      name: 'Arcane Gate',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 500,
      area: 10, // 10-foot diameter
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'You create linked teleportation portals that remain open for the duration. Choose two points on the ground that you can see, one point within 10 feet of you and one point within 500 feet of you. A circular portal, 10 feet in diameter, opens over each point. If the portal would open in the space occupied by a creature, the spell fails, and the casting is lost. The portals are two-dimensional glowing rings, hovering inches from the ground perpendicular to the surface on which they rest. A ring is visible only from one side (your choice), which is the side that functions as a portal. Any creature or object entering the portal exits from the other portal as if the two were adjacent to each other; passing through a portal from the nonportal side has no effect.',
      effectType: 'MOVEMENT',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              arcaneGate: true,
              areaSize: '10-foot diameter',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Blade Barrier',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 90,
      area: 60, // 60 feet long, 10 feet high, and 5 feet thick
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'You create a vertical wall of whirling, razor-sharp blades made of magical energy. The wall appears within range and lasts for the duration. You can make the wall up to 100 feet long, 20 feet high, and 5 feet thick, or a ringed wall up to 60 feet in diameter, 20 feet high, and 5 feet thick. The wall provides three-quarters cover to creatures behind it, and its space is difficult terrain. When a creature enters the wall’s area for the first time on a turn or starts its turn there, the creature must make a Dexterity saving throw. On a failed save, the creature takes 6d10 slashing damage. On a successful save, the creature takes half as much damage.',
      damageType: 'SLASHING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '6d10' }),
      rollsBySpellSlot: JSON.stringify({
        6: '6d10',
        7: '7d10',
        8: '8d10',
        9: '9d10'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'slashing',
              areaSize: '60 feet long, 10 feet high, and 5 feet thick',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Chain Lightning',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 150,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'You create a bolt of lightning that arcs toward a target of your choice that you can see within range. Three bolts then leap from that target to as many as three other targets, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts. A target must make a Dexterity saving throw. The target takes 10d8 lightning damage on a failed save, or half as much damage on a successful one.',
      damageType: 'LIGHTNING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '10d8' }),
      rollsBySpellSlot: JSON.stringify({
        6: '10d8',
        7: '11d8',
        8: '12d8',
        9: '13d8'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'lightning',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Circle of Death',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 150,
      area: 60, // 60-foot-radius sphere
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'A sphere of negative energy ripples out in a 60-foot-radius sphere from a point within range. Each creature in that area must make a Constitution saving throw. A target takes 8d6 necrotic damage on a failed save, or half as much damage on a successful one.',
      damageType: 'NECROTIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '8d6' }),
      rollsBySpellSlot: JSON.stringify({
        6: '8d6',
        7: '9d6',
        8: '10d6',
        9: '11d6'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'necrotic',
              areaSize: '60-foot-radius sphere',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Conjure Fey',
      spellLevel: 6,
      castingTime: 0, // 1 minute
      range: 90,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'You summon a fey creature of challenge rating 6 or lower, or a fey spirit that takes the form of a beast of challenge rating 6 or lower. It appears in an unoccupied space that you can see within range. The fey creature disappears when it drops to 0 hit points or when the spell ends.',
      effectType: 'SUMMONING',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'SUMMONING',
            value: JSON.stringify({
              conjureFey: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Contingency',
      spellLevel: 6,
      castingTime: 1800, // 10 minutes
      range: 0, // Self
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'Choose a spell of 5th level or lower that you can cast, that has a casting time of 1 action, and that can target you. You cast that spell – called the contingent spell – as part of casting contingency, expending spell slots for both, but the contingent spell doesn’t come into effect. Instead, it takes effect when a certain circumstance occurs. You describe that circumstance when you cast the two spells. For example, a contingent fireball might take effect when you are reduced to 0 hit points. The contingent spell takes effect immediately after the circumstance is met for the first time, whether or not you want it to, and then contingency ends.',
      effectType: 'UTILITY',
      duration: 86400, // 10 days
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'UTILITY',
            value: JSON.stringify({
              contingency: true,
              duration: 864000
            })
          }
        ]
      }
    },
    {
      name: 'Create Undead',
      spellLevel: 6,
      castingTime: 3600, // 1 hour
      range: 10,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'You can cast this spell only at night. You choose up to three corpses of Medium or Small humanoids within range. Each corpse becomes a ghoul under your control. As a bonus action on each of your turns, you can mentally command any creature you made with this spell if the creature is within 120 feet of you. (If you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one.)',
      effectType: 'SUMMONING',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Corpse',
            effectType: 'SUMMONING',
            value: JSON.stringify({
              createUndead: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Disintegrate',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'A thin green ray springs from your pointing finger to a target that you can see within range. The target can be a creature, an object, or a creation of magical force, such as the wall created by wall of force. A creature targeted by this spell must make a Dexterity saving throw. On a failed save, the target takes 10d6 + 40 force damage. If this damage reduces the target to 0 hit points, it is disintegrated.',
      damageType: 'FORCE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '10d6+40' }),
      rollsBySpellSlot: JSON.stringify({
        6: '10d6+40',
        7: '11d6+50',
        8: '12d6+60',
        9: '13d6+70'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'force',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Drawmij’s Instant Summons',
      spellLevel: 6,
      castingTime: 60, // 1 minute
      range: 0, // Touch
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch an object weighing 10 pounds or less whose longest dimension is 6 feet or less. The spell leaves an invisible mark on its surface and invisibly inscribes the name of the item on a sapphire worth 1,000 gp. Each time you cast this spell, you must use a different sapphire. At any time thereafter, you can use your action to speak the item’s name and crush the sapphire. The item instantly appears in your hand regardless of physical or planar distances, and the spell’s effect ends.',
      effectType: 'UTILITY',
      duration: 0, // Until dispelled
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'UTILITY',
            value: JSON.stringify({
              drawmijsInstantSummons: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Eyebite',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'For the spell’s duration, your eyes become an inky void imbued with dread power. One creature of your choice within 60 feet of you that you can see must succeed on a Wisdom saving throw or be affected by one of the following effects of your choice for the duration. On each of your turns until the spell ends, you can use your action to target another creature but can’t target a creature again if it has succeeded on a saving throw against this casting of eyebite.',
      effectType: 'CONTROL',
      duration: 360, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              eyebite: true,
              duration: 360
            })
          }
        ]
      }
    },
    {
      name: 'Flesh to Stone',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You attempt to turn one creature that you can see within range into stone. If the target’s body is made of flesh, the creature must make a Constitution saving throw. On a failed save, it is restrained as its flesh begins to harden. On a successful save, the creature isn’t affected.',
      effectType: 'TRANSFORMATION',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              fleshToStone: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Find the Path',
      spellLevel: 6,
      castingTime: 60, // 1 minute
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell allows you to find the shortest, most direct physical route to a specific fixed location that you are familiar with on the same plane of existence. If you name a destination on another plane of existence, a destination that moves (such as a mobile fortress), or a destination that isn’t specific (such as “a green dragon’s lair”), the spell fails.',
      effectType: 'DETECTION',
      duration: 86400, // 24 hours
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'DETECTION',
            value: JSON.stringify({
              findThePath: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Forbiddance',
      spellLevel: 6,
      castingTime: 600, // 10 minutes
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You create a ward against magical travel that protects up to 40,000 square feet of floor space to a height of 30 feet above the floor. For the duration, creatures can’t teleport into the area or use portals, such as those created by the gate spell, to enter the area. The spell proofs the area against planar travel, and therefore prevents creatures from accessing the area by way of the Astral Plane, Ethereal Plane, Feywild, Shadowfell, or the plane shift spell.',
      effectType: 'PROTECTION',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              forbiddance: true,
              areaSize: '40,000 square feet',
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Globe of Invulnerability',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 0, // Self (10-foot radius)
      area: 10, // 10-foot radius
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'An immobile, faintly shimmering barrier springs into existence in a 10-foot radius around you and remains for the duration. Any spell of 5th level or lower cast from outside the barrier can’t affect creatures or objects within it, even if the spell is cast using a higher level spell slot.',
      effectType: 'PROTECTION',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              globeOfInvulnerability: true,
              areaSize: '10-foot radius',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Guards and Wards',
      spellLevel: 6,
      castingTime: 600, // 10 minutes
      range: 0, // Self
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You create a ward that protects a location. You ward a 30-foot cube of space, with the center of the cube being you. The spell allows you to choose from several effects to protect the area, such as locking doors, creating fog, or placing minor illusions.',
      effectType: 'PROTECTION',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              guardsAndWards: true,
              areaSize: '30-foot cube',
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Harm',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'You unleash a virulent disease on a creature that you can see within range. The target must make a Constitution saving throw. On a failed save, it takes 14d6 necrotic damage, or half as much damage on a successful save. The damage can’t reduce the target’s hit points below 1. If the target fails the saving throw, its hit point maximum is reduced for 1 hour by an amount equal to the necrotic damage it took.',
      damageType: 'NECROTIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '14d6' }),
      rollsBySpellSlot: JSON.stringify({
        6: '14d6',
        7: '15d6',
        8: '16d6',
        9: '17d6'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'necrotic',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Heal',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'Choose a creature that you can see within range. A surge of positive energy washes through the creature, causing it to regain 70 hit points. This spell also ends blindness, deafness, and any diseases affecting the target. This spell has no effect on constructs or undead.',
      effectType: 'HEALING',
      rolls: JSON.stringify({ 1: '70' }),
      rollByCharacterLevel: false,
      rollBySpellSlot: false,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'HEALING',
            value: JSON.stringify({
              healing: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Heroes’ Feast',
      spellLevel: 6,
      castingTime: 600, // 10 minutes
      range: 0, // Self
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You bring forth a great feast, including magnificent food and drink. The feast takes 1 hour to consume and disappears at the end of that time, and the beneficial effects don’t set in until this hour is over. Up to twelve creatures can partake of the feast. A creature that partakes of the feast gains several benefits: cured of all diseases and poison, becomes immune to poison and being frightened, makes all Wisdom saving throws with advantage, and its hit point maximum increases by 2d10, and it gains the same number of hit points. These benefits last for 24 hours.',
      effectType: 'BUFF',
      rolls: JSON.stringify({ 1: '2d10' }),
      rollByCharacterLevel: false,
      rollBySpellSlot: false,
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              heroesFeast: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Investiture of Flame',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'Flames race across your body, shedding bright light in a 30-foot radius and dim light for an additional 30 feet for the spell’s duration. The flames don’t harm you. Until the spell ends, you gain several benefits. Any creature that moves within 5 feet of you for the first time on a turn or ends its turn there takes 1d10 fire damage. You can use your action to create a line of fire 15 feet long and 5 feet wide extending from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 4d8 fire damage on a failed save, or half as much damage on a successful one.',
      damageType: 'FIRE',
      effectType: 'BUFF',
      rolls: JSON.stringify({ 1: '4d8' }),
      rollByCharacterLevel: false,
      rollBySpellSlot: false,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'BUFF',
            value: JSON.stringify({
              investitureOfFlame: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Investiture of Ice',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'Until the spell ends, ice rimes your body, and you gain several benefits. You are immune to cold damage and have resistance to fire damage. You can move across difficult terrain created by ice or snow without expending extra movement. The ground in a 10-foot radius around you is icy and is difficult terrain for creatures other than you. You can use your action to create a 15-foot cone of freezing wind extending from your outstretched hand in a direction you choose. Each creature in the cone must make a Constitution saving throw. A creature takes 4d6 cold damage on a failed save, or half as much damage on a successful one.',
      damageType: 'COLD',
      effectType: 'BUFF',
      rolls: JSON.stringify({ 1: '4d6' }),
      rollByCharacterLevel: false,
      rollBySpellSlot: false,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'BUFF',
            value: JSON.stringify({
              investitureOfIce: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Investiture of Stone',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'Until the spell ends, your skin turns as hard as stone. You gain several benefits: You have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks. You can use your action to create a small earthquake on the ground in a 15-foot radius centered on you. Each creature other than you in that area must make a Dexterity saving throw. On a failed save, a creature is knocked prone.',
      effectType: 'BUFF',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'BUFF',
            value: JSON.stringify({
              investitureOfStone: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Investiture of Wind',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'Until the spell ends, wind whirls around you, and you gain several benefits: Ranged weapon attacks made against you have disadvantage on the attack roll. You gain a flying speed of 60 feet. You can use your action to create a 15-foot cube of swirling wind centered on a point you can see within 60 feet of you. Each creature in that area must make a Constitution saving throw. A creature takes 2d10 bludgeoning damage on a failed save, or half as much damage on a successful one.',
      damageType: 'BLUDGEONING',
      effectType: 'BUFF',
      rolls: JSON.stringify({ 1: '2d10' }),
      rollByCharacterLevel: false,
      rollBySpellSlot: false,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'BUFF',
            value: JSON.stringify({
              investitureOfWind: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Magic Jar',
      spellLevel: 6,
      castingTime: 0, // 1 minute
      range: 100,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'Your body falls into a catatonic state as your soul leaves it and enters the container you used for the spell’s material component. While your soul inhabits the container, you are aware of your surroundings as if you were in the container’s space. You can’t move or use reactions. The only action you can take is to project your soul up to 100 feet out of the container, either returning to your living body (and ending the spell) or attempting to possess a humanoid’s body.',
      effectType: 'CONTROL',
      duration: 0, // Until dispelled
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Object',
            effectType: 'CONTROL',
            value: JSON.stringify({
              magicJar: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Mass Suggestion',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'M'],
      description:
        'You suggest a course of activity (limited to a sentence or two) and magically influence up to twelve creatures of your choice that you can see within range and that can hear and understand you. Creatures that can’t be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable.',
      effectType: 'CONTROL',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              massSuggestion: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Move Earth',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 120,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'Choose an area of terrain no larger than 40 feet on a side within range. You can reshape dirt, sand, or clay in the area in any manner you choose for the duration. You can raise or lower the area’s elevation, create or fill in a trench, erect or flatten a wall, or form a pillar. The extent of any such changes can’t exceed half the area’s largest dimension. If you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.',
      effectType: 'UTILITY',
      duration: 7200, // 2 hours
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'UTILITY',
            value: JSON.stringify({
              moveEarth: true,
              areaSize: '40 feet on a side',
              duration: 7200
            })
          }
        ]
      }
    },
    {
      name: 'Otiluke’s Freezing Sphere',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 300,
      area: 60, // 60-foot radius
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A frigid globe of cold energy streaks from your fingertips to a point of your choice within range, where it explodes in a 60-foot-radius sphere. Each creature within the area must make a Constitution saving throw. On a failed save, a creature takes 10d6 cold damage, or half as much damage on a successful one. The globe freezes water in the area that isn’t being worn or carried.',
      damageType: 'COLD',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '10d6' }),
      rollsBySpellSlot: JSON.stringify({
        6: '10d6',
        7: '11d6',
        8: '12d6',
        9: '13d6'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'cold',
              areaSize: '60-foot radius',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Otto’s Irresistible Dance',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V'],
      description:
        'Choose one creature that you can see within range. The target begins a comic dance in place: shuffling, tapping its feet, and capering for the duration. Creatures that can’t be charmed are immune to this spell. A dancing creature must use all its movement to dance without leaving its space and has disadvantage on Dexterity saving throws and attack rolls.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              ottosIrresistibleDance: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Planar Ally',
      spellLevel: 6,
      castingTime: 600, // 10 minutes
      range: 60,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'You beseech an otherworldly entity for aid. The being must be known to you: a god, a primordial, a demon prince, or some other being of cosmic power. The entity sends a celestial, an elemental, or a fiend loyal to it to aid you, making the creature appear in an unoccupied space within range. The creature is under no compulsion to behave in any particular way. You can ask the entity for a service in exchange for payment. The creature completes the task to the best of its ability and then returns to its home plane.',
      effectType: 'SUMMONING',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'SUMMONING',
            value: JSON.stringify({
              planarAlly: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Sunbeam',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 60,
      area: 5, // 5-foot wide, 60-foot long line
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A beam of brilliant light flashes out from your hand in a 5-foot-wide, 60-foot-long line. Each creature in the line must make a Constitution saving throw. On a failed save, a creature takes 6d8 radiant damage and is blinded until your next turn. On a successful save, it takes half as much damage and isn’t blinded. Undead and oozes have disadvantage on this saving throw.',
      damageType: 'RADIANT',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '6d8' }),
      rollsBySpellSlot: JSON.stringify({
        6: '6d8',
        7: '7d8',
        8: '8d8',
        9: '9d8'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Line',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'radiant',
              areaSize: '5-foot wide, 60-foot long',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'True Seeing',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell gives the willing creature you touch the ability to see things as they actually are. For the duration, the creature has truesight, notices secret doors hidden by magic, and can see into the Ethereal Plane, all out to a range of 120 feet.',
      effectType: 'DETECTION',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DETECTION',
            value: JSON.stringify({
              trueSeeing: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Wind Walk',
      spellLevel: 6,
      castingTime: 60, // 1 minute
      range: 30,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You and up to ten willing creatures you can see within range assume a gaseous form for the duration, appearing as wisps of cloud. While in this cloud form, a creature has a flying speed of 300 feet and resistance to damage from nonmagical weapons. The only actions a creature can take in this form are the Dash action or to revert to its normal form, which takes 1 minute.',
      effectType: 'TRANSFORMATION',
      duration: 28800, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              windWalk: true,
              duration: 28800
            })
          }
        ]
      }
    },
    {
      name: 'Word of Recall',
      spellLevel: 6,
      castingTime: 0, // 1 action
      range: 0, // 5-foot radius
      area: 5, // 5-foot radius
      school: 'CONJURATION',
      components: ['V'],
      description:
        'You and up to five willing creatures within 5 feet of you instantly teleport to a previously designated sanctuary. You and any creatures that teleport with you appear in the nearest unoccupied space to the spot you designated when you prepared your sanctuary (see below). If you cast this spell without first preparing a sanctuary, the spell has no effect.',
      effectType: 'MOVEMENT',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              wordOfRecall: true,
              duration: 0
            })
          }
        ]
      }
    }
  ];

  const seventhLevelSpells = [
    {
      name: 'Conjure Celestial',
      spellLevel: 7,
      castingTime: 60, // 1 minute
      range: 90,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'You summon a celestial of challenge rating 4 or lower, which appears in an unoccupied space that you can see within range. The celestial disappears when it drops to 0 hit points or when the spell ends.',
      effectType: 'SUMMONING',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'SUMMONING',
            value: JSON.stringify({
              conjureCelestial: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Delayed Blast Fireball',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 150,
      area: 20, // 20-foot radius sphere
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'A beam of yellow light flashes from your pointing finger, then condenses to linger at a point within range as a glowing bead for the duration. When the spell ends, either because your concentration is broken or because you decide to end it, the bead blossoms with a low roar into an explosion of flame that spreads around corners. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A creature takes fire damage equal to the total accumulated damage on a failed save, or half as much damage on a successful one.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '12d6' }),
      rollsBySpellSlot: JSON.stringify({
        7: '12d6',
        8: '13d6',
        9: '14d6'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire',
              areaSize: '20-foot radius',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Divine Word',
      spellLevel: 7,
      castingTime: 0, // 1 bonus action
      range: 30,
      area: 0,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'You utter a divine word, imbued with the power that shaped the world at the dawn of creation. Choose any number of creatures you can see within range. Each creature that can hear you must make a Charisma saving throw. On a failed save, a creature suffers an effect based on its current hit points.',
      effectType: 'CONTROL',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              divineWord: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Etherealness',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'You step into the border regions of the Ethereal Plane, in the area where it overlaps with your current plane. You remain in the Border Ethereal for the duration or until you use your action to dismiss the spell.',
      effectType: 'MOVEMENT',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              etherealness: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Finger of Death',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S'],
      description:
        'You send negative energy coursing through a creature that you can see within range, causing it searing pain. The target must make a Constitution saving throw. It takes 7d8 + 30 necrotic damage on a failed save, or half as much damage on a successful one. A humanoid killed by this spell rises at the start of your next turn as a zombie that is permanently under your command, following your verbal orders to the best of its ability.',
      damageType: 'NECROTIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '7d8 + 30' }),
      rollsBySpellSlot: JSON.stringify({
        7: '7d8 + 30',
        8: '8d8 + 30',
        9: '9d8 + 30'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'necrotic',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Fire Storm',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 150,
      area: 10, // Up to ten 10-foot cubes
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'A storm made up of sheets of roaring flame appears in a location you choose within range. The area of the storm consists of up to ten 10-foot cubes, which you can arrange as you wish. Each cube must have at least one face adjacent to the face of another cube. Each creature in the area must make a Dexterity saving throw. It takes 7d10 fire damage on a failed save, or half as much damage on a successful one.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '7d10' }),
      rollsBySpellSlot: JSON.stringify({
        7: '7d10',
        8: '8d10',
        9: '9d10'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire',
              areaSize: 'Up to ten 10-foot cubes',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Forcecage',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 100,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'An immobile, invisible, cube-shaped prison composed of magical force springs into existence around an area you choose within range. The prison can be a cage or a solid box, as you choose.',
      effectType: 'CONTROL',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              forcecage: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Mirage Arcane',
      spellLevel: 7,
      castingTime: 600, // 10 minutes
      range: 0, // Sight
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S'],
      description:
        'You make terrain in an area up to 1 mile square look, sound, smell, and even feel like some other sort of terrain. The illusion includes audible, visual, tactile, and olfactory elements, so it can turn clear ground into difficult terrain (or vice versa) or otherwise impede movement through the area.',
      effectType: 'ILLUSION',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'ILLUSION',
            value: JSON.stringify({
              mirageArcane: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Plane Shift',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You and up to eight willing creatures who link hands in a circle are transported to a different plane of existence. You can specify a target destination in general terms, such as the City of Brass on the Elemental Plane of Fire or the palace of Dispater on the second level of the Nine Hells, and you appear in or near that destination.',
      effectType: 'MOVEMENT',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              planeShift: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Prismatic Spray',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 0, // Self (60-foot cone)
      area: 60, // 60-foot cone
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'Eight multicolored rays of light flash from your hand. Each ray is a different color and has a different power. Each creature in a 60-foot cone must make a Dexterity saving throw. For each target, roll a d8 to determine which color ray affects it.',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '10d6' }),
      rollsBySpellSlot: JSON.stringify({
        7: '10d6',
        8: '11d6',
        9: '12d6'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Cone',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'various',
              areaSize: '60-foot cone',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Project Image',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 500,
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'You create an illusory duplicate of yourself that lasts for the duration. The duplicate can appear at any location within range that you have seen before, regardless of intervening obstacles. The illusion looks and sounds like you but is intangible. If the illusion takes any damage, it disappears, and the spell ends.',
      effectType: 'ILLUSION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'ILLUSION',
            value: JSON.stringify({
              projectImage: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Regenerate',
      spellLevel: 7,
      castingTime: 0, // 1 minute
      range: 0, // Touch
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a creature and stimulate its natural healing ability. The target regains 4d8 + 15 hit points. For the duration of the spell, the target regains 1 hit point at the start of each of its turns (10 hit points each minute).',
      effectType: 'HEALING',
      rolls: JSON.stringify({ 1: '4d8 + 15' }),
      rollsBySpellSlot: JSON.stringify({
        7: '4d8 + 15',
        8: '5d8 + 15',
        9: '6d8 + 15'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'HEALING',
            value: JSON.stringify({
              heal: '4d8 + 15',
              regenerate: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Resurrection',
      spellLevel: 7,
      castingTime: 3600, // 1 hour
      range: 0, // Touch
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'You touch a dead creature that has been dead for no more than a century, that didn’t die of old age, and that isn’t undead. If its soul is free and willing, the target returns to life with all its hit points. This spell neutralizes any poisons and cures normal diseases afflicting the creature when it died. It doesn’t, however, remove magical diseases, curses, or similar effects; if such effects aren’t removed prior to casting the spell, they return when the creature returns to life.',
      effectType: 'RESTORATION',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'RESTORATION',
            value: JSON.stringify({
              resurrection: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Reverse Gravity',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 100,
      area: 50, // 50-foot radius, 100-foot-high cylinder
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'This spell reverses gravity in a 50-foot-radius, 100-foot-high cylinder centered on a point within range. All creatures and objects that aren’t somehow anchored to the ground in the area fall upward and reach the top of the area when you cast this spell. A creature can make a Dexterity saving throw to grab onto a fixed object it can reach, thus avoiding the fall.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              reverseGravity: true,
              areaSize: '50-foot radius, 100-foot-high cylinder',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Sequester',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'TRANSFIGURATION',
      components: ['V', 'S', 'M'],
      description:
        'By means of this spell, you hide a target that is a willing creature or an object within range. The target is invisible and protected from divination magic. If the target is a creature, it falls into a state of suspended animation. Time ceases to flow for it, and it doesn’t grow older.',
      effectType: 'CONTROL',
      duration: 86400, // Until dispelled
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature or Object',
            effectType: 'CONTROL',
            value: JSON.stringify({
              sequester: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Simulacrum',
      spellLevel: 7,
      castingTime: 86400, // 12 hours
      range: 0, // Touch
      area: 0,
      school: 'ILLUSION',
      components: ['V', 'S', 'M'],
      description:
        'You shape an illusory duplicate of one beast or humanoid that is within range for the entire casting time of the spell. The duplicate is a creature, partially real and formed from ice or snow, and it can take actions and otherwise be affected as a normal creature. It appears to be the same as the original, but it has half the creature’s hit point maximum and is formed without any equipment. Otherwise, the illusion uses all the statistics of the creature it duplicates.',
      effectType: 'ILLUSION',
      duration: 86400, // Until dispelled
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'ILLUSION',
            value: JSON.stringify({
              simulacrum: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Symbol',
      spellLevel: 7,
      castingTime: 0, // 1 minute
      range: 0, // Touch
      area: 10, // 10-foot-radius sphere
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'When you cast this spell, you inscribe a harmful glyph either on a surface (such as a section of floor, a wall, or a table) or within an object that can be closed to conceal the glyph (such as a book, a scroll, or a treasure chest). If you choose a surface, the glyph can cover an area of the surface no larger than 10 feet in diameter. If you choose an object, that object must remain in its place; if the object is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered.',
      effectType: 'CONTROL',
      duration: 86400, // Until dispelled or triggered
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              symbol: true,
              areaSize: '10-foot radius',
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Teleport',
      spellLevel: 7,
      castingTime: 0, // 1 action
      range: 0, // 10 feet
      area: 0,
      school: 'CONJURATION',
      components: ['V'],
      description:
        'This spell instantly transports you and up to eight willing creatures of your choice that you can see within range or a single object that you can see within range to a destination you specify. If you target an object, it must be able to fit entirely inside a 10-foot cube, and it can’t be held or carried by an unwilling creature. The destination you choose must be known to you, and it must be on the same plane of existence as you. Your familiarity with the destination determines whether you arrive there successfully.',
      effectType: 'MOVEMENT',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature or Object',
            effectType: 'MOVEMENT',
            value: JSON.stringify({
              teleport: true,
              duration: 0
            })
          }
        ]
      }
    }
  ];

  const eighthLevelSpells = [
    {
      name: "Abi-Dalzim's Horrid Wilting",
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 150,
      area: 30, // 30-foot cube
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'You draw the moisture from every creature in a 30-foot cube centered on a point you choose within range. Each creature in that area must make a Constitution saving throw. Constructs and undead aren’t affected, and plants and water elementals make this saving throw with disadvantage. A creature takes 12d8 necrotic damage on a failed save, or half as much damage on a successful one.',
      damageType: 'NECROTIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '12d8' }),
      rollsBySpellSlot: JSON.stringify({
        8: '12d8',
        9: '13d8'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'necrotic',
              areaSize: '30-foot cube',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Animal Shapes',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S'],
      description:
        'Your magic turns others into beasts. Choose any number of willing creatures that you can see within range. You transform each target into the form of a large or smaller beast with a challenge rating of 4 or lower. On subsequent turns, you can use your action to transform affected creatures into new forms.',
      effectType: 'TRANSFORMATION',
      duration: 86400, // 24 hours
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              animalShapes: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Antimagic Field',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 0, // Self (10-foot radius sphere)
      area: 10, // 10-foot radius sphere
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'A 10-foot-radius invisible sphere of antimagic surrounds you. This area is divorced from the magical energy that suffuses the multiverse. Within the sphere, spells can’t be cast, summoned creatures disappear, and even magic items become mundane.',
      effectType: 'PROTECTION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              antimagicField: true,
              areaSize: '10-foot radius',
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Antipathy/Sympathy',
      spellLevel: 8,
      castingTime: 3600, // 1 hour
      range: 60,
      area: 30, // 30-foot radius
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'This spell attracts or repels creatures of your choice. You target something within range, either a Huge or smaller object or creature or an area that is no larger than a 200-foot cube. The target is imbued with an aura that either attracts or repels the specified creatures for the duration.',
      effectType: 'CONTROL',
      duration: 604800, // 10 days
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area or Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              antipathySympathy: true,
              areaSize: '30-foot radius',
              duration: 604800
            })
          }
        ]
      }
    },
    {
      name: 'Clone',
      spellLevel: 8,
      castingTime: 43200, // 1 hour
      range: 0, // Touch
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'This spell grows an inert duplicate of a living creature as a safeguard against death. This clone forms inside a sealed vessel and grows to full size and maturity after 120 days. You can also make a clone of a creature that has died, provided that creature has been dead for no more than 10 days.',
      effectType: 'RESTORATION',
      duration: 86400, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'RESTORATION',
            value: JSON.stringify({
              clone: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Control Weather',
      spellLevel: 8,
      castingTime: 600, // 10 minutes
      range: 0, // Self (5-mile radius)
      area: 5, // 5-mile radius
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You take control of the weather within 5 miles of you for the duration. You must be outdoors to cast this spell. Moving to a place where you don’t have a clear path to the sky ends the spell early. When you cast the spell, you change the current weather conditions, which are determined by the DM based on the climate and season.',
      effectType: 'CONTROL',
      duration: 28800, // 8 hours
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              controlWeather: true,
              areaSize: '5-mile radius',
              duration: 28800
            })
          }
        ]
      }
    },
    {
      name: 'Demiplane',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'You create a shadowy door on a flat solid surface that you can see within range. The door is large enough to allow Medium creatures to pass through unhindered. When opened, the door leads to a demiplane that appears to be an empty room 30 feet in each dimension, made of wood or stone.',
      effectType: 'TRANSPORTATION',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'TRANSPORTATION',
            value: JSON.stringify({
              demiplane: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Dominate Monster',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'You attempt to beguile a creature that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. If you or creatures that are friendly to you are fighting it, it has advantage on the saving throw.',
      effectType: 'CONTROL',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              dominateMonster: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Earthquake',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 500,
      area: 100, // 100-foot radius
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'You create a seismic disturbance at a point on the ground that you can see within range. For the duration, an intense tremor rips through the ground in a 100-foot radius circle centered on that point and shakes creatures and structures in contact with the ground in that area.',
      effectType: 'CONTROL',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              earthquake: true,
              areaSize: '100-foot radius',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Feeblemind',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 150,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S', 'M'],
      description:
        'You blast the mind of a creature that you can see within range, attempting to shatter its intellect and personality. The target takes 4d6 psychic damage and must make an Intelligence saving throw. On a failed save, the creature’s Intelligence and Charisma scores become 1. The creature can’t cast spells, activate magic items, understand language, or communicate in any intelligible way.',
      damageType: 'PSYCHIC',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '4d6' }),
      rollsBySpellSlot: JSON.stringify({
        8: '4d6',
        9: '5d6'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'psychic',
              duration: 0
            })
          },
          {
            targetType: 'Creature',
            effectType: 'DEBUFF',
            value: JSON.stringify({
              intelligence: -1,
              charisma: -1,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Glibness',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V'],
      description:
        'Until the spell ends, when you make a Charisma check, you can replace the number you roll with a 15. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates that you are being truthful.',
      effectType: 'BUFF',
      duration: 3600, // 1 hour
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'BUFF',
            value: JSON.stringify({
              charismaCheck: 15,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Holy Aura',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 30, // 30-foot radius
      school: 'ABJURATION',
      components: ['V', 'S', 'M'],
      description:
        'Divine light washes out from you and coalesces in a soft radiance in a 30-foot radius around you. Creatures of your choice in that radius when you cast this spell shed dim light in a 5-foot radius and have advantage on all saving throws. Other creatures have disadvantage on attack rolls against them until the spell ends.',
      effectType: 'BUFF',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'BUFF',
            value: JSON.stringify({
              savingThrowAdvantage: true,
              attackRollDisadvantage: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Incendiary Cloud',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 150,
      area: 20, // 20-foot radius
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'A swirling cloud of smoke shot through with white-hot embers appears in a 20-foot-radius sphere centered on a point within range. The cloud spreads around corners and is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it. When the cloud appears, each creature in it must make a Dexterity saving throw. A creature takes 10d8 fire damage on a failed save, or half as much damage on a successful one.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '10d8' }),
      rollsBySpellSlot: JSON.stringify({
        8: '10d8',
        9: '11d8'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 600, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire',
              areaSize: '20-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Maze',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'You banish a creature that you can see within range into a labyrinthine demiplane. The target remains there for the duration or until it escapes the maze. The target can use its action to attempt to escape. When the spell ends, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.',
      effectType: 'CONTROL',
      duration: 600, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              banish: true,
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Mind Blank',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 0, // Touch
      area: 0,
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'Until the spell ends, one willing creature you touch is immune to psychic damage, any effect that would sense its emotions or read its thoughts, divination spells, and the charmed condition.',
      effectType: 'PROTECTION',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              immune: [
                'psychic damage',
                'emotions sense',
                'thoughts reading',
                'divination spells',
                'charmed condition'
              ],
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Power Word Stun',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V'],
      description:
        'You speak a word of power that can overwhelm the mind of one creature you can see within range, leaving it dumbfounded. If the target has 150 hit points or fewer, it is stunned. Otherwise, the spell has no effect. The stunned target must make a Constitution saving throw at the end of each of its turns. On a successful save, this stunning effect ends.',
      effectType: 'CONTROL',
      duration: 0, // Until target makes a successful save
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              powerWordStun: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Sunburst',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 150,
      area: 60, // 60-foot radius
      school: 'EVOCATION',
      components: ['V', 'S', 'M'],
      description:
        'Brilliant sunlight flashes in a 60-foot radius centered on a point you choose within range. Each creature in that light must make a Constitution saving throw. On a failed save, a creature takes 12d6 radiant damage and is blinded for 1 minute. On a successful save, it takes half as much damage and isn’t blinded by this spell. Undead and oozes have disadvantage on this saving throw.',
      damageType: 'RADIANT',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '12d6' }),
      rollsBySpellSlot: JSON.stringify({
        8: '12d6',
        9: '13d6'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 60, // 1 minute
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'radiant',
              areaSize: '60-foot radius',
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Telepathy',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'You create a telepathic link between yourself and a willing creature with which you are familiar. The creature can be anywhere on the same plane of existence as you. You and the target can instantaneously share words, images, sounds, and other sensory messages with one another through the link, and the target recognizes you as the creature it is communicating with. The spell enables a creature with an Intelligence score of at least 1 to understand your meaning regardless of language.',
      effectType: 'COMMUNICATION',
      duration: 86400, // 24 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'COMMUNICATION',
            value: JSON.stringify({
              telepathy: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Trap the Soul',
      spellLevel: 8,
      castingTime: 0, // 1 action
      range: 90,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You can imprison a creature’s soul in a special gem. While the soul is trapped, the creature’s body is incapacitated. The creature can make a Charisma saving throw to resist being trapped. If the save fails, the creature’s soul is trapped, and its body is incapacitated until the spell ends.',
      effectType: 'CONTROL',
      duration: 86400, // Until the gem is destroyed or the spell is dispelled
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'CONTROL',
            value: JSON.stringify({
              trapSoul: true,
              duration: 86400
            })
          }
        ]
      }
    },
    {
      name: 'Tsunami',
      spellLevel: 8,
      castingTime: 0, // 1 minute
      range: 300,
      area: 300, // 300-foot long, 50-foot tall, 50-foot wide
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'A wall of water springs into existence at a point you choose within range. You can make the wall up to 300 feet long, 300 feet high, and 50 feet thick. The wall lasts for the duration. When the wall appears, each creature within its area must make a Strength saving throw. On a failed save, a creature takes 6d10 bludgeoning damage, or half as much damage on a successful save.',
      damageType: 'BLUDGEONING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '6d10' }),
      rollsBySpellSlot: JSON.stringify({
        8: '6d10',
        9: '7d10'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'bludgeoning',
              areaSize: '300-foot long, 50-foot tall, 50-foot wide',
              duration: 600
            })
          }
        ]
      }
    }
  ];

  const ninthLevelSpells = [
    {
      name: 'Astral Projection',
      spellLevel: 9,
      castingTime: 3600, // 1 hour
      range: 10, // 10 feet
      area: 0,
      school: 'NECROMANCY',
      components: ['V', 'S', 'M'],
      description:
        'You and up to eight willing creatures within range project your astral bodies into the Astral Plane. The material body you leave behind is unconscious and in a state of suspended animation. Your astral body resembles your mortal form in almost every way, replicating your game statistics and possessions.',
      effectType: 'TRANSPORTATION',
      duration: 0, // Special
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSPORTATION',
            value: JSON.stringify({
              astralProjection: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Foresight',
      spellLevel: 9,
      castingTime: 0, // 1 minute
      range: 0, // Touch
      area: 0,
      school: 'DIVINATION',
      components: ['V', 'S', 'M'],
      description:
        'You touch a willing creature and bestow a limited ability to see into the immediate future. For the duration, the target can’t be surprised and has advantage on attack rolls, ability checks, and saving throws. Additionally, other creatures have disadvantage on attack rolls against the target for the duration.',
      effectType: 'BUFF',
      duration: 28800, // 8 hours
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'BUFF',
            value: JSON.stringify({
              foresight: true,
              duration: 28800
            })
          }
        ]
      }
    },
    {
      name: 'Gate',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'CONJURATION',
      components: ['V', 'S', 'M'],
      description:
        'You conjure a portal linking an unoccupied space you can see within range to a precise location on a different plane of existence. The portal is a circular opening, which you can make 5 to 20 feet in diameter. The portal lasts for the duration.',
      effectType: 'TRANSPORTATION',
      duration: 60, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'TRANSPORTATION',
            value: JSON.stringify({
              gate: true,
              duration: 60
            })
          }
        ]
      }
    },
    {
      name: 'Mass Heal',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'A wave of healing energy washes out from a point of your choice within range. Choose up to six creatures in a 30-foot-radius sphere centered on that point. Each target regains hit points equal to 700 divided among them as you choose.',
      effectType: 'HEALING',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'HEALING',
            value: JSON.stringify({
              healing: '700 HP divided',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Meteor Swarm',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 1000,
      area: 40, // Four 40-foot radius spheres
      school: 'EVOCATION',
      components: ['V', 'S'],
      description:
        'Blazing orbs of fire plummet to the ground at four different points you can see within range. Each creature in a 40-foot-radius sphere centered on each point must make a Dexterity saving throw. A creature takes 20d6 fire damage and 20d6 bludgeoning damage on a failed save, or half as much damage on a successful one.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '20d6' }),
      rollsBySpellSlot: JSON.stringify({
        9: '20d6'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'fire and bludgeoning',
              areaSize: '40-foot radius sphere',
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Power Word Heal',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V', 'S'],
      description:
        'A wave of healing energy washes over the target. The creature regains all its hit points. If the creature is charmed, frightened, paralyzed, or stunned, the condition ends.',
      effectType: 'HEALING',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'HEALING',
            value: JSON.stringify({
              powerWordHeal: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Power Word Kill',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 60,
      area: 0,
      school: 'ENCHANTMENT',
      components: ['V'],
      description:
        'You utter a word of power that can compel one creature you can see within range to die instantly. If the creature you choose has 100 hit points or fewer, it dies. Otherwise, the spell has no effect.',
      effectType: 'INSTANT_DEATH',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'INSTANT_DEATH',
            value: JSON.stringify({
              powerWordKill: true,
              duration: 0
            })
          }
        ]
      }
    },
    {
      name: 'Prismatic Wall',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 60,
      area: 90, // 90-foot long, 30-foot high, 1-inch thick
      school: 'ABJURATION',
      components: ['V', 'S'],
      description:
        'A shimmering, multicolored plane of light forms a vertical opaque wall up to 90 feet long, 30 feet high, and 1 inch thick centered on a point you can see within range. The wall remains in place for the duration. If you position the wall so that it passes through a space occupied by a creature, the spell fails, and your action is wasted.',
      effectType: 'PROTECTION',
      duration: 600, // 10 minutes
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'PROTECTION',
            value: JSON.stringify({
              prismaticWall: true,
              areaSize: '90-foot long, 30-foot high, 1-inch thick',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Shapechange',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'You assume the form of a different creature for the duration. The new form can be any creature with a challenge rating equal to your level or lower. Your game statistics are replaced by the statistics of the chosen creature, though you retain your alignment and personality.',
      effectType: 'TRANSFORMATION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              shapechange: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Storm of Vengeance',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 120,
      area: 360, // 360-foot radius
      school: 'CONJURATION',
      components: ['V', 'S'],
      description:
        'A churning storm cloud forms, centered on a point you can see and spreading to a radius of 360 feet. Lightning flashes in the area, thunder booms, and strong winds roar. Each creature under the cloud must make a Constitution saving throw. On a failed save, a creature takes 2d6 thunder damage and becomes deafened for 5 minutes. On each of your turns until the spell ends, you can call down lightning to strike a target within range.',
      damageType: 'THUNDER',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({ 1: '2d6' }),
      rollsBySpellSlot: JSON.stringify({
        9: '2d6'
      }),
      rollByCharacterLevel: false,
      rollBySpellSlot: true,
      duration: 600, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'DAMAGE',
            value: JSON.stringify({
              damage: 'thunder',
              areaSize: '360-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'True Polymorph',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 30,
      area: 0,
      school: 'TRANSMUTATION',
      components: ['V', 'S', 'M'],
      description:
        'Choose one creature or nonmagical object that you can see within range. You transform the creature into a different creature, the creature into a noncreature, or the object into a creature. The transformation lasts for the duration, or until the target drops to 0 hit points or dies.',
      effectType: 'TRANSFORMATION',
      duration: 3600, // 1 hour
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Creature',
            effectType: 'TRANSFORMATION',
            value: JSON.stringify({
              truePolymorph: true,
              duration: 3600
            })
          }
        ]
      }
    },
    {
      name: 'Weird',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 120,
      area: 30, // 30-foot radius
      school: 'ILLUSION',
      components: ['V', 'S'],
      description:
        'Drawing on the deepest fears of a group of creatures, you create phantasmal images in their minds, visible only to them. Each creature in a 30-foot-radius sphere centered on a point of your choice within range must make a Wisdom saving throw. On a failed save, a creature becomes frightened for the duration.',
      effectType: 'CONTROL',
      duration: 600, // 1 minute
      concentration: true,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Area',
            effectType: 'CONTROL',
            value: JSON.stringify({
              fear: true,
              areaSize: '30-foot radius',
              duration: 600
            })
          }
        ]
      }
    },
    {
      name: 'Wish',
      spellLevel: 9,
      castingTime: 0, // 1 action
      range: 0, // Self
      area: 0,
      school: 'CONJURATION',
      components: ['V'],
      description:
        'Wish is the mightiest spell a mortal creature can cast. By simply speaking aloud, you can alter the very foundations of reality in accord with your desires.',
      effectType: 'UTILITY',
      duration: 0, // Instantaneous
      concentration: false,
      ritual: false,
      spellEffects: {
        create: [
          {
            targetType: 'Self',
            effectType: 'UTILITY',
            value: JSON.stringify({ wish: true, duration: 0 })
          }
        ]
      }
    }
  ];
  const breathWeapons = [
    {
      name: 'Breath Weapon (Acid)',
      spellLevel: 0,
      castingTime: 0,
      range: 5,
      area: 5,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'You can use your action to exhale destructive energy. Each creature in the area must make a Dexterity saving throw. A creature takes 2d6 acid damage on a failed save, and half as much damage on a successful one.',
      damageType: 'ACID',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({
        1: '2d6',
        3: '3d6',
        6: '4d6',
        11: '5d6',
        16: '6d6'
      }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0,
      concentration: false,
      ritual: false
    },
    {
      name: 'Breath Weapon (Lightning)',
      spellLevel: 0,
      castingTime: 0,
      range: 30,
      area: 5,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'You can use your action to exhale destructive energy. Each creature in the area must make a Dexterity saving throw. A creature takes 2d6 lightning damage on a failed save, and half as much damage on a successful one.',
      damageType: 'LIGHTNING',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({
        1: '2d6',
        3: '3d6',
        6: '4d6',
        11: '5d6',
        16: '6d6'
      }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0,
      concentration: false,
      ritual: false
    },
    {
      name: 'Breath Weapon (Fire)',
      spellLevel: 0,
      castingTime: 0,
      range: 15,
      area: 15,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'You can use your action to exhale destructive energy. Each creature in the area must make a Dexterity saving throw. A creature takes 2d6 fire damage on a failed save, and half as much damage on a successful one.',
      damageType: 'FIRE',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({
        1: '2d6',
        3: '3d6',
        6: '4d6',
        11: '5d6',
        16: '6d6'
      }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0,
      concentration: false,
      ritual: false
    },
    {
      name: 'Breath Weapon (Cold)',
      spellLevel: 0,
      castingTime: 0,
      range: 15,
      area: 15,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'You can use your action to exhale destructive energy. Each creature in the area must make a Dexterity saving throw. A creature takes 2d6 cold damage on a failed save, and half as much damage on a successful one.',
      damageType: 'COLD',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({
        1: '2d6',
        3: '3d6',
        6: '4d6',
        11: '5d6',
        16: '6d6'
      }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0,
      concentration: false,
      ritual: false
    },
    {
      name: 'Breath Weapon (Poison)',
      spellLevel: 0,
      castingTime: 0,
      range: 15,
      area: 15,
      school: 'EVOCATION',
      components: ['V'],
      description:
        'You can use your action to exhale destructive energy. Each creature in the area must make a Dexterity saving throw. A creature takes 2d6 poison damage on a failed save, and half as much damage on a successful one.',
      damageType: 'POISON',
      effectType: 'DAMAGE',
      rolls: JSON.stringify({
        1: '2d6',
        3: '3d6',
        6: '4d6',
        11: '5d6',
        16: '6d6'
      }),
      rollByCharacterLevel: true,
      rollBySpellSlot: false,
      duration: 0,
      concentration: false,
      ritual: false
    }
  ];

  for (const spell of breathWeapons) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of ninthLevelSpells) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of eighthLevelSpells) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of seventhLevelSpells) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of sixthLevelSpells) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of fifthLevelSpells) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of fourthLevelSpells) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of thirdLevelSpells) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of secondLevelSpells) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of firstLevelSpells) {
    await prisma.spell.create({
      data: spell
    });
  }

  for (const spell of cantrips) {
    await prisma.spell.create({
      data: spell
    });
  }

  console.log('Spells seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
