import React from 'react';
import {useEffect} from 'react';
import Axios from "axios";
import {useNavigate} from "react-router-dom"

//Pass in a post(prop) from Home.jsx
//Props is a way to pass data from a parent component(Home.jsx) to a child component(IntroPost.jsx)
//{post} instead of just props means we are destructuring our props in the header
//Destructuring means we can directly extract properties we need from props object in the function parameters
//Now we can do post.title instead of props.post.title
function IntroPost({post}) {

  
  const navigate = useNavigate();

  return (
    
    //We want each post to be its own container
    //In general, our intro post container will all be in 1 column
    //Only when our screen size reaches medium & above, we will change screen size to 2 columns
    //Have our intro post container be 10px off of left side od screen
    //Need to add slash in front of URL we are adding to if we don't want to add our URL onto existing URL

    //Since our original URL is /Blog, with just navigate('blog-detail/id'), we are now navigating to /Blog/blog-detail/id which will cause problem
    //because we created our BlogDetail URL to be itself without appending to existing URL***
    <div className = 'grid grid-cols-1 md:grid-cols-2 mt-10 px-10 md:px-15 lg:px-32 gap-8 cursor-pointer' onClick = {()=>navigate('/blog-detail/'+post.id)}>
      
      <img src = {post.coverPhoto} className = 'rounded-lg object-cover w-full h-full'/>
      
      <div>
        <h4 className = 'text-lightblue text-[25px]'>{post.tag}</h4>
        <h2 className = 'text-[50px] font-bold mt-5'>{post.title}</h2>
         {/*only shows 6 lines on the screen*/}
         
        <h4 className = 'line-clamp-6 text-gray-400 mt-5 text-[18px] leading-10'>{post.content}</h4>

       
        <div className='flex items-center mt-7 pb-8'>
          {/*for author image, we are using vertical images, so need to set height and width to same b4 making round */}
          <img src="https://blog2photos.s3.us-east-2.amazonaws.com/postThumbnails/authorImage.jpg" className='w-[80px] h-[80px] rounded-full mr-[10px]' />

          <div className='m1-2'>
            <h3 className='text-[20px] font-bold'>Em</h3>
            <h3 className='text-gray-500 text-[15px]'>{post.dateCreated}</h3>
          </div>
        </div>
          

        

      </div>
    </div>
  )
}

export default IntroPost