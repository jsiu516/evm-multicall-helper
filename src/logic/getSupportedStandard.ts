import { ERC_165 } from "@abi";
import { getMulticallHelper } from "@helper/MulticallHelper";

// You can add as many as interfaceId you want, 
//   as long as the contract support ERC-165
export const interfaceIdMapping = {
  "0x80ac58cd": "ERC721",
  "0x5b5e139f": "ERC721_METADATA",
  "0x780e9d63": "ERC721_ENUMERABLE",
};

export const getSupportedStandard = async (
  contractAddress: string,
  opt: Record<string, string>
) => {
  const { chain, network } = opt;
  console.log(
    `Getting SupportedStandard from contract address: (${contractAddress})`
  );
  const multicallHelper = getMulticallHelper(chain, network);

  const interfaceIds = Object.keys(interfaceIdMapping);
  const decodedResult = await multicallHelper.aggregateCalls(
    interfaceIds.map((interfaceId) => ({
      contractAddress,
      abi: ERC_165,
      method: "supportsInterface",
      callArgs: interfaceId,
    }))
  );
  interfaceIds.forEach((interfaceId, index) => {
    console.log(
      `${interfaceIdMapping[interfaceId]}: ${decodedResult[index][0]}`
    );
  });
};
