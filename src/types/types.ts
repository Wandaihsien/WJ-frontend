export interface Product {
  id: number
  name: string
  price: number
  image: string
}

export interface CartItem {
  id: number
  cartId: string
  productId: number
  quantity: number
  product: Product
}

export interface ShippingInfo {
  recipient: string
  recipientPhone: string
  address: string
}

export interface UserData {
  name: string
  phone: string
}
