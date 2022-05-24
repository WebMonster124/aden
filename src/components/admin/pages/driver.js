import React, {useState} from 'react';
import {
    Row,
    Col,   
    Modal,
    CloseButton
} from 'react-bootstrap';
import logo from '../../../images/Group.png';
import './driver.scss';
import drivers from './drivers_info.js';
import { NavLink,Link } from 'react-router-dom';


const Driver = () => {   
    const [searchKey,setSearchKey] = useState();   
    const [modalshow, setModalshow] = useState(false);
    const [nextmodalshow, setNextModalshow] = useState(false);
    
    const [modaltitle, setModaltitle] = useState("add new driver");
    const handleModalShow = () => {setModalshow(true);setModaltitle('add new driver');}
    const nexthandleModalShow = () => {console.log('sdfs');handleModalClose();setNextModalshow(true);setModaltitle('Recomendation & Submission');}
    const handleModalClose = () => setModalshow(false);
    const nexthandleModalClose = () => setNextModalshow(false);
    const handleUpdateModal = () => {setModalshow(true);setModaltitle('update new vehicle');} 
   
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
                            <h5>Drivers</h5>
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
                                                <th>Profile Pic</th>
                                                <th>Name</th>
                                                <th>Driver Number</th>
                                                <th>Availability</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            {
                                            drivers.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td><img src={val.pic} alt="image44"></img></td>
                                                    <td>{val.name}</td>
                                                    <td>{val.number}</td>
                                                    <td><h6 className={val.availability}>{val.availability}</h6></td>
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
                            <Col xs={4}>
                            <div className='card driver-info'>
                                    <div className='card-body'>
                                    <div className='card-body__header'>
                                            <div className='caption'>
                                                <h5 style={{textTransform:'capitalize'}}>Driver's ride</h5>
                                            </div>
                                    </div>
                                    <div className='card-body__content'>
                                        <div className='meta'>
                                            <img src="/images/Ellipse 212.png" alt="image77"/>
                                            <div className='info'>
                                                <h6 className='name'>Jordy Astaws</h6>
                                                <div className="date">
                                                    <i className='fa fa-calendar'></i>
                                                    <h6>Sun, May 08, 2022</h6>
                                                </div>
                                                <div className='time'>
                                                    <i className='fa fa-clock'></i>
                                                    <h6>09:30 AM</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='info'>
                                            <div className='wrapper'>
                                                <h5>Ride Number</h5>
                                                <h6>#214344</h6>
                                            </div>
                                            <div className='wrapper'>
                                                <h5>Pick up:</h5>
                                                <h6>3348 Mulberry Lane, Boynton Beach,
United States</h6>
                                            </div>
                                            <div className='wrapper'>
                                                <h5>Drop off</h5>
                                                <h6>Victoria Park, Boynton Beach,
United States</h6>
                                            </div>
                                        </div>
                                        <h6 className='update Assign'>Assign Another Ride</h6>
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
                              <div className='modal-left__thumb' style={{display:'flex',justifyContent:'center'}}>
                                <div>
                                    <img src='/images/Ellipse 212.png' alt="image_44"/>   
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
                               <h6 className='update' onClick={nexthandleModalShow}>Next</h6>
                           </div>
                       </Col>
                   </Row>
                </Modal.Body>
            </Modal>
            <Modal className="modal" show={nextmodalshow} dialogClassName="modal-100w" onHide={nexthandleModalClose}>
                <Modal.Body style={{paddingBottom:'50px'}}>
                    <Row>
                        <Col md={12}>
                            <div className='caption' style={{padding:'50px 20px'}}>
                                <h5 style={{textTransform:'capitalize'}}>{modaltitle}</h5>
                            </div>
                        </Col>
                    </Row>
                   <Row>
                       <Col md={6}>
                            <div className='modal-right'>
                               <div className='input-wrapper'>
                                   <h5>Vehicle Registration</h5>
                                   <input type="text" ></input>                 
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Vehicle Insurance</h5>
                                    <input type="text" ></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Vehicle Inspection</h5>
                                    <input type="text" ></input>
                               </div>
                           </div>                        
                       </Col>
                       <Col md={6}>
                           <div className='modal-right'>
                               <div className='input-wrapper'>
                                   <h5>Background Check</h5>
                                   <input type="text" ></input>                 
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Driving Licence</h5>
                                    <input type="text" ></input>
                               </div>
                               <div className='input-wrapper'>
                                    <h5>Identity Document</h5>
                                    <input type="text" ></input>
                               </div>
                              
                           </div>
                       </Col>
                   </Row>
                   <Row>
                       <Col md={12} style={{width:'80%',margin:'auto', maginBottom:'50px',marginTop:'50px'}}>
                            <h6 className='update' style={{marginBottom:'50px', marginTop:'50px'}} onClick={nexthandleModalClose}>Add driver</h6>
                       </Col>
                   </Row>
                </Modal.Body>
            </Modal>
            
        </div>
    )    
};

export { Driver };