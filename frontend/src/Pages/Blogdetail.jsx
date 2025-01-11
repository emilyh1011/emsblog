import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { HR } from "flowbite-react"
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

//import ReactMarkdown from 'react-markdown';
//import remarkGfm from 'remark-gfm';

function Blogdetail() {

    //Make API call to fetch our post data that matches with id from URL
    //useParams allows us to extract an object version of the id from URL.
    //So we need to destructure id with {id} to extract actual id from the object
    const {id} = useParams();
    const [post, setPost] = useState([]);

    //We only want to call getPostById at start of every reload to page
    //Pass in an empty array, so we only call our useEffect hook once
    useEffect(()=>{
        console.log(id);
        getPostById(id);
    }, []);

    //Pass in our id from URL.
    //Issue: we don't know what id to add onto our get request URL, unless if we extract the ID from URL of page we are currently on
    //Solution: extract our id from route parameter(from our URL) and then use template string to make specific API call
    const getPostById = async (id) => {

        //Add error handling in case if our program doesn't fetch data sucessfully from backend
        //We will save our get request into a variable(result), so we can catch an error if get request fails
        try {

            //Insert id to our getPostById get request to make sure our API call can find correct post document with this id    
            //Remember we need a template string for this
            const result = await Axios.get(`http://localhost:5002/getPostById/${id}`).then((response) => {
                //Map the post that our getPostByID api request gets from database to an enhancedPost object
                //Save each attribute of the post we got from our backend where Id matches to a corresponding field 
                //for enhancedPost
                console.log(response.data);

                const returnedData = response.data;

                //Format the mongodb dateObject using moment.js, and then apply this format in the saved enhanced post for dateCreated
                //Use UTC to ignore any time zones or offsets applied and to treat the time of the date object as it is
                const formatDate = moment.utc((returnedData.dateCreated)).format('MMMM Do YYYY');

                const enhancedPost = {
                    id: returnedData._id,
                    title: returnedData.title,
                    content: returnedData.content,
                    recipient: returnedData.recipient,
                    coverPhoto: returnedData.photo,
                    dateCreated: formatDate,
                    tag: returnedData.section,
                };

                //Save our enhancedPost into our state variable(post)
                setPost(enhancedPost);
                console.log(enhancedPost);

            });



        } catch (error) {
            console.log("Welp, post with matching Id data field failed to fetch from backend.");
        }

    };

    
    


    return (
        //One overarching container for title box, image, and text. We want to center everything on page, so items-center
        <div className = 'px-6 md:px-20 sm:px-10 mt-1 lg:px-5 flex flex-col items-center'> 
            
            {/**Wrap the identifying information in a div, we want to left align this text */}
            {/**Put information in a flexbox. flex-col because we want everything to display in different rows aka position items vertically,
             * 
             */}

            <div className = ' w-full max-w-[700px] p-4'>
                <div className='flex flex-col pb-2'>
                    <h3 className='text-[50px] font-bold text-left'>{post.title}</h3>
                    <h3 className='text-lightblue font-bold text-[20px] text-left'>{post.tag}</h3>

                </div>

                <div className='flex items-center mt-5 pb-8'>
                    {/*for author image, we are using vertical images, so need to set height and width to same b4 making round */}
                    <img src="https://blog2photos.s3.us-east-2.amazonaws.com/postThumbnails/authorImage.jpg" className='w-[50px] h-[50px] rounded-full mr-[10px]' />

                    <div className='m1-2'>
                        <h3 className='text-[16px]'>Em</h3>
                        <h3 className='text-gray-500 text-[14px]'>{post.dateCreated}</h3>
                    </div>
                </div>



                {/**This is our horizontal line icon */}
                <HR />

            </div>
             
            <div className="w-[400px] sm:w-[500px] md:w-[650px]">
                <img src={post.coverPhoto} className='mx-auto rounded-2xl mt-5 mb-5 w-full h-auto object-size-down' />
                {/**To maintain whitespace in String to display in jsx, use whitespace-pre-wrap */}

                    {/*Use ReactMarkdown, so we can display italicized texts from our MongoDB "content" field, ex: italicized lyrics. 
                    In MongoDB document, use *italic text* */}
                    <ReactMarkdown className='whitespace-pre-wrap leading-loose w-full mt-[75px] font-merriweather text-[22px] md:text-[25px]'>
                        {post.content}
                    </ReactMarkdown>
                

            </div>


        </div>
    )
}

export default Blogdetail