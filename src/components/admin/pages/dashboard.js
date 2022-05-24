import React, {useState} from 'react';
import {
    Row,
    Col,
} from 'react-bootstrap';
import logo from '../../../images/Group.png';
import './dashboard.scss';
import Select from 'react-select'
import { ResponsiveBump } from '@nivo/bump'
import { ResponsiveBar } from '@nivo/bar'
import data from './data.js'
import driver_img from "../../../images/Ellipse 212.png"
import driver_data from './driver_data.js';
import table_data from './table_data.js';
import { NavLink,Link} from 'react-router-dom';


const Dashboard = () => {    
    const [searchKey,setSearchKey] = useState();   
    
    const handleSearchChange = (e) => {
        setSearchKey(e.value)
    }
    const options = [
        { value: '2022', label: 'this year' },
        { value: 'strawberry', label: 'last year' }
    ];
    const MyResponsiveBump = ({ data /* see data tab */ }) => (
        <ResponsiveBump
            data={data}
            colors={{ scheme:"nivo"}}
            endLabel={false}
            lineWidth={1}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={2}
            activePointSize={6}
            enableGridY={false}
            inactivePointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            axisTop={null}
            axisBottom={{
                tickSize: -1,
                tickPadding: 0,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendPosition: 'middle',
                legendOffset: -40
            }}
            margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
            axisRight={null}
        />
    )
    const MyResponsiveBar = ({ data /* see data tab */ }) => (
        <ResponsiveBar
            data={data}
            keys={[
                'hot dog',
                'burger',
                'sandwich',
                'kebab',
                'fries',
                'donut'
            ]}
            indexBy="country"
            margin={{ top: 30, right: 10, bottom: 50, left: 0 }}
            padding={0.9}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={null}
            enableGridY={false}
            enableLabel={false}
            labelSkipWidth={14}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            enableGridY={false}
            enableLabel={false}
            legends={[
                {
                    dataFrom: 'keys',
                    direction: 'column',
                    justify: false,
                    translateX: 334,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 109,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 0,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
        />
    )

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
                                        <i className='fa-users fa side-icon'></i>
                                        <span className='item-content'>Drivers</span>
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
                            <h5>dashboard overview</h5>
                            <h5 className='date'>12:15 PM at 5th May 2022</h5>
                        </div>
                        <div className='dropdown'>
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
                            <Col md={8}>
                                <div className='card analytic'>
                                    <div className='card-body'>
                                        <div className='card-body__header'>
                                            <div className='caption'>
                                                <h5 style={{textTransform:'capitalize'}}>booking anayltics</h5>
                                            </div>
                                            <div className='dropdown'>
                                                <Select options={options}>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className='card-body__content'>
                                            <MyResponsiveBump data={data}/>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='card search-form'>
                                    <div className='card-body'>
                                        <div className='card-body__header'>
                                            <div className='caption'>
                                                    <h5 style={{textTransform:'capitalize'}}>Driver</h5>
                                            </div>
                                            <div className='search'>
                                                <input type="text" value={searchKey} onChange={handleSearchChange} placeholder="search.."/>
                                                <i className='fa fa-search'></i>
                                            </div>
                                        </div>
                                        <div className='card-body__content'>
                                            <div className='driver-meta'>
                                                <div className='img-container'>
                                                    <img src={driver_img} alt="driver img"></img>
                                                </div>
                                                <h5>Jordy Astaws</h5>
                                            </div>
                                            <div className='driver-bar'>
                                                <MyResponsiveBar data={driver_data}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            
                        </Row>
                        <Row style={{marginTop:'50px'}}>
                            <Col xs={12}>
                                <div className='card'>
                                    <div className='card-body'>
                                    <div className='card-body__header'>
                                            <div className='caption'>
                                                <h5 style={{textTransform:'capitalize'}}>booking</h5>
                                            </div>
                                        </div>
                                        <div className='card-body__content'>
                                            <table>
                                                <tr>
                                                    <th>Trip Number</th>
                                                    <th>Pickups</th>
                                                    <th>Drop Off</th>
                                                    <th>Passenger Name</th>
                                                    <th>Passenger Number</th>
                                                    <th>Passengers</th>
                                                    <th>Date & time</th>
                                                    <th>Vehicle</th>
                                                </tr>
                                                {
                                                table_data.map((val, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{val.number}</td>
                                                        <td>{val.pickup}</td>
                                                        <td>{val.drop_off}</td>
                                                        <td>{val.name}</td>
                                                        <td>{val.p_number}</td>
                                                        <td>{val.passengers}</td>
                                                        <td>{val.d_time}</td>
                                                        <td>{val.vehicle}</td>
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
        </div>
    )    
};

export { Dashboard };