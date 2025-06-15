-- CreateEnum
CREATE TYPE "DroneStatus" AS ENUM ('AVAILABLE', 'IN_MISSION', 'OFFLINE');

-- CreateEnum
CREATE TYPE "MissionStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ABORTED');

-- CreateTable
CREATE TABLE "Drone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "DroneStatus" NOT NULL DEFAULT 'AVAILABLE',
    "location" JSONB NOT NULL,
    "lastSeenAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "MissionStatus" NOT NULL DEFAULT 'PLANNED',
    "droneId" TEXT NOT NULL,
    "areaGeoJSON" JSONB NOT NULL,
    "altitude" DOUBLE PRECISION NOT NULL,
    "pattern" TEXT NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyReport" (
    "id" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "coverage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SurveyReport_missionId_key" ON "SurveyReport"("missionId");

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_droneId_fkey" FOREIGN KEY ("droneId") REFERENCES "Drone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyReport" ADD CONSTRAINT "SurveyReport_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
