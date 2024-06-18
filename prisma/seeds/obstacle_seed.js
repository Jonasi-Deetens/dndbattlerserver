import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// List of all D&D 5e obstacles
async function main() {
  // List of personal obstacles
  const obstacles = [
    {
      description: 'Fear of failure that causes hesitation in critical moments.'
    },
    {
      description:
        'Struggling to overcome the loss of a loved one, affecting decision-making.'
    },
    {
      description:
        'Dealing with a dark past that haunts dreams and impacts trust in others.'
    },
    {
      description:
        'Lack of self-confidence leading to missed opportunities and underperformance.'
    },
    {
      description:
        'A compulsion for vengeance that clouds judgment and risks alliances.'
    },
    {
      description:
        'A moral dilemma that conflicts with personal values and the greater good.'
    },
    {
      description:
        'An addiction that interferes with daily life and relationships.'
    },
    {
      description:
        'A deep-seated fear of intimacy, preventing meaningful connections.'
    },
    {
      description:
        'Guilt over past mistakes that hinders personal growth and recovery.'
    },
    {
      description:
        "A constant need for validation causing overreliance on others' opinions."
    },
    {
      description:
        'Anxiety about the future that paralyzes decision-making and actions.'
    },
    {
      description:
        'A drive for perfectionism leading to burnout and dissatisfaction.'
    },
    {
      description:
        'Difficulty in adapting to change, causing resistance and stagnation.'
    },
    {
      description:
        'Inability to forgive oneself, affecting mental health and relationships.'
    },
    {
      description:
        "Struggle with accepting one's identity, leading to internal conflict."
    }
  ];

  // Create obstacles
  for (const obstacle of obstacles) {
    await prisma.obstacle.create({
      data: obstacle
    });
    console.log(`Created personal obstacle: ${obstacle.description}`);
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
