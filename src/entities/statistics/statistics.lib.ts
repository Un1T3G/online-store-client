import { Album, DollarSign, FolderKanban, Star } from 'lucide-react'

export const getMainStatisticsData = (name: string) => {
  switch (name) {
    case 'revenue':
      return {
        title: 'Выручка',
        icon: DollarSign,
      }
    case 'products':
      return {
        title: 'Товары',
        icon: FolderKanban,
      }
    case 'categories':
      return {
        title: 'Категории',
        icon: Album,
      }
    case 'average_rating':
      return {
        title: 'Средний рейтинг',
        icon: Star,
      }
    default:
      throw new Error('lol')
  }
}
