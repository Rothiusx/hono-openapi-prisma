import { apiReference } from '@scalar/hono-api-reference'

import type { AppOpenAPI } from '@/types/app'

import packageJSON from '../../package.json' with { type: 'json' }

export default function createOpenAPI(app: AppOpenAPI) {
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
