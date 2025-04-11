import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CategoryDto,
  CategoryResponse,
  PaginationResult,
  PaginatorWithSearchTermQuery,
  categoryService,
} from 'shared/api'
import { MutationOptions, QueryOptions } from 'shared/types'

export const categoryKeys = {
  category: ['category'],
  categoryCreate: ['category', 'create'],
  categoryUpdate: ['category', 'update'],
  categoryDelete: ['category', 'delete'],
}

export const useCategoryQuery = (
  options?: QueryOptions<PaginationResult<CategoryResponse>>,
  query?: PaginatorWithSearchTermQuery
) => {
  return useQuery({
    queryKey: [...categoryKeys.category, Object.values(query || {})],
    queryFn: () => categoryService.getAll(query),
    ...options,
  })
}

export const useCategoryCreateMutation = (
  options?: MutationOptions<string, Error, CategoryDto>
) => {
  return useMutation({
    mutationKey: categoryKeys.categoryCreate,
    mutationFn: (dto: CategoryDto) => categoryService.create(dto),
    ...options,
  })
}

export const useCategoryUpdateMutation = (
  id: string,
  options?: MutationOptions<string, Error, CategoryDto>
) => {
  return useMutation({
    mutationKey: categoryKeys.categoryUpdate,
    mutationFn: (dto: CategoryDto) => categoryService.update(dto, id),
    ...options,
  })
}

export const useCategoryDeleteMutation = (
  id: string,
  options?: MutationOptions<string, Error, any>
) => {
  return useMutation({
    mutationKey: categoryKeys.categoryDelete,
    mutationFn: () => categoryService.delete(id),
    ...options,
  })
}
