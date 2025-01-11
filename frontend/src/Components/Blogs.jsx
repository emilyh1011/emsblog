import React from 'react'
import { useNavigate } from 'react-router-dom'

//WE pass in posts(array) as a prop from our parent component Home.jsx to child component(Blogs.jsx)
//WE do {posts} to destructure our posts array so we can extract its properties

function Blogs({posts}) {


  {/**Define navigate */}
  const navigate = useNavigate();



  return (
    
//Padding in a grid is space from side of screen... Bigger Padding, grid items close in on screen
//Gap separates items in grid...Bigger gap, grid items go farther apart on screen
//32 padding means there will be 32 px on both left & right sides of screen, 32px gap means 32px btwn each grid item
    <div className = 'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 sm:px-10 md:px-15 lg:px-32'>
      {/*Generate html for all posts in posts array*/} 
      {posts.map((post)=>(

        /*specify route that we will be navigating to */
        //We want each post to have its own specific blog page. Let us identify these specific post page URLS by attaching the post's id to the URL
        <div key={post.id} className=' m-6 cursor-pointer hover:scale-110' onClick={()=>navigate('/blog-detail/'+post.id)}>

          {/*Thumbnail*/}
          <img src = {post.coverPhoto} className = 'w-full h-200px rounded-2xl object-cover' />
          <h3 className = 'text-lightblue mt-3'>{post.tag}</h3>
          <h3 className = 'font-bold mt-3'>{post.title}</h3>
          {/*Only display first 3 lines of each blog post, as like a hook */}
          <h3 className = 'line-clamp-3 text-gray-400 '>{post.content}</h3>



          <div className='flex items-center mt-5'>
            {/*for author image, we are using vertical images, so need to set height and width to same b4 making round */}
            <img src="https://blog2photos.s3.us-east-2.amazonaws.com/postThumbnails/authorImage.jpg" className='w-[40px] h-[40px] rounded-full mr-[4px]' />

            <div className='m1-2'>
              <h3 className='font-bold text-[12px]'>Em</h3>
              <h3 className='text-gray-500 text-[10px]'>{post.dateCreated}</h3>
            </div>
          </div>





        </div>


        



      ))}
    </div>
    
  )
}

export default Blogs