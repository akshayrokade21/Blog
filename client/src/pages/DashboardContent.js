import React from 'react';
import background from '../assets/images/bgdash1.jpg'

function DashboardContent() {

    const dashStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '89vh',
        margin: '0',
        padding: '0',
        fontSize: '50px'

    }

    return (
        <div style={dashStyle} className='text-white d-flex justify-content-center align-items-center'>

            Welcome to Dashboard

        </div>
    )
}

export default DashboardContent
