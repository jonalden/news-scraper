const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articlesSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    faved: {
        type: Boolean,
        default: 0
    },
    note: [
        {
        type: Schema.Types.ObjectId,
        ref: "note"
      }
    ]
});

const articles = mongoose.model("articles", articlesSchema);

module.exports= articles;