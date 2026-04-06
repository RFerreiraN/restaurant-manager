import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String
  },

  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

export const Product = mongoose.model('products', productSchema)
