import { appendFileSync } from "fs";

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

export const parseNumericalStr = (str: string) => {
  let out: number[] = [];
  const selectors = str.split(",");
  for (const selector of selectors) {
    if (isOnlyDigits(selector)) {
      out.push(+selector);
    } else {
      out = [...out, ...convertSelectorToIndexes(selector)];
    }
  }
  return out;
};

export const isOnlyDigits = (str: string) => {
  return str.match(/^\d+$/) !== null;
};

export const convertSelectorToIndexes = (selector: string): number[] => {
  const regex = new RegExp(/(?<start>\d+)-(?<end>\d+)/);
  const match = regex.exec(selector);
  if (!match.groups) {
    throw new Error(`[convertSelectorToIndexes] Invalid selector ${selector}`);
  }
  const start = +match.groups.start;
  const end = +match.groups.end;
  return Array.from({ length: end - start + 1 }, (_, index) => index + start);
};

export const outputCsvFile = (
  path: string,
  data: string[][],
  header: string[]
) => {
  appendFileSync(path, header.join(",") + "\n");
  data.forEach((result) => {
    appendFileSync(path, result.join(",") + "\n");
  });
  console.log(`Wrote CSV file in ${path}`);
};
