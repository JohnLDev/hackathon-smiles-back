'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChallengesProgre extends Model {
  reward() {
    return this.belongsTo('App/Models/Reward')
  }
}

module.exports = ChallengesProgre
