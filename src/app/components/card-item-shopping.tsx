import Image from 'next/image'
import { CartShoppingIcon } from './cart-shopping-icon'
import { toast } from 'sonner'

interface CardItemShoppingProps {
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

interface Item {
  brand: string
  createdAt: string
  description: string
  id: number
  photo: string
  name: string
  price: string
  updatedAt: string
}

export function CardItemShopping({ item }: CardItemShoppingProps) {
  function handleAddItemOnCart(item: Item) {
    toast.success('Adicionado ao carrinho', {
      description: item.name,
    })
  }

  return (
    <div className="flex flex-col  items-center overflow-hidden rounded-lg pt-5 shadow-[0px_2px_8px_0px_rgb(0_0_0_/_13%)] ">
      <Image
        width={111}
        height={138}
        src={item.photo}
        alt="imagem do relógio de cria"
      />

      <div className="flex flex-col px-4 py-3">
        <div className="flex w-full items-start justify-between gap-2 ">
          <h2 className="max-w-[106px] text-base font-medium text-[#2C2C2C]">
            {item.brand}
            <br />
            {item.name}
          </h2>
          <div className="flex items-center rounded-md bg-[#373737] px-2 py-1">
            <span className="text-base font-bold text-white">
              {Number(item.price).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </div>
        <span className=" max-w-48  text-xs font-light text-[#2C2C2C]">
          {item.description}
        </span>
      </div>
      <button
        onClick={() => handleAddItemOnCart(item)}
        className="mt-auto flex w-full items-center justify-center gap-4 bg-[#0F52BA] p-2 text-sm font-semibold uppercase text-white"
      >
        <CartShoppingIcon /> Comprar
      </button>
    </div>
  )
}
