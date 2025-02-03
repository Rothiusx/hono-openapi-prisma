import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { PrismaClient } from '@prisma/client'
import type { PinoLogger } from 'hono-pino'

export interface AppContext {
  Variables: {
    db: PrismaClient
    logger: PinoLogger
  }
}

export type AppOpenAPI = OpenAPIHono<AppContext>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppContext>
