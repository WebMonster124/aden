import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {     
    Container,Row,Col   
} from 'react-bootstrap';

import { Header } from '../../layout/header';
import Filters from '../../../images/filters.png';
import Vehicle_1 from '../../../images/vehicle1.png';
import Profile_user from '../../../images/profile-user.png';
import Shopping_bag from '../../../images/shopping-bag.png';

import './vehicle.scss';

const Vehicles = () => {    

    const [startDate, setStartDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState(null);
    const [filtershow,setFilterShow] =  useState(false);
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
                    <div className='main-wrap vehicle-wrap'>
                        <Row>
                            <Col md = {5}>
                                <div className='journey-vehicle'>
                                    <div className='journey'>
                                        <div className='header-wrap d-flex'>
                                            <div className='header-text'>Journey</div>
                                            <div className='date d-flex align-items-center'>
                                                <i className="fa fa-calendar-days px-2"></i>
                                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                                            </div>
                                            <div className='time d-flex align-items-center'>
                                                <i className="fa fa-clock px-2"></i>
                                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                                            </div>
                                        </div>
                                        <div className='pickup'>
                                            <div className='title'>Pickup:</div>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={(e) => handleChange(e)}
                                                options={options}
                                                placeholder="Enter location"
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
                                            <div className='passenger'>
                                                <div className='label'>Passenger</div>
                                                <div className='count'>3</div>
                                            </div>
                                            <div className='childrens'>
                                                <div className='label'>Childrens</div>
                                                <div className='count'>3</div>
                                            </div>
                                            <div className='bags'>
                                                <div className='label'>Bags</div>
                                                <div className='count'>3</div>
                                            </div>
                                        </div>
                                        <div className='vehicle'>
                                            <div className='label'>Vehicle</div>
                                            <div className='name'>Sedan</div>
                                        </div>
                                        <div className='estimated-fair'>
                                            <div className='label'>Estimated Fair</div>
                                            <div className='cost'>USD $120</div>
                                        </div>
                                    </div>
                                    <div className='btns'>
                                        <div className="back"><Link to='/home'>Go Back</Link></div>
                                        <div className="payment"><Link to='/payment'>Continue to Payment</Link></div>                        
                                    </div>
                                </div>
                            </Col>
                            <Col md = {7}>
                                <div className='vehicles'>
                                    <div className='header-wrap'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='wrap-title'>Vehicles</div>
                                            <div className='filters' onClick={()=>{setFilterShow(true)}}>Filters
                                                <img src={Filters} alt="filters" />
                                            </div>
                                        </div>
                                        {filtershow ?
                                        <div className='sort-wrap'>
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
                                            <div className='sort-by'>
                                                <div className='title'>Sort by:</div>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={(e) => handleChange(e)}
                                                    options={options}                                            
                                                    isSearchable="true"
                                                    className='w-100'
                                                />
                                            </div>
                                            <button type="button" className='apply'>Apply</button>
                                        </div>:''}                                
                                    </div>                           
                                    <div className='vehicle'>
                                        <img src={Vehicle_1} alt="vehicle1" />
                                        <div className='content'>
                                            <div className='content-wrap-1'>
                                                <div className='car-name'>GMC SUV</div>
                                                <div className='car-cost'>USD $120</div>
                                            </div>
                                            <div className='content-wrap-2'>
                                                <img src={Profile_user} alt="profile user" />
                                                <button className='user-count'>6</button>
                                                <img src={Shopping_bag} alt="shopping bag" />
                                                <button className='bag-count'>6</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='vehicle'>
                                        <img src={Vehicle_1} alt="vehicle1" />
                                        <div className='content'>
                                            <div className='content-wrap-1'>
                                                <div className='car-name'>GMC SUV</div>
                                                <div className='car-cost'>USD $120</div>
                                            </div>
                                            <div className='content-wrap-2'>
                                                <img src={Profile_user} alt="profile user" />
                                                <button className='user-count'>6</button>
                                                <img src={Shopping_bag} alt="shopping bag" />
                                                <button className='bag-count'>6</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='vehicle'>
                                        <img src={Vehicle_1} alt="vehicle1" />
                                        <div className='content'>
                                            <div className='content-wrap-1'>
                                                <div className='car-name'>GMC SUV</div>
                                                <div className='car-cost'>USD $120</div>
                                            </div>
                                            <div className='content-wrap-2'>
                                                <img src={Profile_user} alt="profile user" />
                                                <button className='user-count'>6</button>
                                                <img src={Shopping_bag} alt="shopping bag" />
                                                <button className='bag-count'>6</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='vehicle'>
                                        <img src={Vehicle_1} alt="vehicle1" />
                                        <div className='content'>
                                            <div className='content-wrap-1'>
                                                <div className='car-name'>GMC SUV</div>
                                                <div className='car-cost'>USD $120</div>
                                            </div>
                                            <div className='content-wrap-2'>
                                                <img src={Profile_user} alt="profile user" />
                                                <button className='user-count'>6</button>
                                                <img src={Shopping_bag} alt="shopping bag" />
                                                <button className='bag-count'>6</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='vehicle'>
                                        <img src={Vehicle_1} alt="vehicle1" />
                                        <div className='content'>
                                            <div className='content-wrap-1'>
                                                <div className='car-name'>GMC SUV</div>
                                                <div className='car-cost'>USD $120</div>
                                            </div>
                                            <div className='content-wrap-2'>
                                                <img src={Profile_user} alt="profile user" />
                                                <button className='user-count'>6</button>
                                                <img src={Shopping_bag} alt="shopping bag" />
                                                <button className='bag-count'>6</button>
                                            </div>
                                        </div>
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

export { Vehicles };