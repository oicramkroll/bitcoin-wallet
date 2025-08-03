import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { showToast } from '../toast';
import Layout from '../components/Layout';
import { useLoading } from '../context/LoadingContext';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userRef = doc(db, 'users', auth.currentUser!.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setName(data.name || '');
          setEmail(data.email || '');
        }
      } catch (err) {
        console.error(err);
        showToast('Erro ao carregar perfil', true);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const saveProfile = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, 'users', auth.currentUser!.uid);
      await setDoc(userRef, { name, email });
      showToast('Perfil salvo com sucesso!');
    } catch (err) {
      console.error(err);
      showToast('Erro ao salvar perfil', true);
    }finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2>Editar Perfil</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="email"
        value={email}
        readOnly={true}
        placeholder="Email"
      />
      <button onClick={saveProfile}>Salvar</button>
    </Layout>
  );
}
