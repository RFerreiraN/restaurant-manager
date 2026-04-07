export interface Product {
  _id: string;
  nombre: string;
  price: number;
  category: string;
}

export interface Table {
  _id: string;
  number: number;
}

export interface OrderItem {
  product: Product,
  quantity: number,
  _id?: string
}

export interface Order {
  _id: string
  user: string
  items: OrderItem[]
  status: 'pending' | 'preparing' | 'ready' | 'served'
  table: Table
  total: number
  observations?: string
  createdAt?: string
  updatedAt?: string
}