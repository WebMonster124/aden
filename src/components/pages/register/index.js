import React from 'react';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
} from 'react-bootstrap';
import logo from '../../../images/logo.png';
import '../login/login.scss'
const Register = () => {  

    return (
        <Row style={{marginTop:'100px'}} className="client-login">
            <Col md = {6}>
                <div className='login-left'>
                    <div className='img-wrapper'>
                        <img src={logo} alt="logo"></img>
                    </div>
                    <div className='login-form'>
                        <div className='caption'>
                            <h3>Register</h3>
                            <h5>Register yourself to the web to book a Ride</h5>
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
                                <h3>Register</h3>
                            </div>
                            <div className='tologin'>
                                <h6 >Already an existing user? <span><Link to="login">Login here</Link></span></h6>
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

export { Register };