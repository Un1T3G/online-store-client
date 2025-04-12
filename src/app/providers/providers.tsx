'use client'

import { PropsWithChildren } from 'react'
import { Toaster } from 'shared/ui'
import { ReactQueryProvider } from './react-query'
import { ReduxProvider } from './redux'
import { ServerAlert } from './server-alert'
import { SessionProvider } from './session'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <SessionProvider>
          <ServerAlert>{children}</ServerAlert>
          <Toaster />
        </SessionProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  )
}
