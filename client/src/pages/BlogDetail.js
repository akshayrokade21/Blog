import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/Common-utils';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import background from '../assets/images/bgall1.jpg'

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState();
    const [user, setUser] = useState('');
    const [userid, setUserid] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userid');
        setUserid(userData);
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/${userid}`);
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (userid) {
            fetchUser();
        }

    }, [user, userid]);


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${API_URL}/blog/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blog details:", error);
            }
        };
        if (id) {
            fetchBlog();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteBlog = async (blogid) => {
        try {
            await axios.delete(`${API_URL}/blog/delete/${blogid}`)
            toast.warn('Blog Deleted Successfully')
            navigate('/dashboard/myblog')
        } catch (error) {
            console.error(error);
        }
    }

    const userStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '90vh'
    }
    return (
        <div style={userStyle} className='p-3'>
            {blog ? (
                <div className="container mb-12 text-center bg-white border border-warning p-3">
                    <img src={`${API_URL}/${blog.thumbnail}`} className="card-img-top w-50 d-inline mx-auto" alt="blog thumbnail" />
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.content}</p>
                        {user && (
                            <p className="card-text">Author:{user.name}</p>
                        )}
                    </div>
                    {blog.createdBy === userid ? (
                        <div>
                            <Link className="btn btn-secondary mx-1" to={`/dashboard/blog/edit/${blog._id}`}>Edit</Link>
                            <button className="btn btn-danger" onClick={() => deleteBlog(blog._id)}>Delete</button>
                        </div>
                    ) : (<div>
                    </div>)}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BlogDetail;
