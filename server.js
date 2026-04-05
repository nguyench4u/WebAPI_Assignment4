/*
CSC3916 HW4
File: Server.js
Description: Web API scaffolding for Movie API
 */

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var authJwtController = require('./auth_jwt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var User = require('./Users');
var Movie = require('./Movies');
var Review = require('./Reviews');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

function getJSONObjectForMovieRequirement(req) {
    var json = {
        headers: "No headers",
        key: process.env.UNIQUE_KEY,
        body: "No body"
    };

    if (req.body != null) {
        json.body = req.body;
    }

    if (req.headers != null) {
        json.headers = req.headers;
    }

    return json;
}

// Routes for user signup and signin like Assignment 3 ===========

router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please include both username and password to signup.'})
    } else {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err){
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists.'});
                else
                    return res.json(err);
            }

            res.json({success: true, msg: 'Successfully created new user.'})
        });
    }
});

router.post('/signin', function (req, res) {
    var userNew = new User();
    userNew.username = req.body.username;
    userNew.password = req.body.password;

    User.findOne({ username: userNew.username }).select('name username password').exec(function(err, user) {
        if (err) {
            res.send(err);
        }

        user.comparePassword(userNew.password, function(isMatch) {
            if (isMatch) {
                var userToken = { id: user.id, username: user.username };
                var token = jwt.sign(userToken, process.env.SECRET_KEY);
                res.json ({success: true, token: 'JWT ' + token});
            }
            else {
                res.status(401).send({success: false, msg: 'Authentication failed.'});
            }
        })
    })
});

router.route('/movies') // GET, POST, PUT, DELETE APIs for movies with authentication ------------------
    .get(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies);
        } catch (err) {
            res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    })
    .post(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const movie = new Movie(req.body);
            await movie.save();
            res.status(200).json({ success: true, message: 'Movie saved.', movie: movie });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    })
    .put(authJwtController.isAuthenticated, (req, res) => {
        res.status(405).json({ success: false, message: 'PUT not supported on /movies. Use /movies/:title.' });
    })
    .delete(authJwtController.isAuthenticated, (req, res) => {
        res.status(405).json({ success: false, message: 'DELETE not supported on /movies. Use /movies/:title.' });
    });

router.route('/movies/:title')
    .get(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const movie = await Movie.findOne({ title: req.params.title });
            if (!movie) return res.status(404).json({ success: false, message: 'Movie not found.' });
            res.status(200).json(movie);
        } catch (err) {
            res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    })
    .post(authJwtController.isAuthenticated, (req, res) => {
        res.status(405).json({ success: false, message: 'POST not supported on /movies/:title. Use /movies.' });
    })
    .put(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const movie = await Movie.findOneAndUpdate(
                { title: req.params.title },
                req.body,
                { new: true, runValidators: true }
            );
            if (!movie) return res.status(404).json({ success: false, message: 'Movie not found.' });
            res.status(200).json({ success: true, message: 'Movie updated.', movie: movie });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    })
    .delete(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const movie = await Movie.findOneAndDelete({ title: req.params.title });
            if (!movie) return res.status(404).json({ success: false, message: 'Movie not found.' });
            res.status(200).json({ success: true, message: 'Movie deleted.' });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    });

// ADDED NEW REVIEWS ROUTES WITH AUTH: GET AND POST ========
router.route('/reviews')
    .get(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const reviews = await Review.find();
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ success: false, message: 'Something went wrong.' });
        }
    })
    .post(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const review = new Review({
                movieId: req.body.movieId,
                username: req.user.username,
                review: req.body.review,
                rating: req.body.rating
            });
            await review.save();
            res.status(200).json({ message: 'Review created!' });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    });

app.use('/', router);
app.listen(process.env.PORT || 8080);
module.exports = app; // for testing only


