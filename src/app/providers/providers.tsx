'use client'

import { PropsWithChildren } from 'react'
import { Toaster } from 'shared/ui'
import { ReactQueryProvider } from './react-query'
import { ReduxProvider } from './redux'
import { SessionProvider } from './session'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  )
}
