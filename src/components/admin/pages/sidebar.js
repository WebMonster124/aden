import logo from '../../../images/Group.png';
import {NavLink} from 'react-router-dom'
const Sidebar = () => {

    return (
        <div className='sidebar'>
            <div className='logo'>
                <NavLink to="/home">
                    <img src={logo} alt="img"></img>
                </NavLink>
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
        </div>)
}
export default Sidebar