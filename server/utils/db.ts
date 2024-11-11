import { PrismaClient } from '@prisma/client';

// create prisma instance and expose it
export const prisma = new PrismaClient();
