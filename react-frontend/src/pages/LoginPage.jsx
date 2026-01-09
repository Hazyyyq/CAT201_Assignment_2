import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/AuthPage.module.css';

const LoginPage = () => {
    return (
        /* Use the Container class for the fullscreen background */
        <div className={styles.loginContainer}>

            {/* Use the wrapper class for the login card */}
            <div className={styles.wrapper}>
                <form>
                    <h1>Login</h1>

                    {/* Use bracket notation for classes with hyphens */}
                    <div className={styles['input-box']}>
                        <input type="email" placeholder="Email" required />
                        <i className="bx bxs-user"></i>
                    </div>

                    <div className={styles['input-box']}>
                        <input type="password" placeholder="Password" required />
                        <i className="bx bxs-lock-alt"></i>
                    </div>

                    <div className={styles['remember-forgot']}>
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit" className={styles.btn}>
                        Login
                    </button>

                    <div className={styles['register-link']}>
                        <p>
                            Dont have an account? <Link to="/signup">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;