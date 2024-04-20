import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThirdwebProvider } from '@thirdweb-dev/react';

const customChain = {
  chainId: 80002, 
  rpc: ["https://80002.rpc.thirdweb.com"], 
 
  // Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "Polygon",
    symbol: "MATIC",
  },
  shortName: "czkevm", // Display value shown in the wallet UI
  slug: "consensys", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "Polygon", // Name of the network
  name: "Polygon Amoy Testnet", // Name of the network
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThirdwebProvider clientId='4b1bef84d8f5002f3103faa1769e33af' activeChain={customChain}>
      <App />
    </ThirdwebProvider>
  </BrowserRouter>
)
