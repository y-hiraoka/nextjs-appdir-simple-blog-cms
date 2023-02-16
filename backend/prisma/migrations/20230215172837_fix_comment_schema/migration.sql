/*
  Warnings:

  - You are about to drop the column `tagId` on the `PostTag` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[postId,tag]` on the table `PostTag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `submitter` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tag` to the `PostTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_tagId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "submitter" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "PostTag" DROP COLUMN "tagId",
ADD COLUMN     "tag" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- CreateIndex
CREATE UNIQUE INDEX "PostTag_postId_tag_key" ON "PostTag"("postId", "tag");
