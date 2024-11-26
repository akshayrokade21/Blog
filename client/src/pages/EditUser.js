import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/Common-utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import background from '../assets/images/bgall1.jpg';

const EditUser = () => {
    const [formData, setFormData] = useState({});
    const user = useParams();
    const userId = user.id;
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/${userId}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/user/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('User updated successfully');
            navigate('/dashboard/allusers');
        } catch (error) {
            console.error(error);
            toast.error('Error updating user');
        }
    };

    const userStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        padding: '20px',
    };

    const formStyle = {
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        color: '#fff',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
    };

    const labelStyle = {
        fontSize: '14px',
        marginBottom: '5px',
        display: 'block',
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        width: '100%',
    };

    return (
        <div style={userStyle}>
            <h3 className='text-black'>Edit User</h3>
            <form style={formStyle}>
                <div>
                    <label style={labelStyle}>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                </div>
                <button type="button" onClick={handleSubmit} style={buttonStyle}>
                    Save
                </button>
            </form>
        </div>
    );
};
export default EditUser;
