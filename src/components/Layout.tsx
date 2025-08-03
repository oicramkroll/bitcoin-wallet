import Header from './Header';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.containerPage}>{children}</main>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: 0,
    fontFamily: 'var(--font)',
    imageRendering: 'pixelated' as const,
  },
  containerPage: {
    maxWidth: 800,
    paddingTop: '120px',
    margin: '0 auto',
  },
};
