import z from 'zod'

const registerSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'waiter', 'kitchen']),
  isActive: z.boolean().default(true)
})

export function validateAuthRegister(object) {
  return registerSchema.safeParse(object)
}

export function validatePartialUser(object) {
  return registerSchema.partial().safeParse(object)
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export function validateAuthLogin(object) {
  return loginSchema.safeParse(object)
}
