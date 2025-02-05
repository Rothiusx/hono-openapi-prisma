import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'

import { notFoundSchema } from '@/lib/constants'
import { user_userSchema } from '@prisma/generate/schema/mes'

const tags = ['Users']

const userParamsSchema = z.object({
  id: z.coerce
    .number()
    .min(1, { message: 'User ID must be greater than 0' })
    .max(9999, { message: 'User ID must be less than 10000' })
    .openapi({
      examples: [20, 30, 40],
      description: 'User ID to search for',
    }),

})

export const list = createRoute({
  path: '/users',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(user_userSchema),
      'The list of users',
    ),

  },
})

export const create = createRoute({
  path: '/users',
  method: 'post',
  tags,
  request: {
    body: jsonContentRequired(
      user_userSchema,
      'The user to create',
    ),

  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      user_userSchema,
      'The created user',
    ),

    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(user_userSchema),
      'The validation error(s)',
    ),

  },
})

export const getOne = createRoute({
  path: '/users/{id}',
  method: 'get',
  tags,
  request: {
    params: userParamsSchema,
  },

  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      user_userSchema,
      'The requested user',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(userParamsSchema),
      'Invalid id error',
    ),
  },
})

export const patch = createRoute({
  path: '/users/{id}',
  method: 'patch',
  tags,
  request: {
    params: userParamsSchema,
    body: jsonContentRequired(
      user_userSchema.partial(),
      'The user updates',
    ),
  },

  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      user_userSchema,
      'The updated user',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(user_userSchema.partial())
        .or(createErrorSchema(userParamsSchema)),
      'The validation error(s)',
    ),

  },
})

export const remove = createRoute({
  path: '/users/{id}',
  method: 'delete',
  tags,
  request: {
    params: userParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'User deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'User not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(userParamsSchema),
      'Invalid id error',
    ),

  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
