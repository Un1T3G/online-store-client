'use client'

import { AIbotChatForm } from 'features/ai-bot'
import { X } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { AIbotChatResponse, ProductResponse, errorCatch } from 'shared/api'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from 'shared/ui'
import { useChatbot } from '../ai-bot.chat-modal.model'
import { ChatContainer } from './chat-container'

interface IProps {
  open: boolean
  onOpenChange: (value: boolean) => void
  renderProductGrid: (products: ProductResponse[]) => ReactNode
}

export const AIbotChatModal = ({
  open,
  onOpenChange,
  renderProductGrid,
}: IProps) => {
  const [botPending, setBotPending] = useState(false)
  const { messages, addMessage } = useChatbot()

  const handleOnError = (error: any) => {
    setBotPending(false)
    addMessage({ isUser: false, content: errorCatch(error) })
  }

  const handleUserSendMessage = (message: string) => {
    addMessage({ isUser: true, content: message })
    setBotPending(true)
  }

  const handleSuccessResponse = (response: AIbotChatResponse) => {
    setBotPending(false)
    addMessage({ isUser: false, content: response })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100vh-2rem)] sm:h-auto sm:max-w-4xl w-full flex flex-col overflow-y-hidden">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle>Чат бот</DialogTitle>
          <DialogClose asChild>
            <Button size="icon" variant="ghost">
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>
        <ScrollArea className="flex-1 bg-slate-100 rounded-lg h-[500px]">
          <ChatContainer
            messages={messages}
            botPending={botPending}
            renderProductGrid={renderProductGrid}
          />
        </ScrollArea>
        <DialogFooter>
          <AIbotChatForm
            onError={handleOnError}
            onSendMessage={handleUserSendMessage}
            onSuccessResponse={handleSuccessResponse}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
