-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "profileVisibility" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competency" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Competency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentArea" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ContentArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proof" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "justification" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "competencyId" INTEGER NOT NULL,

    CONSTRAINT "Proof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonsOnCompetencies" (
    "competencyId" INTEGER NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "PersonsOnCompetencies_pkey" PRIMARY KEY ("competencyId","personId")
);

-- CreateTable
CREATE TABLE "CompetenciesOnContentAreas" (
    "competencyId" INTEGER NOT NULL,
    "contentAreaId" INTEGER NOT NULL,

    CONSTRAINT "CompetenciesOnContentAreas_pkey" PRIMARY KEY ("competencyId","contentAreaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_username_key" ON "Person"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Competency_title_key" ON "Competency"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ContentArea_title_key" ON "ContentArea"("title");

-- AddForeignKey
ALTER TABLE "Proof" ADD CONSTRAINT "Proof_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proof" ADD CONSTRAINT "Proof_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonsOnCompetencies" ADD CONSTRAINT "PersonsOnCompetencies_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonsOnCompetencies" ADD CONSTRAINT "PersonsOnCompetencies_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenciesOnContentAreas" ADD CONSTRAINT "CompetenciesOnContentAreas_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetenciesOnContentAreas" ADD CONSTRAINT "CompetenciesOnContentAreas_contentAreaId_fkey" FOREIGN KEY ("contentAreaId") REFERENCES "ContentArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
