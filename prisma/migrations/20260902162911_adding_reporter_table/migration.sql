-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('DOG', 'CAT', 'RAT', 'RABBIT', 'OTHER');

-- CreateEnum
CREATE TYPE "ReporterStatus" AS ENUM ('REPORTED', 'CLAIMED', 'RESCUED', 'OTHER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'REPORTER', 'VOLUNTEER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Reporter" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT,
    "lat" TEXT,
    "lang" TEXT,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT,
    "animalType" "AnimalType" NOT NULL,
    "status" "ReporterStatus" NOT NULL,
    "claimedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "resolutionNote" TEXT,

    CONSTRAINT "Reporter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reporter" ADD CONSTRAINT "Reporter_claimedById_fkey" FOREIGN KEY ("claimedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
