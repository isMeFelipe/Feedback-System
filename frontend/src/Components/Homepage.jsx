import React from 'react'
import { Link } from 'react-router-dom'
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
            <Link to="/adminpage" ><button className='home_btn'>ADMIN</button></Link>
        </div>
        <div className="admin_logo">
            <img className='admin_img' src="../images/user.png" alt="" />
            <Link to="/userpage" ><button className='home_btn'>USER</button></Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Homepage
