'use client'

import { useQueryClient } from '@tanstack/react-query'
import {
  reviewKeys,
  useReviewDeleteMutation,
} from 'entities/reviews/review.queries'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { errorCatch } from 'shared/api'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  LoadingButton,
} from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  id: string
  className?: string
}

export const ReviewDeleteButton = ({ id, className }: IProps) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const { mutate, isPending } = useReviewDeleteMutation(id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.reviews })
      setOpen(false)
      toast.success('Отзыв успешно удалена')
    },
    onError: (error) => {
      setOpen(false)
      toast.error(errorCatch(error))
    },
  })

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    mutate(id)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="destructive" className={className}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Вы уверены что хотите удалить отзыв?</DialogTitle>
        <DialogFooter>
          <Button onClick={handleClose}>Закрыть</Button>
          <LoadingButton
            loading={isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            Удалить
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
