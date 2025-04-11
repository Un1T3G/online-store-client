import { useMutation, useQuery } from '@tanstack/react-query'
import {
  ColorDto,
  ColorResponse,
  PaginationResult,
  PaginatorWithSearchTermQuery,
  colorService,
} from 'shared/api'
import { MutationOptions, QueryOptions } from 'shared/types'

export const colorKeys = {
  colors: ['colors'],
  colorCreate: ['colors', 'create'],
  colorUpdate: ['colors', 'update'],
  colorDelete: ['colors', 'delete'],
}

export const useColorsQuery = (
  options?: QueryOptions<PaginationResult<ColorResponse>>,
  query?: PaginatorWithSearchTermQuery
) => {
  return useQuery({
    queryKey: [...colorKeys.colors, Object.values(query || {})],
    queryFn: () => colorService.getAll(query),
    ...options,
  })
}

export const useColorCreateMutation = (
  options?: MutationOptions<string, Error, ColorDto>
) => {
  return useMutation({
    mutationKey: colorKeys.colorCreate,
    mutationFn: (dto: ColorDto) => colorService.create(dto),
    ...options,
  })
}

export const useColorUpdateMutation = (
  id: string,
  options?: MutationOptions<string, Error, ColorDto>
) => {
  return useMutation({
    mutationKey: colorKeys.colorUpdate,
    mutationFn: (dto: ColorDto) => colorService.update(dto, id),
    ...options,
  })
}

export const useColorDeleteMutation = (
  id: string,
  options?: MutationOptions<string, Error, any>
) => {
  return useMutation({
    mutationKey: colorKeys.colorDelete,
    mutationFn: () => colorService.delete(id),
    ...options,
  })
}
