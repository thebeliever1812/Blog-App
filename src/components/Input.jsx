import React, { useId } from 'react'

const Input = React.forwardRef(({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) => {
    const id = useId();
    return (
        <div>
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                id={id}
                {...props}
                ref={ref}
            />
            {label &&
                <label
                    className='inline-block mb-1 pl-1'
                    htmlFor={id}
                >
                    {label}
                </label>}
        </div>
    )
})

export default Input
