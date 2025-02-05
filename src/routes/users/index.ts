import * as HttpStatusCodes from 'stoker/http-status-codes'

import type { AuthContext } from '@/middlewares/auth'

import { createRouter } from '@/app/create-app'
import { authMiddleware } from '@/middlewares/auth'

import * as handlers from './handlers'
import * as routes from './routes'

export const router = createRouter<AuthContext>()
  .openapi(routes.list, async (c) => {
    c.var.logger.error(c.var.user)
    const users = await c.var.db.user_user.findMany()
    return c.json(users, HttpStatusCodes.OK)
  })
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove)

export default createRouter()
  .use(authMiddleware())
  .route('/', router)
