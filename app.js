const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Autoriser toutes les origines (à adapter en fonction de vos besoins)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Autoriser les méthodes HTTP
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Autoriser certains en-têtes
  next();
});

// Configuration de la connexion à la base de données
const pool = new Pool({
  user: 'koyeb-adm',
  host: 'ep-rapid-mud-a2jsn9m8.eu-central-1.pg.koyeb.app',
  database: 'koyebdb',
  password: 'ENnY1QXI9cmr',
  port: 5432, // Port par défaut de PostgreSQL
  ssl: { rejectUnauthorized: false }
});


// Définition de la route / pour récupérer les données de la table "offres"
app.get('/', (req, res) => {
  res.json({
    Title: 'Tasakorra',
    Description: 'This is an API for Tasakorra    test',
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


app.get('/insert', async (req, res) => {
  try {
    // Exécutez une requête SQL pour sélectionner toutes les offres
    // const { rows } = await pool.query('SELECT * FROM offres;');
    const {rows} = await pool.query("INSERT INTO offres (titre, duree, description, tarifs, location, contact, remarque)  VALUES   ('Offre 1', '1 mois', 'Description de l offre 1', 100.00, 'Paris', 'contact@exemple.com', 'Remarque pour l offre 1');");

    res.json(rows); // Envoyer les données récupérées en tant que réponse JSON
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
});



// Route pour supprimer une offre par son ID
app.get('/offers/:id', (req, res) => {
  const { id } = req.params;
  // Supprimer l'offre correspondante de votre source de données (base de données, tableau, etc.)
  // Remplacer cette partie avec la logique spécifique de votre application
  // Exemple: database.deleteOffer(id);
  console.log(`Offre supprimée avec l'ID ${id}`);
  res.status(200).send('Offre supprimée avec succès');
});


// Démarrage du serveur
app.listen(port, () => {
  console.log(`App écoute sur le port ${port}`);
});