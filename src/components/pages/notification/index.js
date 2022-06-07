import React, {useState,useEffect} from 'react';
import {
    Row,
    Col,
    CloseButton 
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../layout/header';
import  {select_notification}  from '../../../redux/actions/NotificationstateActions';
import axios from 'axios';
const Notification = () => {
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);
    const close_click= (val) =>{
        let tempArr = Array.from(notifications);
        tempArr.splice(tempArr.indexOf(val), 1);
        setNotifications(tempArr);
        
    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/notification/get`)
        .then((res)=>{
            dispatch(select_notification(res.data));
            setNotifications(res.data)
            console.log(res.data)
        })
    },[])
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
                                notifications.map((val, key) => {
                                return (
                                    <div className='notification-item' key={key}>
                                        <div className='notification-item__content'>
                                            <h5 className='noti-title'>
                                              {val.notification_types[0].notification_type}
                                            </h5>
                                            <h5 className='noti-content'>
                                                {val.data}
                                            </h5>
                                        </div>
                                        <div className='notification-item__close'>
                                            <CloseButton onClick={()=>close_click(val)}/>
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