'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Operation = use('App/Models/Operation');

class OperationController {
  async index({ request, response, params }) {
    const { month } = request.all();
    const operations = await Operation.all();
    return {
      operations,
      month
    };
  }

  async store({ request, response, params }) {
    const data = request.only([
      'description',
      'value',
      'date',
      'incoming',
      'type'
    ]);
    let newValue = data.value;
    if (typeof newValue === 'string') {
      newValue = newValue.replace(',', '.');
    }
    newValue = newValue * 1000;
    data.value = newValue;
    const operation = await Operation.create(data);
    return operation;
  }

  async show({ params, request, response, view }) {
    const { id } = params;

    const operation = await Operation.find(id).first();
    return operation;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = OperationController;
