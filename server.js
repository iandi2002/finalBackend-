const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect("mongodb://localhost:27017/crud");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
}, { 
    versionKey: false
});

const UserModel = mongoose.model("users", UserSchema);

app.get("/", (req, res) => {
    UserModel.find({})
        .then(function(users) {
            let tableHTML = '<table class="styled-table"><tr><th>Name</th><th>Age</th></tr>';
            users.forEach(user => {
                tableHTML += `<tr><td>${user.name}</td><td>${user.age}</td></tr>`;
            });
            tableHTML += '</table>';
            const styledHTML = `
                <html>
                <head>
                    <style>
                    body {
                        background-color: black;
                        color: white;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 100vh;
                        margin-top: 190;
                    }
                    .styled-table {
                        border-collapse: collapse;
                        width: 50%;
                    }
                    .styled-table th, .styled-table td {
                        border: 1px solid white;
                        padding: 8px;
                        text-align: left;
                    }
                    .add-button {
                        margin-top: 20px; /* Расстояние между таблицей и кнопкой */
                        display: flex;
                        justify-content: center;
                    }
                    .add-button a {
                        text-decoration: none;
                    }
                    .add-button button {
                        background-color: black; /* Черный цвет кнопки */
                        color: white; /* Белый цвет текста */
                        border: 1px solid white; /* Белая граница */
                        padding: 10px 20px; /* Внутренние отступы */
                    }
                       
                    </style>
                </head>
                <body>
                    ${tableHTML}
                    <div class="add-button">
                        <a href="/add"><button>Add</button></a>
                    </div>
                </body>
                </html>
            `;
            res.send(styledHTML);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

app.get("/add", (req, res) => {
    const formHTML = `
        <html>
        <head>
            <style>
                body {
                    background-color: black;
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                form {
                    border: 1px solid white;
                    padding: 20px;
                    width: 50%;
                    text-align: center;
                }
                label {
                    display: block;
                    margin-bottom: 10px;
                }
                input[type="text"],
                input[type="number"],
                input[type="submit"] {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <form action="/add" method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name"><br><br>
                <label for="age">Age:</label>
                <input type="number" id="age" name="age"><br><br>
                <input type="submit" value="Submit">
            </form>
        </body>
        </html>
    `;
    res.send(formHTML);
});

app.post("/add", (req, res) => {
    const { name, age } = req.body;

    async function run() {
        try {
            const user = new UserModel({ name, age });
            await user.save();
            console.log("User added successfully");
            res.send('<script>alert("User added successfully"); window.location="/";</script>');
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    }
    run().catch(console.error);
});

app.listen(3001, () => {
    console.log("Server is Running");
});
