import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/AboutPage.module.css';
import Footer from '../components/Footer.jsx';

function AboutPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.pageWrapper}>
            <nav className="nav">
                <Link to="/" className="logo">
                    KAKI GAMERZ<span className="dot"></span>
                </Link>

                <div className="nav-links desktop-menu">
                    <Link to="/">Home</Link>
                </div>

                <div className="sidebar" onClick={() => setIsOpen(!isOpen)}>
                    <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
                </div>
            </nav>

            <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </div>

            <main className={styles.container}>
                <div className={styles['brand-header']}>
                    <h1 className={styles['big-brand-title']}>
                        KAKI <span className={styles['neon-text-title']}>GAMERZ</span>
                    </h1>
                    <hr className={styles.separator2} />
                    <div className={styles['brand-tagline']}>YOUR REALITY, LEVELED UP.</div>

                    <p className={styles['about-text']}>
                        At <strong className={styles['text-white']}>Kaki Gamerz</strong>, we define the intersection of gaming
                        culture and modern mobility.
                        We are your premier destination for the latest <span className={styles.highlight}>video games</span>,
                        high-performance <span className={styles.highlight}>smartphones</span>, versatile tablets, and
                        essential smart wearables.
                    </p>
                </div>

                <div className={styles['All-Grid']}>
                    {/* Airil's Profile */}
                    <article className={styles.managerProfile}>
                        <img src="/img/Airil.jpeg" alt="Airil Aiman bin Azman" />
                        <div className={styles.info}>
                            <h5>Airil Aiman bin Azman</h5>
                            <p style={{ color: '#66fcf1', fontWeight: 'bold' }}>System Architect</p>
                            <p className={styles['job-desc']}>
                                Constructed the world logic. Ensures the database is robust enough to handle the
                                ultimate boss fight.
                            </p>
                        </div>
                        <ul className={styles.ManagerSocMed}>
                            <li><a href="https://www.facebook.com/share/1FfxboWiwL/?mibextid=wwXIfr"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="https://www.instagram.com/youdeffdonnome?igsh=MTN2czllMm9nNGpjMA=="><i className="fa fa-instagram"></i></a></li>
                            <li><a href="https://www.linkedin.com/in/airil-aiman-a251053a5"><i className="fa fa-linkedin-square"></i></a></li>
                        </ul>
                    </article>

                    {/* Aiman's Profile */}
                    <article className={styles.managerProfile}>
                        <img src="/img/Aiman.jpeg" alt="Mohammad Aiman Akmal bin Azlan" />
                        <div className={styles.info}>
                            <h5>Mohammad Aiman Akmal bin Azlan</h5>
                            <p style={{ color: '#66fcf1', fontWeight: 'bold' }}>UI Designer</p>
                            <p className={styles['job-desc']}>
                                Polished the pixels. Designed an interface that looks pleasing to the eye.
                            </p>
                        </div>
                        <ul className={styles.ManagerSocMed}>
                            <li><a href="https://www.facebook.com/mohd.aiman.akmal.2025/"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="https://www.instagram.com/kmalzln_/"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="https://linkedin.com/in/aimanakmalazlan/"><i className="fa fa-linkedin-square"></i></a></li>
                        </ul>
                    </article>

                    {/* Johan's Profile */}
                    <article className={styles.managerProfile}>
                        <img src="/img/Johan.png" alt="Muhammad Johan bin Talib" />
                        <div className={styles.info}>
                            <h5>Muhammad Johan bin Talib</h5>
                            <p style={{ color: '#66fcf1', fontWeight: 'bold' }}>UX Designer</p>
                            <p className={styles['job-desc']}>
                                Balancer of gameplay. Removed friction points to ensure the user experience is overpowered.
                            </p>
                        </div>
                        <ul className={styles.ManagerSocMed}>
                            <li><a href="https://www.facebook.com/share/1C4KuyRk9n/"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="https://www.instagram.com/mjohan._?igsh=MWJjdnBpM2R5NWNobA=="><i className="fa fa-instagram"></i></a></li>
                            <li><a href="https://www.linkedin.com/in/muhammad-johan-bin-talib-moe-5426b03a3/"><i className="fa fa-linkedin-square"></i></a></li>
                        </ul>
                    </article>

                    {/* Haziq's Profile */}
                    <article className={styles.managerProfile}>
                        <img src="/img/Haziq.png" alt="Muhammad Haziq Irsyad bin Mohd Rafeein" />
                        <div className={styles.info}>
                            <h5>Muhammad Haziq Irsyad bin Mohd Rafeein</h5>
                            <p style={{ color: '#66fcf1', fontWeight: 'bold' }}>Front-End Developer</p>
                            <p className={styles['job-desc']}>
                                Master of execution. Squashed bugs and wrote the code that makes the buttons click.
                            </p>
                        </div>
                        <ul className={styles.ManagerSocMed}>
                            <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="https://www.instagram.com/hzq.irsyad?igsh=MTR4dm9jdXgwMXgzbA==" target="_blank" rel="noreferrer"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><i className="fa fa-linkedin-square"></i></a></li>
                        </ul>
                    </article>
                </div>

                <hr className={styles.separator} />

                <section className={styles['video-section']}>
                    <video autoPlay muted loop playsInline className={styles['back-video']}>
                        <source src="/vid/GravitiGamerz.mp4" type="video/mp4" />
                    </video>
                    <div className={styles['video-overlay']}></div>
                    <div className={styles['MissionVision-container']}>
                        <h2 className={styles['section-title']}>Our <span className={styles.highlight}>Mission</span></h2>
                        <p>To create the ultimate home ground for the Real Kaki Gamerz.</p>
                    </div>
                </section>

                <hr className={styles.separator} />

                <section className={styles['video-section']}>
                    <video autoPlay muted loop playsInline className={styles['back-video']}>
                        <source src="/vid/GravitiGamerz_2.mp4" type="video/mp4" />
                    </video>
                    <div className={styles['video-overlay']}></div>
                    <div className={styles['MissionVision-container']}>
                        <h2 className={styles['section-title']}>Our <span className={styles.highlight}>Vision</span></h2>
                        <p>A borderless Gaming Empire where the Real Kaki Gamerz spirit thrives.</p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default AboutPage;