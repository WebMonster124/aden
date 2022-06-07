import React, { useState , createContext,useMemo, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import Randomstring from "randomstring";
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import {
    Nav,
    Container,
    Modal,
    FormControl,
    Row,
    Col
} from 'react-bootstrap';

import { Header } from '../../layout/header';
import AutoComplete from './Autocomplete';
import LocationCheck from '../../../images/location-check.png';
import Trash from '../../../images/trash.png';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux'
import  {select_booking,save_temp_booking}  from '../../../redux/actions/BookingstateActions';
import axios from 'axios';
import Status_board from '../../layout/Status_board';
export const UserContext = createContext();
const Home = () => {
    const temp = useSelector(state => state.bookingState.temp_booking);
    const [selectedOption, setSelectedOption] = useState(temp.pick_location);
    const [startDate, setStartDate] = useState(temp.pick_date);
    const [isSwitchOn, setIsSwitchOn] = useState(temp.isSwitchOn);
    const [stopNum, setStopNum] = useState([{ id: Randomstring.generate(10) }]);
    const [modalShow, setModalShow] = useState(false);
    const [passenger, setPassenger] = useState( temp.passenger? temp.passenger:3);
    const [children, setChildren] = useState(temp.children?temp.children:3);
    const [bag, setBag] = useState(temp.bag? temp.bag:3);
    const [key, setKey] = useState('address');
    const [methodkey, setMethodKey] = useState('transfer');
    const [startTime, setStartTime] = useState(temp.pick_time);
    const [dropoff,setDropoff] =useState(temp.dropoff_location);
   // const [stop,setStop]=useState(temp.stop?temp.stop:[]);
    const [stop,setStop]=useState([]);
    const [mapInstance, setMapInstance] =  useState();
    const [mapApi,setMapApi] =useState();
    const [dropoffAddress,setDropoffAddress]=useState();
    const [pickupAddress,setPickupAddress]=useState();
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const _onClick = (value) => {
        // setLat(value.lat)
        // setLng(value.lng)
    }
    const setCurrentLocation = (()=>{   
        
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter([position.coords.latitude, position.coords.longitude])
            });
        }
    })
    const apiHasLoaded = (map, maps) => {
        setMapapitLoaded(true)
        setMapApi(maps)
        setMapInstance(map)
        _generateAddress();
    };
    const switch_onChange_handle = () => {
        setIsSwitchOn(!isSwitchOn);
    };
    const updateStop = (rowId, data) => {
        stop.filter(function (value, index, arr){
            //Row to update
            if(value.id == rowId){
             return {address: data}
            }else{
             return {...value}
            }
           })
           setStop([]);
    }
   
    const addStop = () => {
        setStopNum([...stopNum, { id: Randomstring.generate(10) }]);
    }

    const deleteStop = (id) => {
        const filter = stopNum.filter(item => item.id !== id)
        setStopNum(filter);
    }
    const _generatePickupAddress=((id)=> {
        if (mapApi)
        {const geocoder = new mapApi.Geocoder;

            geocoder.geocode({ 'location': { lat: pickuplat, lng: pickuplng } }, (results, status) => {
                
                if (status === 'OK') {
                    if (results[0]) {
                        setZoom(6);
                        setPickupAddress(results[0].formatted_address );
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }

            });
        }
    })
    const _generateDropoffAddress=((id)=> {
        
        if (mapApi)
        {const geocoder = new mapApi.Geocoder;
            
            geocoder.geocode({ 'location': { lat: dropofflat, lng: dropofflng } }, (results, status) => {
                
                if (status === 'OK') {
                    if (results[0]) {
                        setZoom(12);
                        setDropoffAddress(results[0].formatted_address );
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }

            });
        }
    })
    const _generateAddress=((id)=> {
        
        if (mapApi)
        {const geocoder = new mapApi.Geocoder;
            
            geocoder.geocode({ 'location': { lat: pickuplat, lng: pickuplng } }, (results, status) => {
                
                if (status === 'OK') {
                    if (results[0]) {
                        setZoom(12);
                        setPickupAddress(results[0].formatted_address );
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }

            });
        }
    })
    const onMarkerInteraction = (childKey, childProps, mouse) => {
        setLat(mouse.lat);
        setLng(mouse.lng);
        setDraggable(false)
    }
    const onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        setState({ draggable: true });

    }

    const _onChange = ({ center, zoom }) => {
        setCenter(center);
        setZoom(zoom);

    }
  
    const [geoCoder,setGeoCoder]=useState();
    const [center,setCenter]=useState([]);
    const [address,setAddress]=useState();
    const [draggable,setDraggable]=useState(true);
    const [pickuplat,setPickupLat]=useState();
    const [dropofflat,setDropoffLat] = useState();
    const [pickuplng,setPickupLng]=useState();
    const [dropofflng,setDropoffLng]=useState();
    const [stopplace,setStopPlace] = useState([]);
    const [place,setPlaces]=useState();
    const [zoom,setZoom]=useState();
    const [mapApiLoaded,setMapapitLoaded] = useState(false)
    
    const addPickupPlace = (place) => {
        
 
        setPickupLat(place.geometry.location.lat())
        setPickupLng(place.geometry.location.lng())
        _generatePickupAddress()
    };
    const addDropoffPlace = (place) => {
        
        
        setDropoffLat(place.geometry.location.lat())
        setDropoffLng(place.geometry.location.lng())
        _generateDropoffAddress()
    };
    const addStopPlace = (place) => {
        setStopPlace([...stopplace, {lat: place.geometry.location.lat(),lng:place.geometry.location.lng()}])
        _generateAddress()
    }
    const booking = useSelector(state => state.bookingState); 
    const login_status = useSelector(state =>state.userState.login_status)
    const dispatch = useDispatch();
    const select_vehicle = (() => {
        let temp_booking={}
        temp_booking.pick_date = startDate;
        temp_booking.pick_time = startTime;
        temp_booking.pick_location = selectedOption;
        temp_booking.passenger =  passenger;
        temp_booking.children = children;
        temp_booking.bag = bag;
        temp_booking.dropoff_location = dropoff;
        temp_booking.stop = stop
        temp_booking.isSwitchOn = isSwitchOn;
        dispatch(save_temp_booking(temp_booking))
    })
    useEffect (()=>{
        _generateDropoffAddress();
    },[dropofflat,dropofflng])
    useEffect (()=>{
        _generatePickupAddress();
    },[pickuplat,pickuplng])
    const [hours,setHours] = useState(0);
    const [mins, setMins] = useState(20);
    useEffect(()=>{
        setCurrentLocation();
    },[])
    useEffect(()=>{
        
        if (login_status){
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking/get`)
            .then((res)=>{
                dispatch(select_booking(res.data));
            })
            
        }},[login_status]);
    return (
        <div className='home'>
            <Header />
            <div className="main">
                <Container>
                    
                    <Status_board/>
                    <Row>
                        <Col md={6}>
                            <div className='control-board'>
                                <div className='location-control'>
                                    <div className='control-header'>
                                        <div className='pickup-method'>
                                            <h5 className={key == 'address'? "active":''} onClick={()=>{setKey("address")}}>Address</h5>
                                            <h5 className={key == 'airport'? "active":''} onClick={()=>{setKey("airport")}}>Airport</h5>
                                            <h5 className={key == 'landmark'? "active":''} onClick={()=>{setKey("landmark")}}>Landmark</h5>
                                        </div>
                                        <div className='control-btns'>
                                            <Nav defaultActiveKey="/#" as="div">
                                                    <h5 className={methodkey === "transfer"? 'nav-link active':'nav-link'} onClick={()=>{setMethodKey("transfer")}}><i className="fa fa-location-dot"></i>Transfer</h5>                                              
                                                    <h5 className={methodkey === "hourly"? 'nav-link active':'nav-link'} onClick={()=>{setMethodKey("hourly")}}><i className="fa fa-clock"></i>Hourly</h5>
                                            </Nav>
                                        </div>
                                    </div>
                                    <div className='control-body'>
                                        <div className='pickup'>
                                            <div className='title'>Pickup:</div>
                                            {mapApi?<AutoComplete map={mapInstance} mapApi={mapApi} setValue={setSelectedOption} addplace={addPickupPlace} type={'pickup'}/>:''}
                                            <div className='check' onClick={() => setModalShow(true)} ><img src={LocationCheck} alt="location-check" /></div>
                                        </div>
                                        {stopNum.map((item, index) => (
                                            <div className='stop d-flex align-items-center justify-content-between' key={item.id}>
                                                <div className='stop-location w-100'>
                                                    <div className='title'>Stop{index + 1}:</div>
                                                    {mapApi?<AutoComplete map={mapInstance} mapApi={mapApi} value={stop} setValue={setStop} addplace={addStopPlace} id={index} type={'stop'}/>:''}
                                                    <div className='check' onClick={() => setModalShow(true)} > <img src={LocationCheck} alt="location-check" /> </div>
                                                </div>
                                                
                                                <div className='trash' onClick={() => deleteStop(item.id)}><img src={Trash} alt="trash" /></div>
                                            </div>
                                        ))}
                                        <div className='dropoff'>
                                            <div className='title'>Dropoff:</div>
                                             {mapApi?<AutoComplete map={mapInstance} mapApi={mapApi} setValue={setDropoff} addplace={addDropoffPlace} type={'dropoff'}/>:''}
                                            <div className='check'><img src={LocationCheck} alt="location-check" /></div>
                                        </div>
                                        <div className='field-wrap'>
                                            <div className='ride-now'>RIDE NOW
                                                <Toggle
                                                    defaultChecked={isSwitchOn}
                                                    icons={false}
                                                    onChange={() => switch_onChange_handle()}
                                                />
                                            </div>
                                            <div className='add-stop' onClick={() => addStop()}><i className="fa fa-plus"></i>Add Stop</div>
                                        </div>
                                            <div className='date-time'>
                                                <div className='date'>
                                                    <div className='title'>Pickup date:</div>
                                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                                </div>
                                                <div className='time'>
                                                    <div className='title'>Pickup time:</div>
                                                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                                </div>
                                            </div>
                                            {isSwitchOn ?
                                                <div className="hour-min-input">
                                                    <div className='hour-input'>
                                                        <h5 onClick={()=>{ parseInt(hours) > 0 ? setHours(hours-1):setHours(0)}}>-</h5>
                                                        <input type="number" value={hours} onChange = {(e)=>setHours(e.target.value)}/>
                                                        <h5 onClick={()=>{setHours(hours+1)}}>+</h5>
                                                    </div>
                                                    <div className='hour-input'>
                                                        <h5 onClick={()=>{ parseInt(mins) > 0 ? setMins(mins-1):setMins(0)}}>-</h5>
                                                        <input type="number" value={mins} onChange = {(e)=>setMins(e.target.value)}/>
                                                        <h5 onClick={()=>{setMins(mins+1)}}>+</h5>
                                                    </div>
                                                </div>
                                            : ""}
                                    </div>
                                </div>
                                <div className='passenger-control-btn'>
                                    <div className='passenger-control'>
                                        <Row>
                                            <Col md={4}>
                                                <div className='passenger'>
                                            <div className='label'>Passengers</div>
                                            <div className='body'>
                                                <span className='count'>{passenger}</span>
                                                <div className='btns'>
                                                    <button type='button' className='minus' onClick={() => { passenger>0? setPassenger(passenger - 1):setPassenger(0) }} ><i className='fa-solid fa-minus'></i></button>
                                                    <button type='button' className='plus' onClick={() => { setPassenger(passenger + 1) }} ><i className='fa fa-plus'></i></button>
                                                </div>

                                            </div>
                                                </div>
                                            </Col>
                                            <Col md={4}>
                                                <div className='childrens'>
                                            <div className='label' onClick={select_vehicle}>Childrens</div>
                                            <div className='body'>
                                                <span className='count'>{children}</span>
                                                <div className='btns'>
                                                    <button type='button' className='minus' onClick={() => { children>0 ? setChildren(children - 1):setChildren(0) }}><i className='fa fa-minus'></i></button>
                                                    <button type='button' className='plus' onClick={() => { setChildren(children + 1) }}><i className='fa fa-plus'></i></button>
                                                </div>
                                            </div>
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className='bags'>
                                            <div className='label'>Bags</div>
                                            <div className='body'>
                                                <span className='count'>{bag}</span>
                                                <div className='btns'>
                                                    <button type='button' className='minus' onClick={() => { bag> 0 ? setBag(bag - 1):setBag(0) }}><i className='fa fa-minus'></i></button>
                                                    <button type='button' className='plus' onClick={() => { setBag(bag + 1) }}><i className='fa fa-plus'></i></button>
                                                </div>

                                            </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Link to='/vehicles' className='select-vehicle' onClick ={select_vehicle} >Select Vehicle</Link>
                                </div>
                                
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='location-map'>
                                <GoogleMapReact
                                    center={center? center:[0,0]}
                                    zoom={zoom?zoom:17}
                                    draggable={true}
                                    onChange={_onChange}
                                    onChildMouseDown={onMarkerInteraction}
                                    onChildMouseUp={onMarkerInteractionMouseUp}
                                    onChildMouseMove={onMarkerInteraction}
                                    onChildClick={() => console.log('child click')}
                                    onClick={_onClick}
                                    styles=  {
                                        [ {  featureType:'water',  stylers:[{color:'#46bcec'},{visibility:'on'}] },
                                          {  featureType:'landscape',  stylers:[{color:'#f2f2f2'}] },
                                          {  featureType:'road',  stylers:[{saturation:-100},{lightness:45}] },
                                          {  featureType:'road.highway',  stylers:[{visibility:'simplified'}] },
                                          {  featureType:'road.arterial',  elementType:'labels.icon',  stylers:   [{visibility:'off'}] },
                                          {  featureType:'administrative',  elementType:'labels.text.fill',  stylers:   [{color:'#444444'}] },{  featureType:'transit',  stylers:[{visibility:'off'}] },{  featureType:'poi',   stylers:[{visibility:'off'}] }
                                        ]}
                                    bootstrapURLKeys={{
                                        key: 'AIzaSyAygoWDQ-IvoehtL-nJ0qVcHnUkVLsN6Ps',
                                        libraries: ['places', 'geometry'],
                                    }}
                                    yesIWantToUseGoogleMapApiInternals
                                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                                >
                                    </GoogleMapReact>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
};

export { Home };