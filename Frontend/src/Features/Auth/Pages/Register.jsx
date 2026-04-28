import { useState } from "react";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const { handleRegister } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const [generalError, setGeneralError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        setFieldErrors({});
        setGeneralError('');

        try {
            const result = await handleRegister({
                email: formData.email,
                contact: formData.contactNumber,
                password: formData.password,
                isSeller: formData.isSeller,
                fullname: formData.fullName
            });

            // Check if there was an error in the response
            if (result?.error) {
                // If we have validation/field errors
                if (result.error.errors && Array.isArray(result.error.errors) && result.error.errors.length > 0) {
                    const errors = {};
                    let hasFieldErrors = false;
                    
                    // Map all validation errors to fieldErrors (express-validator uses 'param')
                    result.error.errors.forEach(err => {
                        if (err.param && err.param !== 'general') {
                            errors[err.param] = err.msg;
                            hasFieldErrors = true;
                        }
                    });
                    
                    // If we have field-specific errors, set them
                    if (hasFieldErrors) {
                        setFieldErrors(errors);
                    } else if (result.error.message) {
                        // Otherwise show general error
                        setGeneralError(result.error.message);
                    }
                } else if (result.error.message) {
                    // If no validation errors but has message, show as general error
                    setGeneralError(result.error.message);
                } else {
                    // Fallback error message
                    setGeneralError('Registration failed. Please try again.');
                }
            } else {
                // Success - navigate to login
                navigate("/login");
            }
        } catch (err) {
            setGeneralError(err.message || "An error occurred during registration");
        }
    };

    const inputStyle = {
        color: '#ffffff',
        borderBottom: '1px solid #333333',
        fontFamily: "'Inter', sans-serif"
    };

    const handleFocus = (e) => { e.target.style.borderBottomColor = '#FFC107'; };
    const handleBlur = (e) => { e.target.style.borderBottomColor = '#333333'; };

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="h-screen flex flex-col lg:flex-row selection:bg-[#FFC107]/30 overflow-hidden"
                style={{ backgroundColor: '#050505', fontFamily: "'Inter', sans-serif" }}
            >
                {/* ── LEFT: Editorial Image Panel ── */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-[#050505] overflow-hidden items-center justify-center">
                    <img
                        src="/fashion-model.png"
                        alt="Snitch Fashion Editorial"
                        className="w-full h-full object-contain"
                    />
                    {/* Gradient to blend right edge seamlessly into the dark background */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, transparent 0%, transparent 60%, #050505 100%)' }}
                    />
                    <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10 pointer-events-none">
                        <span
                            className="text-sm lg:text-lg font-medium tracking-[0.35em] uppercase"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FFC107' }}
                        >
                            SHOPLANE.
                        </span>
                        <div>
                            <p
                                className="text-3xl lg:text-5xl font-light leading-[1.08] text-white mb-3 lg:mb-5 drop-shadow-md"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Define your<br />
                                <em>aesthetic.</em>
                            </p>
                            <p className="text-xs lg:text-sm font-light leading-relaxed max-w-xs text-zinc-300 drop-shadow">
                                Join the exclusive movement of creators and brands redefining the modern fashion landscape.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Form Panel ── */}
                <div
                    className="w-full lg:w-1/2 flex items-center justify-center h-screen px-5 sm:px-8 lg:px-16 overflow-y-auto lg:overflow-y-hidden"
                    style={{ backgroundColor: '#050505' }}
                >
                    <div className="w-full max-w-sm py-8 lg:py-0">

                        {/* Mobile brand mark */}
                        <div className="lg:hidden mb-8">
                            <span
                                className="text-lg tracking-[0.35em] uppercase"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FFC107' }}
                            >
                                ShopeLane.
                            </span>
                        </div>

                        {/* General Error */}
                        {generalError && (
                            <div className="mb-6 p-3 lg:p-4 rounded bg-red-900/20 border border-red-700/50">
                                <p className="text-red-400 text-xs lg:text-sm">{generalError}</p>
                            </div>
                        )}

                        {/* Header */}
                        <div className="mb-8">
                            <p
                                className="text-[10px] lg:text-[15px] uppercase tracking-[0.22em] mb-2 lg:mb-4 font-medium"
                                style={{ color: '#FFC107' }}
                            >
                                Welcome to ShopLane
                            </p>
                            <h1
                                className="text-2xl sm:text-3xl lg:text-4xl font-light leading-[1.1]"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#ffffff' }}
                            >
                                Elevate Your Style
                            </h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-6">

                            {/* Full Name */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="reg-fullName"
                                    className="text-[8px] lg:text-[10px] uppercase tracking-[0.18em] font-medium text-zinc-500"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="reg-fullName"
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. John Doe"
                                    className="w-full bg-transparent outline-none py-2 lg:py-3 text-xs lg:text-sm transition-colors duration-300 placeholder-zinc-700"
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                {fieldErrors.fullname && (
                                    <p className="text-red-400 text-xs mt-1">{fieldErrors.fullname}</p>
                                )}
                            </div>

                            {/* Contact Number */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="reg-contact"
                                    className="text-[8px] lg:text-[10px] uppercase tracking-[0.18em] font-medium text-zinc-500"
                                >
                                    Contact Number
                                </label>
                                <input
                                    id="reg-contact"
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="+91 98765 43210"
                                    className="w-full bg-transparent outline-none py-2 lg:py-3 text-xs lg:text-sm transition-colors duration-300 placeholder-zinc-700"
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                {fieldErrors.contact && (
                                    <p className="text-red-400 text-xs mt-1">{fieldErrors.contact}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="reg-email"
                                    className="text-[8px] lg:text-[10px] uppercase tracking-[0.18em] font-medium text-zinc-500"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="reg-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="hello@example.com"
                                    className="w-full bg-transparent outline-none py-2 lg:py-3 text-xs lg:text-sm transition-colors duration-300 placeholder-zinc-700"
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                {fieldErrors.email && (
                                    <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="reg-password"
                                    className="text-[8px] lg:text-[10px] uppercase tracking-[0.18em] font-medium text-zinc-500"
                                >
                                    Password
                                </label>
                                <input
                                    id="reg-password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-transparent outline-none py-2 lg:py-3 text-xs lg:text-sm transition-colors duration-300 placeholder-zinc-700"
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                {fieldErrors.password && (
                                    <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>
                                )}
                            </div>

                            {/* Register as Seller — minimal checkbox */}
                            <label
                                htmlFor="reg-isSeller"
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="relative flex-shrink-0">
                                    <input
                                        id="reg-isSeller"
                                        type="checkbox"
                                        name="isSeller"
                                        checked={formData.isSeller}
                                        onChange={handleChange}
                                        className="peer sr-only"
                                    />
                                    {/* Custom checkbox */}
                                    <div
                                        className="w-3.5 h-3.5 lg:w-4 lg:h-4 border transition-all duration-200 flex items-center justify-center peer-checked:border-[#FFC107]"
                                        style={{
                                            borderColor: formData.isSeller ? '#FFC107' : '#333333',
                                            backgroundColor: formData.isSeller ? '#FFC107' : 'transparent'
                                        }}
                                    >
                                        {formData.isSeller && (
                                            <svg className="w-2 h-2 lg:w-2.5 lg:h-2.5" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 6l3 3 5-5" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span
                                    className="text-[9px] lg:text-[11px] uppercase tracking-[0.15em] transition-colors duration-200"
                                    style={{ color: formData.isSeller ? '#FFC107' : '#71717a' }}
                                >
                                    Register as Seller
                                </span>
                            </label>

                            {/* Sign Up Button */}
                            <button
                                type="submit"
                                className="w-full py-2.5 lg:py-3.5 text-[9px] lg:text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 mt-1 border border-[#FFC107]"
                                style={{ backgroundColor: '#FFC107', color: '#050505', fontFamily: "'Inter', sans-serif" }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#FFC107';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = '#FFC107';
                                    e.currentTarget.style.color = '#050505';
                                }}
                            >
                                Sign Up
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px" style={{ backgroundColor: '#1f1f22' }} />
                                <span className="text-[8px] lg:text-[10px] uppercase tracking-[0.15em] text-zinc-600">or</span>
                                <div className="flex-1 h-px" style={{ backgroundColor: '#1f1f22' }} />
                            </div>

                            {/* Footer Link */}
                            <p className="text-center text-[9px] lg:text-[11px] text-zinc-500">
                                Already have an account?{' '}
                                <a
                                    href="/login"
                                    className="transition-colors duration-200"
                                    style={{ color: '#a1a1aa', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                                    onMouseEnter={e => e.target.style.color = '#FFC107'}
                                    onMouseLeave={e => e.target.style.color = '#a1a1aa'}
                                >
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;