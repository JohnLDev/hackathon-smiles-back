'use strict'

const User = use('App/Models/User')
class SessionController {
  async store({ request, auth }) {
    const { email } = request.all()
    const token = await auth.attempt(email, 'pass')
    const user = await User.findBy('email', email)

    return { user, token }
  }
}

module.exports = SessionController
