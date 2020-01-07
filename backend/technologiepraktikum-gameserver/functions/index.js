const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const EloRating = require("elo-rating");

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.get('/contenders', (req, res) => {
  //admin.initializeApp();
  admin.firestore().collection('kitten-rating')
    .get()
    .then(function(querySnapshot) {
      const contenders = [];
      querySnapshot.forEach(doc => contenders.push(doc.data()));
      const response = contenders.sort((opponent1, opponent2) => opponent2.rating - opponent1.rating);

      res.json(response);
    });
});
app.get('/round/new', (req, res) => {
  const randomKitten = Math.floor(Math.random() * (16 - 1 + 1)) + 1;

  const docRef = admin.firestore()
    .collection('kitten-rating')
    .doc(`${randomKitten}`);

  docRef.get()
    .then(function (doc) {
      if (doc.exists) {
        res.json(doc.data());
      } else {
        res.status(404);
        res.send("No such document!");
      }
    }).catch(function (error) {
    res.status(500);
    res.send('Request failed. ' + JSON.stringify(error));
  });
});
app.post('/round/result', (req, res) => {

  const {kittenId, ratingResult} = req.body;

  const docRef = admin.firestore()
    .collection('kitten-rating')
    .doc(`${kittenId}`);

  docRef.get()
    .then(doc => {
      if (doc.exists) {
        const kitten = doc.data();
        const kittenRating = kitten.rating;
        const isKittenLoved = ratingResult === 'LOVE';

        const {playerRating} = EloRating.calculate(
          kittenRating,
          1000,
          isKittenLoved
        );

        kitten.rating = playerRating;
        kitten.numberOfRatings++;

        const kittenRatingRef = admin.firestore().collection('kitten-rating');

        kittenRatingRef.doc(`${kittenId}`).set(kitten).then(() => {
          res.status(201);
          res.send('OK');
        });

      } else {
        res.status(404);
        res.send("No such document!");
      }
    }).catch(function (error) {
      res.status(500);
      res.send('Request failed. ' + JSON.stringify(error));
  });
});
app.get('/add-new-kitten', (req, res) => {
  const kittenRating = admin.firestore().collection('kitten-rating');
  kittenRating.doc("3").set(
    {numberOfRatings: 0, kittenId: 3, rating: 1000, kittenUrl: `https://placekitten.com/500/500?image=3`}
  );
});


// Expose Express API as a single Cloud Function:
exports.kitten = functions.https.onRequest(app);