-- CreateTable
CREATE TABLE "places" (
    "id" SERIAL NOT NULL,
    "tokens" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transitions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "transitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imput_places" (
    "transition_id" INTEGER NOT NULL,
    "place_id" INTEGER NOT NULL,

    CONSTRAINT "imput_places_pkey" PRIMARY KEY ("place_id","transition_id")
);

-- CreateTable
CREATE TABLE "output_places" (
    "transition_id" INTEGER NOT NULL,
    "place_id" INTEGER NOT NULL,

    CONSTRAINT "output_places_pkey" PRIMARY KEY ("place_id","transition_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "topSpeed" TEXT NOT NULL,
    "traction" TEXT NOT NULL,
    "navigationSystem" TEXT NOT NULL,
    "airConditioning" TEXT NOT NULL,
    "safety" TEXT[],
    "offroad" TEXT[],
    "warranty" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "connectivity" TEXT[],
    "passed" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imput_places" ADD CONSTRAINT "imput_places_transition_id_fkey" FOREIGN KEY ("transition_id") REFERENCES "transitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imput_places" ADD CONSTRAINT "imput_places_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "output_places" ADD CONSTRAINT "output_places_transition_id_fkey" FOREIGN KEY ("transition_id") REFERENCES "transitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "output_places" ADD CONSTRAINT "output_places_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
