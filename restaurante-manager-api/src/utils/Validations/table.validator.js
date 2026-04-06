import z from 'zod'

const tableSchema = z.object({
  number: z.number().positive(),
  capacity: z.number().positive().min(1),
  status: z.enum(['free', 'occupied', 'reserved', 'disabled']).default('free')
})

export function validateTable(object) {
  return tableSchema.safeParse(object)
}

export function validatePartialTable(object) {
  return tableSchema.partial().safeParse(object)
}
