'use client'

import { useQueryClient } from '@tanstack/react-query'
import { categoryKeys, useCategoryDeleteMutation } from 'entities/category'
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

export const CategoryDeleteButton = ({ id, className }: IProps) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const { mutate, isPending } = useCategoryDeleteMutation(id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.category })
      setOpen(false)
      toast.success('Категория успешно удалена')
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
        <Button size="icon" variant="destructive" className={className}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Вы уверены что хотите удалить категорию?</DialogTitle>
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
