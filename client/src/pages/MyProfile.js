import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/Common-utils';
import axios from 'axios';
import { Link } from 'react-router-dom';
import background from '../assets/images/bgall1.jpg'

const MyProfile = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = localStorage.getItem('userid');
                const response = await axios.get(`${API_URL}/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const profileStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '90vh'
    }
    return (
        <div style={profileStyle} className='d-flex flex-column justify-content-center align-items-center'>
            <h2>My Profile</h2>
            <div className='text-start'>
                <p ><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <Link to={'/dashboard/editprofile/:id'}>
                <button className="btn btn-primary">Edit Profile</button>
            </Link>
        </div>
    );
};

export default MyProfile;
