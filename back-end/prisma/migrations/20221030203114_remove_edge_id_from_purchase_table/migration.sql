/*
  Warnings:

  - You are about to drop the column `edgeId` on the `purchases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_edgeId_fkey";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "edgeId";
