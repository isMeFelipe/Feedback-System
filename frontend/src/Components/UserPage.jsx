import React from 'react'
import "./UserPage.css"

const UserPage = () => {
  return (
    <div>
      <div className="frame_top"></div>
      <div className="frame_body">
      <h2 style={{color:"#2071B2"}}>USER LOGIN PAGE</h2>

        <div className="frame_border">
            <p><i>Enter Your Credentials Here</i></p>
          <input className='username' placeholder='Username' type="text" /> <br />
          <input className='username' placeholder='Password' type="text" />
          <div className="options">
            <p>Remember me</p>
            <input type="checkbox" id="Yes" value="Yes"/>
            <button className='login_btn'>Login</button>
          </div>
          <a className='forgotten_password' href="#"><i>Forgotten Password</i></a>
        </div>
      </div>
      
    </div>
  )
}

export default UserPage
