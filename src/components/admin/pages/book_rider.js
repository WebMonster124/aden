import React, {useState} from 'react';
import {
    Row,
    Col,
    Tabs,
    Tab,
    CloseButton,
    Modal 
} from 'react-bootstrap';

import './dashboard.scss';
import './book_rider.scss';
import { Link} from 'react-router-dom';
import { MDBSwitch } from 'mdb-react-ui-kit';
import Sidebar from './sidebar';
const BookRider = () => {        
    const [key, setKey] = useState('airport');
    const [modalshow, setModalshow] = useState(false);
    const [modaltitle, setModaltitle] = useState("add new driver");
    const handleModalClose = () => setModalshow(false);
    const handleModalShow = () => {setModalshow(true);setModaltitle('add new driver');}    
    
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
                                <div className='button' onClick={handleModalShow}>
                                    <i className='fa fa-plus'></i>
                                    <h6>Add Driver</h6>
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
                            <Col md={7}>
                                <div className='card book_rider'>
                                    <div className='card-body'>
                                        <div className='card-body__content'>
                                            <Tabs
                                                id="controlled-tab-example"
                                                activeKey={key}
                                                onSelect={(k) => setKey(k)}
                                                className="mb-3"
                                                >
                                                <Tab eventKey="airport" title="Airport">
                                                    <div className='input-wrapper pickup'>
                                                        <h5>Pickup:</h5>
                                                        <input type="text" placeholder='Enter Location'></input>                 
                                                    </div>
                                                    <div className='input-wrapper stop'>
                                                        <h5>Stop1:</h5>
                                                        <input type="text" placeholder='Enter Location'></input>                 
                                                    </div>
                                                    <div className='input-wrapper dropoff'>
                                                        <h5>Dropoff:</h5>
                                                        <input type="text" placeholder='Enter Location'></input>                 
                                                    </div>
                                                    <div className='ride-now'>
                                                        <div className='button'>
                                                            <p>RIDE NOW</p>
                                                            <MDBSwitch id='flexSwitchCheckDefault' label='' />
                                                        </div>
                                                        <div className='add-stop'>
                                                            <i className='fa fa-plus'></i>
                                                            <p>add stop</p>
                                                        </div>
                                                    </div>
                                                    <Row>
                                                        <Col md={6}>
                                                            <div className='input-wrapper'>
                                                                <h5>Pickupdate:</h5>
                                                                <input type="date" placeholder='05/08/2022'></input>                 
                                                            </div>
                                                        </Col>
                                                        <Col md={6}>
                                                            <div className='input-wrapper time'>
                                                                <h5>Pickup time:</h5>
                                                                <input type="time" placeholder='05/08/2022'></input>                 
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Tab>
                                                <Tab eventKey="around_town" title="Around town">
                                                    
                                                </Tab>
                                                <Tab eventKey="hourly" title="Hourly">
                                                    
                                                </Tab>
                                                
                                                
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className='card select-vehicle'>
                                    <div className='card-body'>
                                        <div className='card-body__content'>
                                            <h5>passengers</h5>
                                            <div className='input-wrapper'>
                                                <input value="3">
                                                </input>
                                                <div className='button-group'>
                                                    <i className='fa fa-minus'></i>
                                                    <i className='fa fa-plus'></i>
                                                </div>
                                                
                                            </div>
                                            <h5>Childrens</h5>
                                            <div className='input-wrapper'>
                                                <input value="2">
                                                </input>
                                                <div className='button-group'>
                                                    <i className='fa fa-minus'></i>
                                                    <i className='fa fa-plus'></i>
                                                </div>
                                            </div>
                                            <h5>Bags</h5>
                                            <div className='input-wrapper'>
                                                <input value="5">
                                                </input>
                                                <div className='button-group'>
                                                    <i className='fa fa-minus'></i>
                                                    <i className='fa fa-plus'></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h6 className='update' style={{marginTop:'50px'}}>select vehicle</h6>
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
                              <div className='modal-left__thumb' style={{display:'flex',justifyContent:'center'}}>
                                <div>
                                    <img src='/images/Ellipse 212.png' alt="img"/>   
                                    <CloseButton/>
                                </div>            
                              </div>
                          </div>                        
                       </Col>
                       <Col md={6}>
                           <div className='modal-right'>
                               <div className='input-wrapper'>
                                   <h5>First Name</h5>
                                   <input type="text" value="GMC SUV"></input>                 
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Last Name</h5>
                                    <input type="text" value="$120"></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Phone Numberr</h5>
                                    <input type="text" value="8"></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Location</h5>
                                    <input type="text" value="5"></input>
                               </div>
                               <h6 className='update'>Next</h6>
                           </div>
                       </Col>
                   </Row>
                </Modal.Body>
            </Modal>
        </div>
    )    
};

export { BookRider };