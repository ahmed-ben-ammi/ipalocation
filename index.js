const express = require('express');
const { users, cars } = require('./data/data.js');
const app = express();
const PORT = 8888;
const path = require('path');
const multer = require('multer');

app.use(express.static(path.join(__dirname, 'pubic')));
app.use(express.json());

// config Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/emage/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ 
    storage: storage ,
    limits: { fileSize: 2 * 1024 * 1024 } // Limite: 2MB
 })









// Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pubic', 'index.html'));
});

// Page pour afficher une voiture
app.get('/car1', (req, res) => {
  res.sendFile(path.join(__dirname, 'pubic', 'car1.html'));
});

// Page pour ajouter une nouvelle voiture
app.get('/novellecar', (req, res) => {
  res.sendFile(path.join(__dirname, 'pubic', 'novellecar.html'));
});

// CRUD USERS
app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) res.json(user);
  else res.status(404).json({ message: "User non trouvé." });
});

app.post('/users', (req, res) => {
  const { nom, prenom, email, tel } = req.body;
  if (!nom || !prenom || !email || !tel)
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });

  const user = { id: users.length + 1, nom, prenom, email, tel };
  users.push(user);
  res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User non trouvé." });

  const { nom, prenom, email, tel } = req.body;
  if (nom) user.nom = nom;
  if (prenom) user.prenom = prenom;
  if (email) user.email = email;
  if (tel) user.tel = tel;

  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User non trouvé." });

  const [deleted] = users.splice(index, 1);
  res.json({ message: "User supprimé.", user: deleted });
});

// CRUD CARS
app.get('/cars', (req, res) => res.json(cars));

app.get('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(c => c.id === id);
  if (car) res.json(car);
  else res.status(404).json({ message: "Voiture non trouvée." });
});

// app.post('/cars', (req, res) => {
//   const { num, marque, serie, image } = req.body;
//   if (!num || !marque || !serie || !image)
//     return res.status(400).json({ error: "Tous les champs sont obligatoires." });

//   const car = { id: cars.length + 1, num, marque, serie, image };
//   cars.push(car);
//   res.status(201).json(car);
// });






app.post('cars', upload.single('img'), (req, res) => {
  if (!num || !marque || !serie || !image) {
    return res.status(400).json({ error: "tous les chomps sont obligatoires."});
}

  const car = {
      id: cars.length + 1,
      // slug: req.body.title.toLowerCase().replace(/\s+/g, '-'),
num,
 marque,
  serie,  
  image: req.file.filename ,

};

  cars.push(car);
  res.status(201).json(newFormation);
});











































app.put('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(c => c.id === id);
  if (!car) return res.status(404).json({ error: "Voiture non trouvée." });

  const { num, marque, serie, image } = req.body;
  if (num) car.num = num;
  if (marque) car.marque = marque;
  if (serie) car.serie = serie;
  if (image) car.image = image;

  res.json(car);
});

app.delete('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Voiture non trouvée." });

  const [deleted] = cars.splice(index, 1);
  res.json({ message: "Voiture supprimée.", car: deleted });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
