import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  role: {
    type: String,
    enum: ['waiter', 'admin', 'kitchen'],
    default: 'waiter'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

export const User = mongoose.model('user', UserSchema)
