'use strict'

const User = use('App/Models/User')
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
}

module.exports = UserController
