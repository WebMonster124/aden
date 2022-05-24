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
import Profile_user from '../../../images/profile-user.png';
import Shopping_bag from '../../../images/shopping-bag.png';
import vehicle_data from '../../admin/pages/vehicle_data';
import './vehicle.scss';

const Vehicles = () => {    

    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [selectedCar, setSelectedCar] = useState(0);
    const [filtershow,setFilterShow] =  useState(false);
    const [vehicles,setVehicles] = useState(vehicle_data)
    const sort_options = [
        {value:0,label:'DES'},
        {value:1,label:'ASC'}
    ]
    const handleChange = (e) => {        
        setSelectedOption(e.value);
    }
    const appy_sort = (vehicle_data) => {
        let temp = vehicle_data.filter((val)=>val.Name === selectedOption);
        temp.sort()
        if (selectedSortOption)
            temp.reverse()
        setVehicles(temp)
    }
    const car_names=[{value:"GMS_SUV",label:"GMS_SUV"},{value:"Sedan",label:'Sedan'},{value:"Chevrolate",label:"Chevrolate"},{value:"Rolls Royee",label:"Rolls Royee"}];

    return (
       <div className='client-vehicle'>
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
                                            <div className='date-time-wrapper'>
                                                <div className='date d-flex align-items-center'>
                                                    <i className="fa fa-calendar-days px-2"></i>
                                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                                                </div>
                                                <div className='time d-flex align-items-center'>
                                                    <i className="fa fa-clock px-2"></i>
                                                    <input type="time" value={time} onChange={(time) => setTime(time)}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pickup'>
                                            <div className='title'>Pickup:</div>
                                            <p>As Directed -SD CA</p>
                                        </div>                            
                                        <div className='stop d-flex align-items-center justify-content-between'>
                                            <div className='stop-location w-100'>
                                                <div className='title'>Stop1:</div>
                                                <p>Sanata Monica</p>
                                            </div>
                                        </div>                            
                                        <div className='dropoff'>
                                            <div className='title'>Dropoff:</div>
                                                <p>Sanata Monica</p>                            
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
                                            <div className='name'>{selectedCar.Name}</div>
                                        </div>
                                        <div className='estimated-fair'>
                                            <div className='label'>Estimated Fair</div>
                                            <div className='cost'>{selectedCar.Rate}</div>
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
                                                    options={car_names}                                            
                                                    isSearchable="true"
                                                    className='w-100'
                                                />
                                            </div>
                                            <div className='sort-by'>
                                                <div className='title'>Sort by:</div>
                                                <Select
                                                    defaultValue={selectedSortOption}
                                                    onChange={(e) => setSelectedSortOption(e.value)}
                                                    options={sort_options}                                            
                                                    isSearchable="true"
                                                    className='w-100'
                                                />
                                            </div>
                                            <button type="button" className='apply' onClick={()=>appy_sort(vehicle_data)}>Apply</button>
                                        </div>:''}                                
                                    </div>
                                    { vehicles.map((val, key)=>{
                                        return(
                                        <div className='vehicle' key={key} onClick={()=>setSelectedCar(val)}>
                                            <img src={val.image} alt="vehicle1" />
                                            <div className='content'>
                                                <div className='content-wrap-1'>
                                                    <div className='car-name'>{val.Name}</div>
                                                    <div className='car-cost'>{val.Rate}</div>
                                                </div>
                                                <div className='content-wrap-2'>
                                                    <img src={Profile_user} alt="profile user" />
                                                    <button className='user-count'>6</button>
                                                    <img src={Shopping_bag} alt="shopping bag" />
                                                    <button className='bag-count'>6</button>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })}                           
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