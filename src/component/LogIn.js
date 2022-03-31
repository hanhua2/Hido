import React from "react";
import '../login.scss';

function LogIn() {
  return (
   <div className="Login">
      <img  className="login-image" src="images/twitter_profile_image.png" alt=""/>
      <div>
        <button id = "google-account" className="google-login">
          Continue with Google Account&nbsp;
        </button>
      </div>


      <form className="login-form" source="custom" name="form" style={{padding: "10px"}}>
        <input type="email" placeholder="Email address" name="email" className="form-input" />
        <input type="text" placeholder="Password" name="Password" className="form-password"/>
        <button className ="submit">Submit</button>
      </form>

      <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
        </div>
      </footer>

    </div>
  );
}

export default LogIn;
