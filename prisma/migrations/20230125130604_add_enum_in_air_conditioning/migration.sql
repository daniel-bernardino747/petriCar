/*
  Warnings:

  - You are about to drop the column `airConditioning` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `navigationSystem` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `topSpeed` on the `Product` table. All the data in the column will be lost.
  - Added the required column `air_conditioning` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `navigation_system` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `top_speed` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AirType" AS ENUM ('Manual', 'Automatic');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "airConditioning",
DROP COLUMN "navigationSystem",
DROP COLUMN "topSpeed",
ADD COLUMN     "air_conditioning" "AirType" NOT NULL,
ADD COLUMN     "navigation_system" TEXT NOT NULL,
ADD COLUMN     "top_speed" TEXT NOT NULL;
