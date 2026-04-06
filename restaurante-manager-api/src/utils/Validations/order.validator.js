import z from 'zod'

const orderSchema = z.object({
  user: z.string().min(1, { message: 'ID user required' }).optional(),
  items: z.array(z.object({ product: z.string().min(1), quantity: z.number().int().positive().min(1) })).min(1),
  status: z.enum(['pending', 'preparing', 'ready', 'delivered', 'cancelled', 'paid']).optional(),
  table: z.string().min(1),
  total: z.number().positive().optional(),
  observations: z.string().optional()
})

export function validateOrder(object) {
  return orderSchema.safeParse(object)
}

const orderWithOutStatusSchema = z.object({
  user: z.string().min(1, { message: 'ID user required' }).optional(),
  items: z.array(z.object({ product: z.string().min(1), quantity: z.number().int().positive().min(1) })).min(1),
  table: z.string().min(1),
  total: z.number().positive().optional(),
  observations: z.string().optional()
})

export function validateWithOutStatus(object) {
  return orderWithOutStatusSchema.partial().safeParse(object)
}

const changeStatusSchema = z.object({
  status: z.enum(['pending', 'preparing', 'ready', 'delivered', 'cancelled', 'paid'])
})

export function validateStatusSchema(object) {
  return changeStatusSchema.safeParse(object)
}
