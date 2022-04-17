import React, {useState} from "react";
import '../login.scss';
import {gql, useMutation} from "@apollo/client";
import { Button, Form } from 'semantic-ui-react';

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            lastname
            firstname
            email
            password
            created
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

    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

  return (
   <div className="Login">
      <img  className="login-image" src="images/twitter_profile_image.png" alt=""/>
      <div>
        <button id = "google-account" className="google-login">
          Continue with Google Account&nbsp;
        </button>
      </div>

        <Form onSubmit={onSubmit} className="login-form">
            <Form.Input label='Email' placeholder="Email" name={"email"} type="email" value={values.email}
                        onChange={onChange} className="form-input"/>
            <Form.Input label='Password' placeholder="Password" name={"password"} type="password" value={values.password}
                        onChange={onChange} className="form-password"/>
            <Button type={"submit"} className ="submit" primary>Login</Button>
        </Form>

      <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5cf3">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <p className="u-small-text u-text u-text-variant u-text-1">@2022 Hido Copyright.</p>
        </div>
      </footer>

    </div>
  );
}

export default LogIn;
