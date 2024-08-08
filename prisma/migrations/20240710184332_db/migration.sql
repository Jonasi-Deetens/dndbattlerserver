-- CreateEnum
CREATE TYPE "FightingStyle" AS ENUM ('ARCHERY', 'DEFENSE', 'DUELING', 'GREAT_WEAPON_FIGHTING', 'PROTECTION', 'TWO_WEAPON_FIGHTING');

-- CreateEnum
CREATE TYPE "School" AS ENUM ('ABJURATION', 'CONJURATION', 'DIVINATION', 'ENCHANTMENT', 'EVOCATION', 'ILLUSION', 'NECROMANCY', 'TRANSMUTATION', 'TRANSFIGURATION');

-- CreateEnum
CREATE TYPE "Dice" AS ENUM ('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100');

-- CreateEnum
CREATE TYPE "AbilityScore" AS ENUM ('Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma');

-- CreateEnum
CREATE TYPE "EffectType" AS ENUM ('BUFF', 'DEBUFF', 'HEALING', 'DAMAGE', 'CONTROL', 'SUMMONING', 'UTILITY', 'PROTECTION', 'MOVEMENT', 'DETECTION', 'TRANSFORMATION', 'TRANSPORTATION', 'RESTORATION', 'INSTANT_DEATH', 'COMMUNICATION', 'ILLUSION');

