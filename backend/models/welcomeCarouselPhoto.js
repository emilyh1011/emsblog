//This file represents a welcomeCarouselPhoto

//We will define a schema for all welcomeCarouselPhoto, our "welcome carousel photo" 
//database will just store photos in each document, allows for easy access of all photos from our aws


//import mongoose
const mongoose = require("mongoose");

//Define a welcomeCarouselPhoto

const WelcomeCarouselPhotoSchema = new mongoose.Schema({
    photo:{
        type: String,  // Store the image URL as a string
        required: true
    }
}
);

//Create a welcomeCarouselPhoto model for schema to ensure all documents follow this schema for a welcomeCarouselPhoto.
//Parameter1: Name of collection, Parameter2: Name of schema to apply to that collection
//Apply our postSchema to the collection posts
const WelcomeCarousePhotoModel = mongoose.model("welcome carousel photos", WelcomeCarouselPhotoSchema);

//Export model for use outside of this file
//So we can modify thos collection throughout whole application
module.exports = WelcomeCarousePhotoModel;