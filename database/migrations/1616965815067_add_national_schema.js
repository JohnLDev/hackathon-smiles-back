'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddNationalSchema extends Schema {
  up() {
    this.table('rewards', table => {
      table.boolean('national').default(true)
    })
  }

  down() {
    this.table('rewards', table => {
      table.dropColumn('national')
    })
  }
}

module.exports = AddNationalSchema
