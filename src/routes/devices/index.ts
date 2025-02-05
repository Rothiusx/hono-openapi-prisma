import { createRouter } from '@/app/create-app'
import * as handlers from '@/routes/devices/handlers'
import * as routes from '@/routes/devices/routes'

export const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove)

export default createRouter()
  .route('/', router)
