import { ProductResponse } from '../products'

export interface AIbotDto {
  message: string
  language?: string
}

export interface AIbotChatResponse {
  title: string
  products: ProductResponse[]
}

export interface AIbotProductAttributeResponse {
  title: string
  value: string
}
