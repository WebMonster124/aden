import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import Randomstring from "randomstring";
import {
    Nav,
    Container,
    Modal,
    FormControl,
    Row,
    Tabs,
    Tab,
    Col
} from 'react-bootstrap';

import { Header } from '../../layout/header';

import Map from '../../../images/map.png';
import LocationCheck from '../../../images/location-check.png';
import Trash from '../../../images/trash.png';
import './Home.scss';

const Home = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [stopNum, setStopNum] = useState([{ id: Randomstring.generate(10) }]);
    const [modalShow, setModalShow] = useState(false);
    const [editModalshow, setEditModalshow] = useState(false);
    const [passenger, setPassenger] = useState(3);
    const [children, setChildren] = useState(3);
    const [bag, setBag] = useState(3);
    const [key, setKey] = useState('address');
    const [methodkey, setMethodKey] = useState('transfer');
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const handleChange = (e) => {
        setSelectedOption(e.value)
    }

    const switch_onChange_handle = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const addStop = () => {
        setStopNum([...stopNum, { id: Randomstring.generate(10) }]);
    }

    const deleteStop = (id) => {
        const filter = stopNum.filter(item => item.id !== id)
        setStopNum(filter);
    }

    const MyVerticallyCenteredModal = (props) => {
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <div className='header-wrap'>
                                <div className='title'>
                                    Location Correction
                                </div>
                                <div className='description'>
                                    <div>Please check and confirm your location,</div>
                                    <div>or edit it as per your preference</div>
                                </div>
                                <div className='btns'>
                                    <h6 className='update'>Confirm Location</h6>
                                    <button type='button' className='edit' onClick={() => { setModalShow(false); setEditModalshow(true); }}>Edit Location</button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='content-wrap'>
                                <div className='street d-flex align-items-center'>
                                    <div className='label'>Street:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className='city d-flex align-items-center'>
                                    <div className='label'>City:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className='state d-flex align-items-center'>
                                    <div className='label'>State:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className='postalcode d-flex align-items-center'>
                                    <div className='label'>Postal Code:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className='country d-flex align-items-center'>
                                    <div className='label'>Country:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }

    const EditModal = (props) => {
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <div className='header-wrap'>
                                <div className='title'>
                                    Edit Location
                                </div>
                                <div className='description'>
                                    <h6><span>Full address:</span>3348 Mulberry Lane, Boynton Beach,
                                        33435, United States ,</h6>
                                </div>
                                <div className='btns'>
                                    <h6 className='update' onClick={() => setEditModalshow(false)}>Confirm Location</h6>
                                    <button type='button' className='edit' onClick={() => setEditModalshow(false)}>Cancel</button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='content-wrap'>
                                <div className='street d-flex align-items-center'>
                                    <div className='label'>Street:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className='city d-flex align-items-center'>
                                    <div className='label'>City:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className='state d-flex align-items-center'>
                                    <div className='label'>State:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className='postalcode d-flex align-items-center'>
                                    <div className='label'>Postal Code:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className='country d-flex align-items-center'>
                                    <div className='label'>Country:</div>
                                    <FormControl
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <div className='home'>
            <Header />
            <div className="main">
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <EditModal show={editModalshow} onHide={() => setModalShow(false)} />
                <Container>
                    <div className='status-board'>
                        <div className='where-when'>Where and When</div>
                        <div className='where-when-status'></div>
                        <div className='vehicle'>Vehicle Selection</div>
                        <div className='vehicle-status'></div>
                        <div className='payment-confirmation'>Payment & Confirmation</div>
                    </div>
                    <div className='location-map'>
                        <img src={Map} alt="map" />
                    </div>
                    <div className='control-board'>
                        <Row>
                            <Col md={8}>
                                <div className='location-control'>
                                    <div className='control-header'>
                                        <div className='control-btns'>
                                            <Nav defaultActiveKey="/#" as="div">
                                                
                                                    <h5 className={methodkey === "transfer"? 'nav-link active':'nav-link'} onClick={()=>{setMethodKey("transfer")}}><i className="fa fa-location-dot"></i>Transfer</h5>
                                                
                                                
                                                    <h5 className={methodkey === "hourly"? 'nav-link active':'nav-link'} onClick={()=>{setMethodKey("hourly")}}><i className="fa fa-clock"></i>Hourly</h5>
                                                
                                            </Nav>
                                        </div>
                                    </div>
                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}

                                        onSelect={(k) => setKey(k)}
                                        className="address"
                                    >

                                        <Tab eventKey="address" title="Address" >


                                            <div className='control-body'>
                                                <div className='pickup'>
                                                    <div className='title'>Pickup:</div>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={(e) => handleChange(e)}
                                                        options={options}
                                                        placeholder="Enter location"
                                                        isSearchable="true"
                                                        className='w-100'
                                                    />
                                                    <div className='check' onClick={() => setModalShow(true)} ><img src={LocationCheck} alt="location-check" /></div>
                                                </div>
                                                {stopNum.map((item, index) => (
                                                    <div className='stop d-flex align-items-center justify-content-between' key={item.id}>
                                                        <div className='stop-location w-100'>
                                                            <div className='title'>Stop{index + 1}:</div>
                                                            <Select
                                                                defaultValue={selectedOption}
                                                                onChange={(e) => handleChange(e)}
                                                                options={options}
                                                                placeholder="Enter location"
                                                                isSearchable="true"
                                                                className='w-100'
                                                            />
                                                            <div className='check' onClick={() => setModalShow(true)} > <img src={LocationCheck} alt="location-check" /> </div>
                                                        </div>
                                                        <div className='trash' onClick={() => deleteStop(item.id)}><img src={Trash} alt="trash" /></div>
                                                    </div>
                                                ))}
                                                <div className='dropoff'>
                                                    <div className='title'>Dropoff:</div>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={(e) => handleChange(e)}
                                                        options={options}
                                                        placeholder="Enter location"
                                                        isSearchable="true"
                                                        className='w-100'
                                                    />
                                                    <div className='check'><img src={LocationCheck} alt="location-check" /></div>
                                                </div>
                                                <div className='field-wrap'>
                                                    <div className='ride-now'>RIDE NOW
                                                        <Toggle
                                                            defaultChecked={isSwitchOn}
                                                            icons={false}
                                                            onChange={() => switch_onChange_handle()}
                                                        />
                                                    </div>
                                                    <div className='add-stop' onClick={() => addStop()}><i className="fa fa-plus"></i>Add Stop</div>
                                                </div>
                                                {isSwitchOn ?
                                                    <div className='date-time'>
                                                        <div className='date'>
                                                            <div className='title'>Pickup date:</div>
                                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                                            <i className="fa fa-calendar-days px-2"></i>
                                                        </div>
                                                        <div className='time'>
                                                            <div className='title'>Pickup time:</div>
                                                            <input type="time" value={startDate} onChange={(date) => setStartDate(date)} />
                                                        </div>
                                                    </div>
                                                    : ""}
                                            </div>

                                        </Tab>
                                        <Tab eventKey="airport" title="Airport">
                                            <></>
                                        </Tab>
                                        <Tab eventKey="landmark" title="Landmark">
                                            <></>
                                        </Tab>
                                    </Tabs>
                                </div>

                            </Col>
                            <Col md={4}>
                                <div className='passenger-control-btn'>
                                    <div className='passenger-control'>
                                        <div className='passenger'>
                                            <div className='label'>Passengers</div>
                                            <div className='body'>
                                                <span className='count'>{passenger}</span>
                                                <div className='btns'>
                                                    <button type='button' className='minus' onClick={() => { setPassenger(passenger - 1) }} ><i className='fa fa-minus'></i></button>
                                                    <button type='button' className='plus' onClick={() => { setPassenger(passenger + 1) }} ><i className='fa fa-plus'></i></button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='childrens'>
                                            <div className='label'>Childrens</div>
                                            <div className='body'>
                                                <span className='count'>{children}</span>
                                                <div className='btns'>
                                                    <button type='button' className='minus' onClick={() => { setChildren(children - 1) }}><i className='fa fa-minus'></i></button>
                                                    <button type='button' className='plus' onClick={() => { setChildren(children + 1) }}><i className='fa fa-plus'></i></button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='bags'>
                                            <div className='label'>Bags</div>
                                            <div className='body'>
                                                <span className='count'>{bag}</span>
                                                <div className='btns'>
                                                    <button type='button' className='minus' onClick={() => { setBag(bag - 1) }}><i className='fa fa-minus'></i></button>
                                                    <button type='button' className='plus' onClick={() => { setBag(bag + 1) }}><i className='fa fa-plus'></i></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <Link to='/vehicles' className='select-vehicle'>Select Vehicle</Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
};

export { Home };