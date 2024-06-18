import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// List of all D&D 5e spells
const spells = [
  // Cantrips (0th level)
  {
    name: 'Acid Splash',
    level: 0,
    school: 'Conjuration',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'You hurl a bubble of acid. Choose one creature within range or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.'
  },
  {
    name: 'Blade Ward',
    level: 0,
    school: 'Abjuration',
    castTime: '1 action',
    range: 'Self',
    components: ['V', 'S'],
    duration: '1 round',
    description:
      'You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and slashing damage dealt by weapon attacks.'
  },
  {
    name: 'Chill Touch',
    level: 0,
    school: 'Necromancy',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: '1 round',
    description:
      'You create a ghostly skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can’t regain hit points until the start of your next turn. Until then, the hand clings to the target.'
  },
  {
    name: 'Dancing Lights',
    level: 0,
    school: 'Evocation',
    castTime: '1 action',
    range: '120 feet',
    components: [
      'V',
      'S',
      'M (a bit of phosphorus or wychwood, or a glowworm)'
    ],
    duration: 'Concentration, up to 1 minute',
    description:
      'You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration.'
  },
  {
    name: 'Druidcraft',
    level: 0,
    school: 'Transmutation',
    castTime: '1 action',
    range: '30 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'Whispering to the spirits of nature, you create one of the following effects within range: You create a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours.'
  },
  {
    name: 'Eldritch Blast',
    level: 0,
    school: 'Evocation',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.'
  },
  {
    name: 'Fire Bolt',
    level: 0,
    school: 'Evocation',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn’t being worn or carried.'
  },
  {
    name: 'Guidance',
    level: 0,
    school: 'Divination',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S'],
    duration: 'Concentration, up to 1 minute',
    description:
      'You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.'
  },
  {
    name: 'Light',
    level: 0,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'M (a firefly or phosphorescent moss)'],
    duration: '1 hour',
    description:
      'You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet.'
  },
  {
    name: 'Mage Hand',
    level: 0,
    school: 'Conjuration',
    castTime: '1 action',
    range: '30 feet',
    components: ['V', 'S'],
    duration: '1 minute',
    description:
      'A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.'
  },
  {
    name: 'Mending',
    level: 0,
    school: 'Transmutation',
    castTime: '1 minute',
    range: 'Touch',
    components: ['V', 'S', 'M (two lodestones)'],
    duration: 'Instantaneous',
    description:
      'This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin, as long as the break or tear is no larger than 1 foot in any dimension.'
  },
  {
    name: 'Message',
    level: 0,
    school: 'Transmutation',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S', 'M (a short piece of copper wire)'],
    duration: '1 round',
    description:
      'You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.'
  },
  {
    name: 'Minor Illusion',
    level: 0,
    school: 'Illusion',
    castTime: '1 action',
    range: '30 feet',
    components: ['S', 'M (a bit of fleece)'],
    duration: '1 minute',
    description:
      'You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.'
  },
  {
    name: 'Poison Spray',
    level: 0,
    school: 'Conjuration',
    castTime: '1 action',
    range: '10 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a Constitution saving throw or take 1d12 poison damage.'
  },
  {
    name: 'Prestidigitation',
    level: 0,
    school: 'Transmutation',
    castTime: '1 action',
    range: '10 feet',
    components: ['V', 'S'],
    duration: 'Up to 1 hour',
    description:
      'This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range: You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.'
  },
  {
    name: 'Produce Flame',
    level: 0,
    school: 'Conjuration',
    castTime: '1 action',
    range: 'Self',
    components: ['V', 'S'],
    duration: '10 minutes',
    description:
      'A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet.'
  },
  {
    name: 'Ray of Frost',
    level: 0,
    school: 'Evocation',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.'
  },
  {
    name: 'Resistance',
    level: 0,
    school: 'Abjuration',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S', 'M (a miniature cloak)'],
    duration: 'Concentration, up to 1 minute',
    description:
      'You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after making the saving throw. The spell then ends.'
  },
  {
    name: 'Sacred Flame',
    level: 0,
    school: 'Evocation',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw.'
  },
  {
    name: 'Shocking Grasp',
    level: 0,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can’t take reactions until the start of its next turn.'
  },
  {
    name: 'Spare the Dying',
    level: 0,
    school: 'Necromancy',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.'
  },
  {
    name: 'Thaumaturgy',
    level: 0,
    school: 'Transmutation',
    castTime: '1 action',
    range: '30 feet',
    components: ['V'],
    duration: 'Up to 1 minute',
    description:
      'You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range: Your voice booms up to three times as loud as normal for 1 minute.'
  },
  {
    name: 'Thorn Whip',
    level: 0,
    school: 'Transmutation',
    castTime: '1 action',
    range: '30 feet',
    components: ['V', 'S', 'M (the stem of a plant with thorns)'],
    duration: 'Instantaneous',
    description:
      'You create a long, vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. If the attack hits, the creature takes 1d6 piercing damage, and if the creature is Large or smaller, you pull the creature up to 10 feet closer to you.'
  },
  {
    name: 'True Strike',
    level: 0,
    school: 'Divination',
    castTime: '1 action',
    range: '30 feet',
    components: ['S'],
    duration: 'Concentration, up to 1 round',
    description:
      'You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target’s defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn’t ended.'
  },

  // 1st Level Spells
  {
    name: 'Alarm',
    level: 1,
    school: 'Abjuration',
    castTime: '1 minute',
    range: '30 feet',
    components: ['V', 'S', 'M (a tiny bell and a piece of fine silver wire)'],
    duration: '8 hours',
    description:
      'You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area.'
  },
  {
    name: 'Burning Hands',
    level: 1,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Self (15-foot cone)',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.'
  },
  {
    name: 'Charm Person',
    level: 1,
    school: 'Enchantment',
    castTime: '1 action',
    range: '30 feet',
    components: ['V', 'S'],
    duration: '1 hour',
    description:
      'You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it.'
  },
  {
    name: 'Comprehend Languages',
    level: 1,
    school: 'Divination',
    castTime: '1 action',
    range: 'Self',
    components: ['V', 'S', 'M (a pinch of soot and salt)'],
    duration: '1 hour',
    description:
      'For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written.'
  },
  {
    name: 'Cure Wounds',
    level: 1,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.'
  },
  {
    name: 'Detect Magic',
    level: 1,
    school: 'Divination',
    castTime: '1 action',
    range: 'Self',
    components: ['V', 'S'],
    duration: 'Concentration, up to 10 minutes',
    description:
      'For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.'
  },
  {
    name: 'Disguise Self',
    level: 1,
    school: 'Illusion',
    castTime: '1 action',
    range: 'Self',
    components: ['V', 'S'],
    duration: '1 hour',
    description:
      'You make yourself—including your clothing, armor, weapons, and other belongings on your person—look different until the spell ends or until you use your action to dismiss it.'
  },
  {
    name: 'Divine Favor',
    level: 1,
    school: 'Evocation',
    castTime: '1 bonus action',
    range: 'Self',
    components: ['V', 'S'],
    duration: 'Concentration, up to 1 minute',
    description:
      'Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit.'
  },
  {
    name: 'Faerie Fire',
    level: 1,
    school: 'Evocation',
    castTime: '1 action',
    range: '60 feet',
    components: ['V'],
    duration: 'Concentration, up to 1 minute',
    description:
      'Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice). Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius.'
  },
  {
    name: 'Feather Fall',
    level: 1,
    school: 'Transmutation',
    castTime:
      '1 reaction, which you take when you or a creature within 60 feet of you falls',
    range: '60 feet',
    components: ['V', 'M (a small feather or piece of down)'],
    duration: '1 minute',
    description:
      'Choose up to five falling creatures within range. A falling creature’s rate of descent slows to 60 feet per round until the spell ends.'
  },
  {
    name: 'Fog Cloud',
    level: 1,
    school: 'Conjuration',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Concentration, up to 1 hour',
    description:
      'You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.'
  },
  {
    name: 'Grease',
    level: 1,
    school: 'Conjuration',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S', 'M (a bit of pork rind or butter)'],
    duration: '1 minute',
    description:
      'Slick grease covers the ground in a 10-foot square centered on a point within range and turns it into difficult terrain for the duration. When the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or ends its turn there must also succeed on a Dexterity saving throw or fall prone.'
  },
  {
    name: 'Guiding Bolt',
    level: 1,
    school: 'Evocation',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: '1 round',
    description:
      'A flash of light streaks toward a creature of your choice within range. Make a ranged spell attack against the target. On a hit, the target takes 4d6 radiant damage, and the next attack roll made against this target before the end of your next turn has advantage, thanks to the mystical dim light glittering on the target until then.'
  },
  {
    name: 'Healing Word',
    level: 1,
    school: 'Evocation',
    castTime: '1 bonus action',
    range: '60 feet',
    components: ['V'],
    duration: 'Instantaneous',
    description:
      'A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs.'
  },
  {
    name: 'Mage Armor',
    level: 1,
    school: 'Abjuration',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S', 'M (a piece of cured leather)'],
    duration: '8 hours',
    description:
      'You touch a willing creature who isn’t wearing armor, and a protective magical force surrounds it until the spell ends. The target’s base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action.'
  },
  {
    name: 'Magic Missile',
    level: 1,
    school: 'Evocation',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.'
  },
  {
    name: 'Shield',
    level: 1,
    school: 'Abjuration',
    castTime:
      '1 reaction, which you take when you are hit by an attack or targeted by the magic missile spell',
    range: 'Self',
    components: ['V', 'S'],
    duration: '1 round',
    description:
      'An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.'
  },
  {
    name: 'Silent Image',
    level: 1,
    school: 'Illusion',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S', 'M (a bit of fleece)'],
    duration: 'Concentration, up to 10 minutes',
    description:
      'You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn’t accompanied by sound, smell, or other sensory effects.'
  },
  {
    name: 'Thunderwave',
    level: 1,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Self (15-foot cube)',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed.'
  },
  {
    name: 'Witch Bolt',
    level: 1,
    school: 'Evocation',
    castTime: '1 action',
    range: '30 feet',
    components: [
      'V',
      'S',
      'M (a twig from a tree that has been struck by lightning)'
    ],
    duration: 'Concentration, up to 1 minute',
    description:
      'A beam of crackling, blue energy lances out toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against that creature. On a hit, the target takes 1d12 lightning damage, and on each of your turns for the duration, you can use your action to deal 1d12 lightning damage to the target automatically.'
  },

  // 2nd Level Spells
  {
    name: 'Blur',
    level: 2,
    school: 'Illusion',
    castTime: '1 action',
    range: 'Self',
    components: ['V'],
    duration: 'Concentration, up to 1 minute',
    description:
      'Your body becomes blurred, shifting and wavering to all who can see you. For the duration, any creature has disadvantage on attack rolls against you. An attacker is immune to this effect if it doesn’t rely on sight, as with blindsight, or can see through illusions, as with truesight.'
  },
  {
    name: 'Darkness',
    level: 2,
    school: 'Evocation',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'M (bat fur and a drop of pitch or piece of coal)'],
    duration: 'Concentration, up to 10 minutes',
    description:
      'Magical darkness spreads from a point you choose within range to fill a 15-foot-radius sphere for the duration. The darkness spreads around corners. A creature with darkvision can’t see through this darkness, and nonmagical light can’t illuminate it.'
  },
  {
    name: 'Hold Person',
    level: 2,
    school: 'Enchantment',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S', 'M (a small, straight piece of iron)'],
    duration: 'Concentration, up to 1 minute',
    description:
      'Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends on the target.'
  },
  {
    name: 'Invisibility',
    level: 2,
    school: 'Illusion',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S', 'M (an eyelash encased in gum arabic)'],
    duration: 'Concentration, up to 1 hour',
    description:
      'A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person. The spell ends for a target that attacks or casts a spell.'
  },
  {
    name: 'Mirror Image',
    level: 2,
    school: 'Illusion',
    castTime: '1 action',
    range: 'Self',
    components: ['V', 'S'],
    duration: '1 minute',
    description:
      'Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it’s impossible to track which image is real.'
  },
  {
    name: 'Misty Step',
    level: 2,
    school: 'Conjuration',
    castTime: '1 bonus action',
    range: 'Self',
    components: ['V'],
    duration: 'Instantaneous',
    description:
      'Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.'
  },
  {
    name: 'Scorching Ray',
    level: 2,
    school: 'Evocation',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'You create three rays of fire and hurl them at targets within range. You can hurl them at one target or several.'
  },
  {
    name: 'Shatter',
    level: 2,
    school: 'Evocation',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S', 'M (a chip of mica)'],
    duration: 'Instantaneous',
    description:
      'A sudden loud ringing noise, painfully intense, erupts from a point of your choice within range. Each creature in a 10-foot-radius sphere centered on that point must make a Constitution saving throw.'
  },
  {
    name: 'Spider Climb',
    level: 2,
    school: 'Transmutation',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S', 'M (a drop of bitumen and a spider)'],
    duration: 'Concentration, up to 1 hour',
    description:
      'Until the spell ends, one willing creature you touch gains the ability to move up, down, and across vertical surfaces and upside down along ceilings, while leaving its hands free.'
  },
  {
    name: 'Web',
    level: 2,
    school: 'Conjuration',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S', 'M (a bit of spiderweb)'],
    duration: 'Concentration, up to 1 hour',
    description:
      'You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube from that point for the duration. The webs are difficult terrain and lightly obscure their area.'
  },

  // 3rd Level Spells
  {
    name: 'Counterspell',
    level: 3,
    school: 'Abjuration',
    castTime:
      '1 reaction, which you take when you see a creature within 60 feet of you casting a spell',
    range: '60 feet',
    components: ['S'],
    duration: 'Instantaneous',
    description:
      'You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell’s level. On a success, the creature’s spell fails and has no effect.'
  },
  {
    name: 'Dispel Magic',
    level: 3,
    school: 'Abjuration',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability. The DC equals 10 + the spell’s level. On a successful check, the spell ends.'
  },
  {
    name: 'Fireball',
    level: 3,
    school: 'Evocation',
    castTime: '1 action',
    range: '150 feet',
    components: ['V', 'S', 'M (a tiny ball of bat guano and sulfur)'],
    duration: 'Instantaneous',
    description:
      'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.'
  },
  {
    name: 'Fly',
    level: 3,
    school: 'Transmutation',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S', 'M (a wing feather from any bird)'],
    duration: 'Concentration, up to 10 minutes',
    description:
      'You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall.'
  },
  {
    name: 'Lightning Bolt',
    level: 3,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Self (100-foot line)',
    components: [
      'V',
      'S',
      'M (a bit of fur and a rod of amber, crystal, or glass)'
    ],
    duration: 'Instantaneous',
    description:
      'A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 8d6 lightning damage on a failed save, or half as much damage on a successful one.'
  },
  {
    name: 'Major Image',
    level: 3,
    school: 'Illusion',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S', 'M (a bit of fleece)'],
    duration: 'Concentration, up to 10 minutes',
    description:
      'You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 20-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual, but you can make the image move, if you wish.'
  },
  {
    name: 'Remove Curse',
    level: 3,
    school: 'Abjuration',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner’s attunement to the object so it can be removed or discarded.'
  },
  {
    name: 'Revivify',
    level: 3,
    school: 'Necromancy',
    castTime: '1 action',
    range: 'Touch',
    components: [
      'V',
      'S',
      'M (diamonds worth 300 gp, which the spell consumes)'
    ],
    duration: 'Instantaneous',
    description:
      'You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can’t return to life a creature that has died of old age, nor can it restore any missing body parts.'
  },
  {
    name: 'Sending',
    level: 3,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Unlimited',
    components: ['V', 'S', 'M (a short piece of fine copper wire)'],
    duration: '1 round',
    description:
      'You send a short message of twenty-five words or less to a creature with which you are familiar. The creature hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately.'
  },
  {
    name: 'Tongues',
    level: 3,
    school: 'Divination',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'M (a small clay model of a ziggurat)'],
    duration: '1 hour',
    description:
      'This spell grants the creature you touch the ability to understand any spoken language it hears. Moreover, when the target speaks, any creature that knows at least one language and can hear the target understands what it says.'
  },

  // 4th Level Spells
  {
    name: 'Banishment',
    level: 4,
    school: 'Abjuration',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S', 'M (an item distasteful to the target)'],
    duration: 'Concentration, up to 1 minute',
    description:
      'You attempt to send one creature that you can see within range to another plane of existence. The target must succeed on a Charisma saving throw or be banished.'
  },
  {
    name: 'Blight',
    level: 4,
    school: 'Necromancy',
    castTime: '1 action',
    range: '30 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'Necromantic energy washes over a creature of your choice that you can see within range, draining moisture and vitality from it. The target must make a Constitution saving throw.'
  },
  {
    name: 'Dimension Door',
    level: 4,
    school: 'Conjuration',
    castTime: '1 action',
    range: '500 feet',
    components: ['V'],
    duration: 'Instantaneous',
    description:
      'You teleport yourself from your current location to any other spot within range. You arrive exactly at the spot desired.'
  },
  {
    name: 'Greater Invisibility',
    level: 4,
    school: 'Illusion',
    castTime: '1 action',
    range: 'Touch',
    components: ['V', 'S'],
    duration: 'Concentration, up to 1 minute',
    description:
      'You or a creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person.'
  },
  {
    name: 'Ice Storm',
    level: 4,
    school: 'Evocation',
    castTime: '1 action',
    range: '300 feet',
    components: ['V', 'S', 'M (a pinch of dust and a few drops of water)'],
    duration: 'Instantaneous',
    description:
      'A hail of rock-hard ice pounds to the ground in a 20-foot-radius, 40-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a Dexterity saving throw.'
  },
  {
    name: 'Polymorph',
    level: 4,
    school: 'Transmutation',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S', 'M (a caterpillar cocoon)'],
    duration: 'Concentration, up to 1 hour',
    description:
      'This spell transforms a creature that you can see within range into a new form. An unwilling creature must make a Wisdom saving throw to avoid the effect.'
  },
  {
    name: 'Stoneskin',
    level: 4,
    school: 'Abjuration',
    castTime: '1 action',
    range: 'Touch',
    components: [
      'V',
      'S',
      'M (diamond dust worth 100 gp, which the spell consumes)'
    ],
    duration: 'Concentration, up to 1 hour',
    description:
      'This spell turns the flesh of a willing creature you touch as hard as stone. Until the spell ends, the target has resistance to nonmagical bludgeoning, piercing, and slashing damage.'
  },
  {
    name: 'Wall of Fire',
    level: 4,
    school: 'Evocation',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S', 'M (a small piece of phosphorus)'],
    duration: 'Concentration, up to 1 minute',
    description:
      'You create a wall of fire on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick.'
  },

  // 5th Level Spells
  {
    name: 'Cloudkill',
    level: 5,
    school: 'Conjuration',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Concentration, up to 10 minutes',
    description:
      'You create a 20-foot-radius sphere of poisonous, yellow-green fog centered on a point you choose within range. The fog spreads around corners. It lasts for the duration or until strong wind disperses the fog, ending the spell.'
  },
  {
    name: 'Cone of Cold',
    level: 5,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Self (60-foot cone)',
    components: ['V', 'S', 'M (a small crystal or glass cone)'],
    duration: 'Instantaneous',
    description:
      'A blast of cold air erupts from your hands. Each creature in a 60-foot cone must make a Constitution saving throw. A creature takes 8d8 cold damage on a failed save, or half as much damage on a successful one.'
  },
  {
    name: 'Dominate Person',
    level: 5,
    school: 'Enchantment',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S'],
    duration: 'Concentration, up to 1 minute',
    description:
      'You attempt to beguile a humanoid that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration. While the target is charmed, you have a telepathic link with it as long as the two of you are on the same plane of existence.'
  },
  {
    name: 'Greater Restoration',
    level: 5,
    school: 'Abjuration',
    castTime: '1 action',
    range: 'Touch',
    components: [
      'V',
      'S',
      'M (diamond dust worth at least 100 gp, which the spell consumes)'
    ],
    duration: 'Instantaneous',
    description:
      'You imbue a creature you touch with positive energy to undo a debilitating effect. You can reduce the target’s exhaustion level by one, or end one of the following effects on the target: one effect that charmed or petrified the target, one curse (including the target’s attunement to a cursed magic item), any reduction to one of the target’s ability scores, or one effect reducing the target’s hit point maximum.'
  },
  {
    name: 'Insect Plague',
    level: 5,
    school: 'Conjuration',
    castTime: '1 action',
    range: '300 feet',
    components: [
      'V',
      'S',
      'M (a few grains of sugar, some kernels of grain, and a smear of fat)'
    ],
    duration: 'Concentration, up to 10 minutes',
    description:
      'Swarming, biting locusts fill a 20-foot-radius sphere centered on a point you choose within range. The sphere spreads around corners. The sphere remains for the duration, and its area is lightly obscured. The sphere’s area is difficult terrain.'
  },
  {
    name: 'Mass Cure Wounds',
    level: 5,
    school: 'Conjuration',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'A wave of healing energy washes out from a point of your choice within range. Choose up to six creatures in a 30-foot-radius sphere centered on that point. Each target regains hit points equal to 3d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.'
  },
  {
    name: 'Scrying',
    level: 5,
    school: 'Divination',
    castTime: '10 minutes',
    range: 'Self',
    components: [
      'V',
      'S',
      'M (a focus worth at least 1,000 gp, such as a crystal ball, a silver mirror, or a font filled with holy water)'
    ],
    duration: 'Concentration, up to 10 minutes',
    description:
      'You can see and hear a particular creature you choose that is on the same plane of existence as you. The target must make a Wisdom saving throw, which is modified by how well you know the target and the sort of physical connection you have to it.'
  },
  {
    name: 'Teleportation Circle',
    level: 5,
    school: 'Conjuration',
    castTime: '1 minute',
    range: '10 feet',
    components: [
      'V',
      'M (rare chalks and inks infused with precious gems worth 50 gp, which the spell consumes)'
    ],
    duration: '1 round',
    description:
      'As you cast the spell, you draw a 10-foot-diameter circle on the ground inscribed with sigils that link your location to a permanent teleportation circle of your choice whose sigil sequence you know and that is on the same plane of existence as you.'
  },
  {
    name: 'Wall of Stone',
    level: 5,
    school: 'Evocation',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S', 'M (a small block of granite)'],
    duration: 'Concentration, up to 10 minutes',
    description:
      'A nonmagical wall of solid stone springs into existence at a point you choose within range. The wall is 6 inches thick and is composed of ten 10-foot-by-10-foot panels. Each panel must be contiguous with at least one other panel.'
  },

  // 6th Level Spells
  {
    name: 'Chain Lightning',
    level: 6,
    school: 'Evocation',
    castTime: '1 action',
    range: '150 feet',
    components: [
      'V',
      'S',
      'M (a bit of fur; a piece of amber, glass, or a crystal rod; and three silver pins)'
    ],
    duration: 'Instantaneous',
    description:
      'You create a bolt of lightning that arcs toward a target of your choice that you can see within range. Three bolts then leap from that target to as many as three other targets, each of which must be within 30 feet of the first target.'
  },
  {
    name: 'Disintegrate',
    level: 6,
    school: 'Transmutation',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S', 'M (a lodestone and a pinch of dust)'],
    duration: 'Instantaneous',
    description:
      'A thin green ray springs from your pointing finger to a target that you can see within range. The target can be a creature, an object, or a creation of magical force, such as the wall created by wall of force.'
  },
  {
    name: 'Eyebite',
    level: 6,
    school: 'Necromancy',
    castTime: '1 action',
    range: 'Self',
    components: ['V', 'S'],
    duration: 'Concentration, up to 1 minute',
    description:
      'For the spell’s duration, your eyes become an inky void imbued with dread power. One creature of your choice within 60 feet of you that you can see must succeed on a Wisdom saving throw or be affected by one of the following effects of your choice for the duration.'
  },
  {
    name: 'Mass Suggestion',
    level: 6,
    school: 'Enchantment',
    castTime: '1 action',
    range: '60 feet',
    components: [
      'V',
      "M (a snake's tongue and either a bit of honeycomb or a drop of sweet oil)"
    ],
    duration: '24 hours',
    description:
      'You suggest a course of activity (limited to a sentence or two) and magically influence up to twelve creatures of your choice that you can see within range and that can hear and understand you.'
  },
  {
    name: 'True Seeing',
    level: 6,
    school: 'Divination',
    castTime: '1 action',
    range: 'Touch',
    components: [
      'V',
      'S',
      'M (an ointment for the eyes that costs 25 gp; is made from mushroom powder, saffron, and fat; and is consumed by the spell)'
    ],
    duration: '1 hour',
    description:
      'This spell gives the willing creature you touch the ability to see things as they actually are. For the duration, the creature has truesight, notices secret doors hidden by magic, and can see into the Ethereal Plane, all out to a range of 120 feet.'
  },
  {
    name: 'Wall of Ice',
    level: 6,
    school: 'Evocation',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S', 'M (a small piece of quartz)'],
    duration: 'Concentration, up to 10 minutes',
    description:
      'You create a wall of ice on a solid surface within range. You can form it into a hemispherical dome or a sphere with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-square panels.'
  },

  // 7th Level Spells
  {
    name: 'Etherealness',
    level: 7,
    school: 'Transmutation',
    castTime: '1 action',
    range: 'Self',
    components: ['V', 'S'],
    duration: '8 hours',
    description:
      'You step into the border regions of the Ethereal Plane, in the area where it overlaps with your current plane. You remain in the Border Ethereal for the duration or until you use your action to dismiss the spell.'
  },
  {
    name: 'Finger of Death',
    level: 7,
    school: 'Necromancy',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'You send negative energy coursing through a creature that you can see within range, causing it searing pain. The target must make a Constitution saving throw. It takes 7d8 + 30 necrotic damage on a failed save, or half as much damage on a successful one.'
  },
  {
    name: 'Plane Shift',
    level: 7,
    school: 'Conjuration',
    castTime: '1 action',
    range: 'Touch',
    components: [
      'V',
      'S',
      'M (a forked, metal rod worth at least 250 gp, attuned to a particular plane of existence)'
    ],
    duration: 'Instantaneous',
    description:
      'You and up to eight willing creatures who link hands in a circle are transported to a different plane of existence. You can specify a target destination in general terms, such as the City of Brass on the Elemental Plane of Fire or the palace of Dispater on the second level of the Nine Hells.'
  },
  {
    name: 'Prismatic Spray',
    level: 7,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Self (60-foot cone)',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'Eight multicolored rays of light flash from your hand. Each ray is a different color and has a different power and purpose.'
  },
  {
    name: 'Reverse Gravity',
    level: 7,
    school: 'Transmutation',
    castTime: '1 action',
    range: '100 feet',
    components: ['V', 'S', 'M (a lodestone and iron filings)'],
    duration: 'Concentration, up to 1 minute',
    description:
      'This spell reverses gravity in a 50-foot-radius, 100-foot high cylinder centered on a point within range. All creatures and objects that aren’t somehow anchored to the ground in the area fall upward and reach the top of the area when you cast this spell.'
  },
  {
    name: 'Teleport',
    level: 7,
    school: 'Conjuration',
    castTime: '1 action',
    range: '10 feet',
    components: ['V'],
    duration: 'Instantaneous',
    description:
      'This spell instantly transports you and up to eight willing creatures of your choice that you can see within range or a single object that you can see within range to a destination you specify.'
  },

  // 8th Level Spells
  {
    name: 'Dominate Monster',
    level: 8,
    school: 'Enchantment',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S'],
    duration: 'Concentration, up to 1 hour',
    description:
      'You attempt to beguile a creature that you can see within range. It must succeed on a Wisdom saving throw or be charmed by you for the duration.'
  },
  {
    name: 'Earthquake',
    level: 8,
    school: 'Evocation',
    castTime: '1 action',
    range: '500 feet',
    components: [
      'V',
      'S',
      'M (a pinch of dirt, a piece of rock, and a lump of clay)'
    ],
    duration: 'Concentration, up to 1 minute',
    description:
      'You create a seismic disturbance at a point on the ground that you can see within range. For the duration, an intense tremor rips through the ground in a 100-foot-radius circle centered on that point and shakes creatures and structures in contact with the ground in that area.'
  },
  {
    name: 'Feeblemind',
    level: 8,
    school: 'Enchantment',
    castTime: '1 action',
    range: '150 feet',
    components: [
      'V',
      'S',
      'M (a handful of clay, crystal, glass, or mineral spheres)'
    ],
    duration: 'Instantaneous',
    description:
      'You blast the mind of a creature that you can see within range, attempting to shatter its intellect and personality. The target takes 4d6 psychic damage and must make an Intelligence saving throw.'
  },
  {
    name: 'Incendiary Cloud',
    level: 8,
    school: 'Conjuration',
    castTime: '1 action',
    range: '150 feet',
    components: ['V', 'S', 'M (a bit of sulfur)'],
    duration: 'Concentration, up to 1 minute',
    description:
      'A swirling cloud of smoke shot through with white-hot embers appears in a 20-foot-radius sphere centered on a point within range.'
  },
  {
    name: 'Sunburst',
    level: 8,
    school: 'Evocation',
    castTime: '1 action',
    range: '150 feet',
    components: ['V', 'S', 'M (fire and a piece of sunstone)'],
    duration: 'Instantaneous',
    description:
      'Brilliant sunlight flashes in a 60-foot radius centered on a point you choose within range. Each creature in that light must make a Constitution saving throw. On a failed save, a creature takes 12d6 radiant damage and is blinded for 1 minute. On a successful save, it takes half as much damage and isn’t blinded.'
  },
  {
    name: 'Telepathy',
    level: 8,
    school: 'Evocation',
    castTime: '1 action',
    range: 'Unlimited',
    components: ['V', 'S'],
    duration: '24 hours',
    description:
      'You create a telepathic link between yourself and a willing creature with which you are familiar. The creature can communicate telepathically with you at any distance.'
  },
  {
    name: 'Tsunami',
    level: 8,
    school: 'Conjuration',
    castTime: '1 minute',
    range: 'Sight',
    components: ['V', 'S', 'M (a drop of water)'],
    duration: 'Concentration, up to 6 rounds',
    description:
      'A wall of water springs into existence at a point you choose within range. You can make the wall up to 300 feet long, 300 feet high, and 50 feet thick.'
  },

  // 9th Level Spells
  {
    name: 'Astral Projection',
    level: 9,
    school: 'Necromancy',
    castTime: '1 hour',
    range: '10 feet',
    components: [
      'V',
      'S',
      'M (for each creature you affect with this spell, you must provide a jacinth worth at least 1,000 gp and a silver bar worth at least 100 gp, all of which the spell consumes)'
    ],
    duration: 'Special',
    description:
      'You and up to eight willing creatures within range project your astral bodies into the Astral Plane (the spell fails and the casting is wasted if you are already on that plane). The material body you leave behind is unconscious and in a state of suspended animation; it doesn’t need food or air and doesn’t age.'
  },
  {
    name: 'Foresight',
    level: 9,
    school: 'Divination',
    castTime: '1 minute',
    range: 'Touch',
    components: ['V', 'S', 'M (a hummingbird feather)'],
    duration: '8 hours',
    description:
      'You touch a willing creature and bestow a limited ability to see into the immediate future. For the duration, the target can’t be surprised and has advantage on attack rolls, ability checks, and saving throws.'
  },
  {
    name: 'Gate',
    level: 9,
    school: 'Conjuration',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S', 'M (a diamond worth at least 5,000 gp)'],
    duration: 'Concentration, up to 1 minute',
    description:
      'You conjure a portal linking an unoccupied space you can see within range to a precise location on a different plane of existence. The portal is a circular opening, which you can make 5 to 20 feet in diameter.'
  },
  {
    name: 'Mass Heal',
    level: 9,
    school: 'Conjuration',
    castTime: '1 action',
    range: '60 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'A flood of healing energy flows from you into injured creatures around you. You restore up to 700 hit points, divided as you choose among any number of creatures that you can see within range.'
  },
  {
    name: 'Meteor Swarm',
    level: 9,
    school: 'Evocation',
    castTime: '1 action',
    range: '1 mile',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description:
      'Blazing orbs of fire plummet to the ground at four different points you can see within range. Each creature in a 40-foot-radius sphere centered on each point you choose must make a Dexterity saving throw.'
  },
  {
    name: 'Power Word Kill',
    level: 9,
    school: 'Enchantment',
    castTime: '1 action',
    range: '60 feet',
    components: ['V'],
    duration: 'Instantaneous',
    description:
      'You utter a word of power that can compel one creature you can see within range to die instantly. If the creature you choose has 100 hit points or fewer, it dies. Otherwise, the spell has no effect.'
  },
  {
    name: 'Time Stop',
    level: 9,
    school: 'Transmutation',
    castTime: '1 action',
    range: 'Self',
    components: ['V'],
    duration: 'Instantaneous',
    description:
      'You briefly stop the flow of time for everyone but yourself. No time passes for other creatures, while you take 1d4 + 1 turns in a row, during which you can use actions and move as normal.'
  },
  {
    name: 'True Polymorph',
    level: 9,
    school: 'Transmutation',
    castTime: '1 action',
    range: '30 feet',
    components: [
      'V',
      'S',
      'M (a drop of mercury, a dollop of gum arabic, and a wisp of smoke)'
    ],
    duration: 'Concentration, up to 1 hour',
    description:
      'You transform the target creature into a different creature, or into an object.'
  },
  {
    name: 'Weird',
    level: 9,
    school: 'Illusion',
    castTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Concentration, up to 1 minute',
    description:
      'Drawing on the deepest fears of a group of creatures, you create illusory creatures in their minds, visible only to them. Each creature in a 30-foot-radius sphere centered on a point of your choice within range must make a Wisdom saving throw.'
  },
  {
    name: 'Wish',
    level: 9,
    school: 'Conjuration',
    castTime: '1 action',
    range: 'Self',
    components: ['V'],
    duration: 'Instantaneous',
    description:
      'Wish is the mightiest spell a mortal creature can cast. By simply speaking aloud, you can alter the very foundations of reality in accord with your desires.'
  }
];

async function main() {
  for (const spell of spells) {
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
