import { Product } from '../Models/product.model.js'

export class ProductRepository {
  static async createProduct(data) {
    return await Product.create(data)
  }

  static async getAllProducts() {
    return await Product.find()
  }

  static async getAvailableProducts() {
    return await Product.find({ available: true })
  }

  static async getProductById(id) {
    return await Product.findById(id)
  }

  static async updateProduct(id, updatingProduct) {
    return await Product.findByIdAndUpdate(id, updatingProduct, { new: true })
  }

  static async disableProduct(id) {
    return await Product.findByIdAndUpdate(
      id,
      { available: false },
      { new: true }
    )
  }

  static async updateAvailability(id, available) {
    return await Product.findByIdAndUpdate(id, { available }, { new: true })
  }
}
