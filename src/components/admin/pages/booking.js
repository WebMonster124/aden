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
import table_data from './table_data.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './sidebar.js'
import { select_booking } from '../../../redux/actions/BookingstateActions';
const Booking = () => {    
    const [searchKey,setSearchKey] = useState();    
    const [modalshow, setModalshow] = useState(false);
    const [modaltitle, setModaltitle] = useState("add new vehicel");
    const handleModalShow = () => {setModalshow(true);setModaltitle('add new vehicle');}
    const handleModalClose = () => setModalshow(false);    
    const [key, setKey] = useState('booking');
    const dispatch = useDispatch(); 
    const [bookings, setBookings] = useState([]);
    const options = [
        {
            value:0,label:'accepted'
        },
        {
            value:1,label:'pending'
        },
        {
            value:2,label:'canceled'
        }
    ]
   
    const handleSearchChange = (e) => {
        setSearchKey(e.value)
    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking/get`)
        .then((res)=>{
            dispatch(select_booking(res.data));
            setBookings(res.data)


        })
    },[])
    console.log(bookings)
    return (
        <div className='dashboard'>
            <Sidebar/>
            <div className='content'>
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
                                        <Tabs
                                            id="controlled-tab-example"
                                            activeKey={key}
                                            onSelect={(k) => setKey(k)}
                                            className="mb-3"
                                            >
                                            <Tab eventKey="booking" title="Booking">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Trip Number</th>
                                                            <th>Pickups</th>
                                                            <th>Drop Off</th>
                                                            <th>Passenger Name</th>
                                                            <th>Passenger Number</th>
                                                            <th>Passengers</th>
                                                            <th>Date & time</th>
                                                            <th>bags</th>
                                                            <th>Vehicle</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            bookings.map((val, key) => {
                                                                console.log(val)
                                                                console.log(val.passenger_infos)
                                                        return (
                                                            <tr key={key}>
                                                                <td>{val.id}</td>
                                                                <td>{val.pickup_location}</td>
                                                                <td>{val.dropoff_location}</td>
                                                                <td>{val.users[0].FIRST_NAME}+{val.users[0].LAST_NAME}</td>
                                                                <td>{val.passenger_infos[0].ID }</td>
                                                                <td>{val.passenger}</td>
                                                                <td>{val.pickup_time}</td>
                                                                <td>{val.bags}</td>
                                                                <td>{val.vehicles[0].name}</td>
                                                            </tr>
                                                        )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </Tab>
                                            <Tab eventKey="booking_status" title="Booking_status">
                                                <table>
                                                    <tr>
                                                        <th>Trip Number</th>
                                                        <th>Pickups</th>
                                                        <th>Drop Off</th>
                                                        <th>Passenger Name</th>
                                                        <th>Passenger Number</th>
                                                        <th>Passengers</th>
                                                        <th>Date & time</th>
                                                        <th>status</th>
                                                    </tr>
                                                    {
                                                    bookings.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{val.id}</td>
                                                            <td>{val.pickup_location}</td>
                                                            <td>{val.dropoff_location}</td>
                                                            <td>{val.passenger_infos[0].FIRST_NAME}+{val.passenger_infos[0].LAST_NAME} </td>
                                                            <td>{val.passenger_infos[0].ID}</td>
                                                            <td>{val.passenger}</td>
                                                            <td>{val.pickup_time}</td>
                                                            <td><Form.Select defaultValue={val.status} className={'name'+val.status}>
                                                            {
                                                                options.map((option, index) => {
                                                                    return (<option key={index}  className={option.label} value={option.value}>{option.label}</option>)
                                                                })
                                                            }
                                                                </Form.Select>
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                    })}
                                                </table>
                                            </Tab>
                                            <Tab eventKey="Cancel_booking" title="Cancel_booking">
                                                <table>
                                                    <tr>
                                                        <th>Trip Number</th>
                                                        <th>Pickups</th>
                                                        <th>Drop Off</th>
                                                        <th>Passenger Name</th>
                                                        <th>Passenger Number</th>
                                                        <th>Passengers</th>
                                                        <th>Date & time</th>
                                                        <th>Cancel Ride</th>
                                                    </tr>
                                                    {
                                                    bookings.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{val.ID}</td>
                                                            <td>{val.pickup_location}</td>
                                                            <td>{val.dropoff_location}</td>
                                                            <td>{val.users[0].FIRTST_NAME}+{val.users[0].LAST_NAME}</td>
                                                            <td>{val.passenger_infos[0].ID}</td>
                                                            <td>{val.passenger}</td>
                                                            <td>{val.pickup_time}</td>
                                                            <td>{val.booking_status === 1 ? <h6 className='cancelling'>cancel ride</h6>:<h6 className='canceled'>canceled ride</h6>}
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                    })}
                                                </table>
                                            </Tab>
                                            <Tab eventKey="fix_price" title="Fix_price">
                                                <table>
                                                    <tr>
                                                        <th>Trip Number</th>
                                                        <th>Pickups</th>
                                                        <th>Drop Off</th>
                                                        <th>Passenger Name</th>
                                                        <th>Passenger Number</th>
                                                        <th>Passengers</th>
                                                        <th>Date & time</th>
                                                        <th>Fix the price</th>
                                                    </tr>
                                                    {
                                                    bookings.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{val.ID}</td>
                                                            <td>{val.pickup_location}</td>
                                                            <td>{val.dropoff_location}</td>
                                                            <td>{val.users[0].FIRTST_NAME}+{val.users[0].LAST_NAME}</td>
                                                            <td>{val.passenger_infos[0].ID}</td>
                                                            <td>{val.passenger}</td>
                                                            <td>{val.pickup_time}</td>
                                                            <td><div className='table-price'><input defaultValue={val.vehicles[0].rate}></input></div>
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                    })}
                                                </table>
                                            </Tab>
                                            <Tab eventKey="driver" title="Driver">
                                            <table>
                                                    <tr>
                                                        <th>Trip Number</th>
                                                        <th>Pickups</th>
                                                        <th>Drop Off</th>
                                                        <th>Passenger Name</th>
                                                        <th>Passenger Number</th>
                                                        <th>Passengers</th>
                                                        <th>Date & time</th>
                                                        <th>Driver</th>
                                                    </tr>
                                                    {
                                                    bookings.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{val.ID}</td>
                                                            <td>{val.pickup_location}</td>
                                                            <td>{val.dropoff_location}</td>
                                                            <td>{val.users[0].FIRTST_NAME}+{val.users[0].LAST_NAME}</td>
                                                            <td>{val.passenger_infos[0].ID}</td>
                                                            <td>{val.passenger}</td>
                                                            <td>{val.pickup_time}</td>
                                                            <td>
                                                                <div className='driver-meta'>
                                                                    <div className='img-container'>
                                                                        <img src={driver_img} alt="img"></img>
                                                                    </div>
                                                                    <h5>{val.users[0].FIRST_NAME} {val.users[0].LAST_NAME}</h5>
                                                                    <h6>reassign</h6>   
                                                                </div>
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
        </div>
    )    
};

export { Booking };