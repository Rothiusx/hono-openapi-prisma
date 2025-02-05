import type { MiddlewareHandler } from 'hono'

import type { PrismaClient as PrismaClientMes } from '@prisma/generate/client/mes'
import type { PrismaClient as PrismaClientX3 } from '@prisma/generate/client/x3'

import { mes, x3 } from '@/db'

export function prismaMiddleware(): MiddlewareHandler<{
  Variables: {
    db: PrismaClientMes
    x3: PrismaClientX3
  }
}> {
  return async (c, next) => {
    c.set('db', mes)
    c.set('x3', x3)
    await next()
  }
}
