'use client'

import { CardItemShopping } from './components/card-item-shopping'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/get-products'
import { CartItemShoppingShimmer } from './components/cart-item-shopping-shimmer'

export default function Home() {
  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      getProducts({
        page: 1,
        rows: 8,
        sortBy: 'id',
        orderBy: 'ASC',
      }),
  })

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start py-28">
        <section className="grid w-full max-w-[1080px]   grid-cols-4 gap-5">
          {products?.products &&
            products?.products.map((cardItem) => (
              <CardItemShopping key={cardItem.id} item={cardItem} />
            ))}

          {loadingProducts &&
            Array.from({ length: 8 }).map(() => {
              return (
                <>
                  <CartItemShoppingShimmer key={new Date().toDateString()} />
                </>
              )
            })}
        </section>
      </main>
    </>
  )
}
