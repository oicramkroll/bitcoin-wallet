# 🪙 Bitcoin Wallet PWA

Uma aplicação PWA responsiva com visual retrô (pixel art) para gerenciar endereços de carteiras Bitcoin, visualizar saldo total em USD/BTC, e acompanhar a evolução dos saldos em gráfico.

---

## 🚀 Tecnologias utilizadas

- React + Vite
- TypeScript
- Firebase Authentication
- Firebase Firestore
- Chart.js
- Vite Plugin PWA
- Font Awesome (ícones via fonte)
- Estilo pixel-art retrô com modo claro/escuro

---

## ✅ Funcionalidades

- Autenticação por **email e senha**
- Cadastro de usuários com verificação de e-mail
- Recuperação de senha
- Tela de **perfil** com edição de nome e email
- Inclusão e exclusão de **endereços de carteiras Bitcoin**
- Dashboard com:
  - Saldo total convertido para USD
  - Saldo total equivalente em BTC
  - Gráfico de evolução dos últimos 5 dias (simulado)
- Sons de feedback estilo **Super Mario**
- Tema claro/escuro persistente via cookie
- Compatível com instalação como app (PWA)

---

## 🛠️ Instalação e execução local

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/bitcoin-wallet-pwa.git
cd bitcoin-wallet-pwa
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie o arquivo `.env` na raiz do projeto

```bash
touch .env
```

E inclua suas credenciais do Firebase:

```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Você encontra essas informações no painel do Firebase, em "Configurações do projeto > Configuração do app da web".

### 4. Rode o projeto localmente

```bash
npm run dev
```

Acesse em: http://localhost:5173

---

## 🔐 Regras recomendadas do Firestore

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /wallets/{userId}/addresses/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 📱 Instalação como PWA

O app já está preparado com `manifest.webmanifest` e `vite-plugin-pwa`.  
Para testar:

1. Acesse o app em um navegador mobile
2. Clique em "Instalar app" ou "Adicionar à tela inicial"
3. Use como um app nativo, com ícone e splash screen

---

## ✨ Créditos

- Sons estilo Super Mario extraídos de packs de domínio público
- Ícones em pixel art desenhados sob medida
- Estilo visual inspirado em jogos 16-bit dos anos 90
- Powered by Vite + Firebase + React

---

## 🧠 Autor

Desenvolvido por [Márcio Sena](https://github.com/oicramkroll).

---