'use strict';
const User = use('App/Models/User');

class AuthController {
  async signup({ request, reponse }) {
    const data = request.only(['name', 'cpf', 'password']);
    const user = await User.create(data);

    return user;
  }
  async login({ request, reponse, auth }) {
    const data = request.only(['cpf', 'password']);
    const authUser = await auth.attempt(data.cpf, data.password);

    return authUser;
  }
}

module.exports = AuthController;
