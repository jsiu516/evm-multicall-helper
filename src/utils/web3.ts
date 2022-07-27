import Web3 from "web3";
import { isNil } from "lodash";

export const getWeb3 = (chain: string, network: string): Web3 => {
  const envStr = `${chain.toUpperCase()}_${network.toUpperCase}_NODE_URL`;
  console.log(envStr);
  const nodeUrl = process.env[envStr];
  if (isNil(nodeUrl)) {
    throw new Error("nodeUrl is undefined. Check .env or input.");
  }
  return new Web3(nodeUrl);
};
