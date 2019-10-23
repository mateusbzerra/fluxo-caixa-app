'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Config = use('Config');

class Auth2 {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const keys = Config.get('keys');
    if (request.header('apikey')) {
      const apikey = request.header('apikey');
      const validated = keys.find(key => key === apikey);
      if (validated) {
        return await next();
      }
      return response.status(401).json({ error: 'Invalid Api Key' });
    } else {
      return response.status(401).json({ error: 'Invalid Api Key' });
    }
  }
}

module.exports = Auth2;
