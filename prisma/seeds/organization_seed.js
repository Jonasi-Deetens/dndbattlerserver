import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// List of all D&D 5e organizations
async function main() {
  // List of organizations
  const organizations = [
    {
      name: 'The Fellowship of the Ring',
      description: 'A group formed to destroy the One Ring and defeat Sauron.'
    },
    {
      name: 'The Order of the Gauntlet',
      description:
        'An order of holy knights who seek to uphold justice and vanquish evil.'
    },
    {
      name: 'The Harpers',
      description:
        'A clandestine network of spellcasters and spies who advocate equality and covertly oppose the abuse of power.'
    },
    {
      name: 'The Zhentarim',
      description:
        'A shadowy organization that seeks to extend its influence and control across Faerûn.'
    },
    {
      name: 'The Emerald Enclave',
      description:
        'A group of wilderness survivalists who preserve the natural order while rooting out unnatural threats.'
    },
    {
      name: "The Lords' Alliance",
      description:
        'A coalition of political powers concerned with mutual security and prosperity.'
    },
    {
      name: 'The Cult of the Dragon',
      description:
        'A secret society that worships and supports dragons and dracoliches.'
    }
  ];

  // Create organizations
  for (const org of organizations) {
    const createdOrganization = await prisma.organization.create({
      data: {
        name: org.name,
        description: org.description
      }
    });
    console.log(`Created organization: ${createdOrganization.name}`);
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
