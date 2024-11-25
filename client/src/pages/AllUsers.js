/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/Common-utils';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import background from '../assets/images/bgall1.jpg'

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/user/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching users');
        }
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error('Error deleting user');
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

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center text-lg-center" style={userStyle}>
            <h1 className='ms-5 ms-lg-0'>All Users</h1>
            <div className="d-lg-flex flex-wrap justify-content-evenly ">
                {users.map((user) => (
                    <div className=" col-4 m-0 border border-warning rounded m-2" key={user._id}>
                        <div className="card mb-3">
                            <div className="card-body ">
                                <h5 className="card-title">Name:{user.name}</h5>
                                <p className="card-text">Email: {user.email}</p>
                                <p className="card-text">Role:
                                    {user.role == 0 ? (<span>User</span>) : (<span>Admin</span>)}</p>
                                <div className='d-flex justify-content-between'>
                                    <Link to={`/dashboard/edituser/${user._id}`} className='btn btn btn-danger'>Edit</Link>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
