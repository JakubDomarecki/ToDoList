import React from 'react';

function Button({ children, color = 'primary', className = false, small = false, outline = false, onClick }) {
    const btnClasses = ['btn', outline ? `btn-outline-${color}` : `btn-${color}`, small && 'btn-sm', className]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={btnClasses} type="submit" onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
