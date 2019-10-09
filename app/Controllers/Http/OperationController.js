'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Operation = use('App/Models/Operation');
/**
 * Resourceful controller for interacting with operations
 */
class OperationController {
  /**
   * Show a list of all operations.
   * GET operations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const operations = await Operation.all();
    return operations;
  }

  /**
   * Create/save a new operation.
   * POST operations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['description', 'value', 'incoming', 'type']);
    data.value = data.value * 1000;
    const operation = await Operation.create(data);
    return operation;
  }

  /**
   * Display a single operation.
   * GET operations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update operation details.
   * PUT or PATCH operations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a operation with id.
   * DELETE operations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = OperationController;
