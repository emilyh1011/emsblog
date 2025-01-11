import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


 /*Since we defined a new homepage URL for our githubpages that is http://emilyh1011.github.io/blog/, 
 we must specify this new base route of including /blog to our repo */
 /*This means we can keep our exisiting code w/o modifiying our routes or navigation
  * Ex: we said "/" goes to Welcome.jsx component => /blog/ 
  */
createRoot(document.getElementById('root')).render(
  <BrowserRouter basename = "/blog">
    <App />
  </BrowserRouter>,
)

//WE need to add ReactDOM, this allows us to add routing(go to different)

