-- CreateTable
CREATE TABLE "test" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "test_name_key" ON "test"("name");
