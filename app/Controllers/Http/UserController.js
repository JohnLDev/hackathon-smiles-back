'use strict'

const User = use('App/Models/User')
const Challenge = use('App/Models/Challenge')
class UserController {
  async index() {
    return await User.all()
  }

  async store({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    data.password = 'pass'
    try {
      const user = await User.create(data)
      return user
    } catch (error) {
      return response.status(400).json({ message: 'user cannot be created' })
    }
  }

  async destroy({ params, response }) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).json({ message: 'user not found' })
    }
    await user.delete()
    return response.status(200).json({ message: 'success' })
  }

  async completeChallenge({ request, response, params }) {
    const { challenge_id } = request.all()
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).json({ message: 'user not found' })
    }
    const challenge = await Challenge.find(challenge_id)
    if (!challenge) {
      return response.status(404).json({ message: 'challenge not found' })
    }
    console.log(challenge)
    user.challenges_completed = user.challenges_completed + 1
    user.experience_bar = user.experience_bar + challenge.exp_value

    user.level = Math.floor(user.experience_bar / 300)

    await user.save()
    return user
  }
}

module.exports = UserController
