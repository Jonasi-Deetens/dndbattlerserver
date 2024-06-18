-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "raceId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
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
    "internalConflicts" TEXT[],
    "vices" TEXT[],
    "appearance" TEXT NOT NULL,
    "personalityTraits" TEXT[],
    "level" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "stats" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "subraceId" INTEGER,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hitDice" TEXT NOT NULL,
    "primaryAbility" TEXT NOT NULL,
    "savingThrows" TEXT[],
    "proficiencies" TEXT[],
    "spellcasting" BOOLEAN NOT NULL,
    "spellSlots" JSONB,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSpell" (
    "classId" INTEGER NOT NULL,
    "spellId" INTEGER NOT NULL,

    CONSTRAINT "ClassSpell_pkey" PRIMARY KEY ("classId","spellId")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "castTime" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "components" TEXT[],
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enemy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "armorClass" INTEGER NOT NULL,
    "challengeRating" DOUBLE PRECISION NOT NULL,
    "experience" INTEGER NOT NULL,
    "actions" TEXT[],
    "stats" JSONB NOT NULL,
    "vulnerabilities" TEXT[],
    "resistances" TEXT[],
    "immunities" TEXT[],

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" INTEGER,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationMembership" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "OrganizationMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abilityScoreId" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AbilityScore" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AbilityScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSkill" (
    "characterId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "proficiency" INTEGER NOT NULL,

    CONSTRAINT "CharacterSkill_pkey" PRIMARY KEY ("characterId","skillId")
);

-- CreateTable
CREATE TABLE "EnemySkill" (
    "enemyId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "proficiency" INTEGER NOT NULL,

    CONSTRAINT "EnemySkill_pkey" PRIMARY KEY ("enemyId","skillId")
);

-- CreateTable
CREATE TABLE "CharacterAbility" (
    "characterId" INTEGER NOT NULL,
    "abilityScoreId" INTEGER NOT NULL,

    CONSTRAINT "CharacterAbility_pkey" PRIMARY KEY ("characterId","abilityScoreId")
);

-- CreateTable
CREATE TABLE "EnemyAbility" (
    "enemyId" INTEGER NOT NULL,
    "abilityScoreId" INTEGER NOT NULL,

    CONSTRAINT "EnemyAbility_pkey" PRIMARY KEY ("enemyId","abilityScoreId")
);

-- CreateTable
CREATE TABLE "CharacterLanguage" (
    "characterId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "CharacterLanguage_pkey" PRIMARY KEY ("characterId","languageId")
);

-- CreateTable
CREATE TABLE "EnemyLanguage" (
    "enemyId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "EnemyLanguage_pkey" PRIMARY KEY ("enemyId","languageId")
);

-- CreateTable
CREATE TABLE "CharacterItem" (
    "characterId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "CharacterItem_pkey" PRIMARY KEY ("characterId","itemId")
);

-- CreateTable
CREATE TABLE "EnemyItem" (
    "enemyId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "EnemyItem_pkey" PRIMARY KEY ("enemyId","itemId")
);

-- CreateTable
CREATE TABLE "CharacterSpell" (
    "characterId" INTEGER NOT NULL,
    "spellId" INTEGER NOT NULL,

    CONSTRAINT "CharacterSpell_pkey" PRIMARY KEY ("characterId","spellId")
);

-- CreateTable
CREATE TABLE "EnemySpell" (
    "enemyId" INTEGER NOT NULL,
    "spellId" INTEGER NOT NULL,

    CONSTRAINT "EnemySpell_pkey" PRIMARY KEY ("enemyId","spellId")
);

-- CreateTable
CREATE TABLE "CharacterSense" (
    "characterId" INTEGER NOT NULL,
    "senseId" INTEGER NOT NULL,

    CONSTRAINT "CharacterSense_pkey" PRIMARY KEY ("characterId","senseId")
);

-- CreateTable
CREATE TABLE "EnemySense" (
    "enemyId" INTEGER NOT NULL,
    "senseId" INTEGER NOT NULL,

    CONSTRAINT "EnemySense_pkey" PRIMARY KEY ("enemyId","senseId")
);

