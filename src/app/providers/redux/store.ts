import { configureStore } from '@reduxjs/toolkit'
import { persistedReducer } from './root-reducer'

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export type RootState = ReturnType<typeof persistedReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
