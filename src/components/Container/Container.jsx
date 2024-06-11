import React from 'react'

const Container = ({ children }) => {
    return (
        <div className='w-full mx-auto px-4 bg-green-500'>
            {children}
        </div>
    )
}

export default Container