import React, {useState} from 'react';
import {     
    Container,Row, Col
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { Header } from '../../layout/header';
import './payment.scss';

import Select from 'react-select';
import { Link } from 'react-router-dom';
const Payment = () => {    
    const [startDate, setStartDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const handleChange = (e) => {        
        setSelectedOption(e.value)
    }
    return (
       <div>
           <Header />
            <div className="main">            
                <Container>
                    <div className='status-board'>
                        <div className='where-when'>Where and When</div>
                        <div className='where-when-status'></div>
                        <div className='vehicle'>Vehicle Selection</div>
                        <div className='vehicle-status'></div>
                        <div className='payment-confirmation'>Payment & Confirmation</div>
                    </div>
                    <div className='main-wrap payment-board'>
                        <Row>
                            <Col md={5}>
                                <div className='journey-vehicle'>
                                    <div className='journey'>
                                        <div className='header-wrap d-flex justify-content-between'>
                                            <div className='header-text'>Journey</div>
                                            <div style={{display:'inline-flex'}}>
                                                <div className='date d-flex align-items-center'>
                                                    <i className="fa fa-calendar-days px-2"></i>
                                                    <h6>05/22/2022</h6>
                                                </div>
                                                <div className='time d-flex align-items-center'>
                                                    <i className="fa fa-clock px-2"></i>
                                                    <h6>09:30 AM</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pickup'>
                                            <div className='title'>Pickup:</div>
                                            <Select
                                                onChange={(e) => handleChange(e)}
                                                options={options}
                                                value={"3348 Mulberry Lane, Boynton Beach, United States"}
                                                isSearchable="true"
                                                className='w-100'
                                            />
                                        </div>                            
                                        <div className='stop d-flex align-items-center justify-content-between'>
                                            <div className='stop-location w-100'>
                                                <div className='title'>Stop1:</div>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={(e) => handleChange(e)}
                                                    options={options}
                                                    placeholder="Enter location"
                                                    isSearchable="true"
                                                    className='w-100'
                                                />
                                            </div>
                                        </div>                            
                                        <div className='dropoff'>
                                            <div className='title'>Dropoff:</div>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(e) => handleChange(e)}
                                                options={options}
                                                placeholder="Enter location"
                                                isSearchable="true"
                                                className='w-100'
                                            />                                
                                        </div>
                                        <div className='passenger-board'>
                                            <Row>
                                                <Col md={4}>
                                                    <div className='passenger'>
                                                        <div className='label'>Passenger</div>
                                                        <div className='count'>3</div>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className='childrens'>
                                                        <div className='label'>Childrens</div>
                                                        <div className='count'>3</div>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className='bags'>
                                                        <div className='label'>Bags</div>
                                                        <div className='count'>3</div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='vehicle'>
                                            <div className='label'>Vehicle</div>
                                            <div className='name'>Sedan</div>
                                        </div>
                                        <Row>
                                            <Col md={6}>
                                                <div className='vehicle'>
                                                    <div className='label'>Passenger Name</div>
                                                    <div className='name'>Sedan</div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='vehicle'>
                                                    <div className='label'>Mobile Number</div>
                                                    <div className='name'>123-456-7890</div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <div className='vehicle'>
                                                    <div className='label'>Payment Option</div>
                                                    <div className='name'>Credit Card</div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='vehicle'>
                                                    <div className='label'>card number</div>
                                                    <div className='name'>xxxx xxxx xxxx 9999</div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className='estimated-fair'>
                                            <div className='label'>Estimated Fair</div>
                                            <div className='cost'>USD $120</div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={7}>
                                <div className='passenger-control-btn'>
                                    
                                    <div className='passenger-control'>
                                        <div className='header-text'>Journey</div>
                                        <Row>
                                            <Col md={6}>
                                                <div className='input-wrapper'>
                                                    <h5>First Name: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='input-wrapper'>
                                                    <h5>Last Name: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <div className='input-wrapper'>
                                                    <h5>Mobile Num: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='input-wrapper'>
                                                    <h5>Email: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <div className='input-wrapper'>
                                                    <h5>Contract Name: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='input-wrapper'>
                                                    <h5>Alias/Name sign:: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>                                   
                                            </Col>
                                        </Row>
                                        <div className='header-text'>Payment Option</div>
                                        <Row>
                                            <Col md={12}>
                                                <div className='vehicle-type'>
                                                    <div className='title'>Vehicle type:</div>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={(e) => handleChange(e)}
                                                        options={options}                                            
                                                        isSearchable="true"
                                                        className='w-100'
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='input-wrapper'>
                                                    <h5>Card Number: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <div className='input-wrapper'>
                                                    <h5>MM/YY: </h5>
                                                    <input type="text" value="sedan"/> 
                                                </div>                                 
                                            </Col>
                                            <Col md={3}>
                                                <div className='input-wrapper'>
                                                    <h5>CVV: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>                                
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <div className='input-wrapper'>
                                                    <h5>Card holder Name: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>                                     
                                            </Col>
                                            <Col md={6}>
                                                <div className='input-wrapper'>
                                                    <h5>Card Billing postal Code: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>                                       
                                            </Col>
                                        </Row>
                                        <div className='header-text'>Special Instrunction</div>
                                        <Row>
                                            <Col md={12}>
                                                <div className='input-wrapper'>
                                                    <h5>Instruction: </h5>
                                                    <input type="text" value="sedan"/>
                                                </div>                                         
                                            </Col>
                                        </Row>
                                    </div>                                                                
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>      
            </div>
       </div>
    )    
};

export { Payment };