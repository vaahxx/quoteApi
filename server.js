const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// sends a random quote 
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = {
        quote: getRandomElement(quotes)
    }
    res.status(200).send(randomQuote);
});

app.get('/api/quotes', (req, res, next) =>{
    // without query strings
    if (!req.query.person) return res.status(200).send(quotes);
    // with query strings
    const filteredQuotes = quotes.filter(q => q.person === req.query.person);
    res.status(200).send({
        quotes: filteredQuotes
    });
});

app.post('/api/quotes', (req, res, next) => {
    // without query strings
    if (!req.query.person || !req.query.quote) {
        return res.status(400).send();    
    }
    // makes the new object, pushes it to the array and returns it 
    const newQuote = { 
        quote: req.query.quote,
        person: req.query.person
    }
    quotes.push(newQuote);
    return res.status(200).send({
        quote: newQuote
    })

});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
