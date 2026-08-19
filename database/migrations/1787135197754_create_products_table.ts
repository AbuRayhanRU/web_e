import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',255).notNullable()
      table.string('product_code',50).notNullable().unique()
      table.string('category',100).nullable()
      table.string('description')
      table.decimal('price').checkPositive()
      table.integer('stock_quantity').defaultTo(0).checkPositive()
      table.integer('manufacture_year').checkBetween([1900,new Date().getFullYear()])



      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}