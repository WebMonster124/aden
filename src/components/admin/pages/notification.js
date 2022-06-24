import React, {useState,useEffect} from 'react';
import {
    Row,
    Col,
    CloseButton 
} from 'react-bootstrap';

import './dashboard.scss';
import './notification.scss';
import { Link } from 'react-router-dom';
import  Sidebar  from './sidebar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import  {new_notification}  from '../../../redux/actions/NotificationstateActions';
const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const dispatch = useDispatch()
    const message = useSelector(state => state.notificationState.newMessage);
    const pusher = new Pusher("be671fa12decfbbb2d96", {
        cluster: "ap3"
      });
      const channel = pusher.subscribe("channel");
      channel.bind("event", (newMessage) => {
        //setMessages([...messages, newMessage]);
        dispatch(new_notification(true))
      }); 
    const close_click= (val,id) =>{
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/notification/update`,{is_read:1,id:id})
        .then((res)=>{
            let tempArr = Array.from(notifications);
            tempArr.splice(tempArr.indexOf(val), 1);
            if (tempArr.length == 0) dispatch(new_notification(false))
            setNotifications(tempArr);
        })
        
    }
    useEffect(()=>{
        
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/notification/get`)
        .then((res)=>{
            dispatch(new_notification(res.data));
            setNotifications(res.data)
            console.log(res.data)
        })
    },[])
   
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
                                        {message  ?
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
                                              {val.notification_types[0]?val.notification_types[0].notification_type:''}
                                            </h5>
                                            <h5 className='noti-content'>
                                                {val.data}
                                            </h5>
                                        </div>
                                        <div className='notification-item__close'>
                                            <CloseButton onClick={()=>close_click(val,val.id)}/>
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