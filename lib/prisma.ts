import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const baseprisma = new PrismaClient();
const prisma = new PrismaClient().$extends(withAccelerate())

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


export { PrismaAdapter, baseprisma }
export default prisma