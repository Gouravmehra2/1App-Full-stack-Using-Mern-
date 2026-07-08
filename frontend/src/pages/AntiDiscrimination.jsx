import React, { useState } from 'react';

const COUNTRIES = [
    { code: 'IND', flag: '🇮🇳' },
    { code: 'UAE', flag: '🇦🇪' },
    { code: 'KSA', flag: '🇸🇦' },
    { code: 'SGP', flag: '🇸🇬' },
];

export default function AntiDiscrimination() {
    const [country, setCountry] = useState('IND');
    const [open, setOpen] = useState(false);
    const selected = COUNTRIES.find(c => c.code === country);

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 20px' }}>

                {/* Title card */}
                <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, padding: '40px 32px', textAlign: 'center', marginBottom: 24 }}>
                    <h1 style={{ fontWeight: 800, fontSize: '1.8rem', marginBottom: 20 }}>Anti Discrimination Policy</h1>

                    {/* Country dropdown */}
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button
                            onClick={() => setOpen(o => !o)}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #ddd', borderRadius: 8, padding: '8px 14px', background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
                        >
                            <span>{selected.flag}</span>
                            <span>{selected.code}</span>
                            <span style={{ fontSize: 10, color: '#888' }}>▼</span>
                        </button>
                        {open && (
                            <div style={{ position: 'absolute', top: '110%', left: 0, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 100, minWidth: 120 }}>
                                {COUNTRIES.map(c => (
                                    <div key={c.code}
                                        onClick={() => { setCountry(c.code); setOpen(false); }}
                                        style={{ padding: '10px 16px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 8, background: c.code === country ? '#f5f5f5' : '#fff' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                                        onMouseLeave={e => e.currentTarget.style.background = c.code === country ? '#f5f5f5' : '#fff'}
                                    >
                                        <span>{c.flag}</span><span>{c.code}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Policy content card */}
                <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, padding: '32px' }}>
                    <h2 style={{ fontWeight: 700, fontSize: '15px', marginBottom: 16 }}>Anti-Discrimination Policy</h2>

                    <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.8, marginBottom: 16, fontStyle: 'italic' }}>
                        Urban Company seeks to empower millions of service professionals across the world to deliver safe, reliable and high quality services at home. Urban Company therefore does not tolerate, and prohibits discrimination against customers or service providers based on religion, caste, race, national origin, disability, sexual orientation, sex, marital status, gender identity, age or any other characteristic that may be protected under applicable laws.
                    </p>

                    <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.8, marginBottom: 16, fontStyle: 'italic' }}>
                        Such discrimination includes, but is not limited to, refusing to provide or accept services based on any of these characteristics.
                    </p>

                    <p style={{ fontSize: '13px', color: '#444', lineHeight: 1.8, fontStyle: 'italic' }}>
                        Any customer or service partner found to have violated this prohibition will lose access to the Urban Company platform.
                    </p>
                </div>
            </div>
        </div>
    );
}
