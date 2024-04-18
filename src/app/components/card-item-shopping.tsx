'use client'

import Image from 'next/image'
import { useContext } from 'react'
import { toast } from 'sonner'

import { ProductsContext } from '../contexts/products-context'
import { CartShoppingIcon } from './cart-shopping-icon'

export interface CardItemShoppingProps {
  item: {
    brand: string
    createdAt: string
    description: string
    id: number
    photo: string
    name: string
    price: string
    updatedAt: string
  }
}

export interface Item {
  brand: string
  createdAt: string
  description: string
  id: number
  photo: string
  name: string
  price: string
  updatedAt: string
  quantity?: number
}

export function CardItemShopping({ item }: CardItemShoppingProps) {
  const { setProductsCart } = useContext(ProductsContext)

  function handleAddItemOnCart(item: Item) {
    setProductsCart((prev) => {
      if (prev.items.some((element) => element.id === item.id)) {
        toast.error(`Produto ${item.name} já existe no carrinho`, {
          description: 'Quantidade do produto aumentada!',
        })

        const itemsCart = prev.items.map((element) => {
          if (element.id === item.id) {
            return {
              ...element,
              quantity: element.quantity + 1,
            }
          } else {
            return { ...element }
          }
        })

        return { ...prev, items: itemsCart }
      } else {
        const itemsCart = [...prev.items, { ...item, quantity: 1 }]

        const countCartAfterAppend = itemsCart.length

        return { ...prev, countCart: countCartAfterAppend, items: itemsCart }
      }
    })

    toast.success('Adicionado ao carrinho', {
      description: item.name,
    })
  }
  return (
    <div className="flex flex-col  items-center overflow-hidden rounded-lg pt-5 shadow-[0px_2px_8px_0px_rgb(0_0_0_/_13%)] ">
      <Image
        width={128}
        height={128}
        src={item.photo}
        className="h-auto w-auto"
        alt="imagem do relógio de cria"
      />

      <div className="flex flex-col px-4 py-3">
        <div className="flex w-full items-start justify-between gap-2 ">
          <h2 className="max-w-[106px] text-base font-medium text-[#2C2C2C]">
            {item.brand}
            <br />
            <span data-testid="product-name">{item.name}</span>
          </h2>
          <div className="flex items-center rounded-md bg-[#373737] px-2 py-1">
            <span
              data-testid="product-price"
              className="text-base font-bold text-white"
            >
              {Number(item.price).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </div>
        <span
          data-testid="product-description"
          className=" max-w-48  text-xs font-light text-[#2C2C2C]"
        >
          {item.description}
        </span>
      </div>

      <button
        type="button"
        data-testid="product-button"
        onClick={() => handleAddItemOnCart(item)}
        className="mt-auto  flex w-full items-center justify-center gap-4 bg-[#0F52BA] p-2 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#0F52BA]/90"
      >
        <CartShoppingIcon /> Comprar
      </button>
    </div>
  )
}
