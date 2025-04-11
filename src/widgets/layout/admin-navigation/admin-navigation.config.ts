import {
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  FolderKanban,
  Layers2,
  Palette,
  Star,
} from 'lucide-react'
import { routes } from 'shared/config'

export const adminNavigationConfig = [
  {
    icon: ChartNoAxesColumnIncreasing,
    title: 'Статистика',
    path: routes.adminStatistics,
  },
  {
    icon: FolderKanban,
    title: 'Товары',
    path: routes.adminProducts,
  },
  {
    icon: Layers2,
    title: 'Категории',
    path: routes.adminCategories,
  },
  {
    icon: Palette,
    title: 'Цвета',
    path: routes.adminColors,
  },
  {
    icon: Star,
    title: 'Отзывы',
    path: routes.adminReviews,
  },
  {
    icon: CircleDollarSign,
    title: 'Заказы',
    path: routes.adminOrders,
  },
]
