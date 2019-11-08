require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Phonebook = require('./models/phonebook');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));

morgan.token('data', function (req, res) { 
    return JSON.stringify(req.body)
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>');
});

app.get('/api/persons', (req, res) => {
    Phonebook.find({}).then(people => {
        res.json(people.map(people => people.toJSON()));
    });
});

app.get('/api/persons/:id', (req, res) => {
    Phonebook.findById(req.params.id).then(person => {
        res.json(person.toJSON());
    });
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name) {
        return res.status(400).json({
            error: 'name missing'
        });
    }

    if(!body.number) {
        return res.status(400).json({
            error: 'number missing'
        });
    }

    const person = new Phonebook({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON());
    });
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.get('/info', (req, res) => {
    const total = persons.length;
    const date = new Date();
    res.send(`<p>Phonebook has info for ${total} people</p><p>${date}</p>`)
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknown endpoint'
    });
};

app.use(unknownEndpoint);

const PORT = `${process.env.PORT}` || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
