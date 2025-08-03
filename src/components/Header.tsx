import Menu from './Menu';

export default function Header() {
  return (
    <header style={styles.header}>
      <Menu />
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: 'var(--accent)',
    padding: '8px 16px',
    borderBottom: '2px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'var(--font)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    imageRendering: 'pixelated' as const,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: 'var(--font)',
  },
};
