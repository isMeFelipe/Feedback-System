import React from 'react'
import "./Homepage.css"

const Homepage = () => {
  return (
    <div className='frame'>
        
      <div className='login_frame' id='scroll-container'>
      <h1 id='scroll-text'>ZIDIO FEEDBACK SYSTEM</h1>
      <h3>PLEASE SELECT APPROPRIATE USER</h3>
      <div className="frames">
      <div className="admin_logo">
            <img className='user_img' src="../images/admin3.png" alt="" />
            <button>ADMINISTRATOR</button>
        </div>
        <div className="admin_logo">
            <img className='admin_img' src="../images/user.png" alt="" />
            <button className='home_btn'>USER</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Homepage
