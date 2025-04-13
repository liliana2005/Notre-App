const express = require("express");
const { createProject, getProjects, updateProject, deleteProject } = require("../controllers/projectController");
const validateToken = require('../middleware/validateToken');


const router = express.Router();
router.route("/").post(validateToken, createProject).get(getProjects);
router.route("/:id").put(validateToken, updateProject).delete(validateToken, deleteProject);


module.exports = router;