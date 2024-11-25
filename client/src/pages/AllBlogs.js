import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { API_URL } from '../utils/Common-utils';
import axios from 'axios';
import background from '../assets/images/bgall1.jpg'

const AllBlogs = ({ userId }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/blog/all`);
            setBlogs(response.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }

    };
    useEffect(() => {

        fetchBlogs();
    }, [userId]);

    const blogStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '90vh'
    }

    return (
        <div style={blogStyle} className='mt-0 pt-0'>
            <div className="container mt-0 d-flex flex-column justify-content-center align-items-center">
                <h1 className='pt-5 text-primary'>All Blogs</h1>
                {loading ? (
                    <p>Loading blogs...</p>
                ) : blogs.length === 0 ? (
                    <p>No blogs found. Create one now!</p>
                ) : (<div className="coloum w-100">
                    {blogs.map((blog) => (
                        <div className="col-12 d-inline mx-auto " key={blog._id}>
                            <BlogCard blog={blog} onDelete={fetchBlogs} />
                        </div>
                    ))}
                </div>)
                }
            </div>
        </div>
    );
};

export default AllBlogs;
