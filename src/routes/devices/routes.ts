import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'

import { notFoundSchema } from '@/lib/constants'
import { deviceSchema } from 'prisma/schemas'

const tags = ['Devices']

const deviceParamsSchema = z.object({
  id: z.coerce.number()
    .min(1, { message: 'Device ID must be greater than 0' })
    .max(9999, { message: 'Device ID must be less than 10000' }),
})

export const list = createRoute({
  path: '/devices',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(deviceSchema),
      'The list of devices',
    ),
  },
})

export const create = createRoute({
  path: '/devices',
  method: 'post',
  tags,
  request: {
    body: jsonContentRequired(
      deviceSchema,
      'The device to create',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      deviceSchema,
      'The created device',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(deviceSchema),
      'The validation error(s)',
    ),
  },
})

export const getOne = createRoute({
  path: '/devices/{id}',
  method: 'get',
  tags,
  request: {
    params: deviceParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      deviceSchema,
      'The requested device',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Device not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(deviceParamsSchema),
      'Invalid id error',
    ),
  },
})

export const patch = createRoute({
  path: '/devices/{id}',
  method: 'patch',
  tags,
  request: {
    params: deviceParamsSchema,
    body: jsonContentRequired(
      deviceSchema.partial(),
      'The device updates',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      deviceSchema,
      'The updated device',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Device not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(deviceSchema.partial())
        .or(createErrorSchema(deviceParamsSchema)),
      'The validation error(s)',
    ),
  },
})

export const remove = createRoute({
  path: '/devices/{id}',
  method: 'delete',
  tags,
  request: {
    params: deviceParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'Device deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Device not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(deviceParamsSchema),
      'Invalid id error',
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
