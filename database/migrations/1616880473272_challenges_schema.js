'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChallengesSchema extends Schema {
  up() {
    this.create('challenges', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('exp_value').notNullable()
      table.string('type').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('challenges')
  }
}

module.exports = ChallengesSchema
