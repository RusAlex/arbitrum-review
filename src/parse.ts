import * as fs from 'fs';
import * as bytes from 'ethers/utils/bytes';

const content = fs.readFileSync('out.json').toString();

type Log = {
  address: string;
  topics: string[4];
};

type Logs = [Log];
const json: Logs = JSON.parse(content);

console.log('token1', 'token2', 'fee');
json.forEach((item: Log) =>
  console.log(
    bytes.hexDataSlice(item.topics[1], 12),
    bytes.hexDataSlice(item.topics[2], 12),
    parseInt(item.topics[3])
  )
);
