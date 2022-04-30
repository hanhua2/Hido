import React, {useState} from "react";
import '../login.scss';
import {gql, useMutation} from "@apollo/client";
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Navigation from "./Navigation";

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            lastname
            firstname
            email
        }
    }
`;

const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit,
        values,
    };
};

function LogIn() {
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: '',
    });

    let navigate = useNavigate();

    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        update(_, result) {
            alert("Login Successfully!");
            navigate("/account", {state:{email:values.email, google: false}});
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    const success = (response) => {
        navigate("/account", {state:{email:response.Qu.Gv, google: true}} );
        console.log(response)
    }

    const failure = (response) => {
        alert("Google login failed");
        console.log(response);
    }

    return (
   <div className="Login">
       <Navigation  className="nav"/>
      <img  className="login-image" src="images/twitter_profile_image.png" alt=""/>
      <div>
          <GoogleLogin
              clientId="810582666663-ga8mvf3u0r2jhpdq2fb224i01sk6b4mj.apps.googleusercontent.com"
              buttonText="CONTINUE WITH GOOGLE ACCOUNT"
              onSuccess={success}
              onFailure={failure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              className="GOOGLE"
          />
      </div>

        <Form onSubmit={onSubmit} className="login-form">
            <br />
            <br />
            <div className="Login__text1">
                Please type in your email
            </div>
            <Form.Input placeholder="Email" name={"email"} type="email" value={values.email}
                        onChange={onChange} className="form-email"/>
            <div className="Login__text2">
                Please type in your password
            </div>
            <Form.Input placeholder="Password" name={"password"} type="password" value={values.password}
                        onChange={onChange} className="form-password"/>
            <Button type={"submit"} className ="submit" primary>Take me to Hido</Button>
        </Form>

       {Object.keys(errors).length > 0 && (
           <div className="ui error message">
               <ul className="list">
                   {Object.values(errors).map((value) => (
                       <li key={value}>{value}</li>
                   ))}
               </ul>
           </div>
       )}
      <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
        </div>
      </footer>

    </div>
  );
}

export default LogIn;
