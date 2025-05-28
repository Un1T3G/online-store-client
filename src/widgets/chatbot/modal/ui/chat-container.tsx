import { LoaderIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { ProductResponse } from 'shared/api'
import { cn } from 'shared/lib'
import { ScrollArea } from 'shared/ui'
import { ChatItem } from '../chatbot.modal.types'

interface IProps {
  messages: ChatItem[]
  botPending: boolean
  renderProductGrid: (products: ProductResponse[]) => ReactNode
}

export const ChatContainer = ({
  messages,
  botPending,
  renderProductGrid,
}: IProps) => {
  return (
    <ScrollArea className="p-4 bg-slate-100 rounded-lg flex-1 w-full h-[calc(100dvh-2*2rem-2*52px)]">
      <div className="flex flex-col space-y-4">
        {messages.map((item, i) => (
          <ChatMessage
            key={i}
            chatItem={item}
            renderProductGrid={renderProductGrid}
          />
        ))}
        {botPending && (
          <div className="px-4 py-2 rounded-lg bg-slate-200 self-start">
            <LoaderIcon className="animate-spin" />
          </div>
        )}
      </div>
    </ScrollArea>
  )
}

const ChatMessage = ({
  chatItem,
  renderProductGrid,
}: {
  chatItem: ChatItem
  renderProductGrid: (products: ProductResponse[]) => ReactNode
}) => {
  const title =
    typeof chatItem.content === 'string'
      ? chatItem.content
      : chatItem.content.title

  return (
    <div
      className={cn(
        'px-4 py-2 rounded-lg',
        chatItem.isUser
          ? 'bg-blue-500 text-white self-end'
          : 'bg-slate-200 text-black self-start',
        typeof chatItem.content !== 'string' &&
          chatItem.content &&
          chatItem.content.products.length &&
          'w-full'
      )}
    >
      {title}
      {typeof chatItem.content === 'string'
        ? null
        : chatItem.content.products.length > 0 &&
          renderProductGrid(chatItem.content.products)}
    </div>
  )
}
