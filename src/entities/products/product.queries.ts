import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import {
  PaginationResult,
  PaginatorWithSearchTermQuery,
  ProductDto,
  ProductResponse,
  productService,
} from 'shared/api'
import { MutationOptions } from 'shared/types'

export const productKeys = {
  products: ['products'],
  favoriteProducts: ['products', 'favorites'],
  productCreate: ['products', 'create'],
  productUpdate: ['products', 'update'],
  productDelete: ['products', 'delete'],
}

export const useProductsQuery = (
  options?: QueryOptions<PaginationResult<ProductResponse>>,
  query?: PaginatorWithSearchTermQuery
) => {
  return useQuery({
    queryKey: [...productKeys.products, Object.values(query || {})],
    queryFn: () => productService.getAll(query),
    ...options,
  })
}

export const useProductsByCategoryQuery = (
  id: string,
  options?: QueryOptions<PaginationResult<ProductResponse>>,
  query?: PaginatorWithSearchTermQuery
) => {
  return useQuery({
    queryKey: [...productKeys.products, id, Object.values(query || {})],
    queryFn: () => productService.getByCategory(id, query),
    ...options,
  })
}

export const useFavoriteProductsQuery = (
  options?: QueryOptions<PaginationResult<ProductResponse>>,
  query?: PaginatorWithSearchTermQuery
) => {
  return useQuery({
    queryKey: [...productKeys.favoriteProducts, Object.values(query || {})],
    queryFn: () => productService.getFavorites(query),
    ...options,
  })
}

export const useProductCreateMutation = (
  options?: MutationOptions<string, Error, ProductDto>
) => {
  return useMutation({
    mutationKey: productKeys.productCreate,
    mutationFn: (dto: ProductDto) => productService.create(dto),
    ...options,
  })
}

export const useProductUpdateMutation = (
  id: string,
  options?: MutationOptions<string, Error, ProductDto>
) => {
  return useMutation({
    mutationKey: productKeys.productUpdate,
    mutationFn: (dto: ProductDto) => productService.update(dto, id),
    ...options,
  })
}

export const useProductDeleteMutation = (
  id: string,
  options?: MutationOptions<string, Error, any>
) => {
  return useMutation({
    mutationKey: productKeys.productDelete,
    mutationFn: () => productService.delete(id),
    ...options,
  })
}
