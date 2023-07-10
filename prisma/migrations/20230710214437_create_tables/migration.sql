/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TRIAL', 'PAID');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bio" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_authorId_key" ON "Post"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "_CategoryToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPost_B_index" ON "_CategoryToPost"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
