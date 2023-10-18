const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema= new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    placeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
    reviewText: String,
    lastModified: String,
    rating: Number
})

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;