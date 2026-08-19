import CartItems from '@/component/dashboard/CartItems'
import type { ReactElement } from 'react'

const CartItemsComponent = CartItems as unknown as () => ReactElement

function page() {
  return (
    <div>
        <CartItemsComponent />
    </div>
  )
}

export default page