'use client'

import { DialogTrigger } from '@radix-ui/react-dialog'
import { ReviewCreateForm } from 'features/reviews'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle } from 'shared/ui'

interface IProps {
  productId: string
  className?: string
}

export const ReviewCreateModal = ({ productId, className }: IProps) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <Star />
          Оставить отзыв
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogTitle>Отзыв</DialogTitle>
        <ReviewCreateForm productId={productId} onSuccess={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
