import React from 'react'
import Axios from "axios";
import { HR } from "flowbite-react"
import ReactPlayer from 'react-player'


function AboutMe() {



  return (

    <div className="mt-6">

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 mb-8 md:mb-12 lg:mb-12 px-4 md:px-8 lg:px-12 xl:px-24 cursor-pointer justify-center items-top gap-14 md:gap-5 lg:gap-7">
        
        {/**Wrap the left side of grid into its own flexbox, so we can order elements vertically. Then, with items-center, we can vertically center, so text is directly centered under image*/}
        <div className="flex flex-col items-center h-full w-full">
          <img src="https://blog2photos.s3.us-east-2.amazonaws.com/postThumbnails/authorImage.jpg" className="object-cover w-full h-full rounded-lg" />
          <p className = 'font-merriweather mt-[12px] selection:bg-lightyellow text-[14px] lg:text-[18px]'>
            Hi, I'm Em. I'm a CS major/Math minor @ NYU. It's nice to meet you sunshine.
          </p>
        </div>
       

        {/**Right side of grid: text */}
        <div className="flex items-center justify-center w-full h-full">
          <p className="font-merriweather text-left leading-loose text-[18px] lg:text-[20px] xl:text-[22px]
          px-[35px] lg:px-[40px] xl:px-[45px] py-8 md:py-12 lg:py-16 xl:py-24 
          border-2 h-full w-full selection:bg-lightblue selection:text-lightyellow">
            I hope you know I think you are special, and I hope there never comes a day that I have to ask myself, “Why are you special to me?”
            <br/>
            <br/>
            I hope I never forget what made you special.
            <br/>
            <HR.Trimmed className="w-[350px] md:w-[250px] lg:w-[350px] mt-[20px]" />
            <br/>
            Most importantly, I hope I never find a day where we became strangers because I forgot what made you sparkle and you forgot what made me shine.
            <br/>
            <br/>
            I think you are sunshine, and I hope I think of you that way forever.
            <br/>
            <br/>
            <p className= " font-bold selection:bg-lightyellow selection:text-black">@emsfeelingsjournal</p>
            
          </p>

        </div>


      </div>

      <div className="bg-lightblue text-center font-merriweather px-8 md:px-12 py-8 lg:py-16
      text-[22px] md:text-[24px] lg:text-[28px] selection:bg-lightblue selection:text-lightyellow">
        <p>A collection of my feelings. A bit over-feeling and a bit over-dramatizing, but that's just real feelings.<br></br> I hope you can find some parts relatable.</p>
      </div>


      {/**When person highlights, color of text is white and highlight is light blue */}
      <div className="text-center font-merriweather py-24 px-16 med:px-28 lg:px-44 xl:px-64 text-[22px] md:text-[30px] lg:text-[40px] leading-loose selection:bg-lightblue selection:text-lightyellow">
        <p>I created a database where I can keep all my personal antecdotes and feelings alive. At the core of it all, this is a collection of letters for people I have gotten to know and love. I am no one without love. I hope you find yourself in these. </p>
      </div>

      <HR.Trimmed className="mb-24 w-[600px]" />



      {/**Add a video player */}
      <div className = 'mb-40'>
        <h1 className="text-center font-merriweather text-[40px] font-bold mb-[30px] selection:bg-lightblue selection:text-lightyellow ">The original @emsfeelingsjournal</h1>

        {/**Remember justify- horiz center, align- vertical center */}
        <div className="flex justify-center hover: cursor-pointer">
          <ReactPlayer controls={true} url={'https://blog2photos.s3.us-east-2.amazonaws.com/blogAboutMeVid.mov'} height="500" className="object-center " />
        </div>

      </div>
      



    </div>
  )
}

export default AboutMe