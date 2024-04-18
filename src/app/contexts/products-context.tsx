'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'

import { Item } from '../components/card-item-shopping'

interface ItemCart extends Item {
  quantity: number
}

interface ProductsCart {
  items: ItemCart[]
  countCart: number
}

const initialProductsCart: ProductsCart = {
  items: [],
  countCart: 0,
}

type ContextType = {
  productsCart: ProductsCart
  setProductsCart: Dispatch<SetStateAction<ProductsCart>>
}

export const ProductsContext = createContext<ContextType>({
  productsCart: initialProductsCart,
  setProductsCart: () => {},
})

interface ProductsContextProviderProps {
  children: React.ReactNode
}

export function ProductsContextProvider({
  children,
}: ProductsContextProviderProps) {
  const [productsCart, setProductsCart] =
    useState<ProductsCart>(initialProductsCart)

  return (
    <ProductsContext.Provider value={{ productsCart, setProductsCart }}>
      {children}
    </ProductsContext.Provider>
  )
}
