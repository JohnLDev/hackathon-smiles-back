'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Reward = use('App/Models/Reward')
const FileHandler = require('../../utils/UploadHandler')
/**
 * Resourceful controller for interacting with rewards
 */
class RewardController {
  /**
   * Show a list of all rewards.
   * GET rewards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return await Reward.query().with('file').fetch()
  }

  /**
   * Render a form to be used for creating a new reward.
   * GET rewards/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new reward.
   * POST rewards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['name', 'description', 'exp_price', 'min_level'])
    const file = await FileHandler(request.file('file'))
    data.file_id = file.id
    const reward = await Reward.create(data)
    return reward
  }

  /**
   * Display a single reward.
   * GET rewards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing reward.
   * GET rewards/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update reward details.
   * PUT or PATCH rewards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a reward with id.
   * DELETE rewards/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const reward = await Reward.find(params.id)
    if (!reward) {
      return response.status(404).json({ message: 'reward not found' })
    }
    await reward.delete()
    return response.status(200).json({ message: 'success' })
  }
}

module.exports = RewardController
