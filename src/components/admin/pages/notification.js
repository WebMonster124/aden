import React, {useState} from 'react';
import {
    Row,
    Col,
    CloseButton 
} from 'react-bootstrap';
import logo from '../../../images/Group.png';
import './dashboard.scss';
import './notification.scss';
import Notifications from './notification_data.js'
import { NavLink,Link } from 'react-router-dom';


const Notification = () => {
    const [notification, setNotification] = useState(Notifications);

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
                            <h5>dashboard overview</h5>
                            <h5 className='date'>12:15 PM at 5th May 2022</h5>
                        </div>
                        <div className='dropdown'>
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
                        <Row>
                            <Col xs={12}>
                                <div className="notification">
                                    <h4>Notifications</h4>
                                </div>
                            </Col>                         
                        </Row>
                        {
                            notification.map((val, key) => {
                            return (
                                <div className='notification-item' key={key}>
                                    <div className='notification-item__content'>
                                        <h5 className='noti-title'>
                                            {val.title}
                                        </h5>
                                        <h5 className='noti-content'>
                                            {val.content}
                                        </h5>
                                    </div>
                                    <div className='notification-item__close'>
                                        <CloseButton/>
                                    </div>
                                </div>
                            )
                            })
                        } 
                    </div>
                </div>
            </div>
        </div>
    )    
};

export { Notification };