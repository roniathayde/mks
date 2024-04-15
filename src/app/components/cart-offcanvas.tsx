'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { DialogContext } from '../contexts/dialog-root-context'
import { ProductsContext } from '../contexts/products-context'
import { Item } from './card-item-shopping'

export function CartOffcanvas() {
  const { open } = useContext(DialogContext)
  const { productsCart, setProductsCart } = useContext(ProductsContext)
  const [total, setTotal] = useState<number>(0)

  function handleIncreaseQuantity(item: Item) {
    setProductsCart((prev) => {
      if (item.quantity) {
        const itemsCart = prev.items.map((element) => {
          if (element.id === item.id) {
            toast.success('Quantidade aumentada com sucesso!', {
              description: item.name,
            })

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
  }

  function handleDecrementQuantity(item: Item) {
    setProductsCart((prev) => {
      if (item.quantity) {
        const itemsCart = prev.items.map((element) => {
          if (element.id === item.id) {
            toast.success('Quantidade diminuida com sucesso', {
              description: item.name,
            })
            const newQuantity = element.quantity - 1

            return {
              ...element,
              quantity: newQuantity,
            }
          } else {
            return element
          }
        })

        const itemsCartQuantityGreaterZero = itemsCart.filter(
          (element) => element.quantity > 0,
        )

        return {
          countCart: itemsCartQuantityGreaterZero.length ?? 0,
          items: itemsCartQuantityGreaterZero,
        }
      }

      return { ...prev }
    })

    setTotal((prev) => {
      const newTotal = prev - Number(item.price)
      return newTotal
    })
  }

  function handleRemoveItemCart(item: Item) {
    setProductsCart((prev) => {
      const newListCart = prev.items.filter(
        (itemCartCurrent) => itemCartCurrent.id !== item.id,
      )

      return { countCart: prev.countCart - 1, items: newListCart }
    })
    const qtdItem = item.quantity
    if (qtdItem) {
      // 5000 - 5000
      setTotal((prev) => prev - Number(item.price) * qtdItem)
    }
  }

  useEffect(() => {
    let subtotalPerQuantity: number = 0
    productsCart.items.forEach((el) => {
      subtotalPerQuantity += Number(el.price) * el.quantity
      console.log('aqui: ', subtotalPerQuantity)
      setTotal(subtotalPerQuantity)
    })
  }, [productsCart])

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
              <Dialog.Title className="mb-4 max-w-[180px] text-2xl font-semibold text-white">
                Meu carrinho de compras
              </Dialog.Title>

              <Dialog.Close asChild>
                <button
                  className="group absolute right-12 top-9 rounded-full bg-black p-2 hover:bg-gray-700"
                  aria-label="close"
                >
                  <span className="sr-only">Close modal</span>
                  <X className="text-white transition group-hover:rotate-[90deg]" />
                </button>
              </Dialog.Close>

              <div className=" flex max-h-[60vh] flex-col gap-5 overflow-y-auto overflow-x-hidden p-1">
                {productsCart.items.map((item) => (
                  <div
                    key={item.id}
                    className="gap relative grid grid-cols-4  items-center justify-center rounded-lg bg-white px-2 py-5"
                  >
                    <Image
                      src={item.photo}
                      height={46}
                      width={46}
                      alt="product image"
                      className="size-7"
                    />
                    <button
                      onClick={() => handleRemoveItemCart(item)}
                      className="absolute -right-1 -top-1 rounded-full bg-black p-1 transition-colors hover:bg-gray-700"
                    >
                      <X className="size-3 text-white" />
                    </button>
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
                    <span className="px-0.5 text-center text-base font-bold">
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

                {productsCart.items.length === 0 && (
                  <h3 className="text-2xl font-bold text-white">
                    Carrinho vazio!
                  </h3>
                )}
              </div>

              <footer className="absolute bottom-0 left-0 flex w-full flex-col gap-10">
                <div className="flex w-full justify-between px-12">
                  <span className="text-2xl font-bold text-white">Total:</span>
                  <span className="text-2xl font-bold text-white">{total}</span>
                </div>
                <button className="w-full bg-black py-9 text-lg font-bold text-white">
                  Finalizar compra
                </button>
              </footer>
            </Dialog.Content>
          </motion.div>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  )
}
