export interface UserAddress {
  city: string
  address: string
  state: string
  zipCode: string
}

export type UserRole = 'ADMIN' | 'USER'

export interface UserResponse {
  id: string
  name: string
  avatarUrl: string
  email: string
  address: UserAddress | null
  authByOAuth: boolean
  role: UserRole
}

export interface UserProfileUpdateDto {
  name?: string
  avatarUrl?: string
}

export interface UserAddressUpdateDto {
  city: string
  address: string
  state: string
  zipCode: string
}
