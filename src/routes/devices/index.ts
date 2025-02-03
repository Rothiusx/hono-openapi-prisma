import db from '@/db'
import { createRouter } from '@/lib/create-app'

import * as handlers from './handlers'
import * as routes from './routes'

const router = createRouter()
  .openapi(routes.list, async (c) => {
    const devices = await db.device.findMany()
    return c.json(devices)
  })
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove)

export default router
