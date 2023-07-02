import React, {useState} from 'react';


function LogIn({setLoggedIn, loggedIn}){



    function logIn(event){
        console.log(event)
        if (event.target[0].value === "Username" && event.target[1].value === "Password") {
            setLoggedIn(true)
        } 

        console.log(loggedIn)
    }
    return (
        <div className="login-form">
        
        <form className="login-form" onSubmit={(event) => {
            logIn(event)
        }} >
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            
            <button class="btn btn-dark" type="submit">Login</button>
        </form>
    </div>
    )
}

export default LogIn;