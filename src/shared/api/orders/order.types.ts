import { UserResponse } from '../users'

export interface OrderResponse {
  id: string
  total: number
  status: EnumOrderStatus
  createdAt: string
}

export interface OrderResponseWithUser extends OrderResponse {
  user: UserResponse
}

export interface PaymentResponse {
  id: string
  confirmation: {
    confirmation_url: string
  }
}

export interface OrderCreateDto {
  items: OrderItem[]
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
}

export enum EnumOrderStatus {
  PENDING = 'PENDING',
  PAYED = 'PAYED',
}
