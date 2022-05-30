import React, {useState,useEffect} from 'react';
import {
    Row,
    Col,    
    CloseButton,
    Modal 
} from 'react-bootstrap';

import './dashboard.scss';
import './vehicle.scss'
import { Link } from 'react-router-dom';
import Vehicles from './vehicle_data.js'
import Sidebar from './sidebar.js'
import { useDispatch, useSelector } from 'react-redux'
import  {select_vehicle}  from '../../../redux/actions/VehiclestateActions';
import axios from 'axios';
const Vehicle = () => {    
    const [modalshow, setModalshow] = useState(false);
    const [modaltitle, setModaltitle] = useState("add new vehicel");
    const handleModalShow = () => {setModalshow(true);setModaltitle('add new vehicle');}
    const handleModalClose = () => setModalshow(false);
    const [modalId,setModalId] = useState()
    const handleUpdateModal = (key) => {
        console.log(vehicles[key])
        setModalBag(vehicles[key].max_bags);
        setModalRate(vehicles[key].rate);
        setModalName(vehicles[key].name);
        setModalPassenger(vehicles[key].max_passenger);
        setModalId(vehicles[key].id);setModalshow(true);
        setModaltitle('update new vehicle');
    }
    const dispatch = useDispatch();
    const [vehicles,setVehicles] = useState([]);
    const [modalName,setModalName] =useState();
    const [modalRate, setModalRate] = useState();
    const [modalPassenger,setModalPassenger] = useState();
    const [modalBag,setModalBag] = useState();
    const updateVehicle = () => {
        let temp={};
        temp.name = modalName;
        temp.max_passenger = modalPassenger;
        temp.rate = modalRate;
        temp.max_bags=modalBag;
        if (modalId)
        {   temp.id = modalId;
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/vehicle/update`,temp)
            .then((res)=>{
                Fetchdata();
                setModalshow(false)
            })
        }
        else{
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/vehicle/create`,temp)
            .then((res)=>{
                Fetchdata();
                setModalshow(false)
            })
        }
    }
    const delete_vehicle = (id) =>{
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/vehicle/delete`,{id:id})
        .then((res)=>{
            if (res.status === 200){
                dispatch(select_vehicle(res.data));
                setVehicles(res.data)
            }

        })
    }
    const Fetchdata = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/vehicle/get`)
            .then((res)=>{
                dispatch(select_vehicle(res.data));
                setVehicles(res.data)
                console.log(vehicles)
            })
    }
    useEffect(()=>{   
            Fetchdata();
        },[])
    return (
        <div className='dashboard'>
            <Sidebar/>
            <div className='content'>
                <div className='content-panel'>
                    <div className='content-panel__heading'>
                        <div className='caption'>
                            <h5>Registered Vehicle</h5>
                            <h5 className='date'>12:15 PM at 5th May 2022</h5>
                        </div>
                        <div className='dropdown'>
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
                        <Row>
                            <Col xs={12}>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='card-body__header'>
                                            <div className='caption'>
                                                <h5 style={{textTransform:'capitalize'}}>Cars</h5>
                                            </div>
                                        </div>
                                        <div className='card-body__content'>
                                            <table className='vehicle'>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Rate</th>
                                                    <th>Max Passenger</th>
                                                    <th>Max Bags</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                                {
                                                vehicles.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td><img src={val.vehicle_image} alt="image11"/></td>
                                                        <td>{val.name}</td>
                                                        <td>{val.rate}</td>
                                                        <td>{val.max_passenger}</td>
                                                        <td>{val.max_bags}</td>
                                                        <td><h6 className='delete' onClick ={()=>delete_vehicle(val.id)}>delete</h6></td>
                                                        <td><h6 className='update' onClick={()=>handleUpdateModal(key)}>update</h6></td>
                                                    </tr>
                                                )
                                                })}
                                            </table>
                                        </div>
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
                                <img src='/images/177-1779544_2018-gmc-yukon-denali-luxury-suv-ultimate-black 5.png' alt="image22"/>   
                                <CloseButton/>            
                              </div>
                          </div>                        
                       </Col>
                       <Col md={6}>
                           <div className='modal-right'>
                               <div className='input-wrapper'>
                                   <h5>Name</h5>
                                   <input type="text" value={modalName} onChange={(e)=>setModalName(e.target.value)}></input>                 
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Rate</h5>
                                    <input type="text" value={modalRate} onChange={(e)=>setModalRate(e.target.value)}></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Max Passenger</h5>
                                    <input type="text" value={modalPassenger} onChange={(e)=>setModalPassenger(e.target.value)}></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Max Bags</h5>
                                    <input type="text" value={modalBag} onChange={(e)=>setModalBag(e.target.value)}></input>
                               </div>
                               <h6 className='update' onClick={updateVehicle}>{modaltitle}</h6>
                           </div>
                       </Col>
                   </Row>
                </Modal.Body>
            </Modal>
        </div>
    )    
};

export { Vehicle };