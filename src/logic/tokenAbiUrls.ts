import { ERC_721_ENUMERABLE } from "@abi";
import { getMulticallHelper } from "@helper/MulticallHelper";

export const tokenURIs = async (
  contractAddress: string,
  rawTokenIds: string,
  opt: Record<string, string>
) => {
  const { chain, network } = opt;
  console.log(
    `Getting tokenAbi from contract address: (${contractAddress}), tokenIds: ${rawTokenIds}`
  );
  const multicallHelper = getMulticallHelper(chain, network);
  console.log(
    await multicallHelper.aggregateCalls([
      {
        contractAddress,
        abi: ERC_721_ENUMERABLE,
        method: "tokenURI",
        callArgs: "4",
      },
      {
        contractAddress,
        abi: ERC_721_ENUMERABLE,
        method: "name",
        // callArgs: string[];
      },
    ])
  );
};
