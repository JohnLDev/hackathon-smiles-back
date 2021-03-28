'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Challenge extends Model {
  file() {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Challenge
