-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_upgrades" (
    "userId" TEXT NOT NULL,
    "click" INTEGER NOT NULL DEFAULT 0,
    "auto" INTEGER NOT NULL DEFAULT 0,
    "crypto" INTEGER NOT NULL DEFAULT 0,
    "manager" INTEGER NOT NULL DEFAULT 0,
    "bank" INTEGER NOT NULL DEFAULT 0,
    "factory" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "upgrades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_upgrades" ("auto", "bank", "click", "crypto", "factory", "manager", "userId") SELECT "auto", "bank", "click", "crypto", "factory", "manager", "userId" FROM "upgrades";
DROP TABLE "upgrades";
ALTER TABLE "new_upgrades" RENAME TO "upgrades";
CREATE UNIQUE INDEX "upgrades_userId_key" ON "upgrades"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
