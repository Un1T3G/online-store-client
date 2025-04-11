'use client'

import { PropsWithChildren, useRef } from 'react'
import { Provider } from 'react-redux'
import { Persistor, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { AppStore, setupStore } from './store'

export const ReduxProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<AppStore>(null)
  const persistorRef = useRef<Persistor>(null)

  if (!storeRef.current) {
    storeRef.current = setupStore()
  }

  if (!persistorRef.current) {
    persistorRef.current = persistStore(storeRef.current)
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  )
}
