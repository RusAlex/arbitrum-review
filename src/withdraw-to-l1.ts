// withdraw the l2 script
import fs from 'fs';
import { ethers } from 'ethers';
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8547');

let wallet = new ethers.Wallet(
  fs
    .readFileSync('.secret')
    .toString()
    .trim()
);
wallet = wallet.connect(provider);

// wallet.getBalance().then(result => console.log(parseInt(result.toString())));
