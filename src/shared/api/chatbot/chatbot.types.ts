import { ProductResponse } from '../products'

export interface ChatbotDto {
  message: string
  language?: string
}

export interface ChatbotResponse {
  title: string
  products: ProductResponse[]
}