-- CreateTable
CREATE TABLE "CharacterEnemy" (
    "characterId" INTEGER NOT NULL,
    "enemyId" INTEGER NOT NULL,

    CONSTRAINT "CharacterEnemy_pkey" PRIMARY KEY ("characterId","enemyId")
);

-- CreateTable
CREATE TABLE "Obstacle" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" INTEGER,

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
CREATE TABLE "RaceLanguage" (
    "raceId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "RaceLanguage_pkey" PRIMARY KEY ("raceId","languageId")
);

-- CreateTable
CREATE TABLE "RaceSense" (
    "raceId" INTEGER NOT NULL,
    "senseId" INTEGER NOT NULL,

    CONSTRAINT "RaceSense_pkey" PRIMARY KEY ("raceId","senseId")
);

-- CreateTable
CREATE TABLE "RaceTrait" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "raceId" INTEGER NOT NULL,
    "subraceId" INTEGER,

    CONSTRAINT "RaceTrait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abilityScoreIncreases" JSONB NOT NULL,
    "age" TEXT NOT NULL,
    "alignment" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subrace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentRaceId" INTEGER NOT NULL,
    "abilityScoreIncreases" JSONB NOT NULL,
    "speed" INTEGER,

    CONSTRAINT "Subrace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMembership_organizationId_characterId_key" ON "OrganizationMembership"("organizationId", "characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AbilityScore_name_key" ON "AbilityScore"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Race_name_key" ON "Race"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_subraceId_fkey" FOREIGN KEY ("subraceId") REFERENCES "Subrace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSpell" ADD CONSTRAINT "ClassSpell_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSpell" ADD CONSTRAINT "ClassSpell_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_abilityScoreId_fkey" FOREIGN KEY ("abilityScoreId") REFERENCES "AbilityScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemySkill" ADD CONSTRAINT "EnemySkill_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemySkill" ADD CONSTRAINT "EnemySkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAbility" ADD CONSTRAINT "CharacterAbility_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAbility" ADD CONSTRAINT "CharacterAbility_abilityScoreId_fkey" FOREIGN KEY ("abilityScoreId") REFERENCES "AbilityScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemyAbility" ADD CONSTRAINT "EnemyAbility_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemyAbility" ADD CONSTRAINT "EnemyAbility_abilityScoreId_fkey" FOREIGN KEY ("abilityScoreId") REFERENCES "AbilityScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterLanguage" ADD CONSTRAINT "CharacterLanguage_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterLanguage" ADD CONSTRAINT "CharacterLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemyLanguage" ADD CONSTRAINT "EnemyLanguage_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemyLanguage" ADD CONSTRAINT "EnemyLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterItem" ADD CONSTRAINT "CharacterItem_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterItem" ADD CONSTRAINT "CharacterItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemyItem" ADD CONSTRAINT "EnemyItem_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemyItem" ADD CONSTRAINT "EnemyItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemySpell" ADD CONSTRAINT "EnemySpell_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemySpell" ADD CONSTRAINT "EnemySpell_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSense" ADD CONSTRAINT "CharacterSense_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSense" ADD CONSTRAINT "CharacterSense_senseId_fkey" FOREIGN KEY ("senseId") REFERENCES "Sense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemySense" ADD CONSTRAINT "EnemySense_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemySense" ADD CONSTRAINT "EnemySense_senseId_fkey" FOREIGN KEY ("senseId") REFERENCES "Sense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEnemy" ADD CONSTRAINT "CharacterEnemy_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEnemy" ADD CONSTRAINT "CharacterEnemy_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Obstacle" ADD CONSTRAINT "Obstacle_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceLanguage" ADD CONSTRAINT "RaceLanguage_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceLanguage" ADD CONSTRAINT "RaceLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceSense" ADD CONSTRAINT "RaceSense_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceSense" ADD CONSTRAINT "RaceSense_senseId_fkey" FOREIGN KEY ("senseId") REFERENCES "Sense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceTrait" ADD CONSTRAINT "RaceTrait_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceTrait" ADD CONSTRAINT "RaceTrait_subraceId_fkey" FOREIGN KEY ("subraceId") REFERENCES "Subrace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subrace" ADD CONSTRAINT "Subrace_parentRaceId_fkey" FOREIGN KEY ("parentRaceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
