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
