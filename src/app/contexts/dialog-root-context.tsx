'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface InitialDialogTypes {
  open?: boolean
}

const initialDialog: InitialDialogTypes = {
  open: false,
}

type ContextType = {
  open: InitialDialogTypes
  setOpen: Dispatch<SetStateAction<InitialDialogTypes>>
}

export const DialogContext = createContext<ContextType>({
  open: initialDialog,
  setOpen: () => {},
})

interface DialogContextProviderProps {
  children: React.ReactNode
}

export function DialogContextProvider({
  children,
}: DialogContextProviderProps) {
  const [open, setOpen] = useState<InitialDialogTypes>(initialDialog)

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <Dialog.Root open={open?.open} onOpenChange={(open) => setOpen({ open })}>
        {children}
      </Dialog.Root>
    </DialogContext.Provider>
  )
}
