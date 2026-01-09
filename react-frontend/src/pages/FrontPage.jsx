import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styles from '../style/FrontPage.module.css'; // Keeps hero/product styles modular
import Footer from "../components/Footer.jsx";

function FrontPage() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Scroll Reveal Logic
    useEffect(() => {
        // 1. Handle URL Hash Scrolling
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }

        // 2. Scroll Animation
        const reveal = () => {
            // Keep using styles['info-card'] because content is still modular
            let reveals = document.getElementsByClassName(styles['info-card']);

            for (let i = 0; i < reveals.length; i++) {
                let windowheight = window.innerHeight;
                let revealtop = reveals[i].getBoundingClientRect().top;
                let revealpoint = 150;

                if (revealtop < windowheight - revealpoint) {
                    reveals[i].classList.add(styles.active);
                }
            }
        };

        window.addEventListener('scroll', reveal);
        reveal();

        return () => window.removeEventListener('scroll', reveal);
    }, [location]);

    // Helper for nav clicks
    const scrollToSection = (e, id) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `/#${id}`);
        }
    };

    return (<>
        {/* 1. NAV IS NOW GLOBAL (Matches AboutPage) */}
        <nav className="nav">
            {/* 1. LEFT: LOGO */}
            <Link to="/" className="logo">
                KAKI GAMERZ<span className="dot"></span>
            </Link>

            {/* 2. CENTER: NAV LINKS */}
            <div className="nav-links desktop-menu">
                <Link to="/#phone" onClick={(e) => scrollToSection(e, 'phone')}>KakiPhone</Link>
                <Link to="/#watch" onClick={(e) => scrollToSection(e, 'watch')}>KakiWatch</Link>
                <Link to="/#tablet" onClick={(e) => scrollToSection(e, 'tablet')}>KakiPad</Link>
                <Link to="/#games" onClick={(e) => scrollToSection(e, 'games')}>Games</Link>
                <Link to="/#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</Link>
            </div>

            {/* 3. RIGHT: GROUPED ACTIONS (Fixes the Gap) */}
            <div className="nav-actions">
                <Link to="/cart" className={styles['cart-icon-container']}>
                    <span id="cart-badge" className={`fa-stack fa-lg ${styles['has-badge']}`} data-count="0">
                      <i className="fa fa-circle fa-stack-2x"></i>
                      <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
                    </span>
                </Link>


                <div className="nav-button">
                    <Link to ="/admin" className="nav-pill-btn">Admin Panel</Link>
                    <Link to="/login" className="nav-pill-btn">Login</Link>
                </div>
            </div>

            {/* SIDEBAR TRIGGER */}
            <div className="sidebar" onClick={() => setIsOpen(!isOpen)}>
                <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
            </div>
        </nav>

        {/* Mobile Overlay is Global */}
        <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`}>
            <Link to="/#phone" onClick={(e) => scrollToSection(e, 'phone')}>KakiPhone</Link>
            <Link to="/#watch" onClick={(e) => scrollToSection(e, 'watch')}>KakiWatch</Link>
            <Link to="/#tablet" onClick={(e) => scrollToSection(e, 'tablet')}>KakiPad</Link>
            <Link to="/#games" onClick={(e) => scrollToSection(e, 'games')}>Games</Link>
            <Link to="/#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</Link>
        </div>

        {/* --- MAIN CONTENT REMAINS MODULAR --- */}
        <section id="home" className={`${styles['hero-section']} ${styles['dark-theme']} ${styles['short-hero']}`}>
            <img
                src="https://i.pinimg.com/originals/cd/f4/95/cdf4951a69fe542e2b7d6a07aa234a1b.gif"
                className={styles['hero-bg-img']}
                alt="Home Background"
            />
            <h1 className={styles['hero-store-title']}>
                KAKI <span className={styles['neon-text-title-front']}>GAMERZ</span>
            </h1>
        </section>

        {/* --- PHONE INTRO (ID: phone) --- */}
        <section id="phone" className={`${styles['hero-section']} ${styles['dark-theme']}`}>
            <img
                src="https://cdn.mos.cms.futurecdn.net/hUQHCvvKAHtNGxtLiB8rjP.gif"
                className={styles['hero-bg-img']}
                alt="Phone Intro"
            />
        </section>

        {/* PHONE CARD SECTION */}
        <section className={`${styles['hero-section']} ${styles['dark-theme']}`}>
            <img
                src="https://miro.medium.com/v2/1*aTmCQXNJDgO7oQ371gRVvg.gif"
                className={styles['hero-bg-img']}
                alt="Phone Detail"
            />
            <div className={`${styles['info-card']} reveal`}>
                <span className={styles['card-label']}>Unfair Advantage. 144Hz. Zero Lag</span>
                <h2 className={styles['card-title']}>KakiPhone<span className="dot"></span></h2>
                <Link to="/products?type=phone" className={styles['btn-shop']}>View</Link>
            </div>
        </section>

        {/* --- WATCH INTRO (ID: watch) --- */}
        <section id="watch" className={`${styles['hero-section']} ${styles['dark-theme']}`}>
            <img
                src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/3486306/APPLEWATCH_INTRO.0.gif"
                className={styles['hero-bg-img']}
                alt="Watch Intro"
            />
        </section>

        {/* WATCH CARD SECTION */}
        <section className={`${styles['hero-section']} ${styles['dark-theme']}`}>
            <img
                src="https://i.pinimg.com/originals/66/97/1d/66971d5b5aeaf2a98116ccb97e0ca10d.gif"
                className={styles['hero-bg-img']}
                alt="Watch Detail"
            />
            <div className={`${styles['info-card']} reveal`}>
                <span className={styles['card-label']}>Your HUD in real life.</span>
                <h2 className={styles['card-title']}>KakiWatch Ultra<span className="dot"></span></h2>
                <Link to="/products?type=watch" className={styles['btn-shop']}>View</Link>
            </div>
        </section>

        {/* --- TABLET INTRO (ID: tablet) --- */}
        <section id="tablet" className={`${styles['hero-section']} ${styles['dark-theme']}`}>
            <img
                src="https://www.young-minds.sg/sites/default/files/inline-images/iPadAirgif.gif"
                className={styles['hero-bg-img']}
                alt="Tablet Intro"
            />
        </section>

        {/* TABLET CARD SECTION */}
        <section className={`${styles['hero-section']} ${styles['dark-theme']}`}>
            <img
                src="https://www.lowyat.net/wp-content/uploads/2024/05/Apple-iPad-Pro-M4-launch-8.jpg"
                className={styles['hero-bg-img']}
                alt="Tablet Detail"
            />
            <div className={`${styles['info-card']} reveal`}>
                <span className={styles['card-label']}>Bigger Screen. Better Headshots.</span>
                <h2 className={styles['card-title']}>KakiPad Air<span className="dot"></span></h2>
                <Link to="/products?type=tablet" className={styles['btn-shop']}>View</Link>
            </div>
        </section>

        {/* --- GAMES SECTION (ID: games) --- */}
        <section id="games" className={`${styles['hero-section']} ${styles['dark-theme']}`}>
            <img
                src="https://i.pinimg.com/originals/f0/06/1d/f0061dcf4eb30dded5caeb4bb1730363.gif"
                className={styles['hero-bg-img']}
                alt="Games Background"
            />
            <div className={`${styles['info-card']} reveal`}>
                <span className={styles['card-label']}>Got the Gear? Now Get the Game.</span>
                <h2 className={styles['card-title']}>Our Latest Games <span className="dot"></span></h2>
                <Link to="/games" className={styles['btn-shop']}>View</Link>
            </div>
        </section>

        {/* --- ABOUT SECTION (ID: about) --- */}
        <section id="about" className={`${styles['hero-section']} ${styles['dark-theme']} ${styles['short-hero']}`}>
            <img
                src="https://i.pinimg.com/originals/cd/f4/95/cdf4951a69fe542e2b7d6a07aa234a1b.gif"
                className={styles['hero-bg-img']}
                alt="About Team Background"
            />
            <div className={`${styles['info-card']} reveal`}>
                <span className={styles['card-label']}>Meet the Kaki Gamerz Team.</span>
                <h2 className={styles['card-title']}>Kaki Gamerz Corp.<span className="dot"></span></h2>
                <Link to="/about" className={styles['btn-shop']}>Meet the Squad</Link>
            </div>
        </section>

        <Footer/>
    </>)
}

export default FrontPage;