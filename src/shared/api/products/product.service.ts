import { fetchAuth, fetchClassic } from '../fetch'
import {
  PaginationResult,
  PaginatorQuery,
  PaginatorWithSearchTermQuery,
} from '../query.types'
import { ProductDto, ProductResponse } from './product.types'

class ProductService {
  getAll(query?: PaginatorWithSearchTermQuery) {
    return fetchClassic.get<PaginationResult<ProductResponse>>('products', {
      params: query,
    })
  }

  getById(id: string) {
    return fetchClassic.get<ProductResponse>(`products/by-id/${id}`)
  }

  getByCategory(categoryId: string, query?: PaginatorQuery) {
    return fetchClassic.get<PaginationResult<ProductResponse>>(
      `products/by-category/${categoryId}`,
      { params: query }
    )
  }

  getMostPopular(query?: PaginatorQuery) {
    return fetchClassic.get<PaginationResult<ProductResponse>>(
      'products/most-popular',
      {
        params: query,
      }
    )
  }

  getSimilar(productId: string, query?: PaginatorQuery) {
    return fetchClassic.get<PaginationResult<ProductResponse>>(
      `products/similar/${productId}`,
      { params: query }
    )
  }

  getFavorites(query?: PaginatorQuery, accessToken?: string) {
    return fetchAuth.get<PaginationResult<ProductResponse>>(
      'products/favorites',
      {
        params: query,
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      }
    )
  }

  create(dto: ProductDto) {
    return fetchAuth.post<string>('products', dto)
  }

  update(dto: ProductDto, productId: string) {
    return fetchAuth.put<string>(`products/${productId}`, dto)
  }

  delete(productId: string) {
    return fetchAuth.delete<string>(`products/${productId}`)
  }
}

export const productService = new ProductService()
