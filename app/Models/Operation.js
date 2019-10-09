'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Operation extends Model {
  static get computed() {
    return ['type_name', 'formated_value'];
  }

  getTypeName({ type }) {
    switch (type) {
      case 1:
        return 'cartão de crédito';
      case 2:
        return 'cartão de débito';
      case 3:
        return 'operacional';
      case 4:
        return 'mercadoria';
      case 5:
        return 'funcionario';
      default:
        return 'inválido';
    }
  }
  getFormatedValue({ value }) {
    return String(`R$ ${value / 1000}`).replace('.', ',');
  }
}

module.exports = Operation;
