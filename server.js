const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
//app.use(router);

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = {
        quote: getRandomElement(quotes)
    }
    console.log(randomQuote);
    res.status(200).send(randomQuote);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
