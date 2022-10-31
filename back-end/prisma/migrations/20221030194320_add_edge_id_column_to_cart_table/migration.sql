/*
  Warnings:

  - You are about to drop the column `hasEdge` on the `products` table. All the data in the column will be lost.
  - Added the required column `edgeId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "edgeId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "hasEdge";

-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "edgeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_edgeId_fkey" FOREIGN KEY ("edgeId") REFERENCES "edges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
