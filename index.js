// index.js

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes');

const app = express();
const port = 3000;

// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/final");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});

// Использование сессий
app.use(session({
    secret: 'secret', // Здесь может быть любая строка для подписи cookie сеанса
    resave: true,
    saveUninitialized: true
}));

// Парсинг тела запроса
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Использование статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Использование маршрутов из файла routes
app.use('/', routes);

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
