import type { MiddlewareHandler } from 'hono'

import { mes, x3 } from '@/db'

export function prismaMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    c.set('db', mes)
    c.set('x3', x3)
    await next()
  }
}
