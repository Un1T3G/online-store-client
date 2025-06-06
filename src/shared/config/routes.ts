export const routes = {
  home: '/',
  catalog: '/catalog',
  favorites: '/favorites',
  profile: '/profile',
  orders: '/orders',
  authLogin: '/auth/login',
  authRegister: '/auth/register',
  adminStatistics: '/manage',
  adminProducts: '/manage/products',
  adminProductCreate: '/manage/products/create',
  adminCategories: '/manage/categories',
  adminCategoryCreate: '/manage/categories/create',
  adminColors: '/manage/colors',
  adminColorCreate: '/manage/colors/create',
  adminReviews: '/manage/reviews',
  adminOrders: '/manage/orders',
  productDetail: (id: string) => `/products/${id}`,
  categoryDetail: (id: string) => `/category/${id}`,
  adminColorEdit: (id: string) => `/manage/colors/${id}`,
  adminCategoryEdit: (id: string) => `/manage/categories/${id}`,
  adminProductEdit: (id: string) => `/manage/products/${id}`,
} as const
