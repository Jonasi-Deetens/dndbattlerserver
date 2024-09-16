import path from 'path';
import prisma from '@prisma/client';
import { tileNames } from '../utils/tileNames.js';

const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

// Mapping of file name keywords to TileType names
const TILE_TYPE_MAP = {
  sky: 'sky',
  arch: 'arch',
  door: 'door',
  board: 'board',
  border: 'border',
  screen: 'screen',
  bar: 'bar',
  carpet: 'carpet',
  ladder: 'ladder',
  stairs: 'stairs',
  floor: 'floor',
  path: 'path',
  wall: 'wall',
  shadow: 'shadow'
};

async function uploadImagesAndPopulateModels() {
  // Read all files in the image folder
  for (const file of tileNames) {
    // Determine the TileType by checking the file name against the TILE_TYPE_MAP
    const tileTypeKey = Object.keys(TILE_TYPE_MAP).find(key =>
      file.toLowerCase().includes(key)
    );
    const tileTypeName = tileTypeKey ? TILE_TYPE_MAP[tileTypeKey] : null;

    if (!tileTypeName) {
      console.log(`Skipping ${file}, no matching TileType found.`);
      continue;
    }

    console.log('Setting TileType - ', tileTypeName);
    // Check if TileType already exists in the database, if not, create it
    let tileType = await prismaClient.tileType.findUnique({
      where: { name: tileTypeName }
    });
    if (!tileType) {
      tileType = await prismaClient.tileType.create({
        data: {
          name: tileTypeName
        }
      });
    }

    const publicId = `${path.basename(file, path.extname(file)).toLowerCase()}`; // Generate a consistent public_id

    // Fetch the URL of the existing image by publicId
    const imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/${publicId}`;

    // Check if the Tile already exists in the database by name
    const existingTile = await prismaClient.tile.findUnique({
      where: { name: path.basename(file, path.extname(file)) }
    });

    if (existingTile) {
      console.log(`Tile ${file} already exists, skipping creation.`);
      continue;
    }

    // Only create the Tile if the image exists and it doesn't already exist in the database
    if (imageUrl) {
      // Create Tile record in the database
      await prismaClient.tile.create({
        data: {
          name: path.basename(file, path.extname(file)), // Use the file name without extension
          imageUrl: imageUrl,
          tileTypeId: tileType.id
        }
      });

      console.log(`Created tile with type ${tileTypeName} for ${file}.`);
    } else {
      console.log(
        `Skipping creation for ${file} as the image URL was not found.`
      );
    }
  }

  console.log('Upload and population completed!');
}

// Run the script
uploadImagesAndPopulateModels()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
