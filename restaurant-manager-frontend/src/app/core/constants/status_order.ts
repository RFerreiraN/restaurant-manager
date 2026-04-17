export interface STATUS_LABELS {
  preparing: 'Preparar',
  ready: 'Lsto',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  paid: 'Pagado',
}

export interface NEXT_STATUS {
  pending: 'preparing',
  preparing: 'ready',
  ready: 'delivered',
  delivered: 'paid',
}