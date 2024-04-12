'use client'

import { CardItemShopping } from './components/card-item-shopping'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/get-products'

export default function Home() {
  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      getProducts({
        page: 1,
        rows: 8,
        sortBy: 'id',
        orderBy: 'ASC',
      }),
  })

  console.log('result : ', result)

  return (
    <>
      <main className="flex justify-center py-28">
        <section className="grid    grid-cols-4 gap-5">
          {result?.products &&
            result?.products.map((cardItem) => (
              <CardItemShopping key={cardItem.id} item={cardItem} />
            ))}
        </section>
      </main>
    </>
  )
}
