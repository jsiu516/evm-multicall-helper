export const getStandarizedOption = (opts: {
  [key: string]: string;
}): { [key: string]: string } => {
  const chain = opts.chain ?? "ethereum";
  const network = opts.network ?? "mainnet";
  return {
    ...opts,
    chain,
    network,
  };
};

export const getNodeUrlStr = (chain: string, network: string): string =>
  `${chain.toUpperCase()}_${network.toUpperCase()}_NODE_URL`;

export const getMulticallContractAddressStr = (
  chain: string,
  network: string
): string =>
  `${chain.toUpperCase()}_${network.toUpperCase()}_MULTICALL_ADDRESS`;
