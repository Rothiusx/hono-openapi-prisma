import type { OpenAPIHono } from '@hono/zod-openapi'

import { apiReference } from '@scalar/hono-api-reference'

import packageJSON from '../../package.json' with { type: 'json' }

export default function createOpenAPI(app: OpenAPIHono) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Devices API',
    },
  })
  app.get(
    '/reference',
    apiReference({
      theme: 'kepler',
      layout: 'classic',
      darkMode: true,
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      spec: {
        url: '/doc',
      },
    }),
  )
}
