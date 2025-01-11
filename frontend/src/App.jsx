import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, useLocation} from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'

//Import Home component. Remember components are functions that return markup
//Think: Main component like Main class in java where we call all our other functions
//from all different classes. In JSX, we use Main component to wrap around all our other components
//to create our user interface

import Home from './Pages/Home'
import AboutMe from './Pages/AboutMe'
import Welcome from './Pages/Welcome'
import Blogdetail from './Pages/Blogdetail'

function App() {

  //We want to use conditional margin because for Welcome page, we want not marginb for header and no margint for footer
  const currentPage = useLocation();

  //Check if current route is welcome
  const isWelcomePage = (currentPage.pathname == "/" || currentPage.pathname == "/Welcome");
  
  console.log(isWelcomePage);
  console.log("hi");

  //We will then pass in a prop called className into our header and footer that contains our margin
  //We must remove the padding fromour overall div for our whole webpage for welcome div or else affects our carousel and photos sizing
  return (
    <>
      <div className = {isWelcomePage? 'p-0' : 'p-[20px]'}>

        {/**Header*/}
        {/**Welcome Page: Span header top edge of outermost div, code taken from tailwind CSS site: absolute inset-x-0 top-0 h-16 */}
        {/**Remember using "absolute" means we are positioning element relative to a "relative" parent */}
        <Header className={isWelcomePage ? 'absolute inset-x-0 top-10 h-16 mb-0 z-50 bg-transparent text-white': 'mb-[15px]'}/>

        {/**Add routes */}
        <Routes>

          {/**Define our routes to our different pages, our routes are matched with a URL*/}
          {/** When we navigate to a URL path,the corresponding component/page is displayed */}
          {/**When we navigate to a blog-detail page, we want to go to specific blog page, so attach id to identify each post page */}
          {/*Remember root path means localhost:portNumber, so no slash needed to go to Welcome page, only need base URL */}
          <Route path = "/" element = {<Welcome />}></Route>
          <Route path="/Blog" element={<Home />}></Route>
          <Route path="/blog-detail/:id" element={<Blogdetail />}></Route>
          <Route path="/AboutMe" element={<AboutMe />}></Route>
          

        </Routes>


        {/*Footer*/}
        {/**Welcome Page: SPAN bottom edge of outermost div, code taken from tailwind CSS site: "absolute inset-x-0 bottom-0 h-16" */}
        {/**Remember using "absolute" means we are positioning element relative to a "relative" parent */}
        <Footer className={isWelcomePage ? 'absolute inset-x-0 bottom-4 md:bottom-0 h-16 mt-[0px] z-50 bg-transparent text-white' : 'bg-zinc-200 mt-[50px]'}/>

      </div>

      
     
    </>
  )
}

export default App
