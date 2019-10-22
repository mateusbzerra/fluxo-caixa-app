'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Operation = use('App/Models/Operation');

class OperationController {
  async index({ request, response, params }) {
    const query = request.all();
    let month = Number(new Date().getMonth() + 1);
    if (query.month) {
      month = Number(query.month);
    }
    const operations = await Operation.query()
      .whereRaw('EXTRACT(MONTH FROM date) = ?', [month])
      .fetch();
    const [{ incoming }] = await Operation.query()
      .whereRaw('EXTRACT(MONTH FROM date) = ?', [month])
      .andWhere({ incoming: true })
      .sum('value as incoming');
    const [{ outcoming }] = await Operation.query()
      .whereRaw('EXTRACT(MONTH FROM date) = ?', [month])
      .andWhere({ incoming: false })
      .sum('value as outcoming');

    return {
      operations,
      month,
      balance: {
        incoming: Number(incoming),
        outcoming: Number(outcoming)
      }
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
