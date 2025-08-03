import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();

    // Ler tema do cookie
    useEffect(() => {
        const cookie = document.cookie.split('; ').find(c => c.startsWith('theme='));
        if (cookie) {
            const value = cookie.split('=')[1];
            setTheme(value);
            document.documentElement.setAttribute('data-theme', value);
        }
    }, []);

    // Alternar tema
    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        const isDark = document.body.classList.toggle('dark');
        document.cookie = `theme=${isDark ? 'dark' : 'light'}; path=/; max-age=31536000`;
    };

    // Abrir/fechar com som
    const toggleMenu = () => {
        const audio = new Audio(open ? '/sound/smw_fireball.wav' : '/sound/smw_fireball.wav');
        audio.play().catch(() => { });
        setOpen(!open);
    };

    const logout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const closeMenu = () => setOpen(false);

    return (
        <nav style={styles.container}>
            <div style={styles.logoRow}>
                <img src="/logo.png" alt="Logo" style={styles.logo} />
                <button className="hamburger" onClick={toggleMenu}>☰</button>
            </div>

            <div
                className="menu-container"
                style={{
                    ...styles.menu,
                    maxHeight: open ? 300 : 0,
                    borderTop: open ? '2px solid black' : 'none',
                }}
            >
                <MenuLink icon={(<i className="fas fa-chart-bar"></i>)} to="/" label="Dashboard" onClick={closeMenu} />
                <MenuLink icon={(<i className="fas fa-wallet"></i>)} to="/wallets" label="Carteiras" onClick={closeMenu} />
                <MenuLink icon={(<i className="fas fa-user"></i>)} to="/profile" label="Perfil" onClick={closeMenu} />
                <button onClick={() => { logout(); closeMenu(); }}>
                    <i className="fas fa-sign-out-alt"></i> Sair
                </button>
                <button onClick={toggleTheme}>
                    {theme === 'light'
                        ? (<i className="fas fa-sun"></i>)
                        : (<i className="fas fa-moon"></i>)
                    }
                    Tema: {theme === 'light' ? 'Claro' : 'Escuro'}
                </button>
            </div>

            <style>
                {`
                .hamburger {
                    font-size: 24px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: var(--font);
                    image-rendering: pixelated;
                }

                @media (min-width: 768px) {
                    .hamburger {
                    display: none;
                    }
                }

                @media (min-width: 768px) {
                    .menu-container {
                    display: flex !important;
                    flex-direction: row !important;
                    max-height: none !important;
                    gap: 16px;
                    border-top: none !important;
                    }
                    .hamburger {
                    display: none !important;
                    }
                }

                .menu-container a, .menu-container button {
                    padding: 8px 12px;
                    text-align: left;
                    font-size: 16px;
                    border: none;
                    background: none;
                    color: inherit;
                    cursor: pointer;
                    font-family: var(--font);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    image-rendering: pixelated;
                }

                .menu-container {
                    overflow: hidden;
                    transition: max-height 0.3s ease-in-out;
                    background: var(--accent);
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }
            `}
            </style>
        </nav>
    );
}

function MenuLink({ to, label, icon, onClick }: { to: string, label: string, icon: React.ReactNode, onClick?: () => void }) {
    return (
        <Link to={to} onClick={onClick}>
            {icon}
            {label}
        </Link>
    );
}


const styles = {
    container: {
        width: '100%',
        backgroundColor: 'var(--accent)',
        fontFamily: 'var(--font)',
    },
    logoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
    },
    logo: {
        height: 40,
        imageRendering: 'pixelated' as const,
    },
    hamburger: {
        fontSize: 24,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        imageRendering: 'pixelated' as const,
        fontFamily: 'var(--font)',
    },
    menu: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    icon: {
        width: 18,
        height: 18,
        imageRendering: 'pixelated' as const,
    },
};
