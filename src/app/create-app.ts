import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'

import { pinoLogger } from '@/middlewares/pino-logger'
import { prismaMiddleware } from '@/middlewares/prisma'

export function createRouter() {
  return new OpenAPIHono({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()
  app.use(serveEmojiFavicon('🚀'))
  app.use(prismaMiddleware())
  app.use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)
  return app
}

export function createTestApp(router: OpenAPIHono) {
  return createApp().route('/', router)
}
