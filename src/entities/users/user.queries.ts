import { useMutation, useQuery } from '@tanstack/react-query'
import {
  UserAddressUpdateDto,
  UserProfileUpdateDto,
  UserResponse,
  userService,
} from 'shared/api'
import { useAppSelector } from 'shared/lib'
import { MutationOptions, QueryOptions } from 'shared/types'

export const userKeys = {
  profile: ['user', 'me'],
  toggleFavorite: ['user', 'toggle-favorite'],
  updateProfile: ['user', 'me', 'update-profile'],
  updateAddress: ['user', 'me', 'update-address'],
}

export const useUserProfileQuery = (options?: QueryOptions<UserResponse>) => {
  const isAuth = useAppSelector((state) => state.sessionReducer.isAuth)

  return useQuery({
    queryKey: [...userKeys.profile, isAuth],
    queryFn: () => userService.getProfile(),
    ...options,
  })
}

export const useUserToggleFavoriteMutation = (
  productId: string,
  options?: MutationOptions<boolean, Error, any>
) => {
  return useMutation({
    mutationKey: [...userKeys.toggleFavorite, productId],
    mutationFn: () => userService.toggleFavorite(productId),
    ...options,
  })
}

export const useUserUpdateProfileMutation = (
  options?: MutationOptions<string, Error, UserProfileUpdateDto>
) => {
  return useMutation({
    mutationKey: userKeys.updateProfile,
    mutationFn: (dto: UserProfileUpdateDto) => userService.updateProfile(dto),
    ...options,
  })
}

export const useUserUpdateAddressMutation = (
  options?: MutationOptions<string, Error, UserAddressUpdateDto>
) => {
  return useMutation({
    mutationKey: userKeys.updateAddress,
    mutationFn: (dto: UserAddressUpdateDto) => userService.updateAddress(dto),
    ...options,
  })
}
