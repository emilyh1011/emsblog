//Reimport express library
const express = require("express");

//Create an instance of express
const app = express();

//Import mongoose
const mongoose = require("mongoose");

//Require our dotenv library, so we can use our environmental variables from .env file
//Use process.env.VariableName to access values in our code
require("dotenv").config();

//Allows us to connect API with react frontend without any errors
const cors = require('cors');

//Without this, any request that involves the body will result in an error, 
//since body is sending json data. This automatically has express parse our json data for us
//in a usable javascript object
app.use(express.json());

app.use(cors());

//Use connection string to connect our cluster that we created with MongoAtlas
//Specify database we are connecting and replace password with our admin access
//Make sure to also use connection string to connect to compass
//In our cluster, we will be connecting to blog database 
mongoose.connect(process.env.MONGO_URI);


//Allow our index.js file to have access to our PostModel
const PostModel = require("./models/post.js");
const WelcomeCarousePhotoModel = require("./models/welcomeCarouselPhoto.js");

//Get request for retrieving all our posts
app.get("/getPosts", async (req, res)=>{
    
    try{
        //Originally: used find function from our PostModel to retrieve all posts find({})
        //Placed an empty object as our first parameter will return all documents from our collection

        //Now: we want to process our document in stages because we want to return our Date Object in a string format MMM. DD, YYYY
        //To do this, we can aggregate our collection: use the $project stage to specify which fields we want to pass on(1, true) and
        //also change our Date object with dateToString

        const result = await PostModel.aggregate([
            //Step 1: sort aggregation, we want to sort our Array of posts by date, can't sort after dateToString bc strings sort differently
            {
                $sort:{"dateCreated": -1} //return posts in descending order, we want to display latest posts->oldest
            },
            //Step 2: project aggregation, so we know which fields to pass on and which fields to convert
            {

                $project: {
                    title: 1,
                    content: 1,
                    recipients: 1,
                    photo: 1,
                    dateCreated: {
                        $dateToString: {
                            format: "%B %d, %Y",
                            date: "$dateCreated"
                        },
                    },
                    section: 1,
                },

            },
        ]);

        //If no error occurs(result), we want to return this data back to frontend to display all our posts
        //Parse data we got back from backend & send as json data back to frontend
        res.json(result);
    }//If result returns an err instead of actual data we want, 
    //catch in this block and handle error
    catch(err){
        //Send back error to frontend so we know what the issue is.
        res.json(err);
    }
});

//MongoDB stores ids as ObjectId objects, so need to cast our id we passed in as a ObjectId
//const {ObjectId} = require('mongodb');

//Get request for retrieving one post based on specific id
//Remember id is a route parameter
app.get("/getPostById/:id", async (req, res)=>{

    try{
        //In our request, lets save our id from our parameter that we will be searching for
        const id = req.params.id;

        //Use find function,find({field: <value>}) to get our document that has this specific postId as its _id field
        //await our response because findOne is async operation. We don''t want our query to have not finished searching 
        //through whole database of posts and return an empty posts object because didn't find document before sending back
        const result = await PostModel.findById(id);

        //If no error occurs(result), we want to return this post(as a response) back to frontend to generate the html
        //to display this post page
        res.json(result);

    }catch(err){
        res.json(err);
    }
    


})

//Get request for retrieving all posts that match searchQuery(ignoring field)
//Pass searchQuery as a query parameter to get request
//https://www.geeksforgeeks.org/mongodb-query-with-case-insensitive-search/ 
app.get("/getAllPosts/:searchQuery", async(req,res)=>{
    
    try{
        const query = req.params.searchQuery;
        console.log(query); 
        

        
        const result = await PostModel.aggregate([

            //1. match aggregation stage: first return all documents that contain query(as substring) in either title or content field
            {
                $match: {
                    $or: [ //Use or operator: return all documents if satsify one of 2 conditions
                        { title: { $regex: query, $options: "i" } },   /*field: {$regex:/query/i}  */
                        { content: { $regex: query, $options: "i" } }, //regex operator sees if field contains(substring) of query
                        //i flag: means we are considering matches as case insensitive
                    ]
                }
            }, //2. sort aggregation stage, sort matched posts in descending
            {
                $sort:{"dateCreated": -1}
            },
            { //3.  project aggregation stage, so we can pass all fields(1), but for dateCreated field format dateToString
                $project:{
                    _id: 1,
                    title: 1,
                    content: 1,
                    photo: 1,
                    dateCreated:{ 
                        $dateToString:{ //Use dateToString aggregation stage for dateCreated
                            date: "$dateCreated",  //original date, since is variable need to put in quotes and $
                            format: "%B %d, %Y"
                        }
                    },
                    recipients:1,
                    section:1
                }
            }
        ]); 
        console.log(result);

        //result will either be document(s) array or empty array
        res.json(result);

    }catch(error){
        console.log("Failed to search posts!");
        res.json(error);
    }
    
})


//Test in thunderclient: http://localhost:5002/getAllWelcomeCarouselPhotos
//http, Port for backend, API endpoint
//Get request for retrieving all photos in "welcome carousel photos" collection
app.get("/getAllWelcomeCarouselPhotos", async(req, res)=>{
    
    try{
        //find({}) find funciton with empty object returns all documents in "welcome carousel photos"
        //Want to await for find function to finish because we don't want to return empty data because find function didn't finish b4 sending back to frontend
        const result = await WelcomeCarousePhotoModel.find({}); 
    
    //if no error occurs, return data back to frontend so we can generate the html and display
    res.json(result);

    }catch(err){
        res.json(err);
    }
    
})

//When we run on our local machine, use our hardcoded port 5002, 
//but on our deployed site on Render, we want to use port they give us
const port = process.env.PORT || 5002;
//Our frontend runs on port 5173, our backend shouldn't run same port, so give it a diff port
app.listen(port, ()=>{
    console.log("server runs here");
});