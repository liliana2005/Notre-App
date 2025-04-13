const Project = require("../models/Project");
const asyncHandler = require("express-async-handler");

// @desc Créer un projet
// @route POST /api/projects
// @access Private (Seuls les utilisateurs connectés)
const createProject = asyncHandler(async (req, res) => {
  const { title, description, fundingGoal, category, imageUrl } = req.body;

  if (!title || !description || !fundingGoal || !category) {
    res.status(400);
    throw new Error("Tous les champs requis ne sont pas remplis.");
  }

  const project = new Project({
    title,
    description,
    fundingGoal,
    category,
    imageUrl,
    user: req.user._id,  // L'utilisateur connecté
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc Récupérer tous les projets approuvés
// @route GET /api/projects
// @access Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ status: "approved" });
  res.json(projects);
});

// @desc Modifier un projet (seulement par le créateur ou un admin)
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
  const { title, description, fundingGoal, category, imageUrl } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Projet non trouvé.");
  }

  // Vérifier si l'utilisateur est le créateur ou un admin
  if (project.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error("Vous n'avez pas la permission de modifier ce projet.");
  }

  project.title = title || project.title;
  project.description = description || project.description;
  project.fundingGoal = fundingGoal || project.fundingGoal;
  project.category = category || project.category;
  project.imageUrl = imageUrl || project.imageUrl;

  const updatedProject = await project.save();
  res.json(updatedProject);
});

// @desc Supprimer un projet
// @route DELETE /api/projects/:id
// @access Private (Créateur ou Admin)
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Projet non trouvé.");
  }

  if (project.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error("Vous n'avez pas la permission de supprimer ce projet.");
  }

  await project.deleteOne();
  res.json({ message: "Projet supprimé avec succès." });
});



module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
};

console.log("createProject:", createProject); // Devrait afficher [Function: createProject]
console.log("getProjects:", getProjects); 