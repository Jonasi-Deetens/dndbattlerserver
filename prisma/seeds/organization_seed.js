import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// List of all D&D 5e organizations
async function main() {
  // List of organizations
  const organizations = [
    {
      name: 'The Silver Blades',
      description:
        'An elite group of mercenaries known for their unmatched swordsmanship and loyalty to the highest bidder.'
    },
    {
      name: 'The Arcane Brotherhood',
      description:
        'A secretive organization of wizards and sorcerers dedicated to uncovering and preserving ancient magical knowledge.'
    },
    {
      name: 'The Emerald Enclave',
      description:
        'A coalition of druids, rangers, and nature lovers who strive to maintain the balance between civilization and the natural world.'
    },
    {
      name: 'The Shadow Thieves',
      description:
        'A notorious thieves guild that operates in the shadows, specializing in burglary, smuggling, and espionage.'
    },
    {
      name: 'The Crimson Order',
      description:
        'A fanatical group of warriors who believe in the supremacy of martial prowess and seek to conquer all who oppose them.'
    },
    {
      name: 'The Golden Hand',
      description:
        'A powerful merchant guild that controls trade routes and commerce in several major cities.'
    },
    {
      name: 'The Knights of the Silver Flame',
      description:
        'A chivalric order dedicated to eradicating evil and defending the innocent, guided by the divine light of the Silver Flame.'
    },
    {
      name: 'The Iron Fist',
      description:
        'A brutal and authoritarian militia that imposes strict laws and order within its territory, often through fear and intimidation.'
    },
    {
      name: 'The Order of the Eternal Dawn',
      description:
        'A religious organization devoted to the worship of the sun god and the pursuit of enlightenment and truth.'
    },
    {
      name: 'The Black Lotus',
      description:
        'An enigmatic assassin guild that is rumored to be behind some of the most high-profile assassinations across the realm.'
    }
  ];

  for (const organization of organizations) {
    await prisma.organization.create({
      data: organization
    });
  }

  console.log('Successfully seeded organizations!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
