import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'

import type { AppContext, AppOpenAPI } from '@/types/app'

import { pinoLogger } from '@/middlewares/pino-logger'

export function createRouter() {
  return new OpenAPIHono<AppContext>({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()
  app.use(serveEmojiFavicon('📝'))
  app.use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)
  return app
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router)
}
