import { CategoryResponse } from '../category'
import { ColorResponse } from '../colors'
import { ReviewResponse } from '../reviews'

export interface ProductResponse {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  attributes: ProductAttribute[]
  category: CategoryResponse
  color: ColorResponse
  reviews: ReviewResponse[]
  createdAt: string
  updatedAt: string
}

export interface ProductAttribute {
  id: string
  title: string
  value: string
}

export interface ProductDto {
  title: string
  description: string
  price: number
  images: string[]
  attributes: Omit<ProductAttribute, 'id'>[]
  categoryId: string
  colorId: string
}
