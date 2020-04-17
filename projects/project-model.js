const db = require('../data/db-config');

module.exports = {
    getProjects,
    addProject,
    getAllResources,
    addResource,
    findById,
    getTasks,
    addTask
}

function getProjects() {
    return db('projects');
};

function addProject(project) {
    return db('projects')
        .insert(project)
        .then(ids => {
            return findById(ids[0])
        });
};

function getAllResources() {
    return db('resources');
}

function addResource(resource) {
    return db('resources').insert(resource);
};

function findById(id) {
    return db('projects').where({ id }).first();
};

function getTasks(id) {
    return db('projects')
        .join('tasks', 'tasks.project_id', 'projects.id')
        .select('tasks.id', 'projects.id', 'projects.name', 'projects.description', 'tasks.notes', 'tasks.completed')
        .where({ 'tasks.project_id': id });
};

function addTask(task) {
    return db('tasks').insert(task);
};