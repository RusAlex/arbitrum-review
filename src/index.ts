import { ethers } from 'ethers';
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8547');
// const signer = provider.getSigner();

const filter = {
  address: '0x1F98431c8aD98523631AE4a59f267346ea31F984', // UniswapV3Factory
  topics: [
    '0x783cca1c0412dd0d695e784568c96da2e9c22ff989357a2e8b1d9b2b4e6b7118' // PoolCreated(token0, token1, fee, tickSpacing, pool)
  ],
  fromBlock: '0x1'
};

// wrote a file out.json with next command
provider.getLogs(filter).then(result => console.log(JSON.stringify(result)));
