import * as fs from 'fs';
import * as bytes from 'ethers/utils/bytes';
import { ethers } from 'ethers';
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8547');

const content = fs.readFileSync('out.json').toString();

type Log = {
  address: string;
  topics: string[4];
};

type Logs = [Log];
const json: Logs = JSON.parse(content);
// console.log(json);

console.log('token1', 'token2', 'fee');
const processed = {};
json.forEach((item: Log) => {
  // if (-x >= 0) return;
  const token0 = bytes.hexDataSlice(item.topics[1], 12);
  const token1 = bytes.hexDataSlice(item.topics[2], 12);
  if (processed[token0] && processed[token1]) return;
  // abi code should be written and then used as contract constructor
  // and then call the l1address getter
  const contract0 = new ethers.Contract(
    token0,
    '[{"inputs":[],"name":"l1Address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"}]',
    provider
  );

  const contract1 = new ethers.Contract(
    token1,
    '[{"inputs":[],"name":"l1Address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"}]',
    provider
  );

  return contract0.callStatic
    .l1Address()
    .then(address => {
      if (processed[token0]) return;
      console.log(token0, address);
      processed[token0] = true;
    })
    .catch(() => {})
    .then(() =>
      contract1.callStatic
        .l1Address()
        .then(address => {
          if (processed[token1]) return;
          console.log(token1, address);
          processed[token1] = true;
        })
        .catch(() => {})
    );
});

// const contract = new ethers.Contract(
//   '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
//   '[{"inputs":[],"name":"l1Address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"}]',
//   provider
// );

// contract.callStatic.l1Address().then(console.log);
