const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

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

// _____________________  OFFRES  _____________________________

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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour insérer une nouvelle offre dans la base de données
app.post('/AddOffre', async (req, res) => {
  console.log(req.body);
 
  const { titre, duree, description, tarifs, location,contact,  remarque } = req.body;
  try {
    const query = 'INSERT INTO offres (titre, duree, description, tarifs, location, contact, remarque) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [titre, duree, description, tarifs, location, contact, remarque];
    await pool.query(query, values);

    console.log('Nouvelle offre insérée avec succès');
    res.status(200).send('Nouvelle offre insérée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'insertion de l\'offre :', error);
    res.status(500).send('Erreur lors de l\'insertion de l\'offre');
  }
});



// Définition de la route DELETE /deloffre/:id pour supprimer une offre par son ID
app.delete('/deloffre/:id', async (req, res) => {
  const offreId = req.params.id;

  try {
    // Exécutez une requête SQL pour supprimer l'offre avec l'ID spécifié
    const result = await pool.query('DELETE FROM offres WHERE id = $1', [offreId]);
    
    // Vérifiez si une ligne a été supprimée
    if (result.rowCount === 1) {
      res.status(200).json({ message: 'L\'offre a été supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Aucune offre avec cet ID n\'a été trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'offre :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'offre' });
  }
});

// _____________________  CONTACT  _____________________________

app.post('/contact', async (req, res) => {
  console.log(req.body);
 
  const { nom , numTel , email , object , message } = req.body;
  try {
    const query = 'INSERT INTO contact (Nom , NumTel , Email , Object , Message ) VALUES ($1, $2, $3, $4, $5)';
    const values = [nom , numTel , email , object , message];
    await pool.query(query, values);

    console.log('Nouvelle contact insérée avec succès');
    res.status(200).send('Nouvelle contact insérée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'insertion du contact :', error);
    res.status(500).send('Erreur lors de l\'insertion du contact');
  }
});

// _____________________  Admin  _____________________________
app.get('/admin', async (req, res) => {
  try {
    // Exécutez une requête SQL pour sélectionner toutes les offres
    const { rows } = await pool.query('SELECT * FROM tassadmin;');
    res.json(rows); 
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des données' });
  }
});


// Démarrage du serveur
app.listen(port, () => {
  console.log(`App écoute sur le port ${port}`);
});