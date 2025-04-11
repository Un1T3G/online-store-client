import { ProductResponse } from 'shared/api'

export interface CartItem {
  product: ProductResponse
  quantity: number
}

export interface CartSliceState {
  items: CartItem[]
  totalCost: number
}
