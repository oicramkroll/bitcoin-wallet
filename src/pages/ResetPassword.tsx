import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config';
import { showToast } from '../toast';
import { Link } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const { setLoading } = useLoading();

  const handleReset = async () => {
    if (!email) {
      showToast('Informe seu email', true);
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      showToast('Email de recuperação enviado!');
    } catch (err) {
      console.error(err);
      showToast('Erro ao enviar email', true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Redefinir senha</h2>
      <input
        type="email"
        placeholder="Seu email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleReset}>Enviar email de redefinição</button>
      <p>
        <Link to="/login">Voltar para login</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: 16,
    fontFamily: 'var(--font)',
    imageRendering: 'pixelated' as const,
  },
};
