import mongoose from 'mongoose'

export async function connectDb() {
  try {
    await mongoose.connect(process.env.URL_DB)
    console.log('Conectado a base de datos')
  } catch (error) {
    console.log('Error al conectar con la base de datos', error)
    process.exit(1)
  }
}
