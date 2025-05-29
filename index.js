const express = require('express');
const {users, cars} = require('./data/data.js')
const app = express();
const PORT = 8888

app.use(express.json());



// Définir une route GET page home
app.get('/', (req, res) => {
  res.send('hello world');
});
// Définir une route GET page users
app.get('/users', (req, res) => {
  res.json(users);
});
// hna kanjib user b id 
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id == id)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404).json({message: "hellao world"})
    }
})
// hna kahsni nposti users jdad
app.post('/users', (req, res) => {
  const { nom, prenom, email, tel } = req.body;

  // Vérification que tous les champs sont présents
  if (!nom || !prenom || !email || !tel) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  // Création de la formation
  const user = {
    id: users.length+1   ,
    nom,
    prenom,
    email,
    tel
  };

  // Ajout dans le tableau
  users.push(user);

  // Réponse avec la formation créée
  res.status(201).json(user);
});

// hna ghn9der nbdel lm3lomat 
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(f => f.id === id);

  // Vérification de l'existence
  if (!user) {
    return res.status(404).json({ error: 'Formation non trouvée.' });
  }

  // Mise à jour des champs si fournis
  const { nom, prenom, email, tel } = req.body;
  if (nom) user.nom = nom;
  if (prenom) user.prenom = prenom;
  if (email) user.email = email;
  if (tel) user.tel = tel;

  res.json(user);
});

// hna n9der nmse7 aya user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(f => f.id === id);

  // Vérification de l'existence
  if (index === -1) {
    return res.status(404).json({ error: 'Formation non trouvée.' });
  }

  // Suppression avec splice
  const [deleted] = users.splice(index, 1);
  res.json({ message: 'Formation supprimée.', formation: deleted });
});


// Définir une route GET page cars 
app.get('/cars', (req, res) => {
  res.json(cars);
});

app.get('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(f => f.id === id);
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: "car non trouvée" });
  }
}); 
// han n9der nposte cars b post
app.post('/cars', (req, res) => {
  const { num, marque, serie, image } = req.body;

  // Vérification que tous les champs sont présents
  if (!num || !marque || !serie || !image) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  // Création de la formation
  const car = {
    id: users.length+1   ,
    num,
    marque,
    serie,
    image
  };

  // Ajout dans le tableau
  cars.push(car);

  // Réponse avec la formation créée
  res.status(201).json(car);
});

// hna ghn9der nbdel lm3lomat 
app.put('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(f => f.id === id);

  // Vérification de l'existence
  if (!car) {
    return res.status(404).json({ error: 'Formation non trouvée.' });
  }

  // Mise à jour des champs si fournis
  const { num, marque, serie, image } = req.body;
  if (num) car.num = num;
  if (marque) car.marque = marque;
  if (serie) car.serie = serie;
  if (image) car.image = image;

  res.json(car);
});
// Définir une route GET page cars 
app.get('/cars', (req, res) => {
  res.json(cars);
});

// hana n9der nmse7 lcar li bghit 
app.delete('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex(f => f.id === id);

  // Vérification de l'existence
  if (index === -1) {
    return res.status(404).json({ error: 'Formation non trouvée.' });
  }

  // Suppression avec splice
  const [deleted] = cars.splice(index, 1);
  res.json({ message: 'voiture supprimée.', formation: deleted });
});


// Démarrer le serveur
app.listen(PORT, () => {
  console.log('Serveur démarré sur http://localhost:8888');
});
