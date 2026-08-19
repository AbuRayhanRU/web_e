import factory from '@adonisjs/lucid/factories'
import Product from '#models/product'

export const ProductFactory = factory
  .define(Product, async ({ faker }) => {
    return {
      name:faker.commerce.productName(),
      productCode:faker.string.uuid(),
      category:faker.commerce.department(),
      description:faker.commerce.productDescription(),
      price:parseFloat(faker.commerce.price()),
      stockQuantity:faker.number.int({min:1,max:100}),
      manufactureYear:faker.number.int({min:1900,max:new Date().getFullYear()})
    }
  })
  .build()