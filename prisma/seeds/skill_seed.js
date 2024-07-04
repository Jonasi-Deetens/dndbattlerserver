import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
