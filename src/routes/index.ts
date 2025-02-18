import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

import { createRouter } from '@/app/create-app'

const router = createRouter()

router.openapi(
  createRoute({
    tags: ['Index'],

    method: 'get',
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema('Devices API'),
        'API Index',
      ),
    },
  }),
  (c) => {
    return c.json({
      message: 'API',
    }, HttpStatusCodes.OK)
  },

)

export default router
