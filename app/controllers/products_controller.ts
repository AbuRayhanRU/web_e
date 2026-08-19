import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({request,view}: HttpContext) {
    const searchQuery = request.input('search') 
    let query = Product.query()

    if (searchQuery) {
      query = query.where('name', 'like', `%${searchQuery}%`)
                   .orWhere('product_code', 'like', `%${searchQuery}%`)
                   .orWhere('category', 'like', `%${searchQuery}%`)
                   .orWhere('description', 'like', `%${searchQuery}%`)
    }

    const products = await query.orderBy('created_at', 'desc').paginate(1, 10)
    return view.render('pages/products/index',{products, searchQuery})
  }

  /**
   * Display form to create a new record
   */
  async create({view}: HttpContext) {
    return view.render('pages/products/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
     await Product.create({
      name: request.input('name'),
      productCode: request.input('productCode'),
      category: request.input('category'),
      description: request.input('description'),
      price: request.input('price'),
      stockQuantity: request.input('quantity'),
      manufactureYear: request.input('year')
     })
    return response.redirect('products')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return product
  }

  /**
   * Edit individual record
   */
  async edit({ params,view }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return view.render('pages/products/edit', { product })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    product.name = request.input('name')
    product.productCode = request.input('product_code')
    product.category = request.input('category')
    product.description = request.input('description')
    product.price = request.input('price')
    product.stockQuantity = request.input('quantity')
    product.manufactureYear = request.input('year')
    await product.save()
    return response.redirect('/products')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    return response.redirect('/products')
  }
}