import React, {useState} from 'react';
import {
    Row,
    Col,
    CloseButton 
} from 'react-bootstrap';
import Notifications from './notification_data.js'
import { Header } from '../../layout/header';

const Notification = () => {
    const [notification, setNotification] = useState(Notifications);
    const close_click= (key) =>{
        setNotification(Notification);
    }
    return (
        <div className='client-dashboard'>
            <Header />
            <div className='dashboard'>
                
                <div className='content'>
                    <div className='content-panel'>
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
                                            <CloseButton onClick={close_click(key)}/>
                                        </div>
                                    </div>
                                )
                                })
                            } 
                        </div>
                    </div>
                </div>
            </div>
        </div>
                        
    )    
};

export { Notification };