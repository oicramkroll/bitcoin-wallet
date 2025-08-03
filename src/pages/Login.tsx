import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate, Link } from 'react-router-dom';
import { showToast } from '../toast';
import { useLoading } from '../context/LoadingContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.toLocaleLowerCase(), senha);
      showToast('Login realizado!');
      navigate('/');
    } catch (err) {
      showToast('Email ou senha inválidos', true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <img src="/logo.png" alt="Logo" style={styles.logo} />
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Seu email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Sua senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      <button onClick={login}>Entrar</button>
      <p>
        Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
      </p>
      <p>
        <Link to="/reset">Esqueci minha senha</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: 16,
    textAlign: 'center' as const,
    fontFamily: 'var(--font)',
    imageRendering: 'pixelated' as const,
  },
  logo: {
    width: '100%',
    maxWidth: 280,
    marginBottom: 16,
    imageRendering: 'pixelated' as const,
  },
};
