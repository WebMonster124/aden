import React,{useState} from 'react';
import { Link,Navigate } from 'react-router-dom';
import {
    Row,
    Col,
} from 'react-bootstrap';
import { Form, Field } from 'react-final-form';

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
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signup`,{email:email,password:password})
        .then((response)=>{
            console.log(response)
             setErrors(response.data.message);  
             
            <Navigate to="/login"/>
        })
        .catch( error => {
            console.log(error)
            // console.log(error.response.data.message);
            setErrors(error.response.data.message);
          })
    }
    const validate = values => {
        let errors = {};
        // if (!values.first_name) {
        //   errors.first_name = "First Name is required";
        // }
        // if (!values.last_name) {
        //   errors.last_name = "Last Name is required";
        // }
        if (!values.email) {
          errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
        // if (!values.password_confirmation) {
        //   errors.password_confirmation = "Confirm Password is required";
        // }
        // if (values.password !== values.password_confirmation) {
        //   errors.password_confirmation = "Confirm Password did not match";
        // }
        return errors;
      };
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
                        <Form
                            onSubmit={register}
                            validate={validate}
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form className="form" onSubmit={handleSubmit}>
                                {errors && 
                                <div className="alert alert-danger fade show w100" role="alert">
                                <div className="alert__content">
                                    <ul>
                                    {
                                    Object.keys(errors).map(function(k){
                                        return <li key={k}>{errors[k]}</li>
                                    })
                                    }
                                    </ul>
                                </div>
                                </div>}

                                {/* <Field name="first_name">
                                {({ input, meta }) => (
                                    <div className="form__form-group">
                                    <span className="form__form-group-label">First Name</span>
                                        <div className="form__form-group-field">
                                        <div className="form__form-group-icon">
                                            <AccountCircleOutlineIcon />
                                        </div>
                                        <div className="form__form-group-row">
                                            <input type="text" {...input} placeholder="First Name" />
                                            {meta.touched && meta.error && <span className="form__form-group-error">{meta.error}</span>}
                                        </div>
                                    </div>
                                    </div>
                                )}
                                </Field> */}

                                {/* <Field name="last_name">
                                {({ input, meta }) => (
                                    <div className="form__form-group">
                                    <span className="form__form-group-label">Last Name</span>
                                        <div className="form__form-group-field">
                                        <div className="form__form-group-icon">
                                            <AccountCircleOutlineIcon />
                                        </div>
                                        <div className="form__form-group-row">
                                            <input type="text" {...input} placeholder="Last Name" />
                                            {meta.touched && meta.error && <span className="form__form-group-error">{meta.error}</span>}
                                        </div>
                                    </div>
                                    </div>
                                )}
                                </Field> */}

                                <Field name="email">
                                {({ input, meta }) => (
                                    <div className="form__form-group">
                                    <span className="form__form-group-label">Email</span>
                                        <div className="form__form-group-field">
                                        {/* <div className="form__form-group-icon">
                                            <EmailOutlineIcon />
                                        </div> */}
                                        <div className="form__form-group-row">
                                            <input type="text" {...input} placeholder="Email" />
                                            {meta.touched && meta.error && <span className="form__form-group-error">{meta.error}</span>}
                                        </div>
                                    </div>
                                    </div>
                                )}
                                </Field>

                                <Field name="password">
                                {({ input, meta }) => (
                                    <div className="form__form-group">
                                    <span className="form__form-group-label">Password</span>
                                        <div className="form__form-group-field">
                                        {/* <div className="form__form-group-icon">
                                            <LockOutlineIcon />
                                        </div> */}
                                        <div className="form__form-group-row">
                                            <input type="text" {...input} placeholder="Password" />
                                            {meta.touched && meta.error && <span className="form__form-group-error">{meta.error}</span>}
                                        </div>
                                    </div>
                                    </div>
                                )}
                                </Field>
{/* 
                                <Field name="password_confirmation">
                                {({ input, meta }) => (
                                    <div className="form__form-group">
                                    <span className="form__form-group-label">Confirm Password</span>
                                        <div className="form__form-group-field">
                                        <div className="form__form-group-icon">
                                            <LockOutlineIcon />
                                        </div>
                                        <div className="form__form-group-row">
                                            <input type="text" {...input} placeholder="Confirm Password" />
                                            {meta.touched && meta.error && <span className="form__form-group-error">{meta.error}</span>}
                                        </div>
                                    </div>
                                    </div>
                                )}
                                </Field> */}

                                {/* <button type="submit" className="btn btn-outline-primary account__btn account__btn--small" >Submit</button> */}
                                {/* <Link onSubmit={} className="btn btn-outline-primary account__btn account__btn--small" to="/signup">Create Account</Link> */}

                                {/* <div className="text-center w100"><span className="form__form-group-label">Already have an account ?</span> <Link to="/login">Log In</Link></div> */}
                            </form>
                            )}
                            />
                        <div className='form-group'>
                                {/* <div className='form'>
                                    <label>Email Id:</label>
                                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                                </div>
                                <div className='form'>
                                    <label>Password:</label>
                                    <input type="password" value={password} onChange= {(e)=>setPassword(e.target.value)} required></input>
                                </div> */}
                                <div className="remember">
                                    {/* <Form.Check type="checkbox" className='checkbox' label="Remember me" /> */}
                                    <label>
                                        <input type='checkbox'/>
                                        <span></span>
                                        Remember Me
                                    </label>
                                    <Link to={{pathname:'/'}} style={{textDecoration:'none'}}>Forgot Password?</Link>
                                </div>
                                <div className='login-button' type="submit" onClick={register}>
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