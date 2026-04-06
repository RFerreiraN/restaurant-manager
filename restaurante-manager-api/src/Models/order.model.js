import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],

  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled', 'paid'],
    default: 'pending'
  },

  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'table',
    required: true
  },

  total: {
    type: Number,
    required: true
  },

  observations: {
    type: String
  }

}, { timestamps: true })

export const Order = mongoose.model('orders', orderSchema)
