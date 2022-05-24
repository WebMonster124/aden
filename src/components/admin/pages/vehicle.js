import React, {useState} from 'react';
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
const Vehicle = () => {    
    const [modalshow, setModalshow] = useState(false);
    const [modaltitle, setModaltitle] = useState("add new vehicel");
    const handleModalShow = () => {setModalshow(true);setModaltitle('add new vehicle');}
    const handleModalClose = () => setModalshow(false);
    const handleUpdateModal = () => {setModalshow(true);setModaltitle('update new vehicle');}
    
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
                                                Vehicles.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td><img src={val.image} alt="image11"/></td>
                                                        <td>{val.Name}</td>
                                                        <td>{val.Rate}</td>
                                                        <td>{val.Max_p}</td>
                                                        <td>{val.Max_B}</td>
                                                        <td><h6 className='delete'>delete</h6></td>
                                                        <td><h6 className='update' onClick={handleUpdateModal}>update</h6></td>
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

export { Vehicle };