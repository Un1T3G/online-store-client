'use client'

import { CirclePlus, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { routes } from 'shared/config'
import { Button, InputWithLeadingIcon } from 'shared/ui'
import { ColorDataTable } from 'widgets/color'

export const ManageColorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Цветы</h1>
        <Button asChild>
          <Link href={routes.adminColorCreate}>
            <CirclePlus />
            Создать
          </Link>
        </Button>
      </div>
      <InputWithLeadingIcon
        icon={Search}
        placeholder="Поиск по названию"
        className="w-full md:w-xl"
        value={searchTerm}
        onChange={handleOnChange}
      />
      <ColorDataTable searchTerm={searchTerm} />
    </div>
  )
}
