import type { MiddlewareHandler } from 'hono'

import { bearerAuth } from 'hono/bearer-auth'
import { HTTPException } from 'hono/http-exception'
import * as HttpStatusCodes from 'stoker/http-status-codes'

import type { User } from '@/types/app'

// Auth configuration
const AUTH_CONFIG = {
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  TOKEN_MIN_LENGTH: 32, // Minimum token length for security
}

// Custom error for auth failures
export class AuthenticationError extends HTTPException {
  constructor(message: string) {
    super(HttpStatusCodes.UNAUTHORIZED, { message })
  }
}

// Token validation helper
function validateToken(token: string): boolean {
  return token.length >= AUTH_CONFIG.TOKEN_MIN_LENGTH
}

// Verify if token is not expired (assuming token contains timestamp)
// eslint-disable-next-line unused-imports/no-unused-vars
function isTokenExpired(user: { created_at?: Date }): boolean {
  if (!user.created_at)
    return false
  const tokenAge = Date.now() - user.created_at.getTime()
  return tokenAge > AUTH_CONFIG.TOKEN_EXPIRY
}

export interface AuthContext {
  Variables: {
    user: User
  }
}

export function authMiddleware(): MiddlewareHandler<AuthContext> {
  return bearerAuth({
    verifyToken: async (token, c) => {
      try {
        if (!validateToken(token)) {
          throw new AuthenticationError('Invalid token format')
        }

        const user = await c.var.db.user_user.findFirst({
          where: {
            user_token: token,
            user_inactive: false,
          },
          select: {
            id_user: true,
            user_firstname: true,
            user_lastname: true,
            user_login: true,
            user_operator: true,
            role_assign: {
              select: {
                user_role: {
                  select: {
                    role_name: true,
                    role_desc: true,
                    permission_assign: {
                      select: {
                        user_permission: {
                          select: {
                            permission_name: true,
                            permission_desc: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })

        if (!user || !user) {
          throw new AuthenticationError('Invalid user or token')
        }

        c.set<string>('user', user)

        return true
      }
      catch (error) {
        if (error instanceof AuthenticationError) {
          throw error
        }
        throw new AuthenticationError('Authentication failed')
      }
    },
  })
}
