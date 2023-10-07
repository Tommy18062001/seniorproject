const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaceSchema= new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    location: String,
    photos: [String],
    lastModified: String,
    description: String,
    maxGuests: Number,
    price: Number 
})

const PlaceModel = mongoose.model("Place", PlaceSchema);

module.exports = PlaceModel;