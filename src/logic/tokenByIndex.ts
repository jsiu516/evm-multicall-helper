import { ERC_721_ENUMERABLE } from "@abi";
import { getMulticallHelper } from "@helper/MulticallHelper";
import { parseNumericalStr, outputCsvFile } from "@util/parsing";

export const tokenByIndex = async (
  contractAddress: string,
  rawTokenIds: string,
  opt: Record<string, string>
) => {
  const { chain, network } = opt;
  console.log(
    `Getting tokenByIndex from contract address: (${contractAddress}), tokenIds: ${rawTokenIds}`
  );
  const multicallHelper = getMulticallHelper(chain, network);

  const tokenIds = parseNumericalStr(rawTokenIds);
  const decodedResult = await multicallHelper.aggregateCalls(
    tokenIds.map((tokenId) => ({
      contractAddress,
      abi: ERC_721_ENUMERABLE,
      method: "tokenByIndex",
      callArgs: tokenId.toString(),
    }))
  );
  const formattedResult = tokenIds.map((num, index) => [
    num.toString(),
    decodedResult[index][0],
  ]);
  outputCsvFile("tokenByIndex.csv", formattedResult, [
    "tokenId",
    "tokenByIndex",
  ]);
};
