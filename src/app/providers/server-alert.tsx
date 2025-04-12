import { PropsWithChildren, useEffect } from 'react'
import { IS_CLIENT } from 'shared/config'
import { sleep } from 'shared/lib'
import { toast } from 'sonner'

const DELAY = 1000
const MESSAGES = [
  'Сервер работает на карточке 🥔',
  'Возможно всё будет работать медленно 😕',
]

export const ServerAlert = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (IS_CLIENT) {
      timeoutId = setTimeout(async () => {
        for (const message of MESSAGES) {
          timeoutId = setTimeout(() => toast(message), DELAY)
          await sleep(DELAY)
        }
      }, DELAY)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return children
}
