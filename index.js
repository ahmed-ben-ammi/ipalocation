const express = require('express');
const { users, cars } = require('./data/data.js');
const app = express();
const PORT = 8888;
const path = require('path');
const multer = require('multer');

// pour lee les dossier
app.use('/images', express.static(path.join(__dirname, 'pubic/images')));
app.use('/pubic/images', express.static('pubic/images'));
app.use(express.static(path.join(__dirname, 'pubic')));
app.use(express.json());

//  multer pour enregistrer imag
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'pubic/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 } //max: 2MB
});

// page HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pubic', 'index.html'));
});

app.get('/car1', (req, res) => {
  res.sendFile(path.join(__dirname, 'pubic', 'car1.html'));
});

app.get('/novellecar', (req, res) => {
  res.sendFile(path.join(__dirname, 'pubic', 'novellecar.html'));
});

// ------------------ USERS ------------------

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

// ------------------ CARS ------------------

app.get('/cars', (req, res) => res.json(cars));

app.get('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(c => c.id === id);
  if (car) res.json(car);
  else res.status(404).json({ message: "Voiture non trouvée." });
});

app.post('/cars', upload.single('imag'), (req, res) => {
  const { num, marque, serie } = req.body;

  if (!num || !marque || !serie || !req.file) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  const car = {
    id: cars.length + 1,
    num,
    marque,
    serie,
    image: req.file.filename
  };

  cars.push(car);
  res.status(201).json(car);
});

// server demaree
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé : http://localhost:${PORT}`);
});
