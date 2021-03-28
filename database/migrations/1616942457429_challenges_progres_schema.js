'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChallengesProgresSchema extends Schema {
  up() {
    this.create('challenges_progres', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('reward_id')
        .unsigned()
        .references('id')
        .inTable('rewards')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('exp_amount')
      table.timestamps()
    })
  }

  down() {
    this.drop('challenges_progres')
  }
}

module.exports = ChallengesProgresSchema
