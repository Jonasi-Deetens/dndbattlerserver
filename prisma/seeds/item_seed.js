import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// List of all D&D 5e items
async function main() {
  const items = [
    // Light Armor
    {
      name: 'Padded Armor',
      type: 'Armor',
      weight: 8.0,
      cost: '5 gp',
      attributes: { AC: 11, Stealth: 'Disadvantage' }
    },
    {
      name: 'Leather Armor',
      type: 'Armor',
      weight: 10.0,
      cost: '10 gp',
      attributes: { AC: 11 }
    },
    {
      name: 'Studded Leather Armor',
      type: 'Armor',
      weight: 13.0,
      cost: '45 gp',
      attributes: { AC: 12 }
    },

    // Medium Armor
    {
      name: 'Hide Armor',
      type: 'Armor',
      weight: 12.0,
      cost: '10 gp',
      attributes: { AC: 12 }
    },
    {
      name: 'Chain Shirt',
      type: 'Armor',
      weight: 20.0,
      cost: '50 gp',
      attributes: { AC: 13 }
    },
    {
      name: 'Scale Mail',
      type: 'Armor',
      weight: 45.0,
      cost: '50 gp',
      attributes: { AC: 14, Stealth: 'Disadvantage' }
    },
    {
      name: 'Breastplate',
      type: 'Armor',
      weight: 20.0,
      cost: '400 gp',
      attributes: { AC: 14 }
    },
    {
      name: 'Half Plate',
      type: 'Armor',
      weight: 40.0,
      cost: '750 gp',
      attributes: { AC: 15, Stealth: 'Disadvantage' }
    },

    // Heavy Armor
    {
      name: 'Ring Mail',
      type: 'Armor',
      weight: 40.0,
      cost: '30 gp',
      attributes: { AC: 14, Stealth: 'Disadvantage' }
    },
    {
      name: 'Chain Mail',
      type: 'Armor',
      weight: 55.0,
      cost: '75 gp',
      attributes: { AC: 16, Stealth: 'Disadvantage' }
    },
    {
      name: 'Splint Armor',
      type: 'Armor',
      weight: 60.0,
      cost: '200 gp',
      attributes: { AC: 17, Stealth: 'Disadvantage' }
    },
    {
      name: 'Plate Armor',
      type: 'Armor',
      weight: 65.0,
      cost: '1500 gp',
      attributes: { AC: 18, Stealth: 'Disadvantage' }
    },

    // Shields
    {
      name: 'Shield',
      type: 'Armor',
      weight: 6.0,
      cost: '10 gp',
      attributes: { AC: 2 }
    },

    // Simple Melee Weapons
    {
      name: 'Club',
      type: 'Weapon',
      weight: 2.0,
      cost: '1 sp',
      attributes: { Damage: '1d4 bludgeoning', Properties: ['Light'] }
    },
    {
      name: 'Dagger',
      type: 'Weapon',
      weight: 1.0,
      cost: '2 gp',
      attributes: {
        Damage: '1d4 piercing',
        Properties: ['Finesse', 'Light', 'Thrown (20/60)']
      }
    },
    {
      name: 'Greatclub',
      type: 'Weapon',
      weight: 10.0,
      cost: '2 sp',
      attributes: { Damage: '1d8 bludgeoning', Properties: ['Two-handed'] }
    },
    {
      name: 'Handaxe',
      type: 'Weapon',
      weight: 2.0,
      cost: '5 gp',
      attributes: {
        Damage: '1d6 slashing',
        Properties: ['Light', 'Thrown (20/60)']
      }
    },
    {
      name: 'Javelin',
      type: 'Weapon',
      weight: 2.0,
      cost: '5 sp',
      attributes: { Damage: '1d6 piercing', Properties: ['Thrown (30/120)'] }
    },
    {
      name: 'Light Hammer',
      type: 'Weapon',
      weight: 2.0,
      cost: '2 gp',
      attributes: {
        Damage: '1d4 bludgeoning',
        Properties: ['Light', 'Thrown (20/60)']
      }
    },
    {
      name: 'Mace',
      type: 'Weapon',
      weight: 4.0,
      cost: '5 gp',
      attributes: { Damage: '1d6 bludgeoning' }
    },
    {
      name: 'Quarterstaff',
      type: 'Weapon',
      weight: 4.0,
      cost: '2 sp',
      attributes: { Damage: '1d6 bludgeoning', Properties: ['Versatile (1d8)'] }
    },
    {
      name: 'Sickle',
      type: 'Weapon',
      weight: 2.0,
      cost: '1 gp',
      attributes: { Damage: '1d4 slashing', Properties: ['Light'] }
    },
    {
      name: 'Spear',
      type: 'Weapon',
      weight: 3.0,
      cost: '1 gp',
      attributes: {
        Damage: '1d6 piercing',
        Properties: ['Thrown (20/60)', 'Versatile (1d8)']
      }
    },

    // Simple Ranged Weapons
    {
      name: 'Crossbow, Light',
      type: 'Weapon',
      weight: 5.0,
      cost: '25 gp',
      attributes: {
        Damage: '1d8 piercing',
        Properties: ['Ammunition (80/320)', 'Loading', 'Two-handed']
      }
    },
    {
      name: 'Dart',
      type: 'Weapon',
      weight: 0.25,
      cost: '5 cp',
      attributes: {
        Damage: '1d4 piercing',
        Properties: ['Finesse', 'Thrown (20/60)']
      }
    },
    {
      name: 'Shortbow',
      type: 'Weapon',
      weight: 2.0,
      cost: '25 gp',
      attributes: {
        Damage: '1d6 piercing',
        Properties: ['Ammunition (80/320)', 'Two-handed']
      }
    },
    {
      name: 'Sling',
      type: 'Weapon',
      weight: 0.0,
      cost: '1 sp',
      attributes: {
        Damage: '1d4 bludgeoning',
        Properties: ['Ammunition (30/120)']
      }
    },

    // Martial Melee Weapons
    {
      name: 'Battleaxe',
      type: 'Weapon',
      weight: 4.0,
      cost: '10 gp',
      attributes: { Damage: '1d8 slashing', Properties: ['Versatile (1d10)'] }
    },
    {
      name: 'Flail',
      type: 'Weapon',
      weight: 2.0,
      cost: '10 gp',
      attributes: { Damage: '1d8 bludgeoning' }
    },
    {
      name: 'Glaive',
      type: 'Weapon',
      weight: 6.0,
      cost: '20 gp',
      attributes: {
        Damage: '1d10 slashing',
        Properties: ['Heavy', 'Reach', 'Two-handed']
      }
    },
    {
      name: 'Greataxe',
      type: 'Weapon',
      weight: 7.0,
      cost: '30 gp',
      attributes: {
        Damage: '1d12 slashing',
        Properties: ['Heavy', 'Two-handed']
      }
    },
    {
      name: 'Greatsword',
      type: 'Weapon',
      weight: 6.0,
      cost: '50 gp',
      attributes: {
        Damage: '2d6 slashing',
        Properties: ['Heavy', 'Two-handed']
      }
    },
    {
      name: 'Halberd',
      type: 'Weapon',
      weight: 6.0,
      cost: '20 gp',
      attributes: {
        Damage: '1d10 slashing',
        Properties: ['Heavy', 'Reach', 'Two-handed']
      }
    },
    {
      name: 'Lance',
      type: 'Weapon',
      weight: 6.0,
      cost: '10 gp',
      attributes: { Damage: '1d12 piercing', Properties: ['Reach', 'Special'] }
    },
    {
      name: 'Longsword',
      type: 'Weapon',
      weight: 3.0,
      cost: '15 gp',
      attributes: { Damage: '1d8 slashing', Properties: ['Versatile (1d10)'] }
    },
    {
      name: 'Maul',
      type: 'Weapon',
      weight: 10.0,
      cost: '10 gp',
      attributes: {
        Damage: '2d6 bludgeoning',
        Properties: ['Heavy', 'Two-handed']
      }
    },
    {
      name: 'Morningstar',
      type: 'Weapon',
      weight: 4.0,
      cost: '15 gp',
      attributes: { Damage: '1d8 piercing' }
    },
    {
      name: 'Pike',
      type: 'Weapon',
      weight: 18.0,
      cost: '5 gp',
      attributes: {
        Damage: '1d10 piercing',
        Properties: ['Heavy', 'Reach', 'Two-handed']
      }
    },
    {
      name: 'Rapier',
      type: 'Weapon',
      weight: 2.0,
      cost: '25 gp',
      attributes: { Damage: '1d8 piercing', Properties: ['Finesse'] }
    },
    {
      name: 'Scimitar',
      type: 'Weapon',
      weight: 3.0,
      cost: '25 gp',
      attributes: { Damage: '1d6 slashing', Properties: ['Finesse', 'Light'] }
    },
    {
      name: 'Shortsword',
      type: 'Weapon',
      weight: 2.0,
      cost: '10 gp',
      attributes: { Damage: '1d6 piercing', Properties: ['Finesse', 'Light'] }
    },
    {
      name: 'Trident',
      type: 'Weapon',
      weight: 4.0,
      cost: '5 gp',
      attributes: {
        Damage: '1d6 piercing',
        Properties: ['Thrown (20/60)', 'Versatile (1d8)']
      }
    },
    {
      name: 'War Pick',
      type: 'Weapon',
      weight: 2.0,
      cost: '5 gp',
      attributes: { Damage: '1d8 piercing' }
    },
    {
      name: 'Warhammer',
      type: 'Weapon',
      weight: 2.0,
      cost: '15 gp',
      attributes: {
        Damage: '1d8 bludgeoning',
        Properties: ['Versatile (1d10)']
      }
    },
    {
      name: 'Whip',
      type: 'Weapon',
      weight: 3.0,
      cost: '2 gp',
      attributes: { Damage: '1d4 slashing', Properties: ['Finesse', 'Reach'] }
    },

    // Martial Ranged Weapons
    {
      name: 'Blowgun',
      type: 'Weapon',
      weight: 1.0,
      cost: '10 gp',
      attributes: {
        Damage: '1 piercing',
        Properties: ['Ammunition (25/100)', 'Loading']
      }
    },
    {
      name: 'Crossbow, Hand',
      type: 'Weapon',
      weight: 3.0,
      cost: '75 gp',
      attributes: {
        Damage: '1d6 piercing',
        Properties: ['Ammunition (30/120)', 'Light', 'Loading']
      }
    },
    {
      name: 'Crossbow, Heavy',
      type: 'Weapon',
      weight: 18.0,
      cost: '50 gp',
      attributes: {
        Damage: '1d10 piercing',
        Properties: ['Ammunition (100/400)', 'Heavy', 'Loading', 'Two-handed']
      }
    },
    {
      name: 'Longbow',
      type: 'Weapon',
      weight: 2.0,
      cost: '50 gp',
      attributes: {
        Damage: '1d8 piercing',
        Properties: ['Ammunition (150/600)', 'Heavy', 'Two-handed']
      }
    },
    {
      name: 'Net',
      type: 'Weapon',
      weight: 3.0,
      cost: '1 gp',
      attributes: { Properties: ['Special', 'Thrown (5/15)'] }
    },

    // Adventuring Gear
    {
      name: 'Abacus',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Acid (vial)',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '25 gp',
      attributes: { Damage: '2d6 acid' }
    },
    {
      name: "Alchemist's Fire (flask)",
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '50 gp',
      attributes: { Damage: '1d4 fire' }
    },
    {
      name: 'Amulet',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: 'Antitoxin (vial)',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '50 gp',
      attributes: {}
    },
    {
      name: 'Backpack',
      type: 'Adventuring Gear',
      weight: 5.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Ball Bearings (bag of 1,000)',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Barrel',
      type: 'Adventuring Gear',
      weight: 70.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Basket',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '4 sp',
      attributes: {}
    },
    {
      name: 'Bedroll',
      type: 'Adventuring Gear',
      weight: 5.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Bell',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Blanket',
      type: 'Adventuring Gear',
      weight: 3.0,
      cost: '5 sp',
      attributes: {}
    },
    {
      name: 'Block and Tackle',
      type: 'Adventuring Gear',
      weight: 5.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Book',
      type: 'Adventuring Gear',
      weight: 5.0,
      cost: '25 gp',
      attributes: {}
    },
    {
      name: 'Bottle, Glass',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Bucket',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '5 cp',
      attributes: {}
    },
    {
      name: 'Caltrops (bag of 20)',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '1 gp',
      attributes: { Damage: '1 piercing', Speed: 'Reduced by 10 feet' }
    },
    {
      name: 'Candle',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '1 cp',
      attributes: { Light: '5 ft' }
    },
    {
      name: 'Case, Crossbow Bolt',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Case, Map or Scroll',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Chain (10 feet)',
      type: 'Adventuring Gear',
      weight: 10.0,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: 'Chalk (1 piece)',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '1 cp',
      attributes: {}
    },
    {
      name: 'Chest',
      type: 'Adventuring Gear',
      weight: 25.0,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: "Climber's Kit",
      type: 'Adventuring Gear',
      weight: 12.0,
      cost: '25 gp',
      attributes: {}
    },
    {
      name: 'Clothes, Common',
      type: 'Adventuring Gear',
      weight: 3.0,
      cost: '5 sp',
      attributes: {}
    },
    {
      name: 'Clothes, Costume',
      type: 'Adventuring Gear',
      weight: 4.0,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: 'Clothes, Fine',
      type: 'Adventuring Gear',
      weight: 6.0,
      cost: '15 gp',
      attributes: {}
    },
    {
      name: "Clothes, Traveler's",
      type: 'Adventuring Gear',
      weight: 4.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Component Pouch',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '25 gp',
      attributes: {}
    },
    {
      name: 'Crowbar',
      type: 'Adventuring Gear',
      weight: 5.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Fishing Tackle',
      type: 'Adventuring Gear',
      weight: 4.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Flask or Tankard',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '2 cp',
      attributes: {}
    },
    {
      name: 'Grappling Hook',
      type: 'Adventuring Gear',
      weight: 4.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Hammer',
      type: 'Adventuring Gear',
      weight: 3.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Hammer, Sledge',
      type: 'Adventuring Gear',
      weight: 10.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: "Healer's Kit",
      type: 'Adventuring Gear',
      weight: 3.0,
      cost: '5 gp',
      attributes: { Uses: 10 }
    },
    {
      name: 'Holy Symbol',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: 'Holy Water (flask)',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '25 gp',
      attributes: { Damage: '2d6 radiant' }
    },
    {
      name: 'Hourglass',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '25 gp',
      attributes: {}
    },
    {
      name: 'Hunting Trap',
      type: 'Adventuring Gear',
      weight: 25.0,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: 'Ink (1 ounce bottle)',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '10 gp',
      attributes: {}
    },
    {
      name: 'Ink Pen',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '2 cp',
      attributes: {}
    },
    {
      name: 'Jug or Pitcher',
      type: 'Adventuring Gear',
      weight: 4.0,
      cost: '2 cp',
      attributes: {}
    },
    {
      name: 'Ladder (10-foot)',
      type: 'Adventuring Gear',
      weight: 25.0,
      cost: '1 sp',
      attributes: {}
    },
    {
      name: 'Lamp',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '5 sp',
      attributes: { Light: '15 ft' }
    },
    {
      name: 'Lantern, Bullseye',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '10 gp',
      attributes: { Light: '60 ft' }
    },
    {
      name: 'Lantern, Hooded',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '5 gp',
      attributes: { Light: '30 ft' }
    },
    {
      name: 'Lock',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '10 gp',
      attributes: {}
    },
    {
      name: 'Magnifying Glass',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '100 gp',
      attributes: {}
    },
    {
      name: 'Manacles',
      type: 'Adventuring Gear',
      weight: 6.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Mess Kit',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '2 sp',
      attributes: {}
    },
    {
      name: 'Mirror, Steel',
      type: 'Adventuring Gear',
      weight: 0.5,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: 'Oil (flask)',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '1 sp',
      attributes: {}
    },
    {
      name: 'Paper (one sheet)',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '2 sp',
      attributes: {}
    },
    {
      name: 'Parchment (one sheet)',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '1 sp',
      attributes: {}
    },
    {
      name: 'Perfume (vial)',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: 'Pick, Miner’s',
      type: 'Adventuring Gear',
      weight: 10.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Piton',
      type: 'Adventuring Gear',
      weight: 0.5,
      cost: '5 cp',
      attributes: {}
    },
    {
      name: 'Poison, Basic (vial)',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '100 gp',
      attributes: { Damage: '1d4 poison' }
    },
    {
      name: 'Pole (10-foot)',
      type: 'Adventuring Gear',
      weight: 7.0,
      cost: '5 cp',
      attributes: {}
    },
    {
      name: 'Pot, Iron',
      type: 'Adventuring Gear',
      weight: 10.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Potion of Healing',
      type: 'Adventuring Gear',
      weight: 0.5,
      cost: '50 gp',
      attributes: { Healing: '2d4+2' }
    },
    {
      name: 'Pouch',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '5 sp',
      attributes: {}
    },
    {
      name: 'Quiver',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Ram, Portable',
      type: 'Adventuring Gear',
      weight: 35.0,
      cost: '4 gp',
      attributes: {}
    },
    {
      name: 'Rations (1 day)',
      type: 'Adventuring Gear',
      weight: 2.0,
      cost: '5 sp',
      attributes: {}
    },
    {
      name: 'Robes',
      type: 'Adventuring Gear',
      weight: 4.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Rope, Hempen (50 feet)',
      type: 'Adventuring Gear',
      weight: 10.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Rope, Silk (50 feet)',
      type: 'Adventuring Gear',
      weight: 5.0,
      cost: '10 gp',
      attributes: {}
    },
    {
      name: 'Sack',
      type: 'Adventuring Gear',
      weight: 0.5,
      cost: '1 cp',
      attributes: {}
    },
    {
      name: "Scale, Merchant's",
      type: 'Adventuring Gear',
      weight: 3.0,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: 'Sealing Wax',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '5 sp',
      attributes: {}
    },
    {
      name: 'Shovel',
      type: 'Adventuring Gear',
      weight: 5.0,
      cost: '2 gp',
      attributes: {}
    },
    {
      name: 'Signal Whistle',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '5 cp',
      attributes: {}
    },
    {
      name: 'Signet Ring',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: 'Soap',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '2 cp',
      attributes: {}
    },
    {
      name: 'Spellbook',
      type: 'Adventuring Gear',
      weight: 3.0,
      cost: '50 gp',
      attributes: {}
    },
    {
      name: 'Spikes, Iron (10)',
      type: 'Adventuring Gear',
      weight: 5.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Spyglass',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '1000 gp',
      attributes: {}
    },
    {
      name: 'Tent',
      type: 'Adventuring Gear',
      weight: 20.0,
      cost: '2 gp',
      attributes: { Capacity: 2 }
    },
    {
      name: 'Tinderbox',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '5 sp',
      attributes: {}
    },
    {
      name: 'Torch',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '1 cp',
      attributes: { Light: '20 ft' }
    },
    {
      name: 'Vial',
      type: 'Adventuring Gear',
      weight: 0.1,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: 'Waterskin',
      type: 'Adventuring Gear',
      weight: 5.0,
      cost: '2 sp',
      attributes: { Capacity: '4 pints' }
    },
    {
      name: 'Whetstone',
      type: 'Adventuring Gear',
      weight: 1.0,
      cost: '1 cp',
      attributes: {}
    },

    // Tools
    {
      name: "Alchemist's Supplies",
      type: 'Tool',
      weight: 8.0,
      cost: '50 gp',
      attributes: {}
    },
    {
      name: "Brewer's Supplies",
      type: 'Tool',
      weight: 9.0,
      cost: '20 gp',
      attributes: {}
    },
    {
      name: "Calligrapher's Supplies",
      type: 'Tool',
      weight: 5.0,
      cost: '10 gp',
      attributes: {}
    },
    {
      name: "Carpenter's Tools",
      type: 'Tool',
      weight: 6.0,
      cost: '8 gp',
      attributes: {}
    },
    {
      name: "Cartographer's Tools",
      type: 'Tool',
      weight: 6.0,
      cost: '15 gp',
      attributes: {}
    },
    {
      name: "Cobbler's Tools",
      type: 'Tool',
      weight: 5.0,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: "Cook's Utensils",
      type: 'Tool',
      weight: 8.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: "Glassblower's Tools",
      type: 'Tool',
      weight: 5.0,
      cost: '30 gp',
      attributes: {}
    },
    {
      name: "Jeweler's Tools",
      type: 'Tool',
      weight: 2.0,
      cost: '25 gp',
      attributes: {}
    },
    {
      name: "Leatherworker's Tools",
      type: 'Tool',
      weight: 5.0,
      cost: '5 gp',
      attributes: {}
    },
    {
      name: "Mason's Tools",
      type: 'Tool',
      weight: 8.0,
      cost: '10 gp',
      attributes: {}
    },
    {
      name: "Painter's Supplies",
      type: 'Tool',
      weight: 5.0,
      cost: '10 gp',
      attributes: {}
    },
    {
      name: "Potter's Tools",
      type: 'Tool',
      weight: 3.0,
      cost: '10 gp',
      attributes: {}
    },
    {
      name: "Smith's Tools",
      type: 'Tool',
      weight: 8.0,
      cost: '20 gp',
      attributes: {}
    },
    {
      name: "Tinker's Tools",
      type: 'Tool',
      weight: 10.0,
      cost: '50 gp',
      attributes: {}
    },
    {
      name: "Weaver's Tools",
      type: 'Tool',
      weight: 5.0,
      cost: '1 gp',
      attributes: {}
    },
    {
      name: "Woodcarver's Tools",
      type: 'Tool',
      weight: 5.0,
      cost: '1 gp',
      attributes: {}
    }
  ];

  for (const item of items) {
    await prisma.item.create({
      data: item
    });
    console.log(`Created item: ${item.name}`);
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
