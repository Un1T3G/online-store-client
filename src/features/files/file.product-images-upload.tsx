'use client'

import { FileFolderType, useFileUploadMutation } from 'entities/files'
import { Trash, Upload } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { errorCatch } from 'shared/api'
import { Button, LoadingButton } from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  images: string[]
  onChangeImages: (images: string[]) => void
  className?: string
}

export const FileProductImagesUpload = ({
  images,
  onChangeImages,
  className,
}: IProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useFileUploadMutation({
    onSuccess: (data) => {
      setIsLoading(false)
      toast.success('Файл успешно загружен')
      onChangeImages(data.map((x) => x.url))
    },
    onError: (error) => {
      setIsLoading(false)
      toast.error(errorCatch(error))
      console.error(error)
    },
  })

  const handleOnClick = () => {
    ref.current?.click()
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const filesArray = Array.from(files!)

    const formData = new FormData()
    filesArray.forEach((file) => {
      formData.append('files', file)
    })

    setIsLoading(true)
    mutate({
      file: formData,
      folder: FileFolderType.PRODUCT,
    })
  }

  const handleDelete = (index: number) => {
    return () => {
      const newImages = images.filter((_, i) => i !== index)
      onChangeImages(newImages)
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-row flex-wrap gap-2 mb-2">
        {images.map((image, index) => (
          <div
            className="relative w-[180px] h-[180px] rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-700"
            key={index}
          >
            <Image
              src={image}
              alt={`image-${index}`}
              fill
              className="object-cover"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={handleDelete(index)}
            >
              <Trash />
            </Button>
          </div>
        ))}
        <LoadingButton
          loading={isLoading}
          onClick={handleOnClick}
          variant="outline"
          className="w-[180px] h-[180px] flex items-center justify-center"
        >
          <Upload />
          Загрузить
        </LoadingButton>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={handleOnChange}
      />
    </div>
  )
}
