import { useLoading } from '../context/LoadingContext';

export default function LoadingOverlay() {
    const { loading } = useLoading();
    if (!loading) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.box}>
                <span style={styles.text}>
                    ⏳ Carregando
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                </span>

            </div>
            <style>
                {`
                    .dot {
                        animation: blink 1.4s infinite;
                        font-weight: bold;
                    }
                    .dot:nth-child(2) {
                        animation-delay: 0.2s;
                    }
                    .dot:nth-child(3) {
                        animation-delay: 0.4s;
                    }
                    .dot:nth-child(4) {
                        animation-delay: 0.6s;
                    }

                    @keyframes blink {
                        0%, 20% {
                        opacity: 0;
                        }
                        50% {
                        opacity: 1;
                        }
                        100% {
                        opacity: 0;
                        }
                    }
                `}
            </style>

        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        imageRendering: 'pixelated' as const,
    },
    box: {
        backgroundColor: '#222',
        padding: '16px 24px',
        borderRadius: 4,
        border: '2px solid #fff',
        color: 'white',
        fontSize: 18,
        fontFamily: 'var(--font)',
    },
    text: {
        display: 'inline-block',
    },
};
