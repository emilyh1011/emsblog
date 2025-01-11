//This will represent a post document
//We will define a structure/schema for each post document

//Import mongoose
const mongoose = require("mongoose");

//Define a post schema
const PostSchema = new mongoose.Schema({
    title:{
        type: String, 
        required: true
    },
    content:{
        type: String,
        required: true
    },
    recipients:{
        type: Array,
        required: false
    },
    photo:{
        type: String,  // Store the image URL as a string
        required: true
    },
    reflectingDate:{ //date post is reflecting about
        type: Date,
        required: false
    },
    dateCreated:{ //date post was started
        type: Date,
        required: true
    }, 
    section:{ //Every post is also in all section
        type: String,
        required: true
    }
   
});

//Create a post model for schema to ensure all documents follow this shcema for a post.
//Parameter1: Name of collection, Parameter2: Name of schema to apply to that collection
//Apply our postSchema to the collection posts
const PostModel = mongoose.model("posts", PostSchema);

//Export model for use outside of this file
//So we can modify thos collection throughout whole application
module.exports = PostModel;

