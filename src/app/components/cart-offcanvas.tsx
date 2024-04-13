import * as Dialog from '@radix-ui/react-dialog'

export function CartOffcanvas() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed top-0 z-10 min-h-screen min-w-full bg-black/20 " />
      <Dialog.Content className="fixed right-0 top-0 z-20 min-h-screen w-[500px] bg-[#0F52BA] px-12 pt-9">
        <Dialog.Title>
          <h2 className="text-white">Meu carrinho de compras</h2>
        </Dialog.Title>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
