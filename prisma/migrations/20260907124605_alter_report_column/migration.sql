-- AlterTable
ALTER TABLE "Reporter" ADD COLUMN     "firstAidRequired" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "resolvedAt" DROP DEFAULT;
