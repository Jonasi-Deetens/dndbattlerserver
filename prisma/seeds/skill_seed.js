import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

// List of all D&D 5e skills
async function main() {
  // List of skills with associated ability score names
  const skills = [
    {
      name: 'Trance',
      description:
        "Elves don't need to sleep. Instead, they meditate deeply, remaining sem iconscious, for 4 hours a day. (The Com m on w ord for such meditation is “trance.”) While meditating, you can dream after a fashion; such dream's are actually mental exercises that have becom e reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep."
    },
    {
      name: 'Mask of the Wild',
      description:
        'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.'
    },
    {
      name: 'Lucky',
      description:
        'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.'
    },
    {
      name: 'Halfling Nimbleness',
      description:
        'You can move through the space of any creature that is of a size larger than yours.'
    },
    {
      name: 'Natural Stealthy',
      description:
        'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.'
    },
    {
      name: 'Relentless Endurance',
      description:
        "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest."
    },
    {
      name: 'Savage Attacks',
      description:
        "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit."
    },
    {
      name: 'Speak with Small Beasts',
      description:
        'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.'
    },
    {
      name: 'Unarmored Defense',
      description:
        'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier.'
    },
    {
      name: 'Danger Sense',
      description:
        'You gain an uncanny sense of when things nearby aren’t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can’t be blinded, deafened, or incapacitated.'
    },
    {
      name: 'Reckless Attack',
      description:
        'You can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.'
    },
    {
      name: 'Extra Attack',
      description:
        'You can attack twice, instead of once, whenever you take the Attack action on your turn.'
    },
    {
      name: 'Fast Movement',
      description:
        'Your speed increases by 10 feet while you aren’t wearing heavy armor.'
    },
    {
      name: 'Feral Instinct',
      description:
        'Your instincts are so honed that you have advantage on initiative rolls. Additionally, if you are surprised at the beginning of combat and aren’t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.'
    },
    {
      name: 'Brutal Critical',
      description:
        'You can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack. This increases to two additional dice at higher levels.'
    },
    {
      name: 'Relentless Rage',
      description:
        'Your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you’re raging and don’t die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead. Each time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10.'
    },
    {
      name: 'Persistent Rage',
      description:
        'Your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it.'
    },
    {
      name: 'Indomitable Might',
      description:
        'If your total for a Strength check is less than your Strength score, you can use that score in place of the total.'
    },
    {
      name: 'Frenzy',
      description:
        'You can go into a frenzy when you rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one. When your rage ends, you suffer one level of exhaustion.'
    },
    {
      name: 'Mindless Rage',
      description:
        'You can’t be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended for the duration of the rage.'
    },
    {
      name: 'Jack of All Trades',
      description:
        'You can add half your proficiency bonus, rounded down, to any ability check you make that doesn’t already include your proficiency bonus.'
    },
    {
      name: 'Song of Rest',
      description:
        'You can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points at the end of the short rest, each of those creatures regains an extra 1d6 hit points.'
    },
    {
      name: 'Font of Inspiration',
      description:
        'You regain all of your expended uses of Bardic Inspiration when you finish a short or long rest.'
    },
    {
      name: 'Superior Inspiration',
      description:
        'When you roll initiative and have no uses of Bardic Inspiration left, you regain one use.'
    },
    {
      name: 'Cutting Words',
      description:
        'You can use your wit to distract, confuse, and otherwise sap the confidence and competence of others. When a creature that you can see within 60 feet of you makes an attack roll, an ability check, or a damage roll, you can use your reaction to expend one of your uses of Bardic Inspiration, rolling a Bardic Inspiration die and subtracting the number rolled from the creature’s roll.'
    },
    {
      name: 'Peerless Skill',
      description:
        'When you make an ability check, you can expend one use of Bardic Inspiration. Roll a Bardic Inspiration die and add the number rolled to your ability check. You can choose to do so after you roll the die for the ability check but before the DM tells you whether you succeed or fail.'
    },
    {
      name: 'Combat Inspiration',
      description:
        'A creature that has a Bardic Inspiration die from you can roll that die and add the number rolled to a weapon damage roll it just made. Alternatively, when an attack roll is made against the creature, it can use its reaction to roll the Bardic Inspiration die and add the number rolled to its AC against that attack, after seeing the roll but before knowing whether it hits or misses.'
    },
    {
      name: 'Battle Magic',
      description:
        'When you use your action to cast a bard spell, you can make one weapon attack as a bonus action.'
    },
    {
      name: 'Destroy Undead',
      description:
        'When an undead of CR 1/2 or lower fails its saving throw against your Turn Undead feature, the creature is instantly destroyed.'
    },
    {
      name: 'Potent Spellcasting',
      description:
        'You can add your Wisdom modifier to the damage you deal with any cleric cantrip.'
    },
    {
      name: 'Disciple of Life',
      description:
        'Your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell’s level.'
    },
    {
      name: 'Blessed Healer',
      description:
        'When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell’s level.'
    },
    {
      name: 'Supreme Healing',
      description:
        'When you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die.'
    },
    {
      name: 'Improved Flare',
      description:
        'When you use your Warding Flare feature, you can impose disadvantage on the attack roll of an enemy that you can see within 30 feet of you.'
    },
    {
      name: 'Stormborn',
      description: 'You have immunity to lightning and thunder damage.'
    },
    {
      name: 'Thunderbolt Strike',
      description:
        'When you deal lightning damage to a Large or smaller creature, you can also push it up to 10 feet away from you.'
    },
    {
      name: 'Blessing of the Trickster',
      description:
        'You can use your action to touch a willing creature other than yourself to give it advantage on Dexterity (Stealth) checks. This blessing lasts for 1 hour or until you use this feature again.'
    },
    {
      name: 'Improved Duplicity',
      description:
        'You can create up to four duplicates of yourself instead of one, and you can cast spells as though you were in a duplicate’s space.'
    },
    {
      name: 'War Priest',
      description:
        'When you use the Attack action, you can make one weapon attack as a bonus action.'
    },
    {
      name: 'Druidic',
      description:
        'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages.'
    },
    {
      name: 'Timeless Body',
      description:
        'You no longer need food or water and suffer none of the frailty of old age.'
    },
    {
      name: 'Beast Spells',
      description:
        'You can cast many of your druid spells in any shape you assume using Wild Shape.'
    },
    {
      name: 'Archdruid',
      description: 'You can use your Wild Shape an unlimited number of times.'
    },
    {
      name: 'Natural Recovery',
      description:
        'You can regain some of your magical energy by taking a short rest.'
    },
    {
      name: "Land's Stride",
      description:
        'Moving through nonmagical difficult terrain costs you no extra movement.'
    },
    {
      name: "Nature's Sanctuary",
      description:
        'When a beast or plant creature attacks you, that creature must make a Wisdom saving throw against your druid spell save DC.'
    },
    {
      name: 'Circle Forms',
      description:
        'You can use your Wild Shape to transform into a beast with a challenge rating as high as 1.'
    },
    {
      name: 'Combat Wild Shape',
      description:
        'You can use Wild Shape as a bonus action, and you can expend one spell slot to regain 1d8 hit points per level of the spell slot expended.'
    },
    {
      name: 'Primal Strike',
      description:
        'Your attacks in beast form count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.'
    },
    {
      name: 'Thousand Forms',
      description: 'You can cast the alter self spell at will.'
    },
    {
      name: 'Action Surge',
      description: 'You can take one additional action on your turn.'
    },
    {
      name: 'Indomitable',
      description: 'You can reroll a saving throw that you fail.'
    },
    {
      name: 'Improved Critical',
      description:
        'Your weapon attacks score a critical hit on a roll of 19 or 20.'
    },
    {
      name: 'Remarkable Athlete',
      description:
        'You can add half your proficiency bonus to any Strength, Dexterity, or Constitution check you make that doesn’t already use your proficiency bonus.'
    },
    {
      name: 'Superior Critical',
      description:
        'Your weapon attacks score a critical hit on a roll of 18-20.'
    },
    {
      name: 'Survivor',
      description:
        'You regain hit points at the start of each of your turns if you have no more than half of your hit points left.'
    },
    {
      name: 'Know Your Enemy',
      description:
        'If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities.'
    },
    {
      name: 'Relentless',
      description:
        'You can add your proficiency bonus to any saving throw you make against being frightened or charmed.'
    },
    {
      name: 'Eldritch Strike',
      description:
        'When you hit a creature with a weapon attack, that creature has disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn.'
    },
    {
      name: 'Martial Arts',
      description:
        'Your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons.'
    },
    {
      name: 'Unarmored Movement',
      description:
        'Your speed increases while you are not wearing armor or wielding a shield.'
    },
    {
      name: 'Slow Fall',
      description:
        'You can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.'
    },
    {
      name: 'Ki',
      description:
        'Your training allows you to harness the mystic energy of ki. Your access to this energy is represented by a number of ki points.'
    },
    {
      name: 'Stunning Strike',
      description:
        'You can interfere with the flow of ki in an opponent’s body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike.'
    },
    {
      name: 'Ki-Empowered Strikes',
      description:
        'Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.'
    },
    {
      name: 'Evasion',
      description:
        'You can nimbly dodge out of the way of certain area effects, such as a red dragon’s fiery breath or an ice storm spell.'
    },
    {
      name: 'Stillness of Mind',
      description:
        'You can use your action to end one effect on yourself that is causing you to be charmed or frightened.'
    },
    {
      name: 'Purity of Body',
      description:
        'Your mastery of the ki flowing through you makes you immune to disease and poison.'
    },
    {
      name: 'Tongue of the Sun and Moon',
      description:
        'You can understand and be understood by any creature that has a language.'
    },
    {
      name: 'Diamond Soul',
      description:
        'Your mastery of ki grants you proficiency in all saving throws.'
    },
    {
      name: 'Perfect Self',
      description:
        'When you roll for initiative and have no ki points remaining, you regain 4 ki points.'
    },
    {
      name: 'Timeless Body - Monk',
      description:
        'Your ki sustains you so that you suffer none of the frailty of old age, and you can’t be aged magically.'
    },
    {
      name: 'Open Hand Technique',
      description:
        'You can manipulate your enemy’s ki when you harness your own. Whenever you hit a creature with one of the attacks granted by your Flurry of Blows, you can impose one of the following effects on that target.'
    },
    {
      name: 'Tranquility',
      description:
        'You can enter a special meditation that surrounds you with an aura of peace. At the end of a long rest, you gain the effect of a sanctuary spell that lasts until the start of your next long rest.'
    },
    {
      name: 'Shadow Arts',
      description:
        'You can use your ki to duplicate the effects of certain spells. As an action, you can spend 2 ki points to cast darkness, darkvision, pass without trace, or silence, without providing material components.'
    },
    {
      name: 'Shadow Step',
      description:
        'You gain the ability to step from one shadow into another. When you are in dim light or darkness, as a bonus action you can teleport up to 60 feet to an unoccupied space you can see that is also in dim light or darkness.'
    },
    {
      name: 'Aura of Protection',
      description:
        'Whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus equal to your Charisma modifier (with a minimum bonus of +1).'
    },
    {
      name: 'Aura of Courage',
      description:
        'You and friendly creatures within 10 feet of you can’t be frightened while you are conscious.'
    },
    {
      name: 'Improved Divine Smite',
      description: 'Your melee weapon attacks deal an extra 1d8 radiant damage.'
    },
    {
      name: 'Aura of Devotion',
      description:
        'You and friendly creatures within 10 feet of you can’t be charmed while you are conscious.'
    },
    {
      name: 'Aura of Warding',
      description:
        'You and friendly creatures within 10 feet of you have resistance to damage from spells.'
    },
    {
      name: 'Undying Sentinel',
      description:
        'When you are reduced to 0 hit points and are not killed outright, you can choose to drop to 1 hit point instead.'
    },
    {
      name: 'Relentless Avenger',
      description:
        'When you hit a creature with an opportunity attack, you can move up to half your speed immediately after the attack and as part of the same reaction.'
    },
    {
      name: 'Soul of Vengeance',
      description:
        'When a creature under the effect of your Vow of Enmity makes an attack, you can use your reaction to make a melee weapon attack against that creature if it is within range.'
    },
    {
      name: 'Favored Enemy',
      description:
        'You have advantage on Wisdom (Survival) checks to track your favored enemies, as well as on Intelligence checks to recall information about them.'
    },
    {
      name: 'Natural Explorer',
      description:
        'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions.'
    },
    {
      name: 'Vanish',
      description: 'You can use the Hide action as a bonus action on your turn.'
    },
    {
      name: 'Feral Senses',
      description:
        'You gain preternatural senses that help you fight creatures you can’t see. When you attack a creature you can’t see, your inability to see it doesn’t impose disadvantage on your attack rolls against it.'
    },
    {
      name: 'Foe Slayer',
      description:
        'You can add your Wisdom modifier to the attack roll or the damage roll of an attack you make against one of your favored enemies.'
    },
    {
      name: "Ranger's Companion",
      description:
        'You have a beast companion that accompanies you on your adventures and is trained to fight alongside you.'
    },
    {
      name: 'Exceptional Training',
      description:
        'On any of your turns when your beast companion doesn’t attack, you can use a bonus action to command the beast to take the Dash, Disengage, or Help action on its turn.'
    },
    {
      name: 'Bestial Fury',
      description:
        'Your beast companion can make two attacks when you command it to use the Attack action.'
    },
    {
      name: 'Share Spells',
      description:
        'When you cast a spell targeting yourself, you can also affect your beast companion with the spell if the beast is within 30 feet of you.'
    },
    {
      name: "Thieves' Cant",
      description:
        'During your rogue training you learned thieves’ cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation.'
    },
    {
      name: 'Cunning Action',
      description:
        'You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action.'
    },
    {
      name: 'Uncanny Dodge',
      description:
        'When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack’s damage against you.'
    },
    {
      name: 'Reliable Talent',
      description:
        'Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.'
    },
    {
      name: 'Elusive',
      description:
        'No attack roll has advantage against you while you aren’t incapacitated.'
    },
    {
      name: 'Stroke of Luck',
      description:
        'If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20.'
    },
    {
      name: 'Fast Hands',
      description:
        'You can use the bonus action granted by your Cunning Action to make a Dexterity (Sleight of Hand) check, use your thieves’ tools to disarm a trap or open a lock, or take the Use an Object action.'
    },
    {
      name: 'Second-Story Work',
      description:
        'You gain the ability to climb faster than normal; climbing no longer costs you extra movement.'
    },
    {
      name: 'Supreme Sneak',
      description:
        'You have advantage on a Dexterity (Stealth) check if you move no more than half your speed on the same turn.'
    },
    {
      name: 'Use Magic Device',
      description:
        'You have learned enough about the workings of magic that you can improvise the use of items even when they are not intended for you.'
    },
    {
      name: "Thief's Reflexes",
      description:
        'You can take two turns during the first round of any combat. You take your first turn at your normal initiative and your second turn at your initiative minus 10.'
    },
    {
      name: 'Assassinate',
      description:
        'You have advantage on attack rolls against any creature that hasn’t taken a turn in the combat yet. In addition, any hit you score against a creature that is surprised is a critical hit.'
    },
    {
      name: 'Death Strike',
      description:
        'When you attack and hit a creature that is surprised, it must make a Constitution saving throw (DC 8 + your Dexterity modifier + your proficiency bonus). On a failed save, double the damage of your attack against the creature.'
    },
    {
      name: 'Mage Hand Legerdemain',
      description:
        'When you cast mage hand, you can make the spectral hand invisible, and you can perform the following additional tasks with it: stow one object the hand is holding in a container worn or carried by another creature; retrieve an object in a container worn or carried by another creature; use thieves’ tools to pick locks and disarm traps at range.'
    },
    {
      name: 'Magical Ambush',
      description:
        'If you are hidden from a creature when you cast a spell on it, the creature has disadvantage on any saving throw it makes against the spell this turn.'
    },
    {
      name: 'Versatile Trickster',
      description:
        'As a bonus action, you can designate a creature within 5 feet of the spectral hand created by your mage hand cantrip. Doing so gives you advantage on attack rolls against that creature until the end of the turn.'
    },
    {
      name: 'Font of Magic',
      description:
        'You can tap into a deep wellspring of magic within yourself. This wellspring is represented by sorcery points, which allow you to create a variety of magical effects.'
    },
    {
      name: 'Sorcerous Restoration',
      description:
        'You regain 4 expended sorcery points whenever you finish a short rest.'
    },
    {
      name: 'Draconic Resilience',
      description:
        'As magic flows through your body, it causes physical traits of your dragon ancestors to emerge. At 1st level, your hit point maximum increases by 1 and increases by 1 again whenever you gain a level in this class.'
    },
    {
      name: 'Elemental Affinity',
      description:
        'When you cast a spell that deals damage of the type associated with your draconic ancestry, add your Charisma modifier to one damage roll of that spell.'
    },
    {
      name: 'Wild Magic Surge',
      description:
        'Your spellcasting can unleash surges of untamed magic. Immediately after you cast a sorcerer spell of 1st level or higher, the DM can have you roll a d20. If you roll a 1, roll on the Wild Magic Surge table to create a random magical effect.'
    },
    {
      name: 'Tides of Chaos',
      description:
        'You can manipulate the forces of chance and chaos to gain advantage on one attack roll, ability check, or saving throw.'
    },
    {
      name: 'Bend Luck',
      description:
        'When another creature you can see makes an attack roll, an ability check, or a saving throw, you can use your reaction and spend 2 sorcery points to roll 1d4 and apply the number rolled as a bonus or penalty to the creature’s roll.'
    },
    {
      name: 'Controlled Chaos',
      description:
        'You gain a modicum of control over the surges of your wild magic. Whenever you roll on the Wild Magic Surge table, you can roll twice and use either number.'
    },
    {
      name: 'Spell Bombardment',
      description:
        'When you roll damage for a spell and roll the highest number possible on any of the dice, choose one of those dice, roll it again and add that roll to the damage.'
    },
    {
      name: 'Mystic Arcanum',
      description:
        'You can choose one 6th-level spell from the warlock spell list as this arcanum.'
    },
    {
      name: "Dark One's Blessing",
      description:
        'When you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level.'
    },
    {
      name: "Dark One's Own Luck",
      description:
        'You can call on your patron to alter fate in your favor. When you make an ability check or a saving throw, you can use this feature to add a d10 to your roll.'
    },
    {
      name: 'Fiendish Resilience',
      description:
        'You can choose one damage type when you finish a short or long rest. You gain resistance to that damage type until you choose a different one with this feature.'
    },
    {
      name: 'Awakened Mind',
      description:
        'You can telepathically speak to any creature you can see within 30 feet of you. You don’t need to share a language with the creature for it to understand your telepathic utterances, but the creature must be able to understand at least one language.'
    },
    {
      name: 'Entropic Ward',
      description:
        'When a creature makes an attack roll against you, you can use your reaction to impose disadvantage on that roll. If the attack misses you, your next attack roll against the creature has advantage if you make it before the end of your next turn.'
    },
    {
      name: 'Thought Shield',
      description:
        'Your thoughts can’t be read by telepathy or other means unless you allow it. You also have resistance to psychic damage, and whenever a creature deals psychic damage to you, that creature takes the same amount of damage that you do.'
    },
    {
      name: 'Arcane Recovery',
      description:
        'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.'
    },
    {
      name: 'Spell Mastery',
      description:
        'You have achieved such mastery over certain spells that you can cast them at will. Choose a 1st-level wizard spell and a 2nd-level wizard spell that are in your spellbook. You can cast those spells at their lowest level without expending a spell slot when you have them prepared.'
    },
    {
      name: 'Signature Spells',
      description:
        'Choose two 3rd-level wizard spells in your spellbook as your signature spells. You always have these spells prepared, they don’t count against the number of spells you have prepared, and you can cast each of them once at 3rd level without expending a spell slot.'
    },
    {
      name: 'Abjuration Savant',
      description:
        'The gold and time you must spend to copy an abjuration spell into your spellbook is halved.'
    },
    {
      name: 'Improved Abjuration',
      description:
        'When you cast an abjuration spell that requires you to make an ability check as part of casting that spell, you add your proficiency bonus to that ability check.'
    },
    {
      name: 'Spell Resistance',
      description:
        'You have advantage on saving throws against spells, and you have resistance against the damage of spells.'
    },
    {
      name: 'Conjuration Savant',
      description:
        'The gold and time you must spend to copy a conjuration spell into your spellbook is halved.'
    },
    {
      name: 'Focused Conjuration',
      description:
        'While you are concentrating on a conjuration spell, your concentration can’t be broken as a result of taking damage.'
    },
    {
      name: 'Durable Summons',
      description:
        'Creatures you summon or create with a conjuration spell have 30 temporary hit points.'
    },
    {
      name: 'Divination Savant',
      description:
        'The gold and time you must spend to copy a divination spell into your spellbook is halved.'
    },
    {
      name: 'Portent',
      description:
        'When you finish a long rest, roll two d20s and record the numbers rolled. You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of these foretelling rolls.'
    },
    {
      name: 'Expert Divination',
      description:
        'Casting divination spells comes so easily to you that it expends only a fraction of your spellcasting efforts. When you cast a divination spell of 2nd level or higher using a spell slot, you regain one expended spell slot. The slot you regain must be of a level lower than the spell you cast and can’t be higher than 5th level.'
    },
    {
      name: 'Greater Portent',
      description:
        'You roll three d20s for your Portent feature, rather than two.'
    },
    {
      name: 'Enchantment Savant',
      description:
        'The gold and time you must spend to copy an enchantment spell into your spellbook is halved.'
    },
    {
      name: 'Split Enchantment',
      description:
        'When you cast an enchantment spell of 1st level or higher that targets only one creature, you can have it target a second creature.'
    },
    {
      name: 'Alter Memories',
      description:
        'When you cast an enchantment spell to charm one or more creatures, you can alter one creature’s understanding so that it remains unaware of being charmed.'
    },
    {
      name: 'Evocation Savant',
      description:
        'The gold and time you must spend to copy an evocation spell into your spellbook is halved.'
    },
    {
      name: 'Sculpt Spells',
      description:
        'You can create pockets of relative safety within the effects of your evocation spells. When you cast an evocation spell that affects other creatures that you can see, you can choose a number of them equal to 1 + the spell’s level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save.'
    },
    {
      name: 'Potent Cantrip',
      description:
        'Your damaging cantrips affect even creatures that avoid the brunt of the effect. When a creature succeeds on a saving throw against your cantrip, the creature takes half the cantrip’s damage (if any), but suffers no additional effect from the cantrip.'
    },
    {
      name: 'Empowered Evocation',
      description:
        'You can add your Intelligence modifier to the damage roll of any wizard evocation spell you cast.'
    },
    {
      name: 'Overchannel',
      description:
        'When you cast a wizard spell of 5th level or lower that deals damage, you can deal maximum damage with that spell.'
    },
    {
      name: 'Illusion Savant',
      description:
        'The gold and time you must spend to copy an illusion spell into your spellbook is halved.'
    },
    {
      name: 'Improved Minor Illusion',
      description:
        'When you cast minor illusion, you can create both a sound and an image with a single casting of the spell.'
    },
    {
      name: 'Malleable Illusions',
      description:
        'When you cast an illusion spell that has a duration of 1 minute or longer, you can use your action to change the nature of that illusion (using the spell’s normal parameters for the illusion), provided that you can see the illusion.'
    },
    {
      name: 'Illusory Self',
      description:
        'You can create an illusory duplicate of yourself as an instant, almost instinctual reaction to danger. When a creature makes an attack roll against you, you can use your reaction to interpose the illusory duplicate between the attacker and yourself.'
    },
    {
      name: 'Illusory Reality',
      description:
        'When you cast an illusion spell of 1st level or higher, you can choose one inanimate, nonmagical object that is part of the illusion and make that object real.'
    },
    {
      name: 'Necromancy Savant',
      description:
        'The gold and time you must spend to copy a necromancy spell into your spellbook is halved.'
    },
    {
      name: 'Grim Harvest',
      description:
        'Once per turn when you kill one or more creatures with a spell of 1st level or higher, you regain hit points equal to twice the spell’s level, or three times if the spell belongs to the School of Necromancy.'
    },
    {
      name: 'Undead Thralls',
      description:
        'You add the animate dead spell to your spellbook if it is not there already. When you cast animate dead, you can target one additional corpse or pile of bones, creating another zombie or skeleton, as appropriate.'
    },
    {
      name: 'Inured to Undeath',
      description:
        'You have resistance to necrotic damage, and your hit point maximum can’t be reduced. You have spent so much time dealing with undead and the forces that animate them that you have become inured to some of their worst effects.'
    },
    {
      name: 'Transmutation Savant',
      description:
        'The gold and time you must spend to copy a transmutation spell into your spellbook is halved.'
    },
    {
      name: 'Minor Alchemy',
      description:
        'You can temporarily alter the physical properties of one nonmagical object, changing it from one substance into another.'
    },
    {
      name: 'Shapechanger',
      description:
        'You can use your action to cast polymorph on yourself without expending a spell slot.'
    }
  ];

  // Create skills
  for (const skill of skills) {
    await prisma.skill.create({
      data: {
        name: skill.name,
        description: skill.description
      }
    });
    console.log(`Created skill: ${skill.name}`);
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
