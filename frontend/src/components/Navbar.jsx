import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaListAlt, FaSignOutAlt, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';
import { BsStack } from 'react-icons/bs';
import SearchAutocomplete from './SearchAutocomplete';
import ServiceSearchAutocomplete from './ServiceSearchAutocomplete';

const tryHeroImg = (filename) => {
        try { return require(`../assets/hero/${filename}`); }
        catch { return ''; }
    };

const NavigationBar = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const { getCartItemsCount } = useContext(CartContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky-top bg-white border-bottom" style={{ zIndex: 1030 }}>
            <div className="container">
                <div className="d-flex align-items-center py-3 gap-4">

                    {/* Logo */}
                    <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none flex-shrink-0">
                    <img src={tryHeroImg('1app_logo.png') } alt="Hero" style={{width: '40px', height: 'auto'}}/>
                    </Link>

                    {/* Nav Links */}
                    <div className="d-none d-lg-flex align-items-center gap-3">
                        <Link to="/" className="text-dark text-decoration-none fw-medium" style={{ fontSize: '14px' }}>Revamp</Link>
                        <Link to="/services" className="text-dark text-decoration-none fw-medium" style={{ fontSize: '14px' }}>Native</Link>
                        <Link to="/services" className="text-dark text-decoration-none fw-medium" style={{ fontSize: '14px' }}>Beauty</Link>
                    </div>

                    {/* Center: Location + Search */}
                    <div className="d-none d-lg-flex align-items-center gap-2 flex-grow-1 justify-content-center">
                        {/* Location Search Bar */}
                        <SearchAutocomplete wrapperStyle={{ flexGrow: 1, maxWidth: '200px' }} />
                        {/* Service Search Bar */}
                        <ServiceSearchAutocomplete wrapperStyle={{ width: '50%' }} />
                    </div>

                    {/* Right: Cart + User */}
                    <div className="d-flex align-items-center gap-3 ms-auto flex-shrink-0">
                        {/* Cart */}
                        <Link to="/cart" className="position-relative text-dark" style={{ fontSize: '20px' }}>
                            <FaShoppingCart />
                            {getCartItemsCount() > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '9px' }}>
                                    {getCartItemsCount()}
                                </span>
                            )}
                        </Link>

                        {/* User */}
                        {isAuthenticated ? (
                            <div className="dropdown">
                                <button className="btn p-0 border-0 bg-transparent" type="button" data-bs-toggle="dropdown">
                                    <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                                        <FaUser size={14} color="#fff" />
                                    </div>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                                    <li><Link className="dropdown-item d-flex align-items-center gap-2 py-2" to="/profile"><FaUser className="text-muted" /><span>Profile</span></Link></li>
                                    <li><Link className="dropdown-item d-flex align-items-center gap-2 py-2" to="/bookings"><FaListAlt className="text-muted" /><span>My Bookings</span></Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger" onClick={handleLogout}><FaSignOutAlt /><span>Logout</span></button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: 32, height: 32, cursor: 'pointer' }} onClick={() => navigate('/login')}>
                                <FaUser size={14} color="#fff" />
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
