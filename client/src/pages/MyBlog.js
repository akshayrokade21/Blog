import React, { useEffect, useState, useCallback } from 'react';
import { API_URL } from '../utils/Common-utils';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import background from '../assets/images/bgall1.jpg'

const MyBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [userid, setUserid] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const myBlogs = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/blog/user/${userid}`);
            setBlogs(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [userid]);
    useEffect(() => {
        const userData = localStorage.getItem('userid');
        setUserid(userData);
        if (userid) {
            myBlogs();
        }
    }, [myBlogs, userid]);

    const deleteBlog = async (blogid) => {
        try {
            await axios.delete(`${API_URL}/blog/delete/${blogid}`)
            if (blogs.length === 1) {
                toast.warn('Blog Deleted Successfully')
                navigate('/dashboard')
            } else {
                myBlogs();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const blogStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '90vh'
    }

    return (
        <div style={blogStyle} className='pt-2 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='py-3 fw-bold text-warning'>My Blogs</h1>
            {loading ? (
                <p>Loading blogs...</p>
            ) : blogs.length === 0 ? (
                <p>No blogs found. Create one now!</p>
            ) : (
                <div className="row-cols-auto">
                    {blogs.map(blog => (
                        <div key={blog._id} className="col-12">
                            <div className="text-center bg-white p-2 m-2 border border-warning rounded">
                                <img
                                    src={`${API_URL}/${blog.thumbnail}`}
                                    className="card-img-top w-50 d-inline mx-auto"
                                    alt="blog thumbnail"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">{blog.content}</p>
                                    <div className='d-flex justify-content-between'>
                                        <Link to={`/dashboard/blog/detail/${blog._id}`}>
                                            <span className="btn btn-primary">Read More</span>
                                        </Link>
                                        <div>
                                            <Link className="btn btn-secondary mx-1" to={`/dashboard/blog/edit/${blog._id}`}>Edit</Link>
                                            <button className="btn btn-danger" onClick={() => deleteBlog(blog._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default MyBlog;
