'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Operation extends Model {
  static get computed() {
    return ['type_name', 'formated_value', 'incoming_total'];
  }

  getTypeName({ type }) {
    switch (type) {
      case 1:
        return 'Dinheiro';
      case 2:
        return 'Cartão de Crédito';
      case 3:
        return 'Cartão de Débito';
      case 4:
        return 'Operacional';
      case 5:
        return 'Mercadoria';
      case 6:
        return 'Funcionário';
      default:
        return 'Inválido';
    }
  }
  getFormatedValue({ value }) {
    return String(`R$ ${value / 1000}`).replace('.', ',');
  }
}

module.exports = Operation;
