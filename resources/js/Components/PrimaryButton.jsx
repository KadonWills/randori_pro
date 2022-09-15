import React from 'react';

export default function PrimaryButton({ type = 'submit', className = '', processing, handleClick = ()=>{}, children }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-3 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
            onClick={() => handleClick()}
        >
            {children}
        </button>
    );
}
