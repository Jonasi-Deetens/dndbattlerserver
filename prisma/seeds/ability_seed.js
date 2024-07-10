import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

const abilities = [
  {
    name: 'Rage',
    description:
      'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.',
    buffs:
      'Advantage on Strength checks and saving throws, bonus to damage rolls, resistance to bludgeoning, piercing, and slashing damage.',
    duration: '1 minute',
    range: 'Self',
    actionType: 'Bonus Action'
  },
  {
    name: 'Intimidating Presence',
    description:
      'You can use your action to frighten someone with your menacing presence.',
    buffs: 'Frightened condition',
    duration: '1 minute',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Retaliation',
    description:
      'When you take damage from a creature that is within 5 feet of you, you can use your reaction to make a melee weapon attack against that creature.',
    buffs: 'Immediate attack',
    range: '5 feet',
    actionType: 'Reaction'
  },
  {
    name: 'Bardic Inspiration',
    description: 'You can inspire others through stirring words or music.',
    buffs:
      'Add Bardic Inspiration die to ability check, attack roll, or saving throw',
    duration: '10 minutes',
    range: '60 feet',
    actionType: 'Bonus Action'
  },
  {
    name: 'Countercharm',
    description:
      'You gain the ability to use musical notes or words of power to disrupt mind-influencing effects.',
    buffs: 'Advantage on saving throws against being frightened or charmed',
    duration: '1 minute',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Channel Divinity',
    description: 'You can channel divine energy to fuel magical effects.',
    buffs: 'Varies by domain',
    duration: 'Instantaneous',
    range: 'Varies',
    actionType: 'Action'
  },
  {
    name: 'Channel Divinity: Turn Undead',
    description:
      'As an action, you present your holy symbol and speak a prayer censuring the undead.',
    buffs: 'Turns undead',
    duration: '1 minute',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Divine Intervention',
    description:
      'You can call on your deity to intervene on your behalf when your need is great.',
    buffs: 'Divine help',
    duration: 'Instantaneous',
    range: 'Varies',
    actionType: 'Action'
  },
  {
    name: 'Blessings of Knowledge',
    description:
      'You learn two languages of your choice, and you also become proficient in your choice of two of the following skills: Arcana, History, Nature, or Religion.',
    buffs: 'Skill proficiency, language proficiency',
    duration: 'Permanent',
    range: 'Self',
    actionType: 'Passive'
  },
  {
    name: 'Channel Divinity: Knowledge of the Ages',
    description:
      'You can use your Channel Divinity to tap into a divine well of knowledge.',
    buffs: 'Gain proficiency in any skill or tool',
    duration: '10 minutes',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Channel Divinity: Read Thoughts',
    description:
      'You can use your Channel Divinity to read a creature’s thoughts.',
    buffs: 'Read thoughts',
    duration: '1 minute',
    range: '60 feet',
    actionType: 'Action'
  },
  {
    name: 'Visions of the Past',
    description:
      'You can call up visions of the past that relate to an object you hold or your immediate surroundings.',
    buffs: 'Gain historical knowledge',
    duration: 'Varies',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Channel Divinity: Preserve Life',
    description: 'You can use your Channel Divinity to heal the badly injured.',
    buffs: 'Heal hit points',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Divine Strike',
    description:
      'You gain the ability to infuse your weapon strikes with divine energy.',
    damage: '1d8 extra damage',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Passive'
  },
  {
    name: 'Warding Flare',
    description:
      'You can interpose divine light between yourself and an attacking enemy.',
    buffs: 'Impose disadvantage on attack roll',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Reaction'
  },
  {
    name: 'Channel Divinity: Radiance of the Dawn',
    description:
      'You can use your Channel Divinity to harness sunlight, banishing darkness and dealing radiant damage to your foes.',
    damage: '2d10 + cleric level radiant damage',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Corona of Light',
    description:
      'You can use your action to activate an aura of sunlight that lasts for 1 minute or until you dismiss it using another action.',
    buffs: 'Bright light, disadvantage on saving throws against radiant damage',
    duration: '1 minute',
    range: '30 feet radius',
    actionType: 'Action'
  },
  {
    name: 'Channel Divinity: Charm Animals and Plants',
    description:
      'You can use your Channel Divinity to charm animals and plants.',
    buffs: 'Charm animals and plants',
    duration: '1 minute',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Dampen Elements',
    description:
      'When you or a creature within 30 feet of you takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance to the creature against that instance of the damage.',
    buffs: 'Grant resistance to elemental damage',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Reaction'
  },
  {
    name: 'Master of Nature',
    description: 'You gain the ability to command animals and plants.',
    buffs: 'Command animals and plants',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Channel Divinity: Destructive Wrath',
    description:
      'You can use your Channel Divinity to wield the power of the storm with unchecked ferocity.',
    buffs: 'Maximize thunder or lightning damage',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Wrath of the Storm',
    description: 'You can thunderously rebuke attackers.',
    damage: '2d8 thunder or lightning damage',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Reaction'
  },
  {
    name: 'Channel Divinity: Invoke Duplicity',
    description:
      'You can use your Channel Divinity to create an illusory duplicate of yourself.',
    buffs: 'Create duplicate',
    duration: '1 minute',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Channel Divinity: Cloak of Shadows',
    description: 'You can use your Channel Divinity to become invisible.',
    buffs: 'Invisibility',
    duration: 'End of next turn',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Channel Divinity: Guided Strike',
    description:
      'You can use your Channel Divinity to strike with supernatural accuracy.',
    buffs: '+10 to attack roll',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: "Channel Divinity: War God's Blessing",
    description:
      'You can use your Channel Divinity to grant +10 to an attack roll.',
    buffs: '+10 to attack roll',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Reaction'
  },
  {
    name: 'Wild Shape',
    description:
      'You can use your action to magically assume the shape of a beast that you have seen before.',
    buffs: 'Transform into beast',
    duration: 'Varies',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Elemental Wild Shape',
    description:
      'You can expend two uses of Wild Shape at the same time to transform into an air elemental, an earth elemental, a fire elemental, or a water elemental.',
    buffs: 'Transform into elemental',
    duration: 'Varies',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Second Wind',
    description:
      'You have a limited well of stamina that you can draw on to protect yourself from harm.',
    buffs: 'Regain hit points equal to 1d10 + fighter level',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Bonus Action'
  },
  {
    name: 'Weapon Bond',
    description:
      'You can perform a ritual to create a magical bond between yourself and one weapon.',
    buffs: 'Summon bonded weapon',
    duration: 'Permanent',
    range: 'Self',
    actionType: '1-hour Ritual'
  },
  {
    name: 'War Magic',
    description:
      'When you use your action to cast a cantrip, you can make one weapon attack as a bonus action.',
    buffs: 'Bonus attack',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Bonus Action'
  },
  {
    name: 'Arcane Charge',
    description:
      'You gain the ability to teleport up to 30 feet to an unoccupied space you can see when you use your Action Surge.',
    buffs: 'Teleportation',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Action Surge'
  },
  {
    name: 'Improved War Magic',
    description:
      'When you use your action to cast a spell, you can make one weapon attack as a bonus action.',
    buffs: 'Bonus attack',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Bonus Action'
  },
  {
    name: 'Deflect Missiles',
    description:
      'You can use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack.',
    buffs: 'Reduce damage by 1d10 + Dexterity modifier + monk level',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Reaction'
  },
  {
    name: 'Empty Body',
    description:
      'You can use your action to spend 4 ki points to become invisible for 1 minute.',
    buffs: 'Invisibility',
    duration: '1 minute',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Wholeness of Body',
    description:
      'You can use your action to regain hit points equal to three times your monk level.',
    buffs: 'Heal',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Quivering Palm',
    description:
      'You can set up lethal vibrations in someone’s body. When you hit a creature with an unarmed strike, you can spend 3 ki points to start these imperceptible vibrations, which last for a number of days equal to your monk level.',
    buffs: 'Lethal vibrations',
    duration: 'Varies',
    range: 'Touch',
    actionType: 'Action'
  },
  {
    name: 'Cloak of Shadows',
    description:
      'You can use your action to become invisible until the end of your next turn.',
    buffs: 'Invisibility',
    duration: 'End of next turn',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Opportunist',
    description:
      'Whenever a creature within your reach is hit by an attack made by a creature other than you, you can use your reaction to make a melee attack against that creature.',
    buffs: 'Bonus attack',
    duration: 'Instantaneous',
    range: 'Reach',
    actionType: 'Reaction'
  },
  {
    name: 'Divine Sense',
    description:
      'You can use your action to open your awareness to detect such forces.',
    buffs: 'Detect celestial, fiend, or undead',
    duration: 'Instantaneous',
    range: '60 feet',
    actionType: 'Action'
  },
  {
    name: 'Lay on Hands',
    description:
      'Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest.',
    buffs: 'Heal hit points',
    duration: 'Instantaneous',
    range: 'Touch',
    actionType: 'Action'
  },
  {
    name: 'Divine Smite',
    description:
      'When you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon’s damage.',
    damage:
      '2d8 radiant damage for a 1st-level spell slot, +1d8 for each spell level higher than 1st',
    duration: 'Instantaneous',
    range: 'Melee',
    actionType: 'Bonus Action'
  },
  {
    name: 'Cleansing Touch',
    description:
      'You can use your action to end one spell on yourself or on one willing creature that you touch.',
    buffs: 'End one spell',
    duration: 'Instantaneous',
    range: 'Touch',
    actionType: 'Action'
  },
  {
    name: 'Sacred Weapon',
    description:
      'As an action, you can imbue one weapon that you are holding with positive energy.',
    buffs: '+ Charisma modifier to attack rolls, weapon emits bright light',
    duration: '1 minute',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Turn the Unholy',
    description:
      'As an action, you present your holy symbol and speak a prayer censuring fiends and undead.',
    buffs: 'Turn fiends and undead',
    duration: '1 minute',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Holy Nimbus',
    description:
      'As an action, you can emanate an aura of sunlight. For 1 minute, bright light shines from you in a 30-foot radius, and dim light shines 30 feet beyond that.',
    buffs: 'Aura of sunlight, 10 radiant damage to fiends and undead',
    duration: '1 minute',
    range: '30 feet radius',
    actionType: 'Action'
  },
  {
    name: "Nature's Wrath",
    description:
      'You can use your Channel Divinity to invoke primeval forces to ensnare a foe.',
    buffs: 'Restrain a creature',
    duration: '1 minute',
    range: '10 feet',
    actionType: 'Action'
  },
  {
    name: 'Turn the Faithless',
    description:
      'You can use your Channel Divinity to utter ancient words that are painful for fey and fiends to hear.',
    buffs: 'Turn fey and fiends',
    duration: '1 minute',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'Elder Champion',
    description:
      'You can assume the form of an ancient force of nature, taking on an appearance you choose.',
    buffs: 'Transform into ancient force of nature',
    duration: '1 minute',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Abjure Enemy',
    description:
      'As an action, you present your holy symbol and speak a prayer of denunciation, using your Channel Divinity to choose one creature within 60 feet of you that you can see.',
    buffs: 'Frighten a creature',
    duration: '1 minute',
    range: '60 feet',
    actionType: 'Action'
  },
  {
    name: 'Vow of Enmity',
    description:
      'As a bonus action, you can utter a vow of enmity against a creature you can see within 10 feet of you, using your Channel Divinity.',
    buffs: 'Gain advantage on attack rolls against the creature',
    duration: '1 minute',
    range: '10 feet',
    actionType: 'Bonus Action'
  },
  {
    name: 'Avenging Angel',
    description:
      'As an action, you can transform, gaining glimmering eyes and two large, radiant, incorporeal wings for 1 hour.',
    buffs: 'Flying speed, advantage on attack rolls against fiends and undead',
    duration: '1 hour',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Primeval Awareness',
    description:
      'You can use your action and expend one ranger spell slot to focus your awareness on the region around you.',
    buffs:
      'Detect aberrations, celestials, dragons, elementals, fey, fiends, and undead',
    duration: '1 minute',
    range: '1 mile/6 miles',
    actionType: 'Action'
  },
  {
    name: 'Hide in Plain Sight',
    description:
      'You can spend 1 minute creating camouflage for yourself. You must have access to fresh mud, dirt, plants, soot, and other naturally occurring materials.',
    buffs: '+10 bonus to Dexterity (Stealth) checks',
    duration: 'Until you move',
    range: 'Self',
    actionType: '1 minute'
  },
  {
    name: 'Sneak Attack',
    description:
      'You know how to strike subtly and exploit a foe’s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon.',
    damage: 'Extra 1d6 damage (increases with levels)',
    duration: 'Instantaneous',
    range: 'Varies',
    actionType: 'Passive'
  },
  {
    name: 'Blindsense',
    description:
      'If you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.',
    buffs: 'Detect hidden/invisible creatures',
    duration: 'Permanent',
    range: '10 feet',
    actionType: 'Passive'
  },
  {
    name: 'Infiltration Expertise',
    description:
      'You can unfailingly create false identities for yourself. You must spend seven days and 25 gp to establish the history, profession, and affiliations for an identity.',
    buffs: 'Create false identity',
    duration: 'Permanent',
    range: 'Self',
    actionType: 'Passive'
  },
  {
    name: 'Impostor',
    description:
      'You gain the ability to unerringly mimic another person’s speech, writing, and behavior.',
    buffs: 'Mimic speech, writing, and behavior',
    duration: 'Permanent',
    range: 'Self',
    actionType: 'Passive'
  },
  {
    name: 'Spell Thief',
    description:
      'You can steal the knowledge of how to cast a spell from another spellcaster.',
    buffs: 'Steal and cast spell',
    duration: '8 hours',
    range: 'Self',
    actionType: 'Reaction'
  },
  {
    name: 'Dragon Wings',
    description:
      'You gain the ability to sprout a pair of dragon wings, gaining a flying speed equal to your current speed.',
    buffs: 'Flying speed',
    duration: 'Permanent',
    range: 'Self',
    actionType: 'Bonus Action'
  },
  {
    name: 'Draconic Presence',
    description:
      'You can channel the dread presence of your dragon ancestor, causing those around you to become awestruck or frightened.',
    buffs: 'Frighten or charm creatures',
    duration: '1 minute',
    range: '60 feet',
    actionType: 'Action'
  },
  {
    name: 'Eldritch Blast',
    description:
      'A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.',
    damage: '1d10 force damage',
    duration: 'Instantaneous',
    range: '120 feet',
    actionType: 'Action'
  },
  {
    name: 'Eldritch Master',
    description:
      'You can draw on your inner reserve of mystical power while entreating your patron to regain expended spell slots.',
    buffs: 'Regain all spell slots',
    duration: '1 minute',
    range: 'Self',
    actionType: '1 minute'
  },
  {
    name: 'Fey Presence',
    description:
      'You can cause each creature in a 10-foot cube originating from you to make a Wisdom saving throw or be charmed or frightened by you.',
    buffs: 'Charm or frighten creatures',
    duration: '1 round',
    range: '10 feet cube',
    actionType: 'Action'
  },
  {
    name: 'Misty Escape',
    description:
      'When you take damage, you can use your reaction to turn invisible and teleport up to 60 feet to an unoccupied space you can see.',
    buffs: 'Invisibility, teleportation',
    duration: '1 turn',
    range: '60 feet',
    actionType: 'Reaction'
  },
  {
    name: 'Beguiling Defenses',
    description:
      'You are immune to being charmed, and when another creature attempts to charm you, you can use your reaction to attempt to turn the charm back on that creature.',
    buffs: 'Immune to charm, turn charm back',
    duration: 'Instantaneous',
    range: 'Self',
    actionType: 'Reaction'
  },
  {
    name: 'Dark Delirium',
    description:
      'As an action, you can choose a creature that you can see within 60 feet of you. It must succeed on a Wisdom saving throw or be charmed or frightened by you.',
    buffs: 'Charm or frighten creature',
    duration: '1 minute',
    range: '60 feet',
    actionType: 'Action'
  },
  {
    name: 'Hurl Through Hell',
    description:
      'When you hit a creature with an attack, you can use this feature to instantly transport the target through the lower planes.',
    damage: '10d10 psychic damage',
    duration: 'Instantaneous',
    range: 'Melee',
    actionType: 'Reaction'
  },
  {
    name: 'Create Thrall',
    description:
      'You can use your magic to bring a creature back to life as a thrall.',
    buffs: 'Create thrall',
    duration: 'Permanent',
    range: 'Touch',
    actionType: 'Action'
  },
  {
    name: 'Arcane Ward',
    description:
      'When you cast an abjuration spell of 1st level or higher, you can simultaneously use a strand of the spell’s magic to create a magical ward on yourself that lasts until you finish a long rest.',
    buffs: 'Magical ward',
    duration: 'Until long rest',
    range: 'Self',
    actionType: 'Passive'
  },
  {
    name: 'Projected Ward',
    description:
      'When a creature that you can see within 30 feet of you takes damage, you can use your reaction to cause your Arcane Ward to absorb that damage.',
    buffs: 'Absorb damage',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Reaction'
  },
  {
    name: 'Minor Conjuration',
    description:
      'You can use your action to conjure up an inanimate object in your hand or on the ground in an unoccupied space that you can see within 10 feet of you.',
    buffs: 'Conjure object',
    duration: '1 hour',
    range: '10 feet',
    actionType: 'Action'
  },
  {
    name: 'Benign Transposition',
    description:
      'You can use your action to teleport up to 30 feet to an unoccupied space that you can see. Alternatively, you can choose a space within range that is occupied by a Small or Medium creature.',
    buffs: 'Teleportation',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Action'
  },
  {
    name: 'The Third Eye',
    description:
      'You can use your action to increase your powers of perception.',
    buffs:
      'Darkvision, ethereal sight, greater comprehension, or see invisibility',
    duration: '1 hour',
    range: 'Self',
    actionType: 'Action'
  },
  {
    name: 'Hypnotic Gaze',
    description:
      'As an action, choose one creature that you can see within 5 feet of you. If the target can see or hear you, it must succeed on a Wisdom saving throw or be charmed by you.',
    buffs: 'Charm creature',
    duration: '1 minute',
    range: '5 feet',
    actionType: 'Action'
  },
  {
    name: 'Instinctive Charm',
    description:
      'When a creature you can see within 30 feet of you makes an attack roll against you, you can use your reaction to divert the attack.',
    buffs: 'Divert attack',
    duration: 'Instantaneous',
    range: '30 feet',
    actionType: 'Reaction'
  },
  {
    name: 'Command Undead',
    description:
      'As an action, you can choose one undead that you can see within 60 feet of you. That creature must make a Charisma saving throw.',
    buffs: 'Command undead',
    duration: '24 hours',
    range: '60 feet',
    actionType: 'Action'
  },
  {
    name: "Transmuter's Stone",
    description:
      'You can spend 8 hours creating a transmuter’s stone that stores transmutation magic.',
    buffs:
      'Buffs based on choice (darkvision, speed, proficiency, or Constitution saving throws)',
    duration: 'Until destroyed',
    range: 'Touch',
    actionType: '8 hours'
  },
  {
    name: 'Master Transmuter',
    description:
      'You can use your action to consume the magic stored within a transmuter’s stone and create a powerful transformation effect.',
    buffs: 'Major transformation effect',
    duration: 'Instantaneous',
    range: 'Varies',
    actionType: 'Action'
  }
];

async function main() {
  // Create abilities
  for (const ability of abilities) {
    await prisma.ability.create({
      data: {
        name: ability.name,
        description: ability.description,
        damage: ability.damage,
        buffs: ability.buffs,
        duration: ability.duration,
        range: ability.range,
        actionType: ability.actionType
      }
    });
    console.log(`Created ability: ${ability.name}`);
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
