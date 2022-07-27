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
