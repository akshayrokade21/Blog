import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/Common-utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import style from '../style/Register.module.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/auth/register`, { name, email, password }, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response)
            if (response) {
                toast.success('Registration Successfull')
                navigate('/login')
            } else {
                toast.error('Registration failed');
            }
        } catch (err) {
            console.error('Error registering:', err);
            toast('Error registering. Please try again later.');
        }
    };

    return (
        <div className={`${style.container_fluid} container-fluid d-flex justify-content-center mt-5 pt-5`} >
            <div className={`${style.container}`}>
                <h2 className={style.heading}>Register</h2>
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={`${style.input_field} text-black`}>
                        <label htmlFor="username" className={style.label}>Full Name</label>
                        <input autoComplete="off" type="text" name="text" id="username"
                            className={`${style.form_control} border-2`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />
                    </div>
                    <div className={`${style.input_field} text-black`}>
                        <label htmlFor="email" className={style.label}>Email</label>
                        <input autoComplete="off" type="email" name="email" id="email"
                            className={`${style.form_control} border-2`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className={`${style.input_field} text-black`}>
                        <label htmlFor="username" className={style.label}>Password</label>
                        <input autoComplete="off" type="password" name="text" id="password"
                            className={`${style.form_control} border-2`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={style.btn_container}>
                        <button className={style.btn}>Register</button>
                    </div>
                </form>
            </div >


        </div >
    );
}

export default Register;
