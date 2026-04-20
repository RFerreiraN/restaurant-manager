import { OrderStatus } from 'src/app/core/types/order.status';
import { Role } from '../types/role.order';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  preparing: 'Preparar',
  ready: 'Listo',
  delivered: 'Entregado',
  paid: 'Pagado',
  cancelled: 'Cancelado'
}

export const NEXT_STATUS_BY_ROLE: Record<string, Partial<Record<OrderStatus, OrderStatus | null>>> = {
  kitchen: {
    pending: 'preparing',
    preparing: 'ready',
    ready: null
  },
  waiter: {
    ready: 'delivered',
    delivered: 'paid',
    paid: null
  },
  admin: {}
}

export function getNextStatus(role: Role, status: OrderStatus): OrderStatus | null {
  return NEXT_STATUS_BY_ROLE[role]?.[status] ?? null
}

export function getActionLabel(role: Role, status: OrderStatus): string {
  const next = getNextStatus(role, status)
  if (!next) return ''
  return STATUS_LABELS[next]
}
