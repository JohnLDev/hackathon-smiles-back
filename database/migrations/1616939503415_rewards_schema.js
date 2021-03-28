'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RewardsSchema extends Schema {
  up() {
    this.create('rewards', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('min_level').notNullable().default(5)
      table.integer('exp_price').notNullable()
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('rewards')
  }
}

module.exports = RewardsSchema
