import React from "react";
import '../login.css';

function LogIn() {
  return (
   <div className="login">
      <header className="u-clearfix u-custom-color-1 u-header u-header" id="sec-a6c5">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
        </div>
      </header>
      <section className="u-clearfix u-custom-color-1 u-section-1" id="sec-8f98">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <img id="login-icon" className="login-image" src="images/twitter_profile_image.png" alt="" data-image-width="400" data-image-height="400"/>
          <a href="https://nicepage.com/k/test-website-templates" id = "google-account"
             className="u-border-1 u-border-white u-btn u-btn-round u-button-style u-gradient u-none u-radius-15 u-text-grey-60 u-text-hover-grey-60 u-btn-1">Continue
            with Google Account&nbsp;</a>
          <div className="u-form u-form-1">
            <form action="#" method="POST" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form"
                  source="custom" name="form" style={{padding: "10px"}}>
              <div className="u-form-email u-form-group">
                <label htmlFor="email-0838" className="u-label">Email</label>
                <input type="email" placeholder="Enter you email address" id="email-0838" name="email"
                       className="u-border-3 u-border-grey-30 u-input u-input-rectangle u-radius-22 u-white"
                       required="" />
              </div>
              <div className="u-form-group u-form-name">
                <label htmlFor="name-0838" className="u-label">Password</label>
                <input type="text" placeholder="Enter your password" id="name-0838" name="Password"
                       className="u-border-3 u-border-grey-30 u-input u-input-rectangle u-radius-22 u-white"
                       required="" />
              </div>
              <div className="u-align-center u-form-group u-fom-submit">
                <a id="login-button" href="#"
                   className="u-border-1 u-border-black u-btn u-btn-round u-btn-submit u-button-style u-hover-black u-none u-radius-19 u-text-black u-text-hover-white u-btn-2">Login</a>
                <input type="submit" value="submit" className="u-form-control-hidden" />
              </div>
            </form>
          </div>
        </div>
      </section>


      <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
        </div>
      </footer>

    </div>
  );
}

export default LogIn;
