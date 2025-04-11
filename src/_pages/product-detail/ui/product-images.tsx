'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from 'shared/lib'

interface IProps {
  images: string[]
}

export const ProductImages = ({ images }: IProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleChange = (index: number) => {
    setSelectedIndex(index)
  }

  return (
    <>
      <div className="relative w-full h-[0px] pb-[100%] rounded-lg overflow-hidden mb-4">
        <Image
          alt={`Изображение_${selectedIndex}`}
          src={images[selectedIndex]}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, i) => (
          <button
            key={i}
            className={cn(
              'relative w-full h-[0px] pb-[100%] rounded-lg overflow-hidden cursor-pointer mb-4 border-2 border-transparent',
              selectedIndex === i && 'border-blue-500'
            )}
            onClick={() => handleChange(i)}
          >
            <Image
              alt={`Изображение_${i}`}
              src={image}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </>
  )
}
