import { fetchAuth, fetchClassic } from '../fetch'
import { PaginationResult, PaginatorWithSearchTermQuery } from '../query.types'
import { ColorDto, ColorResponse } from './color.types'

class ColorService {
  getAll(query?: PaginatorWithSearchTermQuery) {
    return fetchAuth.get<PaginationResult<ColorResponse>>('colors', {
      params: query,
    })
  }

  getById(colorId: string) {
    return fetchClassic.get<ColorResponse>(`colors/by-id/${colorId}`)
  }

  create(dto: ColorDto) {
    return fetchAuth.post<string>('colors', dto)
  }

  update(dto: ColorDto, colorId: string) {
    return fetchAuth.put<string>(`colors/${colorId}`, dto)
  }

  delete(colorId: string) {
    return fetchAuth.delete<string>(`colors/${colorId}`)
  }
}

export const colorService = new ColorService()
