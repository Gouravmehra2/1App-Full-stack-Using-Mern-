import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchAutocomplete = ({ placeholder = "Search locations...", inputStyle = {}, wrapperStyle = {} }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const debounceRef = useRef(null);
    const wrapperRef = useRef(null);

    const fetchSuggestions = useCallback(async (value) => {
        if (!value.trim()) { setSuggestions([]); setOpen(false); return; }
        setLoading(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5&addressdetails=1`,
                { headers: { 'Accept-Language': 'en' } }
            );
            const data = await res.json();
            setSuggestions(data);
            setOpen(data.length > 0);
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

    const handleSelect = (item) => {
        setQuery(item.display_name);
        setOpen(false);
        navigate(`/services?search=${encodeURIComponent(item.display_name)}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        if (query.trim()) navigate(`/services?search=${encodeURIComponent(query)}`);
    };

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={wrapperRef} style={{ position: 'relative', ...wrapperStyle }}>
            <form onSubmit={handleSubmit} className="d-flex align-items-center border rounded-pill px-3 py-2" style={{ background: '#fff' }}>
                <FaMapMarkerAlt size={13} className="text-muted" />
                <input
                    type="text"
                    className="border-0 bg-transparent w-100"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                    onFocus={() => suggestions.length > 0 && setOpen(true)}
                    style={{ outline: 'none', fontSize: '13px', color: '#444', ...inputStyle }}
                    autoComplete="off"
                />
                {loading && <span className="spinner-border spinner-border-sm text-muted ms-2 flex-shrink-0" style={{ width: 12, height: 12, borderWidth: 2 }} />}
            </form>

            {open && (
                <ul
                    className="list-unstyled mb-0 shadow-sm border rounded-3 bg-white"
                    style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 2000, overflow: 'hidden' }}
                >
                    {suggestions.map((item) => (
                        <li
                            key={item.place_id}
                            onMouseDown={() => handleSelect(item)}
                            className="d-flex align-items-start gap-2 px-3 py-2"
                            style={{ cursor: 'pointer', fontSize: '13px', borderBottom: '1px solid #f0f0f0' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f8f8f8'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                        >
                            <FaMapMarkerAlt size={13} className="text-muted flex-shrink-0 mt-1" />
                            <span className="text-truncate" style={{ maxWidth: '100%' }}>{item.display_name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchAutocomplete;
