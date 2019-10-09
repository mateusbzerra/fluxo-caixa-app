'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OperationSchema extends Schema {
  up() {
    this.create('operations', table => {
      table.increments();
      table.string('description', 255).notNullable();
      table.integer('value').notNullable();
      table.boolean('incoming').defaultTo(false);
      table.integer('type').notNullable(); // cartao, dinheiro | operacional, mercadoria, funcionario
      table.timestamps();
    });
  }

  down() {
    this.drop('operations');
  }
}

module.exports = OperationSchema;
