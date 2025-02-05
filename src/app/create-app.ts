import type { Env } from 'hono/types'

import { OpenAPIHono } from '@hono/zod-openapi'
import { prettyJSON } from 'hono/pretty-json'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'

import { pinoLogger } from '@/middlewares/pino-logger'
import { prismaMiddleware } from '@/middlewares/prisma'

export function createRouter<E extends Env>() {
  return new OpenAPIHono<E>({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()

  app.use(serveEmojiFavicon('🚀'))
  app.use(pinoLogger())
  app.use(prettyJSON())
  app.use(prismaMiddleware())

  app.notFound(notFound)
  app.onError(onError)

  return app
}

export function createTestApp(router: OpenAPIHono) {
  return createApp().route('/', router)
}
