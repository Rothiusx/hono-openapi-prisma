import type { RouteHandler } from '@hono/zod-openapi'

import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from '@/routes/devices/routes'

import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'

export const list: RouteHandler<ListRoute> = async (c) => {
  const devices = await c.var.db.device.findMany()
  return c.json(devices)
}

export const create: RouteHandler<CreateRoute> = async (c) => {
  const device = c.req.valid('json')

  try {
    const inserted = await c.var.db.device.create({
      data: device,
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

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const device = await c.var.db.device.findFirst({
    where: {
      id_device: id,
    },
  })

  if (!device) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return c.json(device, HttpStatusCodes.OK)
}

export const patch: RouteHandler<PatchRoute> = async (c) => {
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

  const device = await c.var.db.device.update({
    where: {
      id_device: id,
    },
    data: updates,
  })

  if (!device) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    )
  }

  return c.json(device, HttpStatusCodes.OK)
}

export const remove: RouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const result = await c.var.db.device.delete({
    where: {
      id_device: id,
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
