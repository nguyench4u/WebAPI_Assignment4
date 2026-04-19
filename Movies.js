var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB);

// Movie schema
// Taken exactly from Assignment 3 
var MovieSchema = new Schema({
    title: { type: String, required: true, index: true },
    releaseDate: { type: Number, required: true, min: [1900, 'Must be greater than 1899'] },
    genre: {
        type: String,
        required: true,
        enum: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western', 'Science Fiction'],
    },
    actors: {
        type: [{
            actorName: { type: String, required: true },
            characterName: { type: String, required: true },
        }],
        required: true,
        validate: [arr => arr.length >= 3, 'Must have at least 3 actors'],
    },
    imageUrl: String,
});

// return the model
module.exports = mongoose.model('Movie', MovieSchema);