import React, {useState} from 'react';
import {     
    Container,Row, Col
} from 'react-bootstrap';
import { Header } from '../../layout/header';
import './history.scss';
import Filters from '../../../images/Vector.png';
import Select from 'react-select';
import  history_data  from './history_data.js'
import rider_status from './rider_status_data.js'
const History = () => {    
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedId,setSelectedId] = useState(0)
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [filtershow, setFilterShow] =useState(false);
    const handleChange = (e) => {        
        setSelectedOption(e.value)
    }
    return (
       <div className='history-board'>
           <Header />
           <Row>
               <Col md={3}>
                   <div className='history'>
                       <div className='history-header'>
                            <p>booking</p>
                            <div className='filters' onClick={()=>{setFilterShow(true)}}>Filters
                                    <img src={Filters} alt="filters" />
                            </div>
                       </div>
                       <div className='history-content'>
                            {
                                history_data.map((data,key)=>{
                                    return(
                                        <div className={ selectedId === key ? 'history-content__wrapper control-body selected' : 'history-content__wrapper control-body'}key={key}>
                                            <div className='pickup'>
                                                <div className='title'>Pickup:</div>
                                                <p>3348 Mulberry Lane, United States</p>
                                            </div>                            
                                            <div className='stop d-flex align-items-center justify-content-between'>
                                                <div className='stop-location w-100'>
                                                    <div className='title'>Stop1:</div>
                                                    <p>Victoria Park, United States</p>
                                                </div>
                                            </div>
                                            <div className='date-time-info'>
                                                <div className='date d-flex align-items-center'>
                                                    <i className="fa fa-calendar-days px-2"></i>
                                                    <h6>05/22/2022</h6>
                                                </div>
                                                <div className='time d-flex align-items-center'>
                                                    <i className="fa fa-clock px-2"></i>
                                                    <h6>09:30 AM</h6>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                       </div>
                   </div>

               </Col>
               <Col md={9}>
                    <div className="main">            
                <Container>
                    <div className='main-wrap payment-board'>
                        <Row>
                            <Col md={5}>
                                <div className='journey-vehicle'>
                                    <div className='journey'>
                                        <div className='header-wrap d-flex justify-content-between'>
                                            <div className='header-text'>Journey</div>
                                            <div style={{display:'inline-flex', marginLeft:'-25px'}}>
                                                <div className='date d-flex align-items-center'>
                                                    <i className="fa fa-calendar-days px-2"></i>
                                                    <h6>05/22/2022</h6>
                                                </div>
                                                <div className='time d-flex align-items-center'>
                                                    <i className="fa fa-clock px-2"></i>
                                                    <h6>09:30 AM</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pickup'>
                                            <div className='title'>Pickup:</div>
                                            <Select
                                                onChange={(e) => handleChange(e)}
                                                options={options}
                                                value={"3348 Mulberry Lane, Boynton Beach, United States"}
                                                isSearchable="true"
                                                className='w-100'
                                            />
                                        </div>                            
                                        <div className='stop d-flex align-items-center justify-content-between'>
                                            <div className='stop-location w-100'>
                                                <div className='title'>Stop1:</div>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={(e) => handleChange(e)}
                                                    options={options}
                                                    placeholder="Enter location"
                                                    isSearchable="true"
                                                    className='w-100'
                                                />
                                            </div>
                                        </div>                            
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
                                        </div>
                                        <div className='passenger-board'>
                                            <Row>
                                                <Col md={4}>
                                                    <div className='passenger'>
                                                        <div className='label'>Passenger</div>
                                                        <div className='count'>3</div>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className='childrens'>
                                                        <div className='label'>Childrens</div>
                                                        <div className='count'>3</div>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className='bags'>
                                                        <div className='label'>Bags</div>
                                                        <div className='count'>3</div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='vehicle'>
                                            <div className='label'>Vehicle</div>
                                            <div className='name'>Sedan</div>
                                        </div>
                                        <Row>
                                            <Col md={6}>
                                                <div className='vehicle'>
                                                    <div className='label'>Passenger Name</div>
                                                    <div className='name'>Sedan</div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='vehicle'>
                                                    <div className='label'>Mobile Number</div>
                                                    <div className='name'>123-456-7890</div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <div className='vehicle'>
                                                    <div className='label'>Payment Option</div>
                                                    <div className='name'>Credit Card</div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='vehicle'>
                                                    <div className='label'>card number</div>
                                                    <div className='name'>xxxx xxxx xxxx 9999</div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className='estimated-fair'>
                                            <div className='label'>Estimated Fair</div>
                                            <div className='cost'>USD $120</div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={7}>
                                <div className='passenger-control-btn'>
                                    
                                    <div className='passenger-control'>
                                        <div className='header-text'>Rider Status</div>
                                        {rider_status.map((value,key)=>{
                                            if (value.unread)
                                            return(
                                                <div className={key === 0 ? "rider-status first":'rider-status'} key={key}>
                                                    <h5>{value.name}</h5>
                                                    <h6>{value.content}</h6>
                                                </div>)
                                            else
                                            return(
                                                <div  key={key} className="rider-status unread">
                                                    <h5>{value.name}</h5>
                                                    <h6>{value.content}</h6>
                                                </div>
                                            )
                                            }
                                            )
                                        }
                                    </div>                                                                
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>      
                    </div>
                </Col>
            </Row>
       </div>
    )    
};

export { History };