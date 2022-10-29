-- AlterTable
ALTER TABLE "products" ADD COLUMN     "hasEdge" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "edges" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("id")
);
