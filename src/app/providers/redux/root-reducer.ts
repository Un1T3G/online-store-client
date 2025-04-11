import { combineReducers } from '@reduxjs/toolkit'
import { cartReducer } from 'entities/cart'
import { sessionReducer } from 'entities/session'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const rootReducer = combineReducers({
  cartReducer,
  sessionReducer,
})

export const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: storage,
  },
  rootReducer
)
