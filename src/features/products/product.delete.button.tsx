'use client'

import { useQueryClient } from '@tanstack/react-query'
import { productKeys, useProductDeleteMutation } from 'entities/products'
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

export const ProductDeleteButton = ({ id, className }: IProps) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const { mutate, isPending } = useProductDeleteMutation(id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.products })
      setOpen(false)
      toast.success('Продукт успешно удален')
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
    mutate(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className={className}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Вы уверены что хотите удалить продукт?</DialogTitle>
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
