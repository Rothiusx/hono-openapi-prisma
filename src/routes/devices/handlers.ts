import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

import type { AppRouteHandler } from '@/types/app'

import db from '@/db'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from './routes'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const devices = await db.device.findMany()
  return c.json(devices)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const device = c.req.valid('json')

  try {
    const inserted = await db.device.create({
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

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const device = await db.device.findFirst({
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

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
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

  const device = await db.device.update({
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

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const result = await db.device.delete({
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
