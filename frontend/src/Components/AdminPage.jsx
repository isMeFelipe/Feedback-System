import React from 'react'
import "./AdminPage.css"

const AdminPage = () => {
  return (
    <div>
            <div className="admin_frame_top"></div>
      <div className="admin_frame_body">
      <h2 style={{color:"#2071B2"}}>ADMIN LOGIN PAGE</h2>

        <div className="admin_frame_border">
            <p><i>Enter Your Credentials Here</i></p>
          <input className='admin' placeholder='Username' type="text" /> <br />
          <input className='admin' placeholder='Password' type="text" />
          
          <button className='login_btn'>Login</button>
        </div>
          
      </div>
      
    </div>
  )
}

export default AdminPage
