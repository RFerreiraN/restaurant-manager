import bcrypt from 'bcrypt'

const SALTS_ROUNDS = 10

export async function hashPassword(password) {
  return await bcrypt.hash(password, SALTS_ROUNDS)
}

export async function comparePassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword)
}
