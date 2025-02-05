import type { OpenAPIHono } from '@hono/zod-openapi'

import createApp from '@/app/create-app'
import createOpenAPI from '@/app/open-api'
import indexRouter from '@/routes'
import devicesRouter from '@/routes/devices'
import usersRouter from '@/routes/users'

const app = createApp()

createOpenAPI(app)

const routes = [
  indexRouter,
  devicesRouter,
  usersRouter,
] as const

routes.forEach((route) => {
  app.route('/', route as OpenAPIHono)
})

export type AppType = typeof routes[number]

export default app
