import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { KeyboardEvent, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  InputWithLeadingIcon,
} from 'shared/ui'

export const SearchModal = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLInputElement).value

      if (searchTerm) {
        router.push(`/catalog?searchTerm=${searchTerm}`)
      }

      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full md:w-[300px] h-[36px] cursor-pointer flex items-center justify-between rounded-md border border-gray-200 dark:border-gray-700 pl-4 overflow-hidden">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Поиск товаров
          </span>
          <div className="flex items-center bg-primary text-white px-3 h-full border border-transparent border-l-none">
            <Search />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 border-none">
        <DialogTitle className="hidden">Поиск</DialogTitle>
        <InputWithLeadingIcon
          icon={Search}
          placeholder="Поиск товаров"
          onKeyDown={handleOnKeyDown}
        />
      </DialogContent>
    </Dialog>
  )
}
