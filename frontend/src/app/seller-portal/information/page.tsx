import SellerLanding from '@/component/seller/SellerLanding'
import type { ComponentType } from 'react'

const SellerLandingComponent = SellerLanding as unknown as ComponentType

function page() {
  return (
    <div>
        <SellerLandingComponent />
    </div>
  )
}

export default page