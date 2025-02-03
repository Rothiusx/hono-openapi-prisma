import type { PrismaClient } from '@prisma/client'
import type { PinoLogger } from 'hono-pino'

declare module 'hono' {
  interface ContextVariableMap {
    db: PrismaClient
    logger: PinoLogger
  }
}
