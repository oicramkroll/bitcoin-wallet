import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { getWalletBalances } from '../services/walletService';
import { Line } from 'react-chartjs-2';
import Layout from '../components/Layout';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [totalBtc, setTotalBtc] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const loadBalances = async () => {
      const snapshot = await getDocs(collection(db, 'wallets', auth.currentUser!.uid, 'addresses'));
      const addresses = snapshot.docs.map(doc => doc.data().address);
      const result = await getWalletBalances(addresses);
      const sum = Object.values(result.balances).reduce((acc, val) => acc + val, 0);
      setTotal(sum);
      setTotalBtc(result.totalBtc);
      const evolution = Array(5).fill(0).map((_, i) => {
        const factor = 0.9 + i * 0.025;
        return parseFloat((sum * factor).toFixed(2));
      });
      setHistory(evolution);
    };

    loadBalances();
  }, []);

  const data = {
    labels: ['-4d', '-3d', '-2d', '-1d', 'Hoje'],
    datasets: [
      {
        label: 'Saldo em USD',
        data: history,
        borderColor: 'orange',
        backgroundColor: 'transparent',
        tension: 0.2,
      },
    ],
  };

  return (
    <Layout>
      <h2>Saldo total: ${total.toFixed(2)}</h2>
      <p style={{ color: '#aaa', fontSize: 16 }}>≈ ₿ {totalBtc.toFixed(8)} BTC</p>
      <div style={{ maxWidth: 600, marginBottom: 20 }}>
        <Line data={data} />
      </div>
    </Layout>
  );
}
