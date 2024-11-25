import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/Common-utils';
import { toast } from 'react-toastify';
import background from '../assets/images/bgall1.jpg'

const EditBlog = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState({
        title: '',
        content: '',
        thumbnail: ''
    });
    const [file, setFile] = useState(null); // To hold the selected file for the thumbnail
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${API_URL}/blog/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({
            ...blog,
            [name]: value
        });
    };

    // Handle file change for thumbnail
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('content', blog.content);
        if (file) {
            formData.append('thumbnail', file);
        }

        try {
            await axios.put(`${API_URL}/blog/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            toast.info('Blog Updated Successfully')
            navigate('/dashboard/myblog');
        } catch (error) {
            console.error(error);
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
        <div style={userStyle} className='d-flex justify-content-center flex-column align-items-center border border-black' >
            <div className='bg-white m-2 px-5 py-2'>
                <h2 className=' text-center'>Edit Blog</h2>
                {loading ? (
                    <p className='mt-5'>Loading blog details...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title mt-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control mb-3"
                                value={blog.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content d-inline-block">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                className="form-control mb-3"
                                value={blog.content}
                                onChange={handleChange}
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="thumbnail">Thumbnail (Image)</label>
                            <input
                                type="file"
                                id="thumbnail"
                                name="thumbnail"
                                className="form-control mb-3"
                                onChange={handleFileChange}
                            />
                            {blog.thumbnail && (
                                <div className='mb-3'>
                                    <img
                                        src={`${API_URL}/${blog.thumbnail}`}
                                        alt="Current thumbnail"
                                        width="200"
                                    />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </form>
                )}
            </div>

        </div>
    );
};

export default EditBlog;
