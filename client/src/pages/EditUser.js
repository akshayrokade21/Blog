import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/Common-utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [formData, setFormData] = useState({});
    const user = useParams()
    const userId = user.id
    const navigate = useNavigate()

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
            navigate('/dashboard/allusers')
        } catch (error) {
            console.error(error);
            toast.error('Error updating user');
        }
    };

    return (
        <div >
            <h5>Edit User</h5>
            <form>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                </div>
                <button type="button" onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </div>
    );
};
export default EditUser;
