'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useContext } from 'react'

import { ProductsContext } from '@/app/contexts/products-context'

import { CartItemIcon } from './cart-item-icon'

export function Header() {
  const { productsCart } = useContext(ProductsContext)

  return (
    <header className="sticky top-0 z-10 flex justify-between bg-[#0F52BA] px-16 py-7 ">
      <div className="flex items-end gap-1 text-4xl font-semibold text-white">
        MKS
        <span className="text-xl font-light">Sistemas</span>
      </div>

      <Dialog.Trigger asChild>
        <button
          data-testid="cart-button"
          type="button"
          className="flex items-center gap-4 rounded-lg bg-white p-3 transition-colors hover:bg-slate-100"
        >
          <CartItemIcon />
          <span className="text-lg font-bold">
            {productsCart.countCart ?? '0'}
          </span>
        </button>
      </Dialog.Trigger>
    </header>
  )
}
