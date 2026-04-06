export interface OrderItem {
  product: string,
  quantity: number,
  _id?: string
}

export interface Order {
  _id: string
  user: string
  items: OrderItem[]
  status: 'pending' | 'preparing' | 'ready' | 'served'
  table: string
  total: number
  observations?: string
  createdAt?: string
  updatedAt?: string
}