import React, {useState} from 'react';
import {
    Row,
    Col,
    Tabs,
    Tab,
    Form,
    Modal,
    CloseButton
} from 'react-bootstrap';
import logo from '../../../images/Group.png';
import './dashboard.scss';
import './booking.scss'
import driver_img from "../../../images/Ellipse 212.png"
import table_data from './table_data.js';
import { NavLink,Link } from 'react-router-dom';
const Booking = () => {    
    const [searchKey,setSearchKey] = useState();    
    const [modalshow, setModalshow] = useState(false);
    const [modaltitle, setModaltitle] = useState("add new vehicel");
    const handleModalShow = () => {setModalshow(true);setModaltitle('add new vehicle');}
    const handleModalClose = () => setModalshow(false);    
    const [key, setKey] = useState('booking');
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
    return (
        <div className='dashboard'>
            <div className='sidebar'>
                <div className='logo'>
                    <img src={logo} alt="logo"></img>
                </div>
                <div className='menu'>
                    <ul>
                                <li>
                                    <div className='bhhAF'>
                                        
                                        <NavLink to="/admin/dashboard" activeClassName="active" 
                                                style={({ isActive }) =>
                                                isActive
                                                    ? {
                                                        color: '#FBFDFE',
                                                        padding:'10px 10px',
                                                        backgroundColor: '#F4730E',
                                                        borderRadius:'12px'
                                                    }
                                                    : { }
                                                }
                                                >
                                            <i className='fa-th-large fa side-icon'></i>
                                            <span className='item-content'>dashboard
                                            </span>
                                        </NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div className='bhhAF'>
                                        <NavLink to="/admin/vehicle" activeClassName="active" 
                                                style={({ isActive }) =>
                                                isActive
                                                    ? {
                                                        color: '#FBFDFE',
                                                        padding:'10px 10px',
                                                        backgroundColor: '#F4730E',
                                                        borderRadius:'12px'
                                                    }
                                                    : { }
                                                }
                                                >
                                            <i className='fa-car fa side-icon'></i>
                                            <span className='item-content'>Vehicle</span>
                                        </NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div className='bhhAF'>
                                        <NavLink to="/admin/booking" activeClassName="active" 
                                                style={({ isActive }) =>
                                                isActive
                                                    ? {
                                                        color: '#FBFDFE',
                                                        padding:'10px 10px',
                                                        backgroundColor: '#F4730E',
                                                        borderRadius:'12px'
                                                    }
                                                    : { }
                                                }
                                                >
                                            <i className='fa-sticky-note fa side-icon'></i>
                                            <span className='item-content'>Booking</span>
                                        </NavLink>
                                    </div>
                                </li>
                                <li>
                                <div className='bhhAF'>
                                    <NavLink to="/admin/driver" activeClassName="active" 
                                                style={({ isActive }) =>
                                                isActive
                                                    ? {
                                                        color: '#FBFDFE',
                                                        padding:'10px 10px',
                                                        backgroundColor: '#F4730E',
                                                        borderRadius:'12px'
                                                    }
                                                    : { }
                                                }
                                                >            
                                        <i className='fa-users fa side-icon'></i>
                                        <span className='item-content'>Drivers</span>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className='bhhAF'>
                                    <NavLink to="/admin/book_ride" activeClassName="active" 
                                              style={({ isActive }) =>
                                              isActive
                                                ? {
                                                    color: '#FBFDFE',
                                                    padding:'10px 10px',
                                                    backgroundColor: '#F4730E',
                                                    borderRadius:'12px'
                                                  }
                                                : { }
                                            }
                                            >
                                        <i className='fa-car-rear fa side-icon'></i>
                                        <span className='item-content'>Book a ride</span>
                                    </NavLink>
                                </div>
                            </li>
                    </ul>
                </div>
            </div>
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
                                                    {
                                                    table_data.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{val.number}</td>
                                                            <td>{val.pickup}</td>
                                                            <td>{val.drop_off}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.p_number}</td>
                                                            <td>{val.passengers}</td>
                                                            <td>{val.d_time}</td>
                                                            <td>{val.bags}</td>
                                                            <td>{val.vehicle}</td>
                                                        </tr>
                                                    )
                                                    })}
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
                                                    table_data.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{val.number}</td>
                                                            <td>{val.pickup}</td>
                                                            <td>{val.drop_off}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.p_number}</td>
                                                            <td>{val.passengers}</td>
                                                            <td>{val.d_time}</td>
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
                                                    table_data.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{val.number}</td>
                                                            <td>{val.pickup}</td>
                                                            <td>{val.drop_off}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.p_number}</td>
                                                            <td>{val.passengers}</td>
                                                            <td>{val.d_time}</td>
                                                            <td>{val.cancel_status === 1 ? <h6 className='cancelling'>cancel ride</h6>:<h6 className='canceled'>canceled ride</h6>}
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
                                                    table_data.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{val.number}</td>
                                                            <td>{val.pickup}</td>
                                                            <td>{val.drop_off}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.p_number}</td>
                                                            <td>{val.passengers}</td>
                                                            <td>{val.d_time}</td>
                                                            <td><div className='table-price'><input defaultValue={val.price}></input></div>
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
                                                    table_data.map((val, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{val.number}</td>
                                                            <td>{val.pickup}</td>
                                                            <td>{val.drop_off}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.p_number}</td>
                                                            <td>{val.passengers}</td>
                                                            <td>{val.d_time}</td>
                                                            <td>
                                                                <div className='driver-meta'>
                                                                    <div className='img-container'>
                                                                        <img src={driver_img} alt="img"></img>
                                                                    </div>
                                                                    <h5>Jordy Astaws</h5>
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