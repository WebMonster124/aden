import logo from '../../../images/Group.png';
import {NavLink} from 'react-router-dom'
const Sidebar = () => {

    return (
        <div className='sidebar'>
            
            <div className='menu'>
                    <ul>
                        <li>
                            <NavLink to="/home">
                                <img src={logo} alt="img"></img>
                            </NavLink>
                        </li>
                        <li>
                            <div className='bhhAF'>
                                
                                <NavLink to="/admin/dashboard" 
                                        style={({ isActive }) =>
                                        isActive
                                            ? {
                                                color: '#FBFDFE',
                                                padding:'30px 30px',
                                                backgroundColor: '#F4730E',
                                                borderRadius:'20px'
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
                                <NavLink to="/admin/vehicle" 
                                        style={({ isActive }) =>
                                        isActive
                                            ? {
                                                color: '#FBFDFE',
                                                padding:'30px 30px',
                                                backgroundColor: '#F4730E',
                                                borderRadius:'20px'
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
                                <NavLink to="/admin/booking" 
                                        style={({ isActive }) =>
                                        isActive
                                            ? {
                                                color: '#FBFDFE',
                                                padding:'30px 30px',
                                                backgroundColor: '#F4730E',
                                                borderRadius:'20px'
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
                                <NavLink to="/admin/driver" 
                                            style={({ isActive }) =>
                                            isActive
                                                ? {
                                                    color: '#FBFDFE',
                                                padding:'30px 30px',
                                                backgroundColor: '#F4730E',
                                                borderRadius:'20px'
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
                                <NavLink to="/admin/book_ride" 
                                        style={({ isActive }) =>
                                        isActive
                                            ? {
                                                color: '#FBFDFE',
                                                padding:'30px 30px',
                                                backgroundColor: '#F4730E',
                                                borderRadius:'20px'
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
        </div>)
}
export default Sidebar