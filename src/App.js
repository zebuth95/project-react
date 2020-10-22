import React, {useState} from 'react';
import { UserContext } from './contexts/userContext';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import LoginPage from './pages/LoginPage.js';
import SingupPage from './pages/SingupPage.js';
import HomePage from './pages/HomePage.js';
import Projects from './components/Projects/Projects.js';
import Task from './components/Tasks/Task.js';
import { logoutUser } from './api/auth';

function App() {
  const [user, setUser] = useState(null);
  const isUserLoggedIn = () => {
    return !!user;
  }
  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    setUser(null);
  }
  return (
    <>
    <div className="App">
      <UserContext.Provider value={{user, setUser, isUserLoggedIn}}>
        <Router>
          <Container fluid>
            <Navbar bg="light" >
              <Navbar.Brand href="#home">Project FrontEnd</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav>
                  { isUserLoggedIn() ?
                    <Nav className="justify-content-end">
                      <Nav.Link as={Link} to="/project">Projects</Nav.Link>
                      <Nav.Link as={Link} onClick={logout}>Logout</Nav.Link>
                    </Nav>
                    :
                    <Nav className="justify-content-end">
                      <Nav.Link as={Link} to="/login">Login</Nav.Link>
                      <Nav.Link as={Link} to="/singup">Sing up</Nav.Link>
                    </Nav>
                  }
              </Navbar.Collapse>
            </Navbar>

            <Switch>
                <Route exact path="/login">
                  <LoginPage/>
                </Route>
                <Route exact path="/">
                  <HomePage/>
                </Route>
                { isUserLoggedIn() &&
                <>
                <Route exact path="/project">
                  <Projects/>
                </Route>
                <Route exact path="/task">
                  <Task/>
                </Route>
                  </>
                }
                <Route exact path="/singup">
                  <SingupPage/>
                </Route>
            </Switch>
          </Container>
        </Router>
      </UserContext.Provider>
    </div>
  </>
  );
}

export default App;
