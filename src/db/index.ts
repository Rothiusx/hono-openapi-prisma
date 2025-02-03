import { PrismaClient as PrismaClientMes } from '@prisma/generate/client/mes'
import { PrismaClient as PrismaClientX3 } from '@prisma/generate/client/x3'

export const mes = new PrismaClientMes()
export const x3 = new PrismaClientX3()

export async function disconnectPrisma() {
  await Promise.all([
    mes.$disconnect(),
    x3.$disconnect(),
  ])
}
