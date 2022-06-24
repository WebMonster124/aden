import {
    Modal,Row,Col,FormControl
} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const Profile_modal = (props) => {
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [address,setAddress]=useState();
    const [postcode,setPostcode]=useState();
    const [country,setCountry]=useState();
    const confirm = (() => {
        let data = {}
        data.first_name = name
        data.email = email
        data.address = address
        data.postcode = postcode
        data.country = country
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/update`,data)
            .then((res)=>{
                props.onHide();
            })
    })
    useEffect(()=>{
        if (props.data)
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/info`,{email:props.data.email})
            .then((res)=>{
                const data = res.data;
                setName(data.username)
                setAddress(data.address)
                setCountry(data.country)
                setPostcode(data.postcode)
                setEmail(data.email)
            })
    },[])
    return (
        <Modal
            show = {props.show}
            onHide = {props.onHide}
            className="profile-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <div className='header-wrap'>
                            <div className='title'>
                                Setup Profile
                            </div>
                            <div className='description'>
                                <h6>Brief us with your personal information so the we can better serve you</h6>
                            </div>
                            <div className="img-wrapper">
                                <img src="images/Ellipse 212.png" width='140px' alt="image22"/>   
                                <div className='i-wrapper'>
                                    <i className='fa fa-camera'></i>
                                 
                                </div>  
                                
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='content-wrap '>
                            <div className='street d-flex input-wrapper align-items-center'>
                                <div className='label'>Name:</div>
                                <input
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div className='city d-flex input-wrapper align-items-center'>
                                <div className='label'>Email:</div>
                                <input
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div className='state d-flex input-wrapper align-items-center'>
                                <div className='label'>Address:</div>
                                <input
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={address}
                                    onChange={(e)=>setAddress(e.target.value)}
                                />
                            </div>
                            <div className='postalcode d-flex input-wrapper align-items-center'>
                                <div className='label'>Postal Code:</div>
                                <input
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={postcode}
                                    onChange={(e)=>setPostcode(e.target.value)}
                                />
                            </div>
                            <div className='country d-flex input-wrapper align-items-center'>
                                <div className='label'>Country:</div>
                                <input
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={country}
                                    onChange={(e)=>setCountry(e.target.value)}
                                />
                            </div>
                            <div className='btns'>
                                <h6 className='update' onClick={()=>confirm()}>Confirm Location</h6>
                                <button type='button' className='edit' onClick={() => props.onHide()}>Cancel</button>
                            </div>
                        </div>
                        
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}