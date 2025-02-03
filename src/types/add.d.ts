import type { PinoLogger } from 'hono-pino'

import type { PrismaClient as PrismaClientMes } from '@prisma/client/mes'
import type { PrismaClient as PrismaClientX3 } from '@prisma/client/x3'

declare module 'hono' {
  interface ContextVariableMap {
    db: PrismaClientMes
    x3: PrismaClientX3
    logger: PinoLogger
  }
}
