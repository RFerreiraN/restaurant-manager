export const STATUS_LABELS = {
  preparing: 'Preparar',
  ready: 'Listo',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  paid: 'Pagado',
}

export const NEXT_STATUS = {
  pending: 'preparing',
  preparing: 'ready',
  ready: 'delivered',
  delivered: 'paid',
}