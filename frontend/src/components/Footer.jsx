import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LINKS = [
    { label: 'About Us', to: '/about' },
    { label: 'Investor Relations', to: null },
    { label: '1APP Impact', to: null },
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Interest-Based Advertising', to: null },
    { label: 'Anti Discrimination Policy', to: '/anti-discrimination' },
    { label: 'Service Professionals Welfare Policy', to: null },
    { label: 'Information Security Policy Statement & Objective', to: null },
    { label: 'Reviews', to: '/reviews' },
    { label: 'Near Me', to: null },
    { label: 'Careers', to: null },
    { label: 'Blogs', to: '/blogs' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Quick Links', to: null },
    { label: 'RO Water Purifier', to: '/services?search=RO Water Purifier' },
    { label: 'Native M1 RO Water Purifier', to: '/services?search=Native M1 RO' },
    { label: 'Native M2 RO Water Purifier', to: '/services?search=Native M2 RO' },
];

const CITIES = {
    UAE: ['Abu Dhabi', 'Dubai', 'Sharjah'],
    KSA: ['Abha', 'Al Hufuf', 'Al Jubayl', 'Al Kharj', 'Al Madinah', 'Buraydah', 'Dammam', 'Jeddah', 'Mecca', 'Riyadh', 'Tabuk', 'Taif', 'Yanbu'],
    IND: ['Agra', 'Ahmedabad', 'Alwar+rewari', 'Amritsar', 'Aurangabad', 'Bangalore', 'Bhopal', 'Bhubaneswar', 'Chandigarh Tricity', 'Chennai', 'Coimbatore', 'Cuttack', 'Dehradun', 'Delhi NCR', 'Guntur', 'Guwahati', 'Gwalior', 'Hyderabad', 'Indore', 'Jabalpur', 'Jaipur', 'Jamshedpur', 'Kanpur', 'Karnal', 'Kochi', 'Kolkata', 'Kota', 'Lucknow', 'Ludhiana', 'Madurai', 'Meerut', 'Mumbai', 'Mysore', 'Nagpur', 'Nashik', 'Patna', 'Prayagraj', 'Pune', 'Raipur', 'Rajahmundry', 'Ranchi', 'Surat', 'Thiruvananthapuram', 'Udaipur', 'Vadodara', 'Varanasi', 'Vijayawada', 'Visakhapatnam', 'Warangal'],
    SGP: ['Singapore'],
};

const ls = { color: '#aaa', textDecoration: 'none', fontSize: '13px', lineHeight: 1.4, cursor: 'pointer' };

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

function FooterLink({ label, to }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (to) {
            navigate(to);
        } else {
            navigate('/');
        }
        scrollTop();
    };

    return (
        <a href={to || '/'} onClick={handleClick} style={ls}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#aaa'}>
            {label}
        </a>
    );
}

export default function Footer() {
    const navigate = useNavigate();

    const handleCityClick = (city) => {
        navigate(`/services?search=${encodeURIComponent(city)}`);
        scrollTop();
    };

    return (
        <footer style={{ background: '#111', color: '#ccc', padding: '48px 0 0' }}>
            <div className="container">

                {/* Links Grid — 7 columns matching screenshot layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px 0', marginBottom: 32 }}>
                    {LINKS.map(({ label, to }) => (
                        <FooterLink key={label} label={label} to={to} />
                    ))}
                </div>

                <hr style={{ borderColor: '#333', margin: '0 0 28px' }} />

                {/* Currently Live In */}
                <div style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#666', marginBottom: 16 }}>CURRENTLY LIVE IN</div>

                    {Object.entries(CITIES).map(([region, cities]) => (
                        <div key={region} style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#555', marginBottom: 8 }}>{region}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
                                {cities.map(city => (
                                    <span key={city} onClick={() => handleCityClick(city)} style={{ ...ls, fontSize: '13px' }}
                                        onMouseEnter={e => e.target.style.color = '#fff'}
                                        onMouseLeave={e => e.target.style.color = '#aaa'}>
                                        {city}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <hr style={{ borderColor: '#333', margin: '0 0 24px' }} />

                {/* Bottom Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, paddingBottom: 24 }}>
                    {/* Logo */}
                    <div onClick={() => { navigate('/'); scrollTop(); }} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <div style={{ background: '#fff', color: '#111', fontWeight: 900, fontSize: '18px', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>1</div>
                        <span style={{ color: '#fff', fontWeight: 800, fontSize: '20px', letterSpacing: 1 }}>APP</span>
                    </div>

                    {/* Copyright */}
                    <p style={{ color: '#555', fontSize: '12px', margin: 0, maxWidth: 420 }}>
                        © 2014-26 1APP Company Limited (formerly known as 1APP Technologies India Limited and 1APP Technologies India India Limited)
                    </p>

                    {/* Social + App icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {Array(6).fill(0).map((_, i) => (
                            <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: '#333', cursor: 'pointer' }} />
                        ))}
                        <div style={{ width: 40, height: 32, background: '#1a73e8', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>▶</span>
                        </div>
                        <div style={{ width: 40, height: 32, background: '#e8341a', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>✦</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
