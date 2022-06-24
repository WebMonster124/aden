import React, {useEffect, useState} from 'react';
import {     
    Container,Row, Col
} from 'react-bootstrap';
import { Header } from '../../layout/header';
import './history.scss';
import Filters from '../../../images/Vector.png';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import rider_status from './rider_status_data.js'
import axios from 'axios';
import Map from './Map';
const googleMapsApiKey = "AIzaSyAygoWDQ-IvoehtL-nJ0qVcHnUkVLsN6Ps";
const History = () => {    
    const [selectedId,setSelectedId] = useState(0)
    const [ historyData, setHistoryData]=useState([])
    const [ selectedHistory, setSelectedHistory]= useState({vehicles:[],passenger_infos:[],users:[]})
    const [ places,setPlaces ] =useState([]);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking/get`)
        .then((res)=>{
            setHistoryData(res.data)
        })
    },[])   
    useEffect(()=>{
        setSelectedHistory(historyData[selectedId])
        console.log(historyData);
    },[selectedId,historyData])
    useEffect(()=>{
        console.log(selectedHistory)
        let temp_array=[];
        if (selectedHistory && selectedHistory.pickup_location){
            geocodeByAddress(selectedHistory.pickup_location)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) =>{
                
                temp_array.push({latitude:lat, longitude:lng})
                
            });
            geocodeByAddress(selectedHistory.dropoff_location)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) =>{
                temp_array.push({latitude:lat, longitude:lng})
                console.log(temp_array)
                setPlaces(temp_array)
                
                }
        );
                
        }
    },[selectedHistory])
    useEffect(()=>{
        setPlaces([])
    },[selectedHistory])
    return (
       <div className='history-board'>
           <Header />
           <div class='custom-row'>
                <div className='history'>
                    <div className='history-header'>
                        <p>bookings</p>
                        <div className='filters'>
                            <h6>Filters</h6>
                            <i className='fa fa-filter'></i>
                        </div>
                    </div>
                    <div className='history-content'>
                        {
                            historyData.map((data,key)=>{
                                return(
                                    <div className={ selectedId === key ? 'history-content__wrapper control-body selected' : 'history-content__wrapper control-body'} onClick={()=>setSelectedId(key)} key={key}>
                                        <div className='pickup'>
                                            <div className='title'>Pickup:</div>
                                            <p>{data.pickup_location}</p>
                                        </div>                            
                                        <div className='stop d-flex align-items-center justify-content-between'>
                                            <div className='stop-location'>
                                                <div className='title'>Dropoff:</div>
                                                <p>{data.dropoff_location}</p>
                                            </div>
                                        </div>
                                        <div className='date-time-info'>
                                            <div className='date d-flex justify-content-between'>
                                                <i className="fa fa-calendar-days px-2"></i>
                                                <h6>{data.pickup_date ? data.pickup_date.substring(0,10):''}</h6>
                                            </div>
                                            <div className='time d-flex justify-content-between'>
                                                <i className="fa fa-clock px-2"></i>
                                                <h6>{data.pickup_time}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>   
                <div className="main">
                    <div className='main-location-map'>
                        {places[0] && places[1]?
                        <Map
                            googleMapURL={
                                'https://maps.googleapis.com/maps/api/js?key=' +
                                googleMapsApiKey +
                                '&libraries=geometry,drawing,places'
                            }
                            markers={places}
                            loadingElement={<div style={{height: `100%`}}/>}
                            containerElement={ <div style={{height: "450px",width:'100%'}}/>}
                            mapElement={ <div style={{height: `100%`}}/>}
                            defaultZoom={ 11}
                        />:''}
                    </div>            
                        <div className='main-wrap payment-board'>
                            <div className='journey-vehicle'>
                                {selectedHistory && selectedHistory.vehicles[0]?
                                <div className='journey'>
                                    <div className='header-wrap d-flex justify-content-between'>
                                        <div className='header-text'>Journey</div>
                                        <div className='date-time-wrapper'>
                                            <div className='date d-flex align-items-center'>
                                                <i className="fa fa-calendar-days px-2"></i>
                                                <h6>{selectedHistory.pickup_date?selectedHistory.pickup_date.substring(0,10):''}</h6>
                                            </div>
                                            <div className='time d-flex align-items-center'>
                                                <i className="fa fa-clock px-2"></i>
                                                <h6>{selectedHistory.pickup_time}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pickup'>
                                        <div className='title'>Pickup:</div>
                                        <p>{selectedHistory.pickup_location}</p>
                                    </div>
                                    {selectedHistory.stops ? selectedHistory.stops.map((val,key)=>{
                                        return(
                                        <div className='stop pickup align-items-center justify-content-between' key={key}>
                                                <div className='title'>Stop{key+1}:</div>
                                                <p>{val.address}</p>
                                        </div>)  
                                    }):''}                            
                                                            
                                    <div className='dropoff'>
                                        <div className='title'>Dropoff:</div>
                                        <p>{selectedHistory.dropoff_location}</p>                                
                                    </div>
                                    <div className='passenger-board'>
                                        <Row>
                                            <Col md={4}>
                                                <div className='passenger'>
                                                    <div className='label'>Passenger</div>
                                                    <div className='count'>{selectedHistory.passenger}</div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='childrens'>
                                                    <div className='label'>Childrens</div>
                                                    <div className='count'>{selectedHistory.children}</div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='bags'>
                                                    <div className='label'>Bags</div>
                                                    <div className='count'>{selectedHistory.bags}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='vehicle'>
                                        <div className='label'>Vehicle</div>
                                        <div className='name'>{selectedHistory.vehicles[0].name}</div>
                                    </div>
                                    <Row>
                                        <Col md={6}>
                                            <div className='vehicle'>
                                                <div className='label'>Passenger Name</div>
                                                <div className='name'>{selectedHistory.passenger_infos[0].first_name ? selectedHistory.passenger_infos[0].first_name+' '+selectedHistory.passenger_infos[0].last_name:''}</div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='vehicle'>
                                                <div className='label'>Mobile Number</div>
                                                <div className='name'>{selectedHistory.passenger_infos[0].mobile_phone}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <div className='vehicle'>
                                                <div className='label'>Payment Option</div>
                                                <div className='name'>{selectedHistory.Payment_details[0].payment_method_id === '1' ? 'paypal':'credit card'}</div>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='vehicle'>
                                                <div className='label'>card number</div>
                                                <div className='name'>{selectedHistory.Payment_details[0].card_number}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='dash-line'>
                                        <img src="/images/Line 109.png" width="100%" alt='dashed line'/>
                                    </div>
                                    <div className='estimated-fair'>
                                        <div className='label'>Estimated Fair</div>
                                        <div className='cost'>USD $120</div>
                                    </div>
                                </div>:''}
                            </div>
                            <div className='passenger-control-btn'>
                                
                                <div className='passenger-control'>
                                    <div className='header-text'>Rider Status</div>
                                    {rider_status.map((value,key)=>{
                                        if (value.unread)
                                        return(
                                            <div className={key === 0 ? "rider-status first":'rider-status'} key={key}>
                                                <h5>{value.name}</h5>
                                                <h6>{value.content}</h6>
                                            </div>)
                                        else
                                        return(
                                            <div  key={key} className="rider-status unread">
                                                <h5>{value.name}</h5>
                                                <h6>{value.content}</h6>
                                            </div>
                                        )
                                        }
                                        )
                                    }
                                </div>                                                                
                            </div>
                        </div> 
                </div>
            </div>
       </div>
    )    
};

export { History };