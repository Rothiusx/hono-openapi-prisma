import type { PinoLogger } from 'hono-pino'

import type { PrismaClient as PrismaClientMes } from '@prisma/generate/client/mes'
import type { PrismaClient as PrismaClientX3 } from '@prisma/generate/client/x3'

declare module 'hono' {
  interface ContextVariableMap {
    logger: PinoLogger
    db: PrismaClientMes
    x3: PrismaClientX3
  }
}

interface User {
  id_user: number
  user_firstname: string
  user_lastname: string
  user_login: string
  user_operator: boolean
  role_assign: {
    user_role: {
      role_name: string
      role_desc: string
      permission_assign: {
        user_permission: {
          permission_name: string
          permission_desc: string
        }
      }[]
    }
  }[]
}
