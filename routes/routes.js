// routes.js

const express = require('express');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');

// Объявление модели и схемы пользователя
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});


const UserModel = mongoose.model("User", UserSchema);

// Регистрация
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            res.send('User already exists!');
        } else {
            const newUser = new UserModel({ username, password });
            await newUser.save();
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/tours', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'tours.html')); 
  });
  router.get('/contacts', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'contact.html')); 
  });
  
router.route('/travelagency')
.get((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'contact.html'));
})
.post((req, res) => {
  const formData = req.body;
  console.log('Received data from the contact form:', formData);
  res.send('Thank you for submitting the form. We will contact you soon!');
});

  router.post('/search', (req, res) => {
      const searchQuery = req.body.searchQuery.toLowerCase();
      const searchResults = tours.filter(tour => tour.info.toLowerCase().includes(searchQuery));
      res.json(searchResults);
  });
  
  router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'about.html'));
  });
  
// Вход
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username, password });
        if (user) {
            req.session.user = user;
            res.redirect('/home');
        } else {
            res.send('Invalid username or password!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Защищенный маршрут
router.get('/home', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
    } else {
        res.redirect('/login');
    }
});

// Другие маршруты...

module.exports = router;
