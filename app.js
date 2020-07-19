const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');

const User = require('./models/User');

mongoose.connect('mongodb+srv://salim:tutrouverapa@cluster0.mhffo.mongodb.net/?retryWrites=true&w=majority'
,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));  


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.use(bodyParser.json());

  app.post('/api/auth/signup', (req, res, next) => {
    console.log(req)
    //  bcrypt.hash(req.body.password, 10)
    //    .then(hash => {
    //     const user = new User({
    //       email: req.body.email,
    //       password: hash
    //     });
    //     user.save()
    //       .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    //       .catch(error => res.status(400).json({ error }));
    //   })
    //   .catch(error => res.status(500).json({ error }));
    //   next();
  });

  app.get('/api/sauces', (req, res, next) => {
    const sauces = [
      {
        userId: 'le premier identificateur',
        name: 'le nom de la sauce',
        manufacturer: 'le fabricant de la sauce',
        description: 'Description de la sauce',
        mainPepper: 'string',
        imageUrl: 'l\'url de l\'image de la sauce',
        heat: 20,
        likes: 30,
        dislikes: 45,
        userLikes: ['likes', 'number', 'of', 'likes'],
        userdisLikes: ['likes', 'number', 'of', 'disLikes']
      },
      {
        userId: 'le second identificateur',
        name: 'le nom de la sauce',
        manufacturer: 'le fabricant de la sauce',
        description: 'Description de la sauce',
        mainPepper: 'string',
        imageUrl: 'l\'url de l\'image de la sauce',
        heat: 25,
        likes: 35,
        dislikes: 50,
        userLikes: ['likes', 'number', 'of', 'likes'],
        userDisLikes: ['likes', 'number', 'of', 'disLikes']
      },
    ];
    res.status(201).json(sauces);
    next();
  });


  
module.exports = app;