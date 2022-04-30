import React, {useState} from "react";
import '../register.scss';
import {gql, useMutation} from "@apollo/client";
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const REGISTER_USER = gql`
    mutation registeruser(
        $lastname: String!
        $firstname: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        registeruser(
            registerInput: {
                lastname: $lastname
                firstname: $firstname
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
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

function Register() {
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    let navigate = useNavigate();

    const [addUser, {data, loading, error}] = useMutation(REGISTER_USER, {
        update(_, result) {
            navigate('/login', { replace: true })
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

    console.log(errors);
    return (
        <div className="Register">
            <Navigation  className="nav"/>
            <img  className="login-image" src="images/twitter_profile_image.png" alt=""/>
            <div>
                <h3 className={"account"}>CREATE NEW ACCOUNT</h3>
            </div>

            <Form onSubmit={onSubmit} noValidate className={"register-form"}>
                <br />
                <br />
                <div className="Register__text1">
                    Please type in your last name
                </div>
                <Form.Input  placeholder="Last Name" name={"lastname"} type="text" value={values.lastname}
                            onChange={onChange} className="form-input"/>
                <div className="Register__text2">
                    Please type in your first name
                </div>
                <Form.Input placeholder="First Name" name={"firstname"} type="text" value={values.firstname}
                            onChange={onChange} className="form-input"/>
                <div className="Register__text3">
                    Please type in your email
                </div>
                <Form.Input placeholder="Email" name={"email"} type="email" value={values.email}
                            onChange={onChange} className="form-input"/>
                <div className="Register__text4">
                    Please type in your password
                </div>
                <Form.Input placeholder="Password" name={"password"} type="password" value={values.password}
                            onChange={onChange} className="form-input"/>
                <div className="Register__text5">
                    Please type in your password again
                </div>
                <Form.Input placeholder="Retype In Password" name={"confirmPassword"} type="password" value={values.confirmPassword}
                            onChange={onChange} className="form-input"/>
                <Button type={"submit"} primary className="submit">Register</Button>
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

export default Register;
