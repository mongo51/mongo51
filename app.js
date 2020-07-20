const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Sauces = require('./models/Sauce');
const mongooseUniqueValidator = require('mongoose-unique-validator');


mongoose.connect('mongodb+srv://salim:tutrouverapa@cluster0.mhffo.mongodb.net/piquante?retryWrites=true&w=majority'
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
    console.log(req.body)
     bcrypt.hash(req.body.password, 10)
       .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        console.log(user);
        user.save()
          .then(() => res.status(201).json({user}))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    
  });

app.post('/api/auth/login', (req, res, next) => {
  User.findOne({email: req.body.email})
  .then(user =>{
    if(!user){
      return res.status(401).json({message: "Utilisateur inexistant !"});
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if(!valid){
        return res.status(401).json({message: 'Mot de passe incorrect !'})
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          {userId: user._id},
          'RANDOM_TOKEN_SECRET',
          {expiresIn: '24h'}
        )
      })
    })
    .catch(error => res.status(500).json({error}))
  })
  .catch(error => res.status(500).json({error}))
 
})

app.post('/api/sauces', (req, res, next) => {
  const sauce = new Sauces({...req.body})
  console.log(sauce);
  sauce.save()
  .then(()=> res.status(201).json({message : 'Nouvel sauce ajoutée !'}))
  .catch(error => res.status(400).json({error}));
})


  // app.get('/api/sauces', (req, res, next) => {
  //   res.status(200).json();
  // });

  // app.get('/api/sauces/:id'), (req, res, next) =>{
  //   Sauces.findOne({ _id: req.params.id})
  //   .then(sauce => res.status(200).json(sauce))
  //   .catch(error => res.status(400).json({error}));
  // }
  
module.exports = app;