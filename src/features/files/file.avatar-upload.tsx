'use client'

import { FileFolderType, useFileUploadMutation } from 'entities/files'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { errorCatch } from 'shared/api'
import { cn } from 'shared/lib'
import { Button, Skeleton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  name: string
  src: string
  onChangeSrc: (newSrc: string) => void
  className?: string
}

export const FileAvatarUpload = ({
  name,
  src,
  onChangeSrc,
  className,
}: IProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useFileUploadMutation({
    onSuccess: (data) => {
      setIsLoading(false)
      toast.success('Файл успешно загружен')
      onChangeSrc(data[0].url)
    },
    onError: (error) => {
      setIsLoading(false)
      toast.error(errorCatch(error))
    },
  })

  const handleOnClick = () => {
    ref.current?.click()
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    const formData = new FormData()
    formData.append('files', file)

    setIsLoading(true)
    mutate({
      file: formData,
      folder: FileFolderType.AVATAR,
    })
  }

  return (
    <div className={cn('flex', className)}>
      <div className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-divider mr-2">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Image
            src={Boolean(src) ? src : '/file.svg'}
            alt="image"
            fill
            className="object-cover"
          />
        )}
      </div>
      <Button
        onClick={handleOnClick}
        className="flex-1 h-[80px] flex items-center justify-center"
        size="icon"
        variant="outline"
      >
        <Upload />
        <span>Загрузить</span>
      </Button>
      <input
        ref={ref}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleOnChange}
      />
    </div>
  )
}
