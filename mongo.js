const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
};

const password = process.argv[2];
const newEntry = {
    name: process.argv[3],
    number: process.argv[4]
}

const url = `mongodb+srv://fullstack:${password}@cluster0-jpuqw.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', phonebookSchema);

const person = new Person({
    name: newEntry.name,
    number: newEntry.number,
});

if(newEntry.name) {
    person.save().then(response => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close();
    });
}

if(process.argv.length <= 3) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`);
        });
        mongoose.connection.close();
    });
};
