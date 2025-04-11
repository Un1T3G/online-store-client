import { fetchAuth } from '../fetch'
import { PaginationResult, PaginatorQuery } from '../query.types'
import { OrderCreateDto, OrderResponse } from './order.types'

class OrderService {
  getAll(query?: PaginatorQuery) {
    return fetchAuth.get<PaginationResult<OrderResponse>>('orders', {
      params: query,
    })
  }

  getByUser() {
    return fetchAuth.get<OrderResponse[]>('orders/by-user')
  }

  create(dto: OrderCreateDto) {
    return fetchAuth.post<OrderResponse>('orders/place', dto)
  }
}

export const orderService = new OrderService()
