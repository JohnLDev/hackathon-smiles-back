'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with challenges
 */

const Challenge = use('App/Models/Challenge')
class ChallengeController {
  /**
   * Show a list of all challenges.
   * GET challenges
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return await Challenge.all()
  }

  /**
   * Render a form to be used for creating a new challenge.
   * GET challenges/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new challenge.
   * POST challenges
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['name', 'description', 'exp_value', 'type'])

    const challenge = await Challenge.create(data)
    return challenge
  }

  /**
   * Display a single challenge.
   * GET challenges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing challenge.
   * GET challenges/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update challenge details.
   * PUT or PATCH challenges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a challenge with id.
   * DELETE challenges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const challenge = await Challenge.find(params.id)
    if (!challenge) {
      return response.status(404).json({ message: 'challenge not found' })
    }
    await challenge.delete()
    return response.status(200).json({ message: 'success' })
  }
}

module.exports = ChallengeController
