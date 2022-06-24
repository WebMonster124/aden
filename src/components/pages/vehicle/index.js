import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import {     
    Container,Row,Col   
} from 'react-bootstrap';

import { Header } from '../../layout/header';
import Filters from '../../../images/filters.png';
import Profile_user from '../../../images/profile-user.png';
import Shopping_bag from '../../../images/shopping-bag.png';
import './vehicle.scss';
import { useDispatch, useSelector } from 'react-redux'
import  {select_vehicle}  from '../../../redux/actions/VehiclestateActions';
import axios from 'axios';
import  {save_temp_booking}  from '../../../redux/actions/BookingstateActions';
import Status_board from '../../layout/Status_board';
const Vehicles = () => {    
    const temp = useSelector(state => state.bookingState.temp_booking);
    const [startDate, setStartDate] = useState(temp.pickup_date? temp.pickup_date :"");
    const [time, setTime] = useState(temp.pickup_time?temp.pickup_time:"")
    const [selectFilterOption, setSelectFilterOption] = useState(null);
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [selectedCar, setSelectedCar] = useState(0);
    const [filtershow,setFilterShow] =  useState(false);
    const [selectedOption,setSelectedOption] = useState(temp.pick_location);
    const [dropoff,setDropoff] =useState(temp.dropoff_location);
    const [passenger,setPassenger] = useState( temp.passenger? temp.passenger:3);
    const [children,setChildren] = useState(temp.children?temp.children:3);
    const [bag,setBag] = useState(temp.bags? temp.bags:3);
    const [stop,setStop]=useState(temp.stop?temp.stop:[]);
    const dispatch = useDispatch();
    const [carNames,setCarNames] = useState([]);
    const sort_options = [
        {value:0,label:'DES'},
        {value:1,label:'ASC'}
    ]
    const appy_sort = (vehicle_data) => {
        
        let temp = vehicle_data.filter((val)=>val.name === selectFilterOption.label);
        temp.sort()
        if (selectedSortOption)
            temp.reverse()
        setVehicles(temp)
    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/vehicle/get`)
        .then((res)=>{
            dispatch(select_vehicle(res.data));
            setVehicles(res.data);
            
        })

    },[])
    useEffect(()=>{
        console.log(temp)
        
            if (temp.pickup_location){
                setCarNames(temp);
                setSelectedOption(temp.pickup_location);
                setDropoff(temp.dropoff_location);
                setPassenger( temp.passenger);
                setChildren(temp.children);
                setBag(temp.bags);
                setStop(temp.stop);
            }
    },[temp])
    const vehicle_data = useSelector(state => state.vehicleState.vehicle);
    const [vehicles,setVehicles] = useState(vehicle_data)
    
    const clickPayment=((tm)=>{
        
        tm.vehicle_id = selectedCar.id
        dispatch(save_temp_booking({...tm, vehicle : selectedCar,vehicle_id:selectedCar.id}));
    })
    return (
       <div className='client-vehicle'>
           <Header />
            <div className="main">            
                <Container>
                    <Status_board/>
                    <div className='main-wrap vehicle-wrap'>
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
                                            defaultValue={selectFilterOption}
                                            onChange={(e) => setSelectFilterOption(e)}
                                            options={carNames}                                            
                                            isSearchable="true"
                                            // className='w-100'
                                        />
                                    </div>
                                    <div className='sort-by'>
                                        <div className='title'>Sort by:</div>
                                        <Select
                                            defaultValue={selectedSortOption}
                                            onChange={(e) => setSelectedSortOption(e.value)}
                                            options={sort_options}                                            
                                            isSearchable="true"
                                        />
                                    </div>
                                    <button type="button" className='apply' onClick={()=>appy_sort(vehicle_data)}>Apply</button>
                                </div>:''}                                
                            </div>
                            { vehicles.map((val, key)=>{
                                console.log(val)
                                return(
                                <div className='vehicle' key={key} onClick={()=>setSelectedCar(val)}>
                                    <img src={`${process.env.REACT_APP_IMAGE_BASE_URL+val.Imgurls[0].name}`} alt="vehicle1" />
                                    <div className='content'>
                                        <div className='content-wrap-1'>
                                            <div className='car-name'>{val.name}</div>
                                            <div className='car-cost'>USD ${val.rate}</div>
                                        </div>
                                        <div className='content-wrap-2'>
                                            <img src={Profile_user} alt="profile user" />
                                            <button className='user-count'>{val.max_passenger}</button>
                                            <img src={Shopping_bag} alt="shopping bag" />
                                            <button className='bag-count'>{val.max_bags}</button>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}                           
                        </div>
                        <div className='journey-vehicle control-body'>
                            <div className='journey'>
                                <div className='header-wrap d-flex'>
                                    <div className='header-text'>Journey</div>
                                    <div className='date-time-wrapper'>
                                        <div className='date d-flex align-items-center'>
                                            <i className="fa fa-calendar-days px-2"></i>
                                            <p>{startDate}</p>
                                        </div>
                                        <div className='time d-flex align-items-center'>
                                            <i className="fa fa-clock px-2"></i>
                                            <p>{time}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='pickup'>
                                    <div className='title'>Pickup:</div>
                                    <p>{selectedOption}</p>
                                </div> 
                                    {stop.map((val,index)=>{
                                        return(
                                            <div className='stop d-flex align-items-center justify-content-between'>
                                                <div className='stop-location w-100'>
                                                    <div className='title'>Stop{index+1}:</div>
                                                    <p>{val}</p>
                                                </div>
                                            </div> 
                                        )
                                    })}                           
                                <div className='dropoff'>
                                    <div className='title'>Dropoff:</div>
                                        <p>{dropoff}</p>                            
                                </div>
                                <div className='passenger-board'>
                                    <div className='passenger'>
                                        <div className='label'>Passenger</div>
                                        <div className='count'>{passenger}</div>
                                    </div>
                                    <div className='childrens'>
                                        <div className='label'>Childrens</div>
                                        <div className='count'>{children}</div>
                                    </div>
                                    <div className='bags'>
                                        <div className='label'>Bags</div>
                                        <div className='count'>{bag}</div>
                                    </div>
                                </div>
                                <div className='vehicle'>
                                    <div className='label'>Vehicle</div>
                                    <div className='name'>{selectedCar.name}</div>
                                </div>
                                <div className='dash-line'>
                                    <img src="/images/Line 109.png" width="100%" alt='dashed line'/>
                                </div>
                                <div className='estimated-fair'>
                                    
                                    <div className='label' >Estimated Fair</div>
                                    <div className='cost'>USD ${selectedCar.rate}</div>
                                </div>
                            </div>
                            <div className='btns'>
                                <div className="back"><Link to='/home'>Go Back</Link></div>
                                <div className="payment" ><Link to='/payment' onClick={()=>clickPayment(temp)}>Continue to Payment</Link></div>                        
                            </div>
                        </div>
                    </div>                                     
                </Container>    
            </div>
       </div>
    )    
};

export { Vehicles };