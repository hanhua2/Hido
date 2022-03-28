import React from "react";
import '../register.scss';

function Register() {
    return (
        <div className="Register">
            <img  className="login-image" src="images/twitter_profile_image.png" alt=""/>
            <div>
                <a href="https://nicepage.com/k/test-website-templates" id = "google-account" className="google-login">
                    Continue with Google Account&nbsp;
                </a>
            </div>


            <form className="register-form" source="custom" name="form" style={{padding: "10px"}}>
                <input type="lastname" placeholder="Last Name" name="lastname" className="form-lastname" />
                <input type="firstname" placeholder="First Name" name="firstname" className="form-firstname" />
                <input type="email" placeholder="Please Set Your Email" name="email" className="form-input" />
                <input type="text" placeholder="Please Set Your Password" name="Password" className="form-password"/>
                <input type="text" placeholder="Please Retype Your Password" name="Password2" className="form-password2"/>
                <button className ="submit">Register</button>
            </form>

            <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
                </div>
            </footer>

        </div>
    );
}

export default Register;