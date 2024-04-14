'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useContext } from 'react'
import { toast } from 'sonner'

import { DialogContext } from '../contexts/dialog-root-context'
import { ProductsContext } from '../contexts/products-context'
import { Item } from './card-item-shopping'

export function CartOffcanvas() {
  const { open } = useContext(DialogContext)
  const { productsCart, setProductsCart } = useContext(ProductsContext)

  function handleIncreaseQuantity(item: Item) {
    setProductsCart((prev) => {
      if (item.quantity) {
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
      } else return prev
    })

    toast.success('Adicionado ao carrinho', {
      description: item.name,
    })
  }

  function handleDecrementQuantity(item: Item) {
    setProductsCart((prev) => {
      if (item.quantity) {
        const itemsCart = prev.items.map((element) => {
          if (element.id === item.id) {
            return {
              ...element,
              quantity: element.quantity - 1,
            }
          } else {
            return { ...element }
          }
        })

        return { ...prev, items: itemsCart }
      } else return prev
    })

    toast.success('Adicionado ao carrinho', {
      description: item.name,
    })
  }

  return (
    <AnimatePresence>
      {open?.open && (
        <Dialog.Portal forceMount>
          <motion.div
            className="flex flex-col"
            transition={{ duration: 3, times: [0, 0.2, 1] }}
            initial={{ width: 0 }}
            animate={{
              width: 300,
            }}
          >
            <Dialog.Overlay className="fixed top-0 z-10 min-h-screen min-w-full bg-black/20 " />
            <Dialog.Content className="fixed right-0 top-0 z-20 min-h-screen w-[500px] bg-[#0F52BA] px-12 pt-9">
              <Dialog.Title className="max-w-[180px] text-2xl font-semibold text-white">
                Meu carrinho de compras
              </Dialog.Title>

              <div className="flex flex-col gap-5">
                {productsCart.items.map((item) => (
                  <div
                    key={item.id}
                    className="gap grid grid-cols-4  items-center justify-center rounded-lg bg-white p-5"
                  >
                    <Image
                      src={item.photo}
                      height={46}
                      width={46}
                      alt="product image"
                      className="size-7"
                    />
                    <span> {item.name}</span>
                    <div className="flex flex-col">
                      <span className="text-xs">Qtd.</span>
                      <div className="flex justify-around  rounded border border-[#BFBFBF] p-1">
                        <button
                          onClick={() => handleDecrementQuantity(item)}
                          className="flex  flex-1 items-center justify-center rounded border-r px-1 transition-colors hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="flex flex-1 items-center justify-center px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(item)}
                          className="flex  flex-1 items-center justify-center rounded border-l px-1 transition-colors hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span className="px-2 text-center text-base font-bold">
                      {(Number(item.price) * item.quantity).toLocaleString(
                        'pt-br',
                        {
                          style: 'currency',
                          currency: 'BRL',
                        },
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </Dialog.Content>
          </motion.div>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  )
}
