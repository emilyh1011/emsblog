import React from 'react'
import Search from '../Components/Search'
import IntroPost from '../Components/IntroPost'
import Blogs from '../Components/Blogs'


import Axios from "axios";

//Import our hooks
import{useState, useEffect} from 'react'

function Home() { 
  //Create a state, declare a list state variable.
  //Start with an empty posts(array) because we will fetch our data from backend to fill our posts array
  //We will use our second function to alter our state variable
  const[posts, setPosts] = useState([]);
  const[orgPosts, setOrgPosts] = useState([]);

  //Use useEffect() hook so everytime webpage reloads, we call our backendAPI of getting all posts
  //Need to pass an empty array, so hook only executes once when page reloads.
  //Without empty array, useEffect called every moment
  //Remember after making get request, it returns a promise, so we need to use then to resolve the promise
  //Our backend data of all posts is sent to frontend as response variable
  //response.data gets our actual data. Our actual data of all our post documents is returned as an array of post objects
  useEffect(()=>{
    
    
    //Wrap our get request into a fetchPosts function.
    //We want to make this function Async, so we can use the await keyword on our get request.
    //We want to make sure our program doesn't try to generate html b4 we have sucessfully saved
    //all our posts data into our posts(state variable).
    //This way our program won't move to next lines till we have saved all our data into posts.
    const fetchPosts = async()=>{

      //Add error handling in case if our program doesn't fetch data sucessfully from backend
      //We will save our get request into a variable(result), so we can catch an error if get request fails
      try{

        const result = await Axios.get("http://localhost:5002/getPosts").then((response)=>{
          //Map each post in our posts array into a more enhanced post object
          //The map function returns a new array of our enhanced post objects
          const enhancedPosts = response.data.map((post)=>({
            id: post._id,
            title: post.title,
            content: post.content,
            recipients: post.recipients,
            coverPhoto: post.photo,
            dateCreated: post.dateCreated,
            tag: post.section,
          }));

          //We will update our state variable posts(array) with this new array of enhanced post objects
          setPosts(enhancedPosts); //setPosts for keeping track of our current posts(all posts, filtered posts, query posts,)
          setOrgPosts(enhancedPosts); //setOrg Posts so we can always keep track of full list of original posts from API

        });


        
      }catch(error){
        console.log("Welp, posts data failed to fetch from backend.");
      }

    };

    //Don't forget to call fetchPosts function
    fetchPosts();
      
  }, []);


  const filterPost = (tag) => {

   
      let filteredPosts;
    
      if (searchQuery) {
        // Filter from returnedPosts if a search has been made
        filteredPosts = tag === "All" ? returnedPosts : returnedPosts.filter(post => post.tag === tag);
      } else {
        // Otherwise, filter from orgPosts
        filteredPosts = tag === "All" ? orgPosts : orgPosts.filter(post => post.tag === tag);
      }
    
      console.log("Filtering posts for tag:", tag);
      console.log("Filtered posts:", filteredPosts);
    
      // Always set a new array reference
      //The spread operator ([...]) creates a new array reference, even if the content of the array is identical. 
      //Ensures React detects the state change and rerenders the component.
      setPosts([...filteredPosts]);

  
    

    // if(tag == 'All'){
    //   (searchQuery!=null)? setPosts(returnedPosts) : setPosts(orgPosts);
    // }else{
    //   const filteredPosts = ((searchQuery!=null)? returnedPosts : orgPosts).filter(post => tag == post.tag);
    //   setPosts(filteredPosts);

      
    // }

    


    // //IF search made, filter posts based on our returnedPosts. post state is the returned posts
    // if (searchQuery != null && returnedPosts != null) {
      
    //   if(tag == 'All'){
    //     console.log("we are now in all search");
    //     setPosts(returnedPosts);
    //   }else{
    //     console.log("we are now in returned tag:", tag);
    //     console.log("we are now in returned tag with returned posts:", returnedPosts);
    //     const filteredPosts = returnedPosts.filter(post => post.tag == tag);
    //     console.log("We are now in returned tag with filtered posts:", filteredPosts);
    //     setPosts(filteredPosts);
    //   }

    //   //IF no search made, filter our posts based on original posts. post state is original posts
    // } else {
    //   if (tag == 'All') {
    //     console.log("we are now in all original posts");
    //     setPosts(orgPosts);
    //     return;
    //   }

    //   //So we only store our posts into filteredPosts array if the current post.tag is equal to the selected tag 
    //   console.log("we are now in filter original posts");
    //   const filteredPosts = orgPosts.filter(post => post.tag == tag);
    //   setPosts(filteredPosts);
    // }

  }

  //Define a searchQuery state, for getting input of searchbar
  //For search bar results, update our already created posts state
  //Start searchbar input value be null
  const [searchQuery, setSearchQuery] = useState(null);
  const[returnedPosts, setReturnedPosts] = useState(null);
  

  //Search Logic for searchbar
  const handleSearch = async (searchQuery)=>{
    
    //UPDATE searchQuery state in Home.jsx. 
    //At the moment we are just passing the searchQuery state up from Search.jsx, so in this function we are just using the argument passed up
    //As a result, after exiting this function, we still want the searchQuery state from Search.jsx in our Home.jsx, so update here too
    setSearchQuery(searchQuery);
    
    //1. Get posts that match searchQuery or empty array if no matching posts found
    try{
      //Call get API, use backticks to add variable in string
      const result = await Axios.get(`http://localhost:5002/getAllPosts/${searchQuery}`).then((response)=>{
        
        const enhancedResultPosts = response.data.map((post)=>({
          id: post._id,
          title: post.title,
          content: post.content,
          recipients: post.recipients,
          coverPhoto: post.photo,
          dateCreated: post.dateCreated,
          tag: post.section,
        }));
        setReturnedPosts(enhancedResultPosts); //Update our resultPosts state
        setPosts(enhancedResultPosts); //Update our posts state, our posts state is now just the returned posts. Remember we have a orgPosts and returnedPosts to keep our original posts and returned posts data intact
        console.log(searchQuery); //posts state is for our current posts atm
        console.log(enhancedResultPosts); //good
        console.log("returned posts: ");
        console.log(returnedPosts); //good
        console.log("searchQuery now: "); //good
        console.log(searchQuery);
        filterPosts("All");
      });

    }catch(error){ //Failed to make API get request
      console.log("Oh no, failed to retrieve query posts!");
    }
  }

  //Coniditional rendering
  //Create a function for renderingposts & use braces around our JS renderPosts in return statement to call our javascript function
  const renderPosts = ()=>{

    console.log("We are now in render posts!!");
    console.log("searchQuery", searchQuery);
    console.log("returnedPosts", returnedPosts);

    //1. No search made, display normal posts
    if(searchQuery == null){
      console.log("Displaying normal posts");
      return (
        <>
        {/*Check if posts array is loaded in but also check if posts array has at least one post*/}
          {posts.length>0? <IntroPost post={posts[0]}/>:null}

          {/*Grid of rest of blog posts */}
          {/*Again, check that our posts array has finished loading whole array, but now check if has at least 2 posts to display grid*/}
          {/**Use posts.slice to skip 1st post in posts array to not repeat display intro post. syntax: slice(startingIndex) & returns a new sliced array */}
          {posts.length > 1 ? <Blogs posts={posts.slice(1)} /> : null}
        </>
      );

    //2. search made & found posts matching query 
    }else if(searchQuery != null && returnedPosts != null && returnedPosts.length >0){
      console.log("Displaying search posts");
      return(
        <>
          <div className="flex justify-center mt-[15px]">
            <p className="text-[20px] mb-[15px]">{/*Use strong to inline bold */}
              <strong>{returnedPosts.length}</strong> posts found for "{searchQuery}"
            </p>
          </div>
         

          {returnedPosts.length>0? <IntroPost post={returnedPosts[0]}/> : null}
          {returnedPosts.length>1? <Blogs posts = {returnedPosts.slice(1)}/>: null}
        </>
      );

    }else if(searchQuery != null && returnedPosts != null && returnedPosts.length == 0){
      console.log("Displaying no results found");
      return(
        <>
          <p className= "text-[20px] text-center mt-[20px]">
            No matches found for "{searchQuery}"
          </p>
        </>
      );
    }
  };


  return (
    <div>
        {/*Nest components in order of how you want to view them on webpage*/}
        {/*Search bar section, we are saving a tag as a prop to pass into our Search(tag) component*/}
        {/*Multiple props syntax: nameOfProp = {}, nameOfProp2={} */}
        {/*handleSearch function prop, bc altho searchbar in child, we still want to be able to access our resultPosts state in Home.jsx parent*/}
        {/*So, when onSearch invoked in child(since this is prop name), will call handleClick function here in parent & handle logic */}
        <Search selectedTag={(tag)=>(filterPost(tag))} onSearch={(searchQuery)=>{handleSearch(searchQuery)}}/>

        {renderPosts()}

        
    </div>

  )
}

export default Home