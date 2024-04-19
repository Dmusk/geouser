import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

type UserId = string

export type ExtendedUser = User & {
    id: UserId
    username?: string | null
    bio?: string | null
    profileImage?: string | null
    phone?: string | null
    createdAt: string
    updatedAt: string
    address?: string | null
    latitude?: number | null
    longitude?: number | null
}