import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate, Link } from 'react-router-dom';
import { showToast } from '../toast';
import { useLoading } from '../context/LoadingContext';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    const register = async () => {
        if (!nome || !email || !senha) {
            showToast('Preencha todos os campos', true);
            return;
        }

        try {
            setLoading(true);
            const cred = await createUserWithEmailAndPassword(auth, email.toLocaleLowerCase(), senha);
            await setDoc(doc(db, 'users', cred.user.uid), {
                name: nome,
                email: email.toLocaleLowerCase(),
            });
            showToast('Cadastro realizado!');
            navigate('/');
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                showToast('Email já cadastrado', true);
            } else {
                console.error(err);
                showToast('Erro ao cadastrar', true);
            }
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div style={styles.container}>
            <h2>Cadastro</h2>
            <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
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
            <button onClick={register}>Cadastrar</button>
            <p>
                Já tem conta? <Link to="/login">Entrar</Link>
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
