import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/AuthPage.module.css';

const LoginPage = () => {
    return (
        <div className={styles.loginContainer}>

            {/* --- STANDARD NAV PLACEMENT (TOP LEFT) --- */}
            <nav className={styles.navbar}>
                <Link to="/" className={styles.homeLink}>
                    <i className='bx bx-left-arrow-alt'></i> Home
                </Link>
            </nav>

            <div className={styles.wrapper}>
                <form>
                    <h1>Login</h1>

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