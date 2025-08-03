/**
 * Consulta o saldo (em USD) de uma lista de carteiras BTC usando Blockstream + CoinGecko.
 */

const BLOCKSTREAM_API = 'https://blockstream.info/api';
const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

export async function getWalletBalances(addresses: string[]): Promise<{ balances: Record<string, number>; totalBtc: number }> {
  const balances: Record<string, number> = {};
  let totalBtc: number = 0;
  const btcPrice = await fetchBtcUsd();

  await Promise.all(
    addresses.map(async (address) => {
      try {
        const res = await fetch(`${BLOCKSTREAM_API}/address/${address}`);
        const data = await res.json();
        totalBtc = (data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum) / 1e8;
        balances[address] = parseFloat((totalBtc * btcPrice).toFixed(2));
      } catch (err) {
        console.error(`Erro ao consultar endereço ${address}`, err);
        balances[address] = 0;
      }
    })
  );

  return { balances, totalBtc };
}

async function fetchBtcUsd(): Promise<number> {
  try {
    const res = await fetch(COINGECKO_API);
    const data = await res.json();
    return data.bitcoin.usd ?? 0;
  } catch (err) {
    console.error('Erro ao buscar preço do BTC', err);
    return 0;
  }
}
