const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configuration de la connexion à la base de données
const pool = new Pool({
  user: 'koyeb-adm',
  host: 'ep-rapid-mud-a2jsn9m8.eu-central-1.pg.koyeb.app',
  database: 'koyebdb',
  password: 'ENnY1QXI9cmr',
  port: 5432, // Port par défaut de PostgreSQL
  ssl: { rejectUnauthorized: false }
});
app.get('/', (req, res) => {
  res.json({
    Title: 'Tasakorra',
    Description: 'This is an API for Tasakorra',
    Date: Date.now(),
  })
})
// Définition de la route /offre pour récupérer les données de la table "offres"
app.get('/offre', async (req, res) => {
  try {
    // Exécutez une requête SQL pour sélectionner toutes les offres
    const { rows } = await pool.query('SELECT * FROM offres;');
    res.json(rows); // Envoyer les données récupérées en tant que réponse JSON
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`App écoute sur le port ${port}`);
});
