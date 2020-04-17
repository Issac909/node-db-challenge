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

const getProjects= () => {
    return db('projects');
};

const addProject = project => {
    return db('projects')
        .insert(project)
        .then(ids => {
            return findById(ids[0])
        });
};

const getAllResources = () => {
    return db('resources');
}

const addResource = resource => {
    return db('resource').insert(resource);
};

const findById = id => {
    return db('projects').where({ id }).first();
};

const getTasks = id => {
    return db('projects')
        .join('tasks', 'tasks.project_id', 'projects.id')
        .select('tasks.id', 'projects.id', 'projects.name', 'projects.description', 'tasks.notes', 'tasks.completed')
        .where({ 'tasks.project_id': id });
};

const addTask = task => {
    return db('tasks').insert(task);
};