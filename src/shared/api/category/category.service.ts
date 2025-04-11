import { fetchAuth, fetchClassic } from '../fetch'
import { PaginationResult, PaginatorWithSearchTermQuery } from '../query.types'
import { CategoryDto, CategoryResponse } from './category.types'

class CategoryService {
  getAll(query?: PaginatorWithSearchTermQuery) {
    return fetchClassic.get<PaginationResult<CategoryResponse>>('categories', {
      params: query,
    })
  }

  getById(categoryId: string) {
    return fetchClassic.get<CategoryResponse>(`categories/by-id/${categoryId}`)
  }

  create(dto: CategoryDto) {
    return fetchAuth.post<string>('categories', dto)
  }

  update(dto: CategoryDto, categoryId: string) {
    return fetchAuth.put<string>(`categories/${categoryId}`, dto)
  }

  delete(categoryId: string) {
    return fetchAuth.delete<string>(`categories/${categoryId}`)
  }
}

export const categoryService = new CategoryService()
