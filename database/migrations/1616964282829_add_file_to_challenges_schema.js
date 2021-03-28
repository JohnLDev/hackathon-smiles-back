'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFileToChallengesSchema extends Schema {
  up() {
    this.table('challenges', table => {
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down() {
    this.table('challenges', table => {
      table.dropForeign('file_id')
      table.dropColumn('file_id')
    })
  }
}

module.exports = AddFileToChallengesSchema
