'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getProducts } from '@/api/get-products'

import { CardItemShopping } from './components/card-item-shopping'
import { CartItemShoppingShimmer } from './components/cart-item-shopping-shimmer'
import { CartOffcanvas } from './components/cart-offcanvas'
import { FilterSearch } from './components/filter-search'

export default function Home() {
  const [sortBy, setSortBy] = useState<'id' | 'name' | 'price'>('id')
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('ASC')

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['orders', sortBy, orderBy],
    queryFn: () =>
      getProducts({
        page: 1,
        rows: 8,
        sortBy,
        orderBy,
      }),
    staleTime: Infinity,
  })

  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-start px-4 py-28">
        <FilterSearch setSortBy={setSortBy} setOrderBy={setOrderBy} />
        <section className="flex w-full max-w-[280px] flex-col items-stretch gap-5  lg:grid lg:max-w-[1080px] lg:grid-cols-4">
          {products?.products &&
            products?.products.map((cardItem) => (
              <CardItemShopping key={cardItem.id} item={cardItem} />
            ))}

          {loadingProducts && <CartItemShoppingShimmer />}
        </section>

        <CartOffcanvas />
      </main>
    </>
  )
}
