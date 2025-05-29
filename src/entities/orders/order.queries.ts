import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import {
  OrderCreateDto,
  OrderResponse,
  PaginationResult,
  PaginatorQuery,
  PaymentResponse,
  orderService,
} from 'shared/api'
import { MutationOptions } from 'shared/types'

export const orderKeys = {
  orders: ['orders'],
  orderByUser: ['orders', 'by-user'],
  orderCreate: ['orders', 'create'],
}

export const useOrdersQuery = (
  options?: QueryOptions<PaginationResult<OrderResponse>>,
  query?: PaginatorQuery
) => {
  return useQuery({
    queryKey: [...orderKeys.orders, Object.values(query || {})],
    queryFn: () => orderService.getAll(query),
    ...options,
  })
}

export const useOrdersByUserQuery = (
  options?: QueryOptions<OrderResponse[]>
) => {
  return useQuery({
    queryKey: orderKeys.orderByUser,
    queryFn: () => orderService.getByUser(),
    ...options,
  })
}

export const useCreateOrderMutation = (
  options?: MutationOptions<PaymentResponse, Error, OrderCreateDto>
) => {
  return useMutation({
    mutationKey: orderKeys.orderCreate,
    mutationFn: (dto: OrderCreateDto) => orderService.create(dto),
    ...options,
  })
}
