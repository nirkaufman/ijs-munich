-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "skills" TEXT[],

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);
