import Web3 from "web3";
import { isNil } from "lodash";
import { getNodeUrlStr } from "@util/parsing";

export const getWeb3 = (chain: string, network: string): Web3 => {
  const nodeUrl = process.env[getNodeUrlStr(chain, network)];
  if (isNil(nodeUrl)) {
    throw new Error("nodeUrl is undefined. Check .env or input.");
  }
  console.log(`Using Web3 (${chain}, ${network}), nodeUrl: ${nodeUrl}`);
  return new Web3(nodeUrl);
};
