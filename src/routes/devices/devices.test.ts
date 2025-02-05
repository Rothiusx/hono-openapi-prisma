/* eslint-disable ts/ban-ts-comment */
import { testClient } from 'hono/testing'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import { describe, expect, expectTypeOf, it } from 'vitest'
import { ZodIssueCode } from 'zod'

import type { device } from '@prisma/generate/schema/mes'

import createApp from '@/app/create-app'
import env from '@/env'
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'
import { router } from '@/routes/devices'

if (env.NODE_ENV !== 'test') {
  throw new Error('NODE_ENV must be \'test\'')
}

const client = testClient(createApp().route('/', router))

describe('devices routes', () => {
  const device = {
    id_device: 100,
    id_wc: 'CZ-CNC',
    device_key: 'cnc_01',
    device_name: '',
    device_desc: '',
  } as const satisfies device

  it('post /devices validates the body when creating', async () => {
    const response = await client.devices.$post({
      // @ts-expect-error
      json: {
        id_device: device.id_device,
      },
    })

    expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY)
    if (response.status === HttpStatusCodes.UNPROCESSABLE_ENTITY) {
      const json = await response.json()
      expect(json.error.issues[0].path[0]).toBe('id_wc')
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.REQUIRED)
    }
  })

  it('post /devices creates a device', async () => {
    const response = await client.devices.$post({
      json: device,
    })
    expect(response.status).toBe(HttpStatusCodes.OK)
    if (response.status === HttpStatusCodes.OK) {
      const json = await response.json()
      expect(json.id_device).toBe(device.id_device)
      expect(json.id_wc).toBe(device.id_wc)
      expect(json.device_key).toBe(device.device_key)
      expect(json.device_name).toBe(device.device_name)
      expect(json.device_desc).toBe(device.device_desc)
    }
  })

  it('get /devices lists all devices', async () => {
    const response = await client.devices.$get()
    expect(response.status).toBe(HttpStatusCodes.OK)
    if (response.status === HttpStatusCodes.OK) {
      const json = await response.json()
      expectTypeOf(json).toBeArray()
      expect(json.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('get /devices/{id} validates the id param', async () => {
    const response = await client.devices[':id'].$get({
      param: {
        // @ts-expect-error
        id: 'wrong',
      },
    })
    expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY)
    if (response.status === HttpStatusCodes.UNPROCESSABLE_ENTITY) {
      const json = await response.json()
      expect(json.error.issues[0].path[0]).toBe('id')
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER)
    }
  })

  it('get /devices/{id} returns 404 when device not found', async () => {
    const response = await client.devices[':id'].$get({
      param: {
        id: 999,
      },
    })
    expect(response.status).toBe(HttpStatusCodes.NOT_FOUND)
    if (response.status === HttpStatusCodes.NOT_FOUND) {
      const json = await response.json()
      expect(json.message).toBe(HttpStatusPhrases.NOT_FOUND)
    }
  })

  it('get /devices/{id} gets a single device', async () => {
    const response = await client.devices[':id'].$get({
      param: {
        id: device.id_device,
      },
    })
    expect(response.status).toBe(HttpStatusCodes.OK)
    if (response.status === HttpStatusCodes.OK) {
      const json = await response.json()
      expect(json.id_device).toBe(device.id_device)
      expect(json.id_wc).toBe(device.id_wc)
      expect(json.device_key).toBe(device.device_key)
      expect(json.device_name).toBe(device.device_name)
      expect(json.device_desc).toBe(device.device_desc)
    }
  })

  it('patch /devices/{id} validates the body when updating', async () => {
    const response = await client.devices[':id'].$patch({
      param: {
        id: device.id_device,
      },
      json: {
        // @ts-expect-error
        device_name: 1,
      },
    })
    expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY)
    if (response.status === HttpStatusCodes.UNPROCESSABLE_ENTITY) {
      const json = await response.json()
      expect(json.error.issues[0].path[0]).toBe('device_name')
      expect(json.error.issues[0].code).toBe(ZodIssueCode.invalid_type)
    }
  })

  it('patch /devices/{id} validates the id param', async () => {
    const response = await client.devices[':id'].$patch({
      param: {
        // @ts-expect-error
        id: 'wrong',
      },
    })
    expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY)
    if (response.status === HttpStatusCodes.UNPROCESSABLE_ENTITY) {
      const json = await response.json()
      expect(json.error.issues[0].path[0]).toBe('id')
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER)
    }
  })

  it('patch /devices/{id} validates empty body', async () => {
    const response = await client.devices[':id'].$patch({
      param: {
        id: device.id_device,
      },
      json: {},
    })
    expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY)
    if (response.status === HttpStatusCodes.UNPROCESSABLE_ENTITY) {
      const json = await response.json()
      expect(json.error.issues[0].code).toBe(ZOD_ERROR_CODES.INVALID_UPDATES)
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.NO_UPDATES)
    }
  })

  it('patch /devices/{id} updates a single property of a device', async () => {
    const response = await client.devices[':id'].$patch({
      param: {
        id: device.id_device,
      },
      json: {
        device_name: 'name',
      },
    })
    expect(response.status).toBe(HttpStatusCodes.OK)
    if (response.status === HttpStatusCodes.OK) {
      const json = await response.json()
      expect(json.device_name).toBe('name')
    }
  })

  it('delete /devices/{id} validates the id when deleting', async () => {
    const response = await client.devices[':id'].$delete({
      param: {
        // @ts-expect-error
        id: 'wat',
      },
    })
    expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY)
    if (response.status === HttpStatusCodes.UNPROCESSABLE_ENTITY) {
      const json = await response.json()
      expect(json.error.issues[0].path[0]).toBe('id')
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER)
    }
  })

  it('delete /devices/{id} removes a device', async () => {
    const response = await client.devices[':id'].$delete({
      param: {
        id: device.id_device,
      },
    })
    expect(response.status).toBe(HttpStatusCodes.NO_CONTENT)
  })
})
