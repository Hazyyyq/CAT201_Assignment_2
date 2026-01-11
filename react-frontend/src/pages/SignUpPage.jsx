import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from '../style/AuthPage.module.css';
import { API_BASE_URL } from '../config';

const SignupPage = () => {
    const navigate = useNavigate(); 

    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    
    const handleSignup = async (e) => {
        e.preventDefault(); 

        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            
            const response = await fetch(`${API_BASE_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            if (response.ok) {
                alert("Account created successfully!");
                navigate('/login'); 
            } else {
                const data = await response.json();
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Could not connect to server.");
        }
    };

    return (
        <div className={styles.loginContainer}>

            <nav className={styles.navbar}>
                <Link to="/" className={styles.homeLink}>
                    <i className='bx bx-left-arrow-alt'></i> Home
                </Link>
            </nav>

            <div className={styles.wrapper}>
                
                <form onSubmit={handleSignup}>
                    <h1>Sign Up</h1>

                    <div className={styles['input-box']}>
                        <input
                            type="username"
                            name="username" 
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles['input-box']}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles['input-box']}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles['input-box']}>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.btn}>
                        Register
                    </button>

                    <div className={styles['register-link']}>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignupPage;
