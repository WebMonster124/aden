import React from 'react';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
} from 'react-bootstrap';
import logo from '../../../images/logo.png';
import './login.scss'
const Login = () => {  

    return (
        <Row style={{marginTop:'100px'}} className="client-login">
            <Col md = {6}>
                <div className='login-left'>
                    <div className='img-wrapper'>
                        <img src={logo} alt="logo"></img>
                    </div>
                    <div className='login-form'>
                        <div className='caption'>
                            <h3>Log in</h3>
                            <h5>Get in to the pannel by system</h5>
                        </div>
                        <div className='form-group'>
                            <div className='form'>
                                <label>Email Id:</label>
                                <input type="text" placeholder='lorem Ipsum'></input>
                            </div>
                            <div className='form'>
                                <label>Password:</label>
                                <input type="password"></input>
                            </div>
                            <div className="remember">
                                {/* <Form.Check type="checkbox" className='checkbox' label="Remember me" /> */}
                                <label>
                                    <input type='checkbox'/>
                                    <span></span>
                                    Remember Me
                                </label>
                                <Link to={{pathname:'/'}} style={{textDecoration:'none'}}>Forgot Password?</Link>
                            </div>
                            <div className='login-button'>
                                <Link to={{pathname:'/home'}}>
                                    <h3>Login</h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md = {6}>
                <div className="login-right">
                </div>
            </Col>
        </Row>
    )    
};

export { Login };