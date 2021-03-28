'use strict'

const User = use('App/Models/User')
const Challenge = use('App/Models/Challenge')
const Reward = use('App/Models/Reward')
const ChallengeProgre = use('App/Models/ChallengesProgre')
class UserController {
  async index() {
    return await User.query().with('challengeProgre').fetch()
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

    const selected_reward = await ChallengeProgre.findBy('user_id', user.id)
    if (selected_reward) {
      selected_reward.exp_amount += challenge.exp_value
      await selected_reward.save()
    }

    user.challenges_completed = user.challenges_completed + 1
    user.experience_bar = user.experience_bar + challenge.exp_value

    user.level = Math.floor(user.experience_bar / 300)

    await user.save()
    return user
  }

  async selectReward({ request, response, params }) {
    const { reward_id } = request.all()
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).json({ message: 'user not found' })
    }
    const reward = await Reward.find(reward_id)
    if (!reward) {
      return response.status(404).json({ message: 'reward not found' })
    }
    const selected_reward = await ChallengeProgre.findBy('user_id', user.id)
    if (selected_reward) {
      await selected_reward.delete()
    }
    const selected = await ChallengeProgre.create({
      user_id: user.id,
      reward_id: reward.id,
      exp_amount: 0,
    })
    await selected.load('reward')
    return { user, selected_reward: selected }
  }

  async retriveReward({ request, response, params }) {
    const { selected_id } = request.all()
    const selected = await ChallengeProgre.findBy('id', selected_id)
    if (!selected) {
      return response.status(404).json({ message: 'reward not found' })
    }
    await selected.delete()
    return response.status(200).json({ message: 'reward retrived' })
  }
}

module.exports = UserController
