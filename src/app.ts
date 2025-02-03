import createApp from '@/app/create-app'
import createOpenAPI from '@/app/open-api'
import indexRouter from '@/routes'
import devicesRouter from '@/routes/devices'

const app = createApp()

createOpenAPI(app)

const routes = [
  indexRouter,
  devicesRouter,
] as const

routes.forEach((route) => {
  app.route('/', route)
})

export type AppType = typeof routes[number]

export default app
