import { PrismaClient } from "@prisma/client";

declare global { var __prisma: PrismaClient } //eslint-disable-line no-var

if (!global.__prisma) {
  global.__prisma = new PrismaClient();
}

global.__prisma.$connect();

export const prisma = global.__prisma;