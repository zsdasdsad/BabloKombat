/*
  Warnings:

  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "upgrades" (
    "userId" TEXT NOT NULL,
    "click" INTEGER NOT NULL DEFAULT 1,
    "auto" INTEGER NOT NULL DEFAULT 1,
    "crypto" INTEGER NOT NULL DEFAULT 1,
    "manager" INTEGER NOT NULL DEFAULT 1,
    "bank" INTEGER NOT NULL DEFAULT 1,
    "factory" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "upgrades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bablo" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("bablo", "email", "id", "password", "username") SELECT "bablo", "email", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "upgrades_userId_key" ON "upgrades"("userId");
