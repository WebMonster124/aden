import React, {useState,useEffect} from 'react';
import {
    Row,
    Col,
    Tabs,
    Tab,
    Form,
    Modal,
    CloseButton
} from 'react-bootstrap';
import './dashboard.scss';
import axios from 'axios';
import './booking.scss'
import driver_img from "../../../images/Ellipse 212.png"
import { Link } from 'react-router-dom';
import Sidebar from './sidebar.js'
import { select_booking } from '../../../redux/actions/BookingstateActions';
import { new_notification } from '../../../redux/actions/NotificationstateActions'
import CustomSelect from '../components/customSelect';
import Confirm_modal from '../modal/confirm_modal'
import Notification_modal from '../modal/notification_modal';
import { useDispatch, useSelector } from 'react-redux'
const Booking = () => {    
    const [searchKey,setSearchKey] = useState();    
    const [confirmModalShow, setConfirmModalShow] = useState(false)
    const handleConfirmModalClose = () => setConfirmModalShow(false)
    const [modalshow, setModalshow] = useState(false);
    const [modaltitle, setModaltitle] = useState("add new vehicel");
    const handleModalShow = () => {setModalshow(true);setModaltitle('add new vehicle');}
    const handleModalClose = () => setModalshow(false);    
    const [key, setKey] = useState('booking');
    const [bookings, setBookings] = useState([]);
    const [options,setOptions] = useState([]); 
    const handleNotificationModalClose = () => setNotificationModalShow(false)
    const [ notificationModalShow, setNotificationModalShow ]=useState(false)
    const handleSearchChange = (e) => {
        setSearchKey(e.value)
    }
    const dispatch = useDispatch()
    const message = useSelector(state => state.notificationState.newMessage);
    const pusher = new Pusher("be671fa12decfbbb2d96", {
        cluster: "ap3"
      });
      const channel = pusher.subscribe("channel");
      channel.bind("event", (newMessage) => {
        dispatch(new_notification(true))
      }); 
    const initial_function = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking/get`)
        .then((res)=>{
            dispatch(select_booking(res.data));
            setBookings(res.data)
        })
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/notification/get`)
        .then((res)=>{
            
            if (res.data.length > 0)
                dispatch(new_notification(true));
            
        })
    }
    useEffect(()=>{
        initial_function()
    },[])
    
    const [ buttonActive, setButtonactive]=useState(false);
    const [ deleteButtonActive, setDeleteButtonActive]=useState(false)
    const [ booking_status,setBooking_status] = useState();
    const [ price , setPrice ] = useState();
    const [ cancelStatus, setCancelStatus ] = useState([]);
    const [ cancelId, setCancelId ] = useState()
    useEffect(()=>{
        console.log(message)
    },[message])
    const postToNotification = (data) => {
        let tmp_notification = {
            data:data,
            is_read: 0

        }
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/notification/create`,tmp_notification)
    }
    const cancel_booking = () => {
        setConfirmModalShow(false)
        if (cancelId && buttonActive && cancelStatus)
                    axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/update`,{id:cancelId,booking_status: 3})
                    .then((res)=>{
                        dispatch(select_booking(res.data));
                        setBookings(res.data)
                        postToNotification('Booking cancelled')
                        setNotificationModalShow(true);
                    })
    }
    const booking_delete = () => {
        let temp_array = [];
        bookings.map((val)=>{
            if (val.active)
                { 
                    temp_array.push(val.id)
                }
            if (temp_array.length > 0)
                axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/delete`,{temp_array:temp_array})
                .then((res)=>{
                    initial_function();
                    postToNotification('Booking deleted');
                })
        })
    }
    const [ confirmModalContent, setConfirmModalContent] = useState('')
    const [ confirmModalTitle, setconfirmModalTitle] = useState('')
    const [ confirmButtonName, setConfirmButtonName ] = useState('')
    const updateBookingRecord = () => {
        console.log(key)
        
        let id;let estimate_price;
            bookings.map((val)=>{
                if (val.active)
                    { id=val.id
                        setCancelId(val.id)
                    estimate_price=val.estimate_price}
            })
            debugger
        switch (key){
            case 'booking_status':
                if (id && buttonActive)
                    axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/update`,{id:id,booking_status: booking_status})
                    .then((res)=>{
                        dispatch(select_booking(res.data));
                        setBookings(res.data)
                        
                        postToNotification('Booking Status Updated')
                    })

                break
            case 'Cancel_booking':
                    setConfirmModalContent('"Do you want to cancel this ride ?"');
                    setConfirmModalShow(true);
                    setconfirmModalTitle('Cancel the ride')
                    setConfirmButtonName('Cancel')
                break
            case 'driver':
                    setConfirmModalContent('"Do you want to Reassign this ride ?"');
                    setConfirmModalShow(true);
                    setconfirmModalTitle('Reassign the ride')
                    setConfirmButtonName('Reassign')
            case 'fix_price':
                if (id && buttonActive)
                    axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/update`,{id:id,estimate_price: estimate_price})
                    .then((res)=>{
                        dispatch(select_booking(res.data));
                        setBookings(res.data)
                        postToNotification('Price has been fixed')
                    })
                break
        }
    }
    useEffect(()=>{
        let temp_array = Array.from(bookings)
        let count = 0;
        temp_array.map((val)=>{
            if (val.active)
                count++
        })

        if (count > 0)
            setDeleteButtonActive(true)
        else
            setDeleteButtonActive(false)
        if (count === 1)
            setButtonactive(true);
        else 
            setButtonactive(false);
        
    },[bookings])
    return (
        <div className='dashboard'>
            <Sidebar/>
            <div className='content admin-booking'>
                <div className='content-panel'>
                    <div className='content-panel__heading'>
                        <div className='caption'>
                            <h5>booking</h5>
                            <h5 className='date'>12:15 PM at 5th May 2022</h5>
                        </div>
                        <div className='dropdown'>
                            <div className='nav-item'>
                                <div className='search'>
                                    <input type="text" value={searchKey} onChange={handleSearchChange} placeholder="search.."/>
                                    <i className='fa fa-search'></i>
                                </div>
                            </div>
                            <div className='nav-item'>
                                <div className='button' onClick={handleModalShow}>
                                    <i className='fa fa-plus'></i>
                                    <h6>Add vehicle</h6>
                                </div>
                            </div>
                            <div className='nav-item'>
                                <div className='svg-container'>
                                    <Link to="/admin/notification">
                                        <i className='fa fa-bell'></i>
                                        { message  ?
                                        <span className='indicator'></span>:''}
                                    </Link>
                                </div>
                            </div>
                            <div className='nav-item'>
                                <div className='user-container'>
                                    <i className='fa fa-user'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content-panel__content'>
                        <Row style={{marginTop:'50px'}}>
                            <Col xs={12}>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='btns'>
                                            <h6 className={buttonActive ? 'update active' : 'update'} onClick={updateBookingRecord}>
                                                update
                                                <i className="fas fa-chevron-down"></i>
                                            </h6>
                                            <h6 className={deleteButtonActive? 'delete active':'delete' } onClick={booking_delete}>delete</h6>
                                        </div>
                                        <Tabs
                                            id="controlled-tab-example"
                                            activeKey={key}
                                            onSelect={(k) => setKey(k)}
                                            className="mb-3"
                                            >
                                           
                                            <Tab eventKey="booking" title="Bookings">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th> <Form.Check.Input
                                                                    type={"checkbox"}
                                                                    checked={false}
                                                                    disabled
                                                                 />
                                                            </th>
                                                            <th>Trip Number</th>
                                                            <th>Pickups</th>
                                                            <th>Drop Off</th>
                                                            <th>Passenger Name</th>
                                                            <th>Passenger Number</th>
                                                            <th>Passengers</th>
                                                            <th>Date & time</th>
                                                            <th>Vehicle</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            bookings.map((val, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>
                                                                     <Form.Check
                                                                    type={"checkbox"}
                                                                    checked={val.active}
                                                                    onChange={(e) => {
                                                                        let temp_array = Array.from(bookings);
                                                                        e.target.checked?temp_array[key].active = true:temp_array[key].active = false;
                                                                        setBookings(temp_array);
                                                                    }}
                                                                />
                                                                </td>
                                                                <td>{val.id}</td>
                                                                <td>{val.pickup_location}</td>
                                                                <td>{val.dropoff_location}</td>
                                                                <td>{val.passenger_infos[0].first_name}</td>
                                                                <td>{val.passenger_infos[0].id }</td>
                                                                <td>{val.passenger}</td>
                                                                <td>{val.pickup_time}</td>
                                                                <td>{val.vehicles[0].name}</td>
                                                            </tr>
                                                        )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </Tab>
                                            <Tab eventKey="booking_status" title="Booking status">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th> <Form.Check.Input
                                                                    type={"checkbox"}
                                                                    defaultChecked={false}
                                                                    disabled
                                                                 />
                                                            </th>
                                                            <th>Trip Number</th>
                                                            <th>Pickups</th>
                                                            <th>Drop Off</th>
                                                            <th>Passenger Name</th>
                                                            <th>Passenger Number</th>
                                                            <th>Passengers</th>
                                                            <th>Date & time</th>
                                                            <th>status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                   
                                                    bookings.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>
                                                                     <Form.Check
                                                                    type={"checkbox"}
                                                                    checked={val.active}
                                                                    onChange={(e) => {
                                                                        let temp_array = Array.from(bookings);
                                                                        e.target.checked?temp_array[key].active = true:temp_array[key].active = false;
                                                                        setBookings(temp_array);
                                                                    }}
                                                                />
                                                                </td>
                                                            <td>{val.id}</td>
                                                            <td>{val.pickup_location}</td>
                                                            <td>{val.dropoff_location}</td>
                                                            <td>{val.passenger_infos[0].first_name}</td>
                                                            <td>{val.passenger_infos[0].id}</td>
                                                            <td>{val.passenger}</td>
                                                            <td>{val.pickup_time}</td>
                                                            <td>
                                                                <CustomSelect options={options} value={val.booking_status} function={setBooking_status}></CustomSelect>
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                    })}
                                                    </tbody>
                                                </table>
                                            </Tab>
                                            <Tab eventKey="Cancel_booking" title="Cancel booking">
                                                <table>
                                                    <thead>
                                                        <tr> 
                                                            <th>
                                                                <Form.Check.Input
                                                                        type={"checkbox"}
                                                                        defaultChecked={false}
                                                                        disabled
                                                                    />
                                                            </th>
                                                            <th>Trip Number</th>
                                                            <th>Pickups</th>
                                                            <th>Drop Off</th>
                                                            <th>Passenger Name</th>
                                                            <th>Passenger Number</th>
                                                            <th>Passengers</th>
                                                            <th>Date & time</th>
                                                            <th>Cancel Ride</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                             bookings.map((val, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>
                                                                        <Form.Check
                                                                        type={"checkbox"}
                                                                        checked={val.active}
                                                                        onChange={(e) => {
                                                                            let temp_array = Array.from(bookings);
                                                                            e.target.checked?temp_array[key].active = true:temp_array[key].active = false;
                                                                            setBookings(temp_array);
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>{val.id}</td>
                                                                <td>{val.pickup_location}</td>
                                                                <td>{val.dropoff_location}</td>
                                                                <td>{val.passenger_infos[0].first_name}</td>
                                                                <td>{val.passenger_infos[0].id}</td>
                                                                <td>{val.passenger}</td>
                                                                <td>{val.pickup_date}<br/>
                                                                    {val.pickup_time}
                                                                </td>
                                                                <td className='cancel-status'>{val.booking_status != 3 ?
                                                                        <h6 className={cancelStatus[key] ? 'canceled':'cancelling'} 
                                                                        onClick={()=>{ 
                                                                            let temp_array = Array.from(cancelStatus);
                                                                            cancelStatus[key]  ? 
                                                                                temp_array[key]=false
                                                                                :temp_array[key]=true
                                                                            setCancelStatus(temp_array)
                                                                            }}
                                                                        > {cancelStatus[key] ? 'cancelled status':'cancel ride'}
                                                                        </h6>
                                                                    :<h6 className='canceled'>canceled ride</h6>}
                                                                </td>
                                                                
                                                            </tr>
                                                        )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </Tab>
                                            <Tab eventKey="fix_price" title="Fix booking price">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th> <Form.Check.Input
                                                                        type={"checkbox"}
                                                                        defaultChecked={false}
                                                                        disabled
                                                                    />
                                                            </th>
                                                            <th>Trip Number</th>
                                                            <th>Pickups</th>
                                                            <th>Drop Off</th>
                                                            <th>Passenger Name</th>
                                                            <th>Passenger Number</th>
                                                            <th>Passengers</th>
                                                            <th>Date & time</th>
                                                            <th>Fix the price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                        bookings.map((val, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>
                                                                        <Form.Check
                                                                        type={"checkbox"}
                                                                        checked={val.active}
                                                                        onChange={(e) => {
                                                                            let temp_array = Array.from(bookings);
                                                                            e.target.checked?temp_array[key].active = true:temp_array[key].active = false;
                                                                            setBookings(temp_array);
                                                                        }}
                                                                    />
                                                                </td>
                                                            <td>{val.id}</td>
                                                            <td>{val.pickup_location}</td>
                                                            <td>{val.dropoff_location}</td>
                                                            <td>{val.passenger_infos[0].first_name}</td>
                                                            <td>{val.passenger_infos[0].id}</td>
                                                            <td>{val.passenger}</td>
                                                            <td>{val.pickup_time}</td>
                                                            <td><div className='table-price'>
                                                                    <input 
                                                                    value={'$'+val.estimate_price} 
                                                                    onChange={(e)=>{
                                                                        let  temp_array =Array.from(bookings);
                                                                        temp_array[key].estimate_price = e.target.value;
                                                                        setBookings(temp_array)
                                                                    }}>

                                                                    </input>
                                                                </div>
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </Tab>
                                            <Tab eventKey="driver" title="Driver">
                                            <table>
                                                    <tr>
                                                        <th> <Form.Check.Input
                                                                    type={"checkbox"}
                                                                    defaultChecked={false}
                                                                    disabled
                                                                 />
                                                        </th>
                                                        <th>Trip Number</th>
                                                        <th>Pickups</th>
                                                        <th>Drop Off</th>
                                                        <th>Passenger Name</th>
                                                        <th>Date & time</th>
                                                        <th>Driver</th>
                                                        <th></th>
                                                    </tr>
                                                    {
                                                    bookings.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>
                                                                     <Form.Check
                                                                    type={"checkbox"}
                                                                    checked={val.active}
                                                                    onChange={(e) => {
                                                                        let temp_array = Array.from(bookings);
                                                                        e.target.checked?temp_array[key].active = true:temp_array[key].active = false;
                                                                        setBookings(temp_array);
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>{val.id}</td>
                                                            <td>{val.pickup_location}</td>
                                                            <td>{val.dropoff_location}</td>
                                                            <td>{val.passenger_infos[0].first_name}</td>
                                                            <td>{val.pickup_date}<br/>
                                                                {val.pickup_time}
                                                            </td>
                                                            <td>
                                                                <div className='driver-meta'>
                                                                    <div className='img-container'>
                                                                        <img src={driver_img} alt="img"></img>
                                                                    </div>
                                                                    <h5>{val.passenger_infos[0].first_name} {val.passenger_infos[0].last_name}</h5>
                                                                      
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <h6 className='reassign'>reassign</h6> 
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                    })}
                                                </table>
                                            </Tab>
                                            
                                        </Tabs>
                                    </div>
                                </div>
                            </Col>                         
                        </Row>
                    </div>
                </div>
            </div>
            <Modal className="modal" show={modalshow} dialogClassName="modal-100w" onHide={handleModalClose}>
                <Modal.Body>
                   <Row>
                       <Col md={6}>
                          <div className='modal-left'>
                              <h5>{modaltitle}</h5>
                              <h6>add image</h6>
                              <div className='modal-left__thumb'>
                                <img src='/images/177-1779544_2018-gmc-yukon-denali-luxury-suv-ultimate-black 5.png' alt="img"/>   
                                <CloseButton/>            
                              </div>
                          </div>                        
                       </Col>
                       <Col md={6}>
                           <div className='modal-right'>
                               <div className='input-wrapper'>
                                   <h5>Name</h5>
                                   <input type="text" value="GMC SUV"></input>                 
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Rate</h5>
                                    <input type="text" value="$120"></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Max Passenger</h5>
                                    <input type="text" value="8"></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Max Bags</h5>
                                    <input type="text" value="5"></input>
                               </div>
                               <h6 className='update'>{modaltitle}</h6>
                           </div>
                       </Col>
                   </Row>
                </Modal.Body>
            </Modal>
            <Confirm_modal classProp="modal" content={confirmModalContent} button_name={confirmButtonName} modalTitle={confirmModalTitle} delete_vehicle={cancel_booking} show={confirmModalShow} onHide={handleConfirmModalClose}>
            </Confirm_modal> 
            <Notification_modal content="Rider has been Cancelled Successfully" modalTitle="Rider Canceled" show={notificationModalShow} onHide={handleNotificationModalClose}></Notification_modal>                                 
        
        </div>
    )    
};

export { Booking };