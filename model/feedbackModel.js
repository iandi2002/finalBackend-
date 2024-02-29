const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    text: String
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = FeedbackModel;
