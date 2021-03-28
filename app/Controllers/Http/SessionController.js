'use strict'

const User = use('App/Models/User')
const ChallengeProgre = use('App/Models/ChallengesProgre')
class SessionController {
  async store({ request, auth }) {
    const { email } = request.all()
    const token = await auth.attempt(email, 'pass')
    const user = await User.findBy('email', email)
    const selected_reward = await ChallengeProgre.findBy('user_id', user.id)
    if (selected_reward) {
      await selected_reward.load('reward')
    }

    return { user, token, selected_reward }
  }
}

module.exports = SessionController
