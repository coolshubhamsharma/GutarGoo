import { PrismaClient } from "@prisma/client"; //helps in interaction with our db

const prisma = new PrismaClient();

export default prisma;