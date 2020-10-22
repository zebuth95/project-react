import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//import { UserContext } from '../../contexts/userContext.js'
import { CreateUser } from '../../api/auth.js'

function useQueryParams () {
    return new URLSearchParams(useLocation().search);
}

function Singup() {
    const queryParams = useQueryParams();
    const history = useHistory();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorDisplay, setErrorDisplay] = useState("")

    const onSingUpFormSubmit = (event) => {
        event.preventDefault();
        if (!isValidForm()){
          return
        }
        CreateUser(username, email, password).then((data)=>{
          history.push(getRouteAfterCreate());
        }).catch((error)=> {
          setErrorDisplay()
        })
      }

      const getRouteAfterCreate = () => {
        let route = queryParams.get("next")
        if (route === null) {
          route = "/";
        }
        return route
      }

      const isValidForm = () => {
        setErrorDisplay("")
        if (username === "" || password === "" || email === ""){
          setErrorDisplay("username, email and password can't be empty. try user: test, password: test")
          return false;
        }
        return true;
      }


    return (
        <>
        <Form onSubmit={onSingUpFormSubmit} method="POST">
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                onChange={(event)=>{setUsername(event.target.value)}}
                type="text"
                name="username"/>
            </Form.Group>
            <br/>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                onChange={(event)=>{setEmail(event.target.value)}}
                type="text"
                name="email"/>
            </Form.Group>
            <br/>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                onChange={(event)=>{setPassword(event.target.value)}}
                type="password"
                name="password"/>
            </Form.Group>
            <Button type="submit">Sing Up</Button>
            <p style={{color: 'red'}}>{errorDisplay}</p>
        </Form>
        </>
    )
}

export default Singup
