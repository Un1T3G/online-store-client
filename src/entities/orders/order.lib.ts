import { EnumOrderStatus } from 'shared/api'

export const getOrderStatus = (status: EnumOrderStatus) => {
  switch (status) {
    case EnumOrderStatus.PENDING:
      return 'В обработке'
    case EnumOrderStatus.PAYED:
      return 'Выполнен'
    default:
      throw new Error(status)
  }
}
