const express = require('express');
const bodyParser = require('body-parser');
const EloRating = require("elo-rating");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// add cors headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const KITTEN_URL = 'https://placekitten.com/500/500?image=';

const contenders = {
    1: {
        rating: 1000
    },
    2: {
        rating: 1000
    },
    3: {
        rating: 1000
    },
    4: {
        rating: 1000
    },
    5: {
        rating: 1000
    },
    6: {
        rating: 1000
    },
    7: {
        rating: 1000
    },
    8: {
        rating: 1000
    },
    9: {
        rating: 1000
    },
    10: {
        rating: 1000
    },
    11: {
        rating: 1000
    },
    12: {
        rating: 1000
    },
    13: {
        rating: 1000
    },
    14: {
        rating: 1000
    },
    15: {
        rating: 1000
    },
    16: {
        rating: 1000
    },
};

app.get('/', (req, res) => {
    res.send(`
        <html>
        <body>
          <p>Please use following URLs:</p>
          <ul>
            <li>GET /contenders </li>
            <li>GET /round/new</li>
            <li>POST /round/result</li>
          </ul>
        </body>
        </html>
    `);
});

app.get('/contenders', (req, res) => {
    res.send(JSON.stringify(contendersSortedByRating(contenders)));
});


app.post('/round/result', (req, res) => {
    try {
        console.log('Received result: ' + JSON.stringify(req.body));
        const {kittenId, ratingResult} = req.body;

        const kittenRating = contenders[kittenId].rating;
        const isKittenLoved = ratingResult === 'LOVE';

        const {playerRating} = EloRating.calculate(
          kittenRating,
          1000,
          isKittenLoved
        );

        contenders[kittenId].rating = playerRating;

        console.log('Kitten ' + kittenId + ' with old rating ' + kittenRating + ' and new rating ' + playerRating + ' accepted.');

        res.status(201);
        res.send('OK');
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send('Request failed. ' + JSON.stringify(e));
    }
});


app.get('/round/new', (req, res) => {
    const randomId = randomIntInRange(1, 16);

    const nextRound = {
        kittenId: randomId,
        kittenUrl: `${KITTEN_URL}${randomId}`
    };

    res.send(JSON.stringify(nextRound));
});

if (module === require.main) {
    const server = app.listen(process.env.PORT || 3001, () => {
        const port = server.address().port;
        console.log(`Game server started: http://localhost:${port}`);
    });
}

/**
 * Geenrates a random integer id in the range [min, max].
 * Throws an error if max <= min!
 *
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {number}
 */
const randomIntInRange = (min, max) => {
    if (max <= min) {
        throw "Invalid arguments: max <= min.";
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const contendersSortedByRating = opponents => Object.entries(opponents)
    .map(entry => {
        return {
            kittenId: entry[0],
            rating: entry[1].rating,
            kittenUrl: `${KITTEN_URL}${entry[0]}`
        };
    })
    .sort((opponent1, opponent2) => opponent2.rating - opponent1.rating);

