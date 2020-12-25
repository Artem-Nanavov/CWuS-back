
exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema
    .createTable('messages', t => {
      t.string('username', 255).notNullable();
      t.string('text', 5000).notNullable();
      t.string('owner_id', 255).notNullable();
      t.timestamp('date').notNullable();
      t.uuid('msg_id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('messages')
};
