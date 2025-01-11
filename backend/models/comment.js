//This file represents a comment document
//We will define a schema for all comment documents

const mongoose = require("mongoose");

//Define a comment schema
//Each comment document will store a comments array and a postId
//We will add a ref to postId, so we can reference the exact post document that corresponds to this comments document

//Comment array will store comment objects
//Comment object: firstName, lastInitial, content, datePosted, postId
//Each new comment added to a post will be added to front of commentsArray
const CommentSchema = mongoose.Schema({
    postId:{
        type: mongoose.Schema.ObjectId,
        ref: "posts",
        required: true
    },
    commentsArray:[
        
        //This is the schema for each comment object
        {
            firstName:{
                type: String,
                required: true
            },
            lastInitial: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            datePosted:{
                type: Date,
                required: true
            }

        }
    ]
});

//Apply a model for our CommentSchema, so all documents in our comments collection
//follows this structure
const commentModel = mongoose.model("comments", CommentSchema);

//Export our comment model, so we can modify our collection from other files
module.exports(commentModel);


