import React, {useEffect, useState} from 'react';
import {     
    Container,Row, Col
} from 'react-bootstrap';
import { Header } from '../../layout/header';
import './payment.scss';

import Select from 'react-select';
import Status_board from '../../layout/Status_board';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import  { Add_passenger_info }  from '../../../redux/actions/PassengerInfostateActions';
import { Link, useNavigate  } from 'react-router-dom';
const Payment = () => {    
    const temp = useSelector(state => state.bookingState.temp_booking);
    const [firstName, setFirstName]=useState();
    const [lastName, setLastName]=useState();
    const [mobileNum, setMobileNum]=useState();
    const [email, setEmail]=useState();
    const [contractName, setContractName]=useState();
    const [aliasSign, setAliasSign]=useState();
    const [cardNumber,setCardNumber]=useState();
    const [year,setYear]=useState();
    const [month,setMonth]=useState();
    const [bookingSaveId,setBookingSaveId]=useState(null);
    const [cardHolder,setCardHolder]=useState();
    const [instruction,setInstruction]=useState();
    const [postalCode, setPostalCode]=useState();
    const [paymentMethod,setPaymentMethod]=useState();
    const [cvv,setCvv]=useState();
    const options =[
        {label:'paypal',value:1},
        {label:'credit card',value:2}
    ]
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickPayment = () => {
        let temp_passenger={}
        temp_passenger.first_name=firstName;
        temp_passenger.last_name = lastName;
        temp_passenger.mobile_phone = mobileNum;
        temp_passenger.email = email;
        temp_passenger.contact_name = aliasSign;
        temp_passenger.alias_namesign = cardNumber;
        console.log(temp_passenger);
        let status;
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/passengerInfo/add/`,temp_passenger)
        .then((res)=>{

        })
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/passengerInfo/add/`,temp_passenger)
        .then((res)=>{
            console.log(res)
            if (res.data.status === 'ok')
            {
                console.log(res.data.id)
                console.log(temp)
                status = res.data.status
                temp.user_info_id = res.data.id
                temp.pickup_location = temp.pick_location;
                
                postToBooking(res.data.id)
                
            }
        })
        
        dispatch(Add_passenger_info(temp_passenger));
    }
    const postToBooking = (id)=>{
        temp.special_instruction = instruction;
        temp.estimate_price = temp.vehicle
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/create`,temp)
            .then((res)=>{
                setBookingSaveId(res.data.id)
                postToPassInfo(res.data.id,id)
                postTostop(res.data.id)
            })
    }
    const postToPassInfo = (id,passenger_id)=>{
        const passengertemp={};
        passengertemp.passenger_id = passenger_id;
        passengertemp.booking_id = id;
        passengertemp.payment_method_id = paymentMethod;
        passengertemp.card_number = cardNumber;
        passengertemp.month = month;
        passengertemp.year = year;
        passengertemp.card_holder = cardHolder;
        passengertemp.postal_code =postalCode;
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/paymentCreate`,passengertemp)
    }
    const postTostop = (id)=>{
        temp.booking_id=id;
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/stopsave`,temp)
        .then((res)=>{
            if (res.data.status === 'ok')
                   postToNotification();
        })
    }
    const postToNotification = () => {
        let tmp_notification = {
            data:'Booking requested',
            is_read: 0,
            notification_type:3

        }
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/notification/create`,tmp_notification)
    }
    return (
       <div className='client-payment'>
           <Header />
            <div className="main">            
                <Container>
                    <Status_board/>
                        <div className='main-wrap payment-board'>
                            <div className='passenger-control-btn'>
                                
                                <div className='passenger-control'>
                                    <div className='header-text'>Passenger Info</div>
                                    <Row>
                                        <Col md={6}>
                                            <div className='input-wrapper'>
                                                <h5>First Name: </h5>
                                                    <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='input-wrapper'>
                                                <h5>Last Name: </h5>
                                                    <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className='input-wrapper'>
                                                <h5>Mobile Num: </h5>
                                                    <input type="text" value={mobileNum} onChange={(e)=>setMobileNum(e.target.value)}/>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='input-wrapper'>
                                                <h5>Email: </h5>
                                                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className='input-wrapper'>
                                                <h5>Contract Name: </h5>
                                                    <input type="text" value={contractName} onChange={(e)=>setContractName(e.target.value)}/>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='input-wrapper'>
                                                <h5>Alias/Name sign:</h5>
                                                    <input type="text" value={aliasSign} onChange={(e)=>setAliasSign(e.target.value)}/>
                                            </div>                                   
                                        </Col>
                                    </Row>
                                    <div className='header-text'>Payment Option</div>
                                    <Row>
                                        <Col md={6}>
                                            <div className='vehicle-type'>
                                                <h5 className='title'>Payment type:</h5>
                                                <Select
                                                    
                                                    onChange={(e) => setPaymentMethod(e.value)}
                                                    options={options}                                            
                                                    isSearchable="true"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className='input-wrapper'>
                                                <h5>Card Number: </h5>
                                                    <input type="number" value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)}/>
                                            </div>
                                        </Col>
                                        <Col md={3}>
                                            <div className='input-wrapper'>
                                                <h5>MM/YY: </h5>
                                                <div className="MM_YY">
                                                    <input type="text" value={month} min="0" onChange={(e)=>setMonth(e.target.value)}/>
                                                    <p>/</p> 
                                                    <input type="text" value={year} min="2000" onChange={(e)=>setYear(e.target.value)}/> 
                                                </div>
                                            </div>                                 
                                        </Col>
                                        <Col md={3}>
                                            <div className='input-wrapper'>
                                                <h5>CVV: </h5>
                                                <div>
                                                    <input type="number" value={cvv} onChange={(e)=>setCvv(e.target.value)} />
                                                </div>
                                            </div>                                
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className='input-wrapper'>
                                                <h5>Card holder Name: </h5>
                                                <input type="text" id="card_holder_name" value={cardHolder} onChange={(e)=>setCardHolder(e.target.value)}/>
                                            </div>                                     
                                        </Col>
                                        <Col md={6}>
                                            <div className='input-wrapper'>
                                                <h5>Card Billing postal Code: </h5>
                                                <input type="text" id="card_billing_code" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}/>
                                            </div>                                       
                                        </Col>
                                    </Row>
                                    <div className='header-text'>Special Instruction</div>
                                    <Row>
                                        <Col md={12}>
                                            <div className='input-wrapper instruction'>
                                                <h5>Instruction: </h5>
                                                <div>
                                                    <textarea type="text" id="instruction" value={instruction} onChange={(e)=>setInstruction(e.target.value)}/>
                                                </div>
                                            </div>                                         
                                        </Col>
                                    </Row>
                                </div>                                                                
                            </div>
                        
                            <div className='journey-vehicle'>
                                <div className='journey'>
                                    <div className='header-wrap d-flex justify-content-between'>
                                        <div className='header-text'>Journey</div>
                                        <div style={{display:'inline-flex'}} className="date-time-wrapper">
                                            <div className='date d-flex align-items-center'>
                                                <i className="fa fa-calendar-days px-2"></i>
                                                <h6>{temp.pickup_date}</h6>
                                            </div>
                                            <div className='time d-flex align-items-center'>
                                                <i className="fa fa-clock px-2"></i>
                                                <h6>{temp.pickup_time? temp.pickup_time:''}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pickup'>
                                        <div className='title'>Pickup:</div>
                                        <p>{temp.pick_location}</p>
                                    </div>
                                    {temp.stop?temp.stop.map((val,key)=>(
                                            <div className='stop d-flex align-items-center justify-content-between'>
                                                <div className='stop-location w-100'>
                                                    <div className='title'>Stop{key}:</div>
                                                    <p>{val}</p>
                                                </div>
                                            </div>
                                        )
                                    ):''}                            
                                                                
                                    <div className='dropoff'>
                                        <div className='title'>Dropoff:</div>
                                            <p>{temp.dropoff_location}</p>                            
                                    </div>
                                    <div className='passenger-board'>
                                        <Row>
                                            <Col md={4}>
                                                <div className='passenger'>
                                                    <div className='label'>Passenger</div>
                                                    <div className='count'>{temp.passenger}</div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='childrens'>
                                                    <div className='label'>Childrens</div>
                                                    <div className='count'>{temp.children}</div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='bags'>
                                                    <div className='label'>Bags</div>
                                                    <div className='count'>{temp.bags}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='vehicle'>
                                        <div className='label'>Vehicle</div>
                                        <div className='name'>{temp.vehicle?temp.vehicle.name:''}</div>
                                    </div>
                                    <Row>
                                        <Col md={6}>
                                            <div className='vehicle'>
                                                <div className='label'>Passenger Name</div>
                                                <div className='name'>{firstName? firstName : ''} {' ' + lastName?lastName:''}</div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='vehicle'>
                                                <div className='label'>Mobile Number</div>
                                                <div className='name'>{mobileNum}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className='vehicle'>
                                                <div className='label'>Payment Option</div>
                                                <div className='name'>{paymentMethod === 1 ?'paypal' : ''}{paymentMethod === 2 ?'credit card' : ''}</div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='vehicle'>
                                                <div className='label'>card number</div>
                                                <div className='name'>{cardNumber}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='dash-line'>
                                        <img src="/images/Line 109.png" width="100%" alt='dashed line'/>
                                    </div>
                                    <div className='estimated-fair'>
                                        <div className='label' onClick={()=>estimate()}>Estimated Fair</div>
                                        <div className='cost'>${temp.vehicle?temp.vehicle.rate:''}</div>
                                    </div>
                                    <div className='btns'>
                                        <div className="back"><Link to='/home'>Go Back</Link></div>
                                        <div className="payment" ><Link to='/payment' onClick={()=>clickPayment()}>book a ride</Link></div>                        
                                    </div>
                                </div>
                            </div>                           
                        </div>
                </Container>      
            </div>
       </div>
    )    
};

export { Payment };