import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/AuthPage.module.css';

const SignupPage = () => {
    return (
        <div className={styles.loginContainer}>

            {/* --- STANDARD NAV PLACEMENT (TOP LEFT) --- */}
            <nav className={styles.navbar}>
                <Link to="/" className={styles.homeLink}>
                    <i className='bx bx-left-arrow-alt'></i> Home
                </Link>
            </nav>

            <div className={styles.wrapper}>
                <form action="login.html">
                    <h1>Sign Up</h1>

                    <div className={styles['input-box']}>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div className={styles['input-box']}>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className={styles['input-box']}>
                        <input
                            type="password"
                            placeholder="Password"
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