-- CreateEnum
CREATE TYPE "DamageType" AS ENUM ('ACID', 'BLUDGEONING', 'COLD', 'FIRE', 'FORCE', 'LIGHTNING', 'NECROTIC', 'PIERCING', 'POISON', 'PSYCHIC', 'RADIANT', 'SLASHING', 'THUNDER', 'VARIES');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "subraceId" INTEGER,
    "background" TEXT NOT NULL,
    "alignment" TEXT NOT NULL,
    "primaryGoal" TEXT NOT NULL,
    "secondaryGoals" TEXT[],
    "personalQuest" TEXT,
    "backstory" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "ideals" TEXT[],
    "bonds" TEXT[],
    "flaws" TEXT[],
    "fears" TEXT[],
    "savingThrows" TEXT[],
    "magicSavingThrows" TEXT[],
    "advantages" TEXT[],
    "disadvantages" TEXT[],
    "resistances" TEXT[],
    "immunities" TEXT[],
    "internalConflicts" TEXT[],
    "vices" TEXT[],
    "appearance" TEXT NOT NULL,
    "personalityTraits" TEXT[],
    "level" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "stats" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Npc" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "subraceId" INTEGER,
    "background" TEXT NOT NULL,
    "alignment" TEXT NOT NULL,
    "primaryGoal" TEXT NOT NULL,
    "secondaryGoals" TEXT[],
    "personalQuest" TEXT,
    "backstory" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "ideals" TEXT[],
    "bonds" TEXT[],
    "flaws" TEXT[],
    "fears" TEXT[],
    "savingThrows" TEXT[],
    "advantages" TEXT[],
    "disadvantages" TEXT[],
    "resistances" TEXT[],
    "immunities" TEXT[],
    "internalConflicts" TEXT[],
    "vices" TEXT[],
    "appearance" TEXT NOT NULL,
    "personalityTraits" TEXT[],
    "level" INTEGER NOT NULL,
    "experienceReward" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "stats" JSONB NOT NULL,
    "campaignId" TEXT NOT NULL,

    CONSTRAINT "Npc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "armorClass" INTEGER NOT NULL,
    "challengeRating" DOUBLE PRECISION NOT NULL,
    "experienceReward" INTEGER NOT NULL,
    "actions" TEXT[],
    "stats" JSONB NOT NULL,
    "vulnerabilities" TEXT[],
    "resistances" TEXT[],
    "immunities" TEXT[],

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hitDice" "Dice" NOT NULL,
    "proficiencies" TEXT[],
    "savingThrowProficiencies" "AbilityScore"[],
    "proficiencyBonusByLevel" JSONB NOT NULL,
    "numberOfRagesByLevel" JSONB,
    "abilitiesByLevel" JSONB NOT NULL,
    "buffsByLevel" JSONB NOT NULL,
    "primaryAbilityScoreModifier" "AbilityScore",
    "pimarySpellAbilityScoreModifier" "AbilityScore",
    "rageDamageByLevel" JSONB,
    "spellsByLevel" JSONB NOT NULL,
    "spellSlotsByLevel" JSONB NOT NULL,
    "skillsByLevel" JSONB NOT NULL,
    "subClassAvailableAtLevel" INTEGER NOT NULL,
    "unusableItems" TEXT[],
    "fightingStyles" "FightingStyle"[],
    "movementSpeedBonusByLevel" JSONB NOT NULL,
    "exhaustionLevel" INTEGER NOT NULL,
    "kiPointsByLevel" JSONB NOT NULL,
    "sorceryPointsByLevel" JSONB NOT NULL,
    "sneakAttackByLevel" JSONB,
    "invocationsKnownByLevel" JSONB NOT NULL,
    "cantripsKnownByLevel" JSONB NOT NULL,
    "spellsKnownByLevel" JSONB NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subclass" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "proficiencies" TEXT[],
    "pimarySpellAbilityScoreModifier" "AbilityScore",
    "savingThrowProficiencies" "AbilityScore"[],
    "spellsByLevel" JSONB NOT NULL,
    "skillsByLevel" JSONB NOT NULL,
    "abilitiesByLevel" JSONB NOT NULL,
    "spellslotsBySpellLevelByLevel" JSONB,
    "cantripsKnownByLevel" JSONB,
    "spellsKnownByLevel" JSONB,
    "parentClassId" INTEGER NOT NULL,

    CONSTRAINT "Subclass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "spellLevel" INTEGER NOT NULL,
    "castingTime" INTEGER NOT NULL,
    "range" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "school" "School" NOT NULL,
    "components" TEXT[],
    "savingThrows" "AbilityScore",
    "description" TEXT NOT NULL,
    "damageType" "DamageType",
    "effectType" "EffectType" NOT NULL,
    "maxSpaceBetweenTargets" INTEGER,
    "statChanges" JSONB,
    "rolls" JSONB,
    "rollsBySpellSlot" JSONB,
    "duration" INTEGER NOT NULL,
    "concentration" BOOLEAN NOT NULL,
    "ritual" BOOLEAN NOT NULL,
    "savingThrowBonusDice" "Dice",
    "attackBonusDice" "Dice",
    "bonusDamage" INTEGER,
    "boostedBySpellModifier" BOOLEAN,
    "rollByCharacterLevel" BOOLEAN,
    "rollBySpellSlot" BOOLEAN,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellEffect" (
    "id" SERIAL NOT NULL,
    "spellId" INTEGER NOT NULL,
    "targetType" TEXT NOT NULL,
    "effectType" "EffectType" NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "SpellEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,
    "npcId" INTEGER,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "leaderId" INTEGER,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "characterId" INTEGER,
    "npcId" INTEGER,
    "monsterId" INTEGER,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "damage" TEXT,
    "buffs" TEXT,
    "duration" TEXT,
    "range" TEXT,
    "actionType" TEXT,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obstacle" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" INTEGER,
    "npcId" INTEGER,

    CONSTRAINT "Obstacle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "range" INTEGER NOT NULL,

    CONSTRAINT "Sense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "cost" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abilityScoreIncreases" JSONB NOT NULL,
    "statIncreases" JSONB NOT NULL,
    "adultAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "alignment" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "proficiencies" TEXT[],
    "resistances" TEXT[],
    "advantages" TEXT[],
    "raceDislikes" TEXT[],
    "magicSavingThrows" "AbilityScore"[],

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subrace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentRaceId" INTEGER NOT NULL,
    "abilityScoreIncreases" JSONB NOT NULL,
    "statIncreases" JSONB,
    "adultAge" INTEGER NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "alignment" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "proficiencies" TEXT[],
    "resistances" TEXT[],
    "advantages" TEXT[],
    "disadvantages" TEXT[],

    CONSTRAINT "Subrace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToLanguage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToSpell" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToSense" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NpcToSpell" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NpcToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NpcToSense" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MonsterToSense" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MonsterToSpell" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MonsterToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassToSpell" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SpellToSubclass" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SpellToSubrace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AbilityToCharacter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AbilityToNpc" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AbilityToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LanguageToNpc" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LanguageToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LanguageToRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LanguageToSubrace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SkillToSubrace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SenseToSubrace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemToNpc" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemToMonster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RaceToSense" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RaceToSpell" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RaceToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subclass_name_key" ON "Subclass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_name_key" ON "Spell"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SpellEffect_spellId_id_key" ON "SpellEffect"("spellId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sense_name_key" ON "Sense"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToSkill_AB_unique" ON "_CharacterToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToSkill_B_index" ON "_CharacterToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToLanguage_AB_unique" ON "_CharacterToLanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToLanguage_B_index" ON "_CharacterToLanguage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToItem_AB_unique" ON "_CharacterToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToItem_B_index" ON "_CharacterToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToSpell_AB_unique" ON "_CharacterToSpell"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToSpell_B_index" ON "_CharacterToSpell"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToSense_AB_unique" ON "_CharacterToSense"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToSense_B_index" ON "_CharacterToSense"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NpcToSpell_AB_unique" ON "_NpcToSpell"("A", "B");

-- CreateIndex
CREATE INDEX "_NpcToSpell_B_index" ON "_NpcToSpell"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NpcToSkill_AB_unique" ON "_NpcToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_NpcToSkill_B_index" ON "_NpcToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NpcToSense_AB_unique" ON "_NpcToSense"("A", "B");

-- CreateIndex
CREATE INDEX "_NpcToSense_B_index" ON "_NpcToSense"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MonsterToSense_AB_unique" ON "_MonsterToSense"("A", "B");

-- CreateIndex
CREATE INDEX "_MonsterToSense_B_index" ON "_MonsterToSense"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MonsterToSpell_AB_unique" ON "_MonsterToSpell"("A", "B");

-- CreateIndex
CREATE INDEX "_MonsterToSpell_B_index" ON "_MonsterToSpell"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MonsterToSkill_AB_unique" ON "_MonsterToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_MonsterToSkill_B_index" ON "_MonsterToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToItem_AB_unique" ON "_ClassToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToItem_B_index" ON "_ClassToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToSpell_AB_unique" ON "_ClassToSpell"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToSpell_B_index" ON "_ClassToSpell"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpellToSubclass_AB_unique" ON "_SpellToSubclass"("A", "B");

-- CreateIndex
CREATE INDEX "_SpellToSubclass_B_index" ON "_SpellToSubclass"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpellToSubrace_AB_unique" ON "_SpellToSubrace"("A", "B");

-- CreateIndex
CREATE INDEX "_SpellToSubrace_B_index" ON "_SpellToSubrace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AbilityToCharacter_AB_unique" ON "_AbilityToCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_AbilityToCharacter_B_index" ON "_AbilityToCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AbilityToNpc_AB_unique" ON "_AbilityToNpc"("A", "B");

-- CreateIndex
CREATE INDEX "_AbilityToNpc_B_index" ON "_AbilityToNpc"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AbilityToMonster_AB_unique" ON "_AbilityToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_AbilityToMonster_B_index" ON "_AbilityToMonster"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToNpc_AB_unique" ON "_LanguageToNpc"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToNpc_B_index" ON "_LanguageToNpc"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToMonster_AB_unique" ON "_LanguageToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToMonster_B_index" ON "_LanguageToMonster"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToRace_AB_unique" ON "_LanguageToRace"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToRace_B_index" ON "_LanguageToRace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LanguageToSubrace_AB_unique" ON "_LanguageToSubrace"("A", "B");

-- CreateIndex
CREATE INDEX "_LanguageToSubrace_B_index" ON "_LanguageToSubrace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillToSubrace_AB_unique" ON "_SkillToSubrace"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillToSubrace_B_index" ON "_SkillToSubrace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SenseToSubrace_AB_unique" ON "_SenseToSubrace"("A", "B");

-- CreateIndex
CREATE INDEX "_SenseToSubrace_B_index" ON "_SenseToSubrace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToNpc_AB_unique" ON "_ItemToNpc"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToNpc_B_index" ON "_ItemToNpc"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToMonster_AB_unique" ON "_ItemToMonster"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToMonster_B_index" ON "_ItemToMonster"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RaceToSense_AB_unique" ON "_RaceToSense"("A", "B");

-- CreateIndex
CREATE INDEX "_RaceToSense_B_index" ON "_RaceToSense"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RaceToSpell_AB_unique" ON "_RaceToSpell"("A", "B");

-- CreateIndex
CREATE INDEX "_RaceToSpell_B_index" ON "_RaceToSpell"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RaceToSkill_AB_unique" ON "_RaceToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_RaceToSkill_B_index" ON "_RaceToSkill"("B");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_subraceId_fkey" FOREIGN KEY ("subraceId") REFERENCES "Subrace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Npc" ADD CONSTRAINT "Npc_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Npc" ADD CONSTRAINT "Npc_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Npc" ADD CONSTRAINT "Npc_subraceId_fkey" FOREIGN KEY ("subraceId") REFERENCES "Subrace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Npc" ADD CONSTRAINT "Npc_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subclass" ADD CONSTRAINT "Subclass_parentClassId_fkey" FOREIGN KEY ("parentClassId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellEffect" ADD CONSTRAINT "SpellEffect_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_npcId_fkey" FOREIGN KEY ("npcId") REFERENCES "Npc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Npc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_npcId_fkey" FOREIGN KEY ("npcId") REFERENCES "Npc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Obstacle" ADD CONSTRAINT "Obstacle_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Obstacle" ADD CONSTRAINT "Obstacle_npcId_fkey" FOREIGN KEY ("npcId") REFERENCES "Npc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subrace" ADD CONSTRAINT "Subrace_parentRaceId_fkey" FOREIGN KEY ("parentRaceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToSkill" ADD CONSTRAINT "_CharacterToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToSkill" ADD CONSTRAINT "_CharacterToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToLanguage" ADD CONSTRAINT "_CharacterToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToLanguage" ADD CONSTRAINT "_CharacterToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToItem" ADD CONSTRAINT "_CharacterToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToItem" ADD CONSTRAINT "_CharacterToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToSpell" ADD CONSTRAINT "_CharacterToSpell_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToSpell" ADD CONSTRAINT "_CharacterToSpell_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToSense" ADD CONSTRAINT "_CharacterToSense_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToSense" ADD CONSTRAINT "_CharacterToSense_B_fkey" FOREIGN KEY ("B") REFERENCES "Sense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NpcToSpell" ADD CONSTRAINT "_NpcToSpell_A_fkey" FOREIGN KEY ("A") REFERENCES "Npc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NpcToSpell" ADD CONSTRAINT "_NpcToSpell_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NpcToSkill" ADD CONSTRAINT "_NpcToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Npc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NpcToSkill" ADD CONSTRAINT "_NpcToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NpcToSense" ADD CONSTRAINT "_NpcToSense_A_fkey" FOREIGN KEY ("A") REFERENCES "Npc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NpcToSense" ADD CONSTRAINT "_NpcToSense_B_fkey" FOREIGN KEY ("B") REFERENCES "Sense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToSense" ADD CONSTRAINT "_MonsterToSense_A_fkey" FOREIGN KEY ("A") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToSense" ADD CONSTRAINT "_MonsterToSense_B_fkey" FOREIGN KEY ("B") REFERENCES "Sense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToSpell" ADD CONSTRAINT "_MonsterToSpell_A_fkey" FOREIGN KEY ("A") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToSpell" ADD CONSTRAINT "_MonsterToSpell_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToSkill" ADD CONSTRAINT "_MonsterToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToSkill" ADD CONSTRAINT "_MonsterToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToItem" ADD CONSTRAINT "_ClassToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToItem" ADD CONSTRAINT "_ClassToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToSpell" ADD CONSTRAINT "_ClassToSpell_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToSpell" ADD CONSTRAINT "_ClassToSpell_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpellToSubclass" ADD CONSTRAINT "_SpellToSubclass_A_fkey" FOREIGN KEY ("A") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpellToSubclass" ADD CONSTRAINT "_SpellToSubclass_B_fkey" FOREIGN KEY ("B") REFERENCES "Subclass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpellToSubrace" ADD CONSTRAINT "_SpellToSubrace_A_fkey" FOREIGN KEY ("A") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpellToSubrace" ADD CONSTRAINT "_SpellToSubrace_B_fkey" FOREIGN KEY ("B") REFERENCES "Subrace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToCharacter" ADD CONSTRAINT "_AbilityToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToCharacter" ADD CONSTRAINT "_AbilityToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToNpc" ADD CONSTRAINT "_AbilityToNpc_A_fkey" FOREIGN KEY ("A") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToNpc" ADD CONSTRAINT "_AbilityToNpc_B_fkey" FOREIGN KEY ("B") REFERENCES "Npc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToMonster" ADD CONSTRAINT "_AbilityToMonster_A_fkey" FOREIGN KEY ("A") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilityToMonster" ADD CONSTRAINT "_AbilityToMonster_B_fkey" FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToNpc" ADD CONSTRAINT "_LanguageToNpc_A_fkey" FOREIGN KEY ("A") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToNpc" ADD CONSTRAINT "_LanguageToNpc_B_fkey" FOREIGN KEY ("B") REFERENCES "Npc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToMonster" ADD CONSTRAINT "_LanguageToMonster_A_fkey" FOREIGN KEY ("A") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToMonster" ADD CONSTRAINT "_LanguageToMonster_B_fkey" FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToRace" ADD CONSTRAINT "_LanguageToRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToRace" ADD CONSTRAINT "_LanguageToRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToSubrace" ADD CONSTRAINT "_LanguageToSubrace_A_fkey" FOREIGN KEY ("A") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LanguageToSubrace" ADD CONSTRAINT "_LanguageToSubrace_B_fkey" FOREIGN KEY ("B") REFERENCES "Subrace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToSubrace" ADD CONSTRAINT "_SkillToSubrace_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToSubrace" ADD CONSTRAINT "_SkillToSubrace_B_fkey" FOREIGN KEY ("B") REFERENCES "Subrace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SenseToSubrace" ADD CONSTRAINT "_SenseToSubrace_A_fkey" FOREIGN KEY ("A") REFERENCES "Sense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SenseToSubrace" ADD CONSTRAINT "_SenseToSubrace_B_fkey" FOREIGN KEY ("B") REFERENCES "Subrace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToNpc" ADD CONSTRAINT "_ItemToNpc_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToNpc" ADD CONSTRAINT "_ItemToNpc_B_fkey" FOREIGN KEY ("B") REFERENCES "Npc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMonster" ADD CONSTRAINT "_ItemToMonster_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMonster" ADD CONSTRAINT "_ItemToMonster_B_fkey" FOREIGN KEY ("B") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToSense" ADD CONSTRAINT "_RaceToSense_A_fkey" FOREIGN KEY ("A") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToSense" ADD CONSTRAINT "_RaceToSense_B_fkey" FOREIGN KEY ("B") REFERENCES "Sense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToSpell" ADD CONSTRAINT "_RaceToSpell_A_fkey" FOREIGN KEY ("A") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToSpell" ADD CONSTRAINT "_RaceToSpell_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToSkill" ADD CONSTRAINT "_RaceToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToSkill" ADD CONSTRAINT "_RaceToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
