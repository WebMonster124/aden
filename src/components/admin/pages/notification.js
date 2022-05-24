import React, {useState} from 'react';
import {
    Row,
    Col,
    CloseButton 
} from 'react-bootstrap';

import './dashboard.scss';
import './notification.scss';
import Notifications from './notification_data.js'
import { Link } from 'react-router-dom';
import  Sidebar  from './sidebar'
const Notification = () => {
    const [notification, setNotification] = useState(Notifications);
    const close_click= (val) =>{
        let tempArr = Array.from(notification);
        tempArr.splice(tempArr.indexOf(val), 1);
        setNotification(tempArr);
    
    }
    return (
        <div className='dashboard'>
            <Sidebar/>
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
                                <div className='notification-item' key={key} onClick={()=>close_click(val)}>
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