import { CartItemIcon } from './cart-item-icon'

export function Header() {
  return (
    <header className=" flex justify-between px-16 py-7 bg-[#0F52BA] ">
      <div className="flex items-end gap-1 text-white text-4xl font-semibold">
        MKS
        <span className="text-xl font-light">Sistemas</span>
      </div>

      <button
        type="button"
        className="rounded-lg gap-4 flex items-center hover:bg-slate-100 transition-colors bg-white p-3"
      >
        <CartItemIcon />
        <span className="text-lg font-bold">0</span>
      </button>
    </header>
  )
}
