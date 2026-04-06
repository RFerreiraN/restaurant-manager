import { ProductService } from '../Service/product.service.js'
import { validatePartialProduct, validateProduct } from '../utils/Validations/product.validator.js'

export class ProductController {
  static async createProduct(req, res) {
    const results = validateProduct(req.body)
    if (results.error) {
      return res.status(400).json({ error: results.error.message })
    }

    try {
      const newProduct = await ProductService.createProduct(results.data)
      return res.status(201).json(newProduct)
    } catch (error) {
      return res.status(500).json({ message: 'Error Server' })
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts()
      return res.status(200).json(products)
    } catch (error) {
      return res.status(500).json({ message: 'Error Servering' })
    }
  }

  static async getAvailableProducts(req, res) {
    try {
      const products = await ProductService.getAvailableProducts()
      return res.status(200).json(products)
    } catch (error) {
      return res.status(404).json({ message: 'Products not found' })
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params
    try {
      const product = await ProductService.getProductById(id)
      return res.status(200).json(product)
    } catch (error) {
      return res.status(500).json({ message: 'Error Server' })
    }
  }

  static async updateProduct(req, res) {
    const results = validatePartialProduct(req.body)
    if (!results.success) {
      return res.status(400).json({ message: results.error.message })
    }

    const { id } = req.params
    try {
      const product = await ProductService.updateProduct(id, results.data)
      return res.status(200).json(product)
    } catch (error) {
      return res.status(404).json({ message: 'Product not found' })
    }
  }

  static async disableProduct(req, res) {
    const { id } = req.params
    try {
      const product = await ProductService.disableProduct(id)
      return res.status(200).json(product)
    } catch (error) {
      return res.status(500).json({ message: 'Error Server' })
    }
  }

  static async updateAvailability(req, res) {
    const { id } = req.params
    const { available } = req.body

    if (typeof available !== 'boolean') {
      return res.status(400).json({ message: 'Available Invalid' })
    }

    try {
      const product = await ProductService.updateAvailability(id, available)
      return res.status(200).json(product)
    } catch (error) {
      return res.status(404).json({ message: 'Product not found' })
    }
  }
}
