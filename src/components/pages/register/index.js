import React,{useState} from 'react';
import { Link,Navigate } from 'react-router-dom';
import {
    Row,
    Col,
} from 'react-bootstrap';
import logo from '../../../images/logo.png';
import '../login/login.scss'
import axios from 'axios';
import {login} from '../../../auth';
require('dotenv').config()
const Register = () => {  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
  const [errors, setErrors] = useState(null);
    const register = () =>{
        console.log(email)
        console.log(password)
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signup`,{EMAIL:email,PASSWORD:password})
        .then((response)=>{
            console.log(response)
             setErrors(response.data.message);
             
            <Navigate to="/login"/>
            debugger
        })
        .catch( error => {
            console.log(error)
            // console.log(error.response.data.message);
            setErrors(error.response.data.message);
          })
    }
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
                            <h6>{errors}</h6>
                        </div>
                        <div className='form-group'>
                                <div className='form'>
                                    <label>Email Id:</label>
                                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                                </div>
                                <div className='form'>
                                    <label>Password:</label>
                                    <input type="password" value={password} onChange= {(e)=>setPassword(e.target.value)}></input>
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
                                <div className='login-button' onClick={register}>
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