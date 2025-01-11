import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter, BrowserRouter } from 'react-router-dom'


 /*Since we defined a new homepage URL for our githubpages that is http://emilyh1011.github.io/blog/, 
 we must specify this new base route of including /blog to our repo */
 /*This means we can keep our exisiting code w/o modifiying our routes or navigation
  * Ex: we said "/" goes to Welcome.jsx component => /blog/ 
  * <BrowserRouter basename = "/blog/"> /*after deploying to github, our react router now loading blank pages bc we have this added repo to our URL */
  {/*make our vite.config.js base be the same as basename in BrowserRouter */}
  
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App/> {/*HashRouter quick solution to 404 errors on static page hosting like github pages that 
              dont support React Router. React Router supported by local so we use BrowserRouter in local 
              but not Github pages*/}
  </HashRouter>
)

//WE need to add ReactDOM, this allows us to add routing(go to different)

