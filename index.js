require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Phonebook = require('./models/phonebook');

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

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

app.get('/api/persons/:id', (req, res, next) => {
    Phonebook.findById(req.params.id)
        .then(person => {
            if(person) {
                res.json(person.toJSON());
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
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

    person.save()
        .then(savedPerson => {
            res.json(savedPerson.toJSON());
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Phonebook.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON());
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = Number(req.params.id);
    Phonebook.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.get('/info', (req, res) => {
    Phonebook.find({}).then(phonebook => {
        const total = phonebook.length;
        const date = new Date();
        res.send(`<p>Phonebook has info for ${total} people</p><p>${date}</p>`);
    })
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'unknown endpoint'
    });
};
// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
// handler of requests with result to errors
app.use(errorHandler)

const PORT = `${process.env.PORT}` || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
