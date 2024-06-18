/*
  Warnings:

  - The primary key for the `RaceTrait` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `RaceTrait` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `RaceTrait` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `RaceTrait` table. All the data in the column will be lost.
  - You are about to drop the column `subraceId` on the `RaceTrait` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Sense` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `traitId` to the `RaceTrait` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RaceTrait" DROP CONSTRAINT "RaceTrait_subraceId_fkey";

-- AlterTable
ALTER TABLE "RaceTrait" DROP CONSTRAINT "RaceTrait_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "subraceId",
ADD COLUMN     "traitId" INTEGER NOT NULL,
ADD CONSTRAINT "RaceTrait_pkey" PRIMARY KEY ("raceId", "traitId");

-- CreateTable
CREATE TABLE "Trait" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubraceTrait" (
    "subraceId" INTEGER NOT NULL,
    "traitId" INTEGER NOT NULL,

    CONSTRAINT "SubraceTrait_pkey" PRIMARY KEY ("subraceId","traitId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trait_name_key" ON "Trait"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sense_name_key" ON "Sense"("name");

-- AddForeignKey
ALTER TABLE "RaceTrait" ADD CONSTRAINT "RaceTrait_traitId_fkey" FOREIGN KEY ("traitId") REFERENCES "Trait"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubraceTrait" ADD CONSTRAINT "SubraceTrait_subraceId_fkey" FOREIGN KEY ("subraceId") REFERENCES "Subrace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubraceTrait" ADD CONSTRAINT "SubraceTrait_traitId_fkey" FOREIGN KEY ("traitId") REFERENCES "Trait"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
