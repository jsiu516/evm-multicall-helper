import { getWeb3 } from "@/src/utils/web3";

export const tokenAbiUrls = async (
  contractAddress: string,
  rawTokenIds: string,
  opt: any
) => {
  console.log(opt);
  const web3 = getWeb3(opt.chain, opt.network);
  console.log(contractAddress);
  console.log(rawTokenIds);
  web3;
};
