import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import serviceService from '../services/serviceService';

const ServiceSearchAutocomplete = ({ placeholder = "Search services...", wrapperStyle = {} }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const debounceRef = useRef(null);
    const wrapperRef = useRef(null);

    const fetchSuggestions = useCallback(async (value) => {
        if (!value.trim()) {
            setSuggestions([]);
            setOpen(false);
            return;
        }
        setLoading(true);
        try {
            const response = await serviceService.getAllServices({ search: value });
            const services = response.data?.services || response.data || [];
            setSuggestions(Array.isArray(services) ? services : []);
            setOpen(services.length > 0);
        } catch {
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchSuggestions(val), 350);
    };

    const handleSelect = (service) => {
        setQuery(service.name);
        setOpen(false);
        navigate(`/services?search=${encodeURIComponent(service.name)}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        if (query.trim()) navigate(`/services?search=${encodeURIComponent(query)}`);
    };

    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={wrapperRef} style={{ position: 'relative', ...wrapperStyle }}>
            <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill border" style={{ background: '#fff', fontSize: '13px', color: '#444', cursor: 'text' }}>
                <FaSearch size={13} className="text-muted" />
                <input
                    type="text"
                    className="border-0 bg-transparent flex-grow-1"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                    onFocus={() => suggestions.length > 0 && setOpen(true)}
                    style={{ outline: 'none', fontSize: '13px', color: '#444' }}
                    autoComplete="off"
                />
                {loading && (
                    <span className="d-flex gap-1">
                        <span className="animate-pulse" style={{ animation: 'pulse 1s infinite' }}>•</span>
                        <span className="animate-pulse" style={{ animation: 'pulse 1s infinite 0.2s' }}>•</span>
                        <span className="animate-pulse" style={{ animation: 'pulse 1s infinite 0.4s' }}>•</span>
                    </span>
                )}
            </form>

            {open && (
                <ul
                    className="list-unstyled mb-0 shadow-sm border rounded-3 bg-white"
                    style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 2000, overflow: 'hidden', maxHeight: '300px', overflowY: 'auto' }}
                >
                    {suggestions.map((service) => (
                        <li
                            key={service._id}
                            onMouseDown={() => handleSelect(service)}
                            className="d-flex align-items-center gap-2 px-3 py-2"
                            style={{ cursor: 'pointer', fontSize: '13px', borderBottom: '1px solid #f0f0f0' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f8f8f8'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                        >
                            <FaSearch size={12} className="text-muted flex-shrink-0" />
                            <span className="text-truncate">{service.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ServiceSearchAutocomplete;
