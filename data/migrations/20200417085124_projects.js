exports.up = function (knex) {
  return knex.schema
  .createTable('projects', (project) => {
      project.increments();
      project.text('name', 128).notNullable();
      project.text('description');
      project.boolean('completed').defaultTo(false);
  })
  .createTable('resources', resource => {
      resource.increments();
      resource.string('name', 128).notNullable().unique();
      resource.text('description');   
  })
  .createTable('tasks', task => {
      task.increments().unique();
      task.string('description', 128).notNullable()
      task.text('notes');
      task.boolean('completed').defaultTo(false);
      task
        .integer('project_id').notNullable()
        .references('id').inTable('projects')
        .onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('project-resources', tbl => {
      tbl
        .integer('project_id').notNullable()
        .inTable('projects').references('id')
        .onDelete('CASCADE').onUpdate('CASCADE');
      tbl
        .integer('resource_id').notNullable()
        .references('id').inTable('resources')
        .onDelete('CASCADE').onUpdate('CASCADE');
      tbl
        .primary(['project_id', 'resource_id']);
  });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('project-resources')
        .dropTableIfExists('projects')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
};
