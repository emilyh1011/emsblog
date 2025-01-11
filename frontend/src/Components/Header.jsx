//This file is for the reusable header across all pages

//Import logo from assets folder
//Although our photo is named BlogLogo2, we can change the name 
//to whatever we want when we import
import logo from './../assets/Images/LogoLighter-Photoroom.png'
import React from 'react'
import { PiInstagramLogoFill } from "react-icons/pi"
import {useNavigate} from 'react-router-dom'

//pass in our className prop to control margin
//Remember to pass in a variable into className to make a dynamic string, we need backticks
//className = {`someStyle someStyle ${classNameProp}`}
//Don't need backticks if prop is only thing we added to className but we have multiple things in our className
function Header({className}) {

  //Import navigate. useNavigate allows us to connect webpages together
  const navigate = useNavigate();

  return (
    //Make header all one line, display as flex, also means as screen size changes, header will flex in or flex out
    //justify-between style means first element will be placed at left edge of container
    //last element to right edge of container, and all items in between 
    //will be equally spaced btwn the first and last element
    //items-center vertically centers all the elements in the div aka in the header
    <div className = {`flex justify-between items-center w-full ${className}`}>
        {/*SYNTAX MATTERS! Before, didn't resize width because had a space between slash and bracket */}
        <img src = {logo} className = 'w-[120px] md:w-[180px]'/>

        {/*Make all icons display in one line rather than one item each line list, so display flex */}
        {/**Separate each listed item  by 4px, but when screen size becomes medium or greater, increase gap to 20px */}
        <ul className = 'flex gap-4 md: gap-8'>

            {/*Syntax maters. Space between : and word caused text to always be bolded rather than just hover to bold*/}
            <li className = 'hover:font-bold cursor-pointer text-[18px] md:text-[25px]' onClick={()=>navigate('/')}>Welcome</li>
            <li className = 'hover:font-bold cursor-pointer text-[18px] md:text-[25px]' onClick={()=>navigate('/Blog')}>Blog </li>
            <li className = 'hover:font-bold cursor-pointer text-[18px] md:text-[25px]' onClick={()=>navigate('/AboutMe')}>About Me</li>
            
        </ul>

        {/*Make follow button corner rounded, text changes color of test*/}
        {/*Pass instagram icon jsxelement into button jsxelement*/}
        {/*Since instagram icon is still a jsx element, we can style it, add margin to left */}
        {/*Can also use text to change font size */}
        <button className='w-[110px] md:w-[150px] bg-yellow-400 rounded-full flex items-center text-[16px] md:text-[20px] mr-4'
          onClick={()=>window.open('https://www.instagram.com/emsfeelingsjournal/?next=%2F', '_blank')}>Follow <PiInstagramLogoFill className = 'ml-1 md:ml-3'/></button>
    
    </div>
   
  )
}

export default Header