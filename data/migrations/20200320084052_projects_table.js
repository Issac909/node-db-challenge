
exports.up = function(knex) {
    return knex.schema
      .createTable("projects", project => {
        project.increments();
        project.string("project_name", 128).notNullable();
        project.text("project_desc");
        project.boolean("project_completed").defaultTo(false)
      })
      .createTable("resources", resource => {
        resource.increments();
        resource.string("resource_name", 128).notNullable().unique();
        resource.text("resource_desc");
      })
      .createTable("tasks", task => {
        task.increments();
        task.string("task_desc", 128).notNullable()
        task.text("task_notes")
        task.boolean("task_completed").defaultTo(false)
        task
          .integer("project_id")
          .notNullable()
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      .createTable("proj-resources", proj => {
        proj
        .integer("project_id")
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        proj
        .integer("resource_id")
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        proj.primary(['project_id', 'resource_id'])
      } )
  };
  
  exports.down = function(knex) {
    return (
      knex.schema
        .dropTableIfExists("proj-resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects")
    )
  };
