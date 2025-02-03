import type { MiddlewareHandler } from 'hono'

import prisma from '@/db'

export function prismaMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    c.set('db', prisma)
    await next()
  }
}
