import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/Common-utils';
import { toast } from 'react-toastify';
import '../style/UplodFile.css';
import background from '../assets/images/bgall1.jpg'

function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [loding, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !thumbnail) {
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('thumbnail', thumbnail);

        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/blog/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success('Blog created successfully!');
                navigate('/dashboard/myblog');
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error('Failed to create blog. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const blogStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '90vh',
        paddingTop: '20px'
    }

    return (
        <div style={blogStyle}>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: '600px',
                    margin: 'auto',
                    padding: 2,
                    boxShadow: 2,
                    borderRadius: 2,
                    backgroundColor: '#f9f9f9',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onSubmit={handleSubmit}
            >
                <Typography variant="h4" textAlign="center" gutterBottom>Create New Blog </Typography>

                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                {/* <Button
                variant="contained"
                component="label"
                sx={{ textAlign: 'left' }}
            >
                Upload Thumbnail
                <input
                    type="file"
                    hidden
                    onChange={handleThumbnailChange}
                    accept="image/*"
                />
            </Button> */}
                <label htmlFor="file" className="custum-file-upload">
                    <div className="icon">
                        <svg viewBox="0 0 24 24" fill xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill /> </g></svg>
                    </div>
                    <div className="text">
                        <span>Click to upload image</span>
                    </div>
                    <input id="file" type="file" hidden
                        onChange={handleThumbnailChange}
                        accept="image/*" />
                </label>
                {thumbnail && <Typography variant="body2">Selected file: {thumbnail.name}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Submit Blog
                </Button>
            </Box>
        </div>
    );
}

export default CreateBlog;
