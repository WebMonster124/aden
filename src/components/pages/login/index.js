import React,{useState} from 'react';
import { Link, Navigate} from 'react-router-dom';
import {
    Row,
    Col,
} from 'react-bootstrap';
import logo from '../../../images/logo.png';
import './login.scss'
import axios from 'axios';
import {login} from '../../../auth';
require('dotenv').config()
import  {fetchUserLogin}  from '../../../redux/actions/UserstateActions';
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const login_status = useSelector(state => state.userState.login_status); 
    const dispatch = useDispatch();
    const login_clicked = () =>{
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signin`,{EMAIL:email,PASSWORD:password})
        .then((res)=>{
            if (res.status == 200){
                console.log(res.data    )
                dispatch(fetchUserLogin(true))
                login(res.data);
            }
            <Navigate to="/home" />
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
                            <h3>Log in</h3>
                            <h5>Get in to the pannel by system</h5>
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
                            <div className='login-button'>
                                <Link to={{pathname:'/home'}} onClick={login_clicked}>
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