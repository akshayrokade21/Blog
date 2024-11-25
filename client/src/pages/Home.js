import React from 'react';
import { useAuth } from '../AuthContext';
import homeStyle from '../style/Home.module.css';

function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <div className={`${homeStyle.container_fluid} bg-primary text-black text-center vh-100 d-flex flex-column justify-content-center align-items-center m-0 p-0`} >
            <div>
                <h1 className="display-4 mb-4 text-black">Publish your passions, your way</h1>
                <p className="lead">
                    Create a unique and beautiful blog easily.
                </p>
                {isAuthenticated ? (
                    <>
                        <p>
                            You are logged in! Visit your <a href="/dashboard" className="text-warning">Dashboard</a> to view your blogs.
                        </p>
                        <a href="/dashboard/blog/create" className="btn btn-warning btn-lg mt-4">CREATE YOUR BLOG</a>
                    </>
                ) : (
                    <a href="/login" className="btn btn-warning btn-lg mt-4">CREATE YOUR BLOG</a>
                )}
            </div>
        </div >
    );
}

export default Home;
