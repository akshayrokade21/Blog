import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/Common-utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import background from '../assets/images/bgall1.jpg'

const EditProfile = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const navigate = useNavigate();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userid');
            await axios.put(`${API_URL}/user/${userId}`, user);
            toast.info('User Details Updated')
            navigate('/dashboard/myprofile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const userStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '90vh'
    }

    return (
        <div style={userStyle} className='d-flex flex-column justify-content-center align-items-center'>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
