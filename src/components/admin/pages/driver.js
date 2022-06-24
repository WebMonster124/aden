import React, {useState,useEffect} from 'react';
import {
    Row,
    Col,  
    Form, 
    Modal,
    CloseButton,
    ModalTitle
} from 'react-bootstrap';
import './driver.scss';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { fetchdrivers } from '../../../redux/actions/UserstateActions';
import DriverModal from '../modal/driver_modal'
import Confirm_modal from '../modal/confirm_modal'
import Notification_modal from '../modal/notification_modal';
const Driver = () => {   
    const [searchKey,setSearchKey] = useState();   
    const [modalshow, setModalshow] = useState(false);
    const [nextmodalshow, setNextModalshow] = useState(false);
    const [ notificationModalShow, setNotificationModalShow ]=useState(false)
    const handleNotificationModalClose = () => setNotificationModalShow(false)
    const [modaltitle, setModaltitle] = useState("add new driver");
    const handleModalShow = () => 
        {   
            
            setModalshow(true);
            setModaltitle('add new driver');
        }
    const nexthandleModalShow = () => {handleModalClose();setNextModalshow(true);setModaltitle('Recomendation & Submission');}
    const handleModalClose = () => setModalshow(false);
    const nexthandleModalClose = () => setNextModalshow(false);
    const [ modalData, setModalData ] = useState()
    const [modalID, setModalID] = useState();
    const [confirmModalShow, setConfirmModalShow] = useState(false)
    const handleConfirmModalClose = () => setConfirmModalShow(false)
    const handleUpdateModal = (val) => {
        setModalshow(true);
        setModalData(val);
        setModaltitle('Update Driver Information')
    } 
    const [deleteId,setDeleteId] = useState();
    const [drivers,setDrivers] = useState(null);
    const dispatch = useDispatch()
    const [driverKey, setDriverKey]=useState();
    const getDrivers = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/driver/get`)
        .then((res)=>{
            dispatch(fetchdrivers(res.data));
            setDrivers(res.data)
            
        })
    }
    const delete_driver_modal = (id) =>{
        setDeleteId(id);
        setDriverKey(null)
        setConfirmModalShow(true)
    }
    const delete_driver = () => {
        setConfirmModalShow(false)
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/driver/delete`,{id:deleteId})
        .then((res)=>{
            if (res.status === 200){
                
                getDrivers()
                setNotificationModalShow(true);
            }

        })
    }
    useEffect(()=>{
        if(!drivers){
            getDrivers();
        }
    },[])
    return (
        <div className='dashboard'>
            <Sidebar/>
            <div className='driver content'>
                <div className='content-panel'>
                    <div className='content-panel__heading'>
                        <div className='caption'>
                            <h5>Drivers</h5>
                            <h5 className='date'>12:15 PM at 5th May 2022</h5>
                        </div>
                        <div className='dropdown'>
                            <div className='nav-item'>
                                <div className='search'>
                                    <input type="text" value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} placeholder="search.."/>
                                    <i className='fa fa-search'></i>
                                </div>
                            </div>
                            <div className='nav-item'>
                                <div className='button' onClick={handleModalShow}>
                                    <i className='fa fa-plus'></i>
                                    <h6>Add driver</h6>
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
                            <Col xs={8}>
                                <div className='card'>
                                    <div className='card-body'>
                                    <div className='card-body__header'>
                                            <div className='caption'>
                                                <h5 style={{textTransform:'capitalize'}}>Drivers</h5>
                                            </div>
                                    </div>
                                    <div className='card-body__content'>
                                        <table className='driver'>
                                            <tr>
                                                <th> 
                                                    <Form.Check.Input
                                                        type={"checkbox"}
                                                        checked={false}
                                                        disabled
                                                    />
                                                </th>
                                                <th>Profile Pic</th>
                                                <th>Name</th>
                                                <th>Driver Number</th>
                                                <th>Availability</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            {
                                            drivers?.map((val, key) => {
                                            return (
                                                <tr key={key} >
                                                    <td onClick={()=>setDriverKey(key)}>
                                                            <Form.Check
                                                        type={"checkbox"}
                                                        
                                                        
                                                    />
                                                    </td>
                                                    <td onClick={()=>setDriverKey(key)}><img src={`${process.env.REACT_APP_IMAGE_BASE_URL+val.Imgurls[0].name}`} style={{width:'60px',height:'60px',borderRadius:'50%'}}alt="image44"></img></td>
                                                    <td onClick={()=>setDriverKey(key)}>{val.first_name} {val.last_name}</td>
                                                    <td onClick={()=>setDriverKey(key)}>{val.id}</td>
                                                    <td><h6 className={val.availability}>{val.bookings? 'On Duty':"Off Duty"}</h6></td>
                                                    <td><h6 className='delete' onClick={()=>delete_driver_modal(val.id)}>Delete</h6></td>
                                                    <td><h6 className='update' onClick={()=>handleUpdateModal(val)}>Update</h6></td>
                                                </tr>
                                            )
                                            })}
                                        </table>
                                    </div>
                                    </div>
                                </div>
                            </Col>  
                            <Col xs={4}>
                            <div className='card driver-info'>
                                    <div className='card-body'>
                                    <div className='card-body__header'>
                                            <div className='caption'>
                                                <h5 style={{textTransform:'capitalize'}}>Driver's ride</h5>
                                            </div>
                                    </div>
                                    {driverKey != null?
                                    drivers[driverKey].Bookings?
                                    <div className='card-body__content'>
                                        <div className='meta'>
                                            <div style={{display:'flex',alignItems:'center'}}>
                                                <img src={`${process.env.REACT_APP_IMAGE_BASE_URL+drivers[driverKey].Imgurls[0].name}`} width="60px" height="60px" alt="image77"/>
                                            </div>
                                            <div className='info'>
                                                <h6 className='name'>{drivers[driverKey].first_name} {drivers[driverKey].last_name}</h6>
                                                <div className="date">
                                                    <i className='fa fa-calendar'></i>
                                                    <h6>{drivers[driverKey].Bookings[0].pickup_date}</h6>
                                                </div>
                                                <div className='time'>
                                                    <i className='fa fa-clock'></i>
                                                    <h6>{drivers[driverKey].Bookings[0].pickup_time}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='info'>
                                            <div className='wrapper'>
                                                <div>
                                                    <h5>Ride Number</h5>
                                                </div>
                                                {drivers[driverKey].Bookings?<h6>#{drivers[driverKey].Bookings[0].id}</h6>:''}
                                            </div>
                                            <div className='wrapper'>
                                                <div>
                                                    <h5>Pick up:</h5>
                                                </div>
                                                {drivers[driverKey].Bookings?<h6>{drivers[driverKey].Bookings[0].pickup_location}United States</h6>:''}
                                            </div>
                                            <div className='wrapper'>
                                                <div>
                                                    <h5>Drop off</h5>
                                                </div>
                                                {drivers[driverKey].Bookings?<h6>{drivers[driverKey].Bookings[0].dropoff_location}United States</h6>:''}
                                            </div>
                                        </div>
                                        <h6 className='update Assign'>Assign Another Ride</h6>
                                    </div>
                                    :'':''}
                                    </div>
                                </div>
                            </Col>                       
                        </Row>
                    </div>
                </div>
            </div>
            
            <DriverModal modalshow={modalshow} val={modalData}  getDrivers={getDrivers} handleModalClose={handleModalClose} modaltitle={modaltitle}></DriverModal>
            <Confirm_modal classProp="modal" content="Do you want to delete this driver from the record?" button_name="delete" modalTitle="delete the driver" delete_vehicle={delete_driver} show={confirmModalShow} onHide={handleConfirmModalClose}>
            </Confirm_modal> 
            <Notification_modal content="Driver has been Cancelled Successfully" modalTitle="Driver deleted" show={notificationModalShow} onHide={handleNotificationModalClose}></Notification_modal>   
            
        </div>
    )    
};

export { Driver };