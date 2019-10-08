// requiring npm mongoose
const mongoose = require("mongoose");

// setting a variable to reference the schema constructor
const Schema = mongoose.Schema;

// creating an new schema using the constructor and setting the parameters and validation
const noteSchema = new Schema(
    {
        title: String,
        body: String
    }
);

// creates the model we set above using a mongoose method
const note = mongoose.model("note", noteSchema);

// exporting the model
module.exports = note;