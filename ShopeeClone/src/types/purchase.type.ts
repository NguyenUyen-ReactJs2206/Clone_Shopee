import { Product } from './product.type'

export type purchasesStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = purchasesStatus | 0

export interface Purchase {
  product: Product
  buy_count: number
  price: number
  price_before_discount: number
  status: purchasesStatus
  _id: string
  user: string
  createdAt: string
  updatedAt: string
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}
