
exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema
    .createTable('users', t => {
      t.string('username', 255).notNullable();
      t.string('password', 255).notNullable();
      t.string('email', 255).unique().notNullable();
      t.uuid('_id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('users')
};
