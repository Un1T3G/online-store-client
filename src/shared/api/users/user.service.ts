import { fetchAuth } from '../fetch'
import {
  UserAddressUpdateDto,
  UserProfileUpdateDto,
  UserResponse,
} from './user.types'

class UserService {
  getProfile(accessToken?: string) {
    return fetchAuth.get<UserResponse>('users/profile', {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    })
  }

  toggleFavorite(productId: string) {
    return fetchAuth.patch<boolean>(`users/profile/favorites/${productId}`, {})
  }

  updateProfile(dto: UserProfileUpdateDto) {
    return fetchAuth.put<string>('users/profile', dto)
  }

  updateAddress(dto: UserAddressUpdateDto) {
    return fetchAuth.put<string>('users/profile/address', dto)
  }
}

export const userService = new UserService()
