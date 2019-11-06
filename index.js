const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

morgan.token('data', function (req, res) { 
    return JSON.stringify(req.body)
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
];

const generateId = () => {
    const newId = Math.floor(Math.random() * Math.floor(1000000));
    const isDuplicate = persons.find(p => p.id === newId);

    if(!isDuplicate) {
        return newId;
    } else {
        generateId();
    }
};

app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>');
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if(person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const checkDuplicate = persons.find(person => person.name === body.name)

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

    if(checkDuplicate) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    }


    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(person);

    res.json(person);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
