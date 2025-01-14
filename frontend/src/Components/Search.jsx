import React from 'react';
import { IoIosSearch } from "react-icons/io";
import {useState} from 'react';
//Left off 37.18 at axios
function Search({selectedTag, onSearch}) {
    /*Pass a selectedTag prop to Search component and destructure it so we can access the actual value.
    This will be the tag/section that the user is currently selecting */

    {/*Create the different "tags" to filter btwn diff sections of blog.
    Treat as array of section objects. Just make sure you have same kinds of attributes
    for each section*/}
    const tags=[
        {
            id:1,
            name:'All'
        },
        {
            id:2,
            name:'I love you'
        },
        {
            id:3,
            name:'Moments gone'
        },
        {
            id:4,
            name: 'Overthinking'
        },
        {
            id: 5,
            name: 'Posts'
        }
    ]

    //The blog posts displayed depends on the tag our user clicks on to filter the blog posts.
    //This line means whenever a user clicks on a tag, we will store the activeIndex 
    //useState hook. Creates an array of state variable(activeIndex) & function(setActiveIndex) to update state variable 
    //Declare our state variable activeIndex
    const [activeIndex, setActiveIndex]= useState(0);

    //Define a searchQuery state, even though we already have this in Home.jsx, we will just "life the state" up to parent
    //Search bar starts empty
    const [searchQuery, setSearchQuery] = useState(null);

    {/*Set flex direction to columns. Before search bar and banner in a row,
    but setting to columns means we are stacking vertically. So search will go
    go below banner*/}
    {/*Less padding when screen smaller and more padding when bigger*/
    /*Before, we were using px for padding for small size and md and above,
    but screen wasn't adjusting smoothly bc my picture would shrink but then get
    bigger to account for less margin.
    Now, just use %, so margin always stays proportional to screen*/
    }
  return (
    <div className = 'flex items-center mt-8 flex-col px-[5%]'>
        {/*Center banner, add margin to top of banner*/}
        <img src= "https://blog2photos.s3.us-east-2.amazonaws.com/welcomeCarouselPhotos/emilyAlexBungee.jpg" className = 'max-w-[900px] h-auto rounded-2xl w-full'/>

        {/*Actual search bar, wrap it in a div*/}
        {/*Remember, width full to extend search bar to fill whole container, but 5% padding of container
        applied and we apply our own padding to search bar to make it smaller */}
        {/*Remember flex puts everything in one line, so we put our search icon and Search placeholder in same line */}
        {/*Adjusting text size for an icon is same as adjusting size of icon */}
        <div className = 'flex bg-white shadow-lg max-w-[400px] p-9 rounded-lg mt-[-35px] w-full items-center'>
            <IoIosSearch className= 'text-[20px] text-gray-400' />
            <input type = 'text' placeholder= {searchQuery} className = 'outline-none ml-2' 
            onChange={(event)=>{
                setSearchQuery(event.target.value); //Every time user changes input in search bar, we want to save this as a possible search query
                
            }}
            //Only on enter keydown, we want to send "search", call our onSearch function prop which will call 
            //handleSearch in parent Home.jsx to handle our search logic
            onKeyDown={(event)=>{
                if(event.key == "Enter"){
                    onSearch(searchQuery); //Lift our searchQuery state to Home.jsx
                }
            }}
            
            />
        </div>

        {/*Tags to filter btwn diff blog sections. Map each item in tags array as a new bullet in
        unordered list. We want to display the name of the section, so item.name. 
        To make tags all appear in horizontal line, we can use flex style for div*/}
        <div className = 'flex gap-10 justify-center mt-5'>
            
                {/*Add index as another parameter, since we were able to save this activeIndex */}
                {/*map creates a new array of elements, new array of tags, where we save
                the index for each of these items along with the item object in tags */}
                {tags.map((item, index)=>(
                    /*Basically means, when a user clicks on a button, will save that button's index 
                    as the current activeIndex. So if the activeIndex that user clicked is same as index of
                    button, this this button lights up(light blue not white). Basically, whenever a user selects a button,
                    button clicked will light up. React can distinguish btwn each button's index
                    because we created an event handler for each button.) */
                    /*Using null in JSX means render nothing. So when button isn't clicked, we know since our activeIndex isn't that button's index,
                    then no additional styling applied. */
                    /*Remember, general padding increases size of buttons since we are adding space inside element */
                    /*Generally buttons have small roundness, but button is rounded when screen size
                    is medium+. Only added left right padding when screen size medium. IF too much left right padding
                    when screen size small, buttons will overflow and become rlly long on page */
                    /*When hover over button, button becomes 10% bigger, add thin border */
                    /*Add smooth transation when hover, so styles don't apply too fast/harshly */
                    /*We can use key to define all our buttons(tags) uniquely, and lets use item.id(refers to each specific tag.id in tags) */

                    <ul key={item.id}
                        onClick={() => { 
                            setActiveIndex(index); 
                            console.log("selected tag:", item.name);
                            selectedTag(item.name) 
                        }}
                        className={`${index == activeIndex ?
                            'bg-lightblue text-white' : null} 
                        p-1 md:px-4 pb-2 rounded-sm md:rounded-full cursor-pointer 
                        hover:scale-110 hover:border-[1px] border-lightblue
                        transition-all duration-100 ease-in-out`}>
                        <li>{item.name}</li>
                    </ul>
                ))}
        </div>
    </div>
  )
}

export default Search