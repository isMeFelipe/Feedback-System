import React from 'react';
import "./FeedbackPage.css";

const FeedbackPage = () => {
  return (
    <div className='feedback_page'>
      <div className="feedback_frame">
        <div className="contact_section">
          <h1 className="contact_us">Contact Us</h1>
          <div className="contact_info">
            <div className="contact_item">
              <div className="address_icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h4 className="address_label">Address</h4>
              <p className="address_paragraph">
                Moda Center 8th, 379 Hudson St, <br />
                New York, NY 10018 US
              </p>
            </div>

            <div className="contact_item">
              <div className="address_icon">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <h4 className="address_label">Let's Talk</h4>
              <p className="address_paragraph">
                +1 00 0000 0000
              </p>
            </div>

            <div className="contact_item">
              <div className="address_icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <h4 className="address_label">Contact Support</h4>
              <p className="address_paragraph">
                zidio@support.com
              </p>
            </div>
          </div>
        </div>

        <div className="feedback_form">
          {/* Feedback form */}
          <h1>FEEDBACK FORM</h1>
          <div className="name">
            <label htmlFor="uname"><b>Username</b></label>
            <input type="text" id="uname" placeholder="Enter Username" name="uname" required />
            <i className="fa fa-user fa-lg"></i>
          </div>
          {/* Password input field */}
          <div className="fontpassword">
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" id="psw" placeholder="Enter Password" name="psw" required />
            <i className="fa fa-key fa-lg"></i>
          </div>
        </div>
      </div>
    </div>
  );
}


export default FeedbackPage;
