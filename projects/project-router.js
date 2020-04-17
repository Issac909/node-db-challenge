const express = require("express");

const db = require("./project-model");

const router = express.Router();

router.get("/", (req, res) => {
  db.getProjects()
    .then((projects) => {
      projects.map((project) => {
        project.completed = project.completed === true;
      });
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: 'ERROR processing your GET request', errorMessage: err.message });
    });
});

router.get("/:id/tasks", (req, res) => {
  db.getTasks(req.params.id)
    .then((tasks) => {
      tasks.map((task) => {
        task.completed = task.completed === true;
      });
      res.status(200).json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ message: 'ERROR processing your GET request', errorMessage: err.message });
    });
});

router.get("/resources", (req, res) => {
  db.getAllResources()
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch((err) => {
      res.status(500).json({ message: 'ERROR processing your GET request', errorMessage: err.message });
    });
});

router.post("/", (req, res) => {
  const project = req.body;
  db.addProject(project)
    .then(() => {
      db.getProjects()
        .then((projects) => {
          projects.map((project) => {
            project.completed = project.completed === true;
          });
          res.status(200).json(projects);
        })
        .catch((err) => {
          res.status(500).json({ message: 'ERROR processing your POST request', errorMessage: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'ERROR processing your POST request', errorMessage: err.message });
    });
});

router.post("/:id/tasks", (req, res) => {
  const task = req.body;
  task.project_id = req.params.id;
  db.addTask(task)
    .then(() => {
      db.getTasks(req.params.id)
        .then((tasks) => {
          tasks.map((task) => {
            task.completed = task.completed === true;
          });
          res.status(200).json(tasks);
        })
        .catch((err) => {
          res.status(500).json({ message: 'ERROR processing your POST request', errorMessage: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'ERROR processing your POST request', errorMessage: err.message });
    });
});

router.post("/resources", (req, res) => {
  const resource = req.body;
  db.addResource(resource)
    .then(() => {
      db.getAllResources()
        .then((resources) => {
          res.status(200).json(resources);
        })
        .catch((err) => {
          res.status(500).json({ message: 'ERROR processing your POST request', errorMessage: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'ERROR processing your POST request', errorMessage: err.message });
    });
});

module.exports = router;
