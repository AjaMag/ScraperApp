const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    note: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});


// Create model from schema
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;