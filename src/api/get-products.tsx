import { api } from '@/assets/lib/axios'
export interface Products {
  products: {
    id: number
    name: string
    brand: string
    description: string
    photo: string
    price: string
    createdAt: string
    updatedAt: string
  }[]
  count: number
}

interface GetProductsProps {
  page: number
  rows: number
  sortBy: string
  orderBy: 'ASC' | 'DESC'
}
export async function getProducts({
  page,
  rows,
  sortBy,
  orderBy,
}: GetProductsProps) {
  const response = await api.get<Products>('/', {
    params: {
      page,
      rows,
      sortBy,
      orderBy,
    },
  })

  return response.data
}
