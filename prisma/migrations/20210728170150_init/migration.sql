/*
  Warnings:

  - You are about to drop the column `articles` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `wallets` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "articles",
DROP COLUMN "comments",
DROP COLUMN "reviews",
ALTER COLUMN "wallets" SET DATA TYPE VARCHAR(45)[];

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "blockchainId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "contentCID" VARCHAR(50) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "blockchainId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "contentCID" VARCHAR(50) NOT NULL,
    "articleId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "blockchainId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "contentCID" VARCHAR(50) NOT NULL,
    "articleId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "articles.blockchainId_unique" ON "articles"("blockchainId");

-- CreateIndex
CREATE UNIQUE INDEX "comments.blockchainId_unique" ON "comments"("blockchainId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews.blockchainId_unique" ON "reviews"("blockchainId");

-- AddForeignKey
ALTER TABLE "articles" ADD FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
