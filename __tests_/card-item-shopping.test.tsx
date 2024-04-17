import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toaster } from 'sonner'

import { Header } from '@/app/_layouts/header'
import { CardItemShopping } from '@/app/components/card-item-shopping'
import { CartOffcanvas } from '@/app/components/cart-offcanvas'
import { DialogContextProvider } from '@/app/contexts/dialog-root-context'
import { ProductsContextProvider } from '@/app/contexts/products-context'

describe('<CardItemShopping />', () => {
  it('should render the card-item-shopping with all your elements', async () => {
    const { findByTestId } = render(
      <CardItemShopping
        item={{
          brand: 'Apple',
          createdAt: '01/01/1969',
          description: 'Ótimos vídeos',
          id: 1,
          photo:
            'https://mks-sistemas.nyc3.digitaloceanspaces.com/products/airpods.webp',
          name: 'Iphone 11 128 GB',
          price: '5000.00',
          updatedAt: '08/05/2002',
        }}
      />,
    )

    const productName = await findByTestId('product-name')
    const productPrice = await findByTestId('product-price')
    const productDescription = await findByTestId('product-description')
    const productButton = await findByTestId('product-button')

    expect(productName).toBeInTheDocument()
    expect(productPrice).toBeInTheDocument()
    expect(productDescription).toBeInTheDocument()
    expect(productButton).toBeInTheDocument()
  })

  it('should a toast element on page', async () => {
    const { findByTestId } = render(
      <CardItemShopping
        item={{
          brand: 'Apple',
          createdAt: '01/01/1969',
          description: 'Ótimos vídeos',
          id: 1,
          photo:
            'https://mks-sistemas.nyc3.digitaloceanspaces.com/products/airpods.webp',
          name: 'Iphone 11 128 GB',
          price: '5000.00',
          updatedAt: '08/05/2002',
        }}
      />,
    )

    const { findByText } = render(<Toaster />)

    const productButton = await findByTestId('product-button')

    userEvent.click(productButton)

    expect(await findByText('Iphone 11 128 GB')).toBeInTheDocument()
  })

  it('should a new item on cart', async () => {
    const { findByTestId } = render(
      <CardItemShopping
        item={{
          brand: 'Apple',
          createdAt: '01/01/1969',
          description: 'Ótimos vídeos',
          id: 1,
          photo:
            'https://mks-sistemas.nyc3.digitaloceanspaces.com/products/airpods.webp',
          name: 'Iphone 11 128 GB',
          price: '5000.00',
          updatedAt: '08/05/2002',
        }}
      />,
    )

    const { findByText } = render(
      <ProductsContextProvider>
        <DialogContextProvider>
          <Header />
        </DialogContextProvider>
      </ProductsContextProvider>,
    )

    const productButton = await findByTestId('product-button')

    userEvent.click(productButton)

    expect(await findByText('0')).toBeInTheDocument()
  })
})

describe('product in cart', () => {
  it('should a new product in cart', async () => {
    const { findByTestId: findByTestIdCartItem } = render(
      <CardItemShopping
        item={{
          brand: 'Apple',
          createdAt: '01/01/1969',
          description: 'Ótimos vídeos',
          id: 1,
          photo:
            'https://mks-sistemas.nyc3.digitaloceanspaces.com/products/airpods.webp',
          name: 'Iphone 11 128 GB',
          price: '5000.00',
          updatedAt: '08/05/2002',
        }}
      />,
    )

    const { findByTestId: findByTestIdHeader } = render(
      <ProductsContextProvider>
        <DialogContextProvider>
          <Header />
        </DialogContextProvider>
      </ProductsContextProvider>,
    )

    const { findByText } = render(
      <ProductsContextProvider>
        <DialogContextProvider>
          <CartOffcanvas />
        </DialogContextProvider>
      </ProductsContextProvider>,
    )

    const productButton = await findByTestIdCartItem('product-button')

    userEvent.click(productButton)

    const cartButton = await findByTestIdHeader('cart-button')

    userEvent.click(cartButton)

    // expect(await findByText('Finalizar compra')).toBeInTheDocument()
  })
})
