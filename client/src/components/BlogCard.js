import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/Common-utils';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, onDelete }) => {
    const userId = blog.createdBy;
    const [user, setUser] = useState('');
    const [userid, setUserid] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('userid');
        setUserid(userData);
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/${userId}`);
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (userId) {
            fetchUser();
        }

    }, [user, userId]);


    const deleteBlog = async (blogid) => {
        try {
            await axios.delete(`${API_URL}/blog/delete/${blogid}`)
            onDelete();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="conainer mb-12 text-center border border-warning my-3 p-3 rounded bg-white">
            <img src={`${API_URL}/${blog.thumbnail}`} className="card-img-top w-50 d-inline mx-auto" alt="blog thumbnail" />
            <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content}</p>
                {user && (
                    <p className="card-text">Author:{user.name}</p>
                )}
                <div className='d-flex justify-content-between'>
                    <Link to={`/dashboard/blog/detail/${blog._id}`}>
                        <span className="btn btn-primary">Read More</span>
                    </Link>

                    {blog.createdBy === userid ? (
                        <div>
                            <Link className="btn btn-secondary mx-1" to={`/dashboard/blog/edit/${blog._id}`}>Edit</Link>
                            <button className="btn btn-danger" onClick={() => deleteBlog(blog._id)}>Delete</button>
                        </div>
                    ) : (<div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
