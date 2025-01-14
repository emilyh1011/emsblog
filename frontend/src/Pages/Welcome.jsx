import React from 'react'
import Axios from "axios";
import { useEffect, useState } from 'react';

//Import two swiper components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; //For pagination dots, we would also import swiper/css/navigation if we had navigation arrows to style
import 'swiper/css/effect-fade'; //For fade effect
import {Cursor, useTypewriter} from 'react-simple-typewriter';

//import './styles.css';
// import required swiper modules
import { EffectFade, Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';


//Define a preload images function & call in useEffect hook
//Allows broswer to cache/download images as soon as page reloads, so can browser can cache images b4 rendering
//Images already loaded in mmemory, so swiper doesn't have to wait for if our fetch posts takes too long, avoids fetch delays
//https://www.dhiwise.com/post/guide-to-optimizing-image-loading-with-react-preload
const preloadPhotos = (photosArray)=>{
  //For each photo, create a new image and store link to our photo in img.src
  photosArray.forEach((photo)=>{
    const image = new Image();
    image.src = photo.photo; //Remember our WelcomeCarousePhotos model has photo data field to store url to image
  })
};


function Welcome() {
  //Decide our backend link, are we running on our local machine or are we on Render(deployed version)
  const backendLink = import.meta.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_PROD_URL : import.meta.env.VITE_BACKEND_URL;
    console.log(backendLink);

  //Create a welcomePhotosList state variable. This will store all our welcome carousel photos
  const [welcomePhotosList, setWelcomePhotosList] = useState([]);

  //Whenever page reloads, we want to make sure all our welcomePhotos are loaded so we can make our full carousel
  useEffect(() => {

    //Wrap everything in useEffect in a fetchWelcomePhotos function because we want to make this funciton async to be able to 
    //await the full retrieval of all documents in our "welcome carousel photos" ccollection
    const fetchWelcomePhotos = async () => {

      //Use axios to make our get API request to fetch all documents in welcome carousel photos collection
      try {
        //Remember API request will either send back an error or the actual list of welcomeCarouselPhotos documents
        const result = await Axios.get(`${backendLink}/getAllWelcomeCarouselPhotos`).then((response) => {
          setWelcomePhotosList(response.data);
          preloadPhotos(response.data);   //if takes a while to fetch photos, let us also preload
          
        });

      } catch (err) {
        console.log("Sorry failed to fetch welcome carousel photos from backend");
      }

    };

    fetchWelcomePhotos();


    //Pass empty object as second parameter so we only call useEffect hook once
  }, []);

  const [text] = useTypewriter({
    words: ["Who am I if I am not loved by you?", 
    "I still see you in memories, as movies I play in my head.",
    "I love you, is that ok to say?",
    "To be loved is to be known and accepted for the knowing.",  
    "In my dreams, I told you how I felt before you left.",
    "I wish we ended better.",
    "You became the clouds before I left, but when my friends don't look I call out sunshine for you.",
    "I am love, and I am at peace.",
    "Vulnerability connects people, stay open."],
    loop: true, //run infinite loop on text
    typeSpeed: 120,
    deleteSpeed: 120,
    delaySpeed: 1500, //delay btwn words
  });
  

  return ( //We make our outermost div be full screen(width and height)
    //However, swiper doesn't immediately inherity these styles, so we want our swiper to fill whole container of outer div
    //Swiper: w-ful h-full
    //Also, lets add an overlay(faded black background on top of images to make text pop)
    <div className='relative w-screen h-screen'>



      {/*RENDER SWIPER ONLY IF DATA IS AVAILABLE(after useEffect called and we loaded welcomePhotosList), welcomePhotosList state starts empty, so if swiper starts by trying render 0 photos...glitching unpredictable behavior */}
      {welcomePhotosList.length > 0 ? (
        <Swiper
          loop={true} //infinite loop
          effect={'fade'}
          modules={[Autoplay, EffectFade]}
          className="h-full"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false, //autoplay continues even if user interacts with screen
          }}
          fadeEffect={{
            crossFade: true  //smooth fade transition
          }}
        >

{/*top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 */}
          {/*Center element both horizontally & vertically
          *First 2 only positions top-left corner of element at exact center
          *Position element at top edge 50% height of its parent container
          *Position element left edge 50% width of its parent container

          *transform: allow transformations like translation
          *second two means center of element is at center of parent
          *move elmemnt by 50% of its width
          *move element by 50% of its height */}
          <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            {/*text style*/}
            <span className='text-white text-3xl font-bold font-merriweather'>
              {text}
            </span>
            {/*Cursor style*/}
            <Cursor cursorColor='lightblue'/>

          </div>



          {/*Remember, use braces when we want to generate html but with our JSX code */}
          {/*Use map so that for each item(document) in welcomePhotosList, we process it the same way in generating html for our photocarousel, so that each photo in each item is a swiperslide */}


          {welcomePhotosList.map((item) => (
            <SwiperSlide key={item._id} className='w-full h-full'>

              <img src={item.photo} className='object-center w-full h-full object-cover' />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"></div>

            </SwiperSlide>

          ))}

        </Swiper>

      ) : ( //Otherwise our welcomePhotosList state is empty so don't call swiper yet
        <div>
          <p className="text-white z-50">Loading...</p>
        </div>
      )}


    </div>



  )
}

export default Welcome
