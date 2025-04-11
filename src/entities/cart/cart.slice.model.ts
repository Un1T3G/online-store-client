import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProductResponse } from 'shared/api'
import { CartItem, CartSliceState } from './cart.types'

const initialState: CartSliceState = {
  items: [],
  totalCost: 0,
}

const calculateTotalCost = (items: CartItem[]) => {
  return items.reduceRight(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductResponse>) {
      const product = action.payload
      state.items.push({
        product,
        quantity: 1,
      })
      state.totalCost = calculateTotalCost(state.items)
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload
      state.items = state.items.filter((item) => item.product.id !== productId)
      state.totalCost = calculateTotalCost(state.items)
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const itemIndex = action.payload
      state.items[itemIndex].quantity++
      state.totalCost = calculateTotalCost(state.items)
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const itemIndex = action.payload
      state.items[itemIndex].quantity--
      state.totalCost = calculateTotalCost(state.items)
    },
  },
})

export const { reducer: cartReducer, actions: cartActions } = cartSlice
