import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import Layout from '../components/Layout';
import { showToast } from '../toast';

export default function Wallets() {
  const [address, setAddress] = useState('');
  const [wallets, setWallets] = useState<any[]>([]);

  useEffect(() => {
    const ref = collection(db, 'wallets', auth.currentUser!.uid, 'addresses');
    return onSnapshot(
      ref,
      (snap) => {
        setWallets(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      },
      () => {
        showToast('Erro ao carregar carteiras', true);
      }
    );
  }, []);

  const addWallet = async () => {
    if (!address) return;
    try {
      await addDoc(collection(db, 'wallets', auth.currentUser!.uid, 'addresses'), {
        address,
      });
      setAddress('');
      showToast('Endereço adicionado!');
    } catch {
      showToast('Erro ao adicionar endereço', true);
    }
  };

  const removeWallet = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'wallets', auth.currentUser!.uid, 'addresses', id));
      showToast('Endereço removido!');
    } catch {
      showToast('Erro ao remover endereço', true);
    }
  };

  return (
    <Layout>
      <h2>Minhas carteiras</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Endereço BTC"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={addWallet}>Adicionar</button>
      </div>

      <ul style={styles.list}>
        {wallets.map((w) => (
          <li key={w.id} style={styles.item}>
            <span style={styles.address}>{w.address}</span>
            <button style={styles.removeBtn} onClick={() => removeWallet(w.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <style>
        {`
          @media (min-width: 600px) {
            .wallet-item {
              flex-direction: row !important;
              justify-content: space-between;
              align-items: center;
            }
          }
        `}
      </style>
    </Layout>
  );
}

const styles = {
  form: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap' as const,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },
  item: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
    padding: '12px',
    background: 'var(--accent)',
    borderRadius: 4,
    wordBreak: 'break-word' as const,
    fontFamily: 'var(--font)',
    imageRendering: 'pixelated' as const,
  },
  address: {
    fontSize: 14,
    wordBreak: 'break-all' as const,
    overflowWrap: 'break-word' as const,
    whiteSpace: 'normal' as const,
  },
  removeBtn: {
    alignSelf: 'flex-start',
    padding: '6px 12px',
    fontSize: 14,
    background: '#e00',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontFamily: 'var(--font)',
    imageRendering: 'pixelated' as const,
  },
};
