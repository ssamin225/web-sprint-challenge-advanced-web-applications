import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_URL_Base } from '../constants';

const initialLoginValues = {
    username:"",
    password:""
}

const Login = () => {
    const [formError, setFormError] = useState("");
    const [loginValues, setLoginValues] = useState(initialLoginValues);

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginValues({
            ...loginValues,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${API_URL_Base}/login`, loginValues)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                history.push('/view');
            })
            .catch(err => {
                console.log(err.response.data);
                setFormError('Username or password is incorrect. Please try again.');
            })
    }
    
    return(<ComponentContainer>
        <ModalContainer>
            <form>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input 
                        name="username" 
                        id="username" 
                        type="text"
                        value={loginValues.username}
                        onChange={handleChange} 
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input 
                        name="password" 
                        id="password"
                        type="text"
                        value={loginValues.password}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button onClick={handleSubmit} id="submit">Click to Login</Button>
            </form>
            <p id="error">{formError}</p>
        </ModalContainer>
    </ComponentContainer>);
}

export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```**
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`
