import React from 'react'

//Header and footer accept the className prop that contains our margin based on if isWelcomePage
function Footer({className}) {
  return (
    //We want dyamic JSX with our prop
    //But in order to insert this prop/dynamic jsx into our className that is a regular string, we need to use 
    //template string(backticks) with ${variableName} to allow for us to insert a variable into a string
    //Remember, for backticks, need braces outside too
    <div className = {`text-center p-10 ${className}`} >
      You are not a stranger in here. You were the right person to enter my life.
    </div>
  )
}

export default Footer