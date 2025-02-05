import type { RouteHandler } from '@hono/zod-openapi'

import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

import type { AuthContext } from '@/middlewares/auth'
import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from '@/routes/users/routes'

import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'

export const list: RouteHandler<ListRoute> = async (c) => {
  const users = await c.var.db.user_user.findMany()
  return c.json(users, HttpStatusCodes.OK)
}

export const create: RouteHandler<CreateRoute, AuthContext> = async (c) => {
  const user = c.req.valid('json')

  try {
    const inserted = await c.var.db.user_user.create({
      data: user,
    })
    return c.json(inserted, HttpStatusCodes.OK)
  }

  catch (error) {
    return c.json(
      {
        message: error,
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    )
  }
}

export const getOne: RouteHandler<GetOneRoute, AuthContext> = async (c) => {
  const { id } = c.req.valid('param')

  const user = await c.var.db.user_user.findFirst({
    where: {
      id_user: id,
    },
  })

  if (!user) {
    return c.json(
      {

        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return c.json(user, HttpStatusCodes.OK)
}

export const patch: RouteHandler<PatchRoute, AuthContext> = async (c) => {
  const { id } = c.req.valid('param')
  const updates = c.req.valid('json')

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: 'ZodError',
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    )
  }

  const user = await c.var.db.user_user.update({
    where: {
      id_user: id,

    },
    data: updates,
  })

  if (!user) {
    return c.json(
      {

        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return c.json(user, HttpStatusCodes.OK)
}

export const remove: RouteHandler<RemoveRoute, AuthContext> = async (c) => {
  const { id } = c.req.valid('param')
  const result = await c.var.db.user_user.delete({
    where: {
      id_user: id,
    },
  })

  if (!result) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT)
}
