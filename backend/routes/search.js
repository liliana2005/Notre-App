const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Organisation = require('../models/Organisation');
const Categorie = require('../models/Categorie');

router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ results: {} });

  const regex = new RegExp(q, 'i'); // insensitive à la casse

  // Liste dynamique avec plusieurs champs de recherche par modèle
  const searchables = [
    { model: Project, fields: ['title', 'description'], name: 'projects' },
    { model: Organisation, fields: ['name', 'description'], name: 'organisations' },
    { model: Categorie, fields: ['name'], name: 'categories' }
  ];

  const results = {};

  try {
    for (const item of searchables) {
      // Création dynamique de la requête avec $or
      const query = {
        $or: item.fields.map(field => ({ [field]: regex }))
      };

      // Recherche dans la collection concernée
      results[item.name] = await item.model.find(query);
    }

    // Envoi de tous les résultats trouvés
    res.json({ results });

  } catch (err) {
    console.error('Erreur de recherche :', err);
    res.status(500).json({ error: 'Erreur serveur 😞' });
  }
});

module.exports = router;
