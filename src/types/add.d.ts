import type { PrismaClient as PrismaClientMes } from '@prisma/generate/client/mes'
import type { PrismaClient as PrismaClientX3 } from '@prisma/generate/client/x3'
import type { PinoLogger } from 'hono-pino'

declare module 'hono' {
  interface ContextVariableMap {
    db: PrismaClientMes
    x3: PrismaClientX3
    logger: PinoLogger
  }
}
