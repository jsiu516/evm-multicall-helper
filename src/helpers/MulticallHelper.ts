import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
import { getMulticallContractAddressStr, getNodeUrlStr } from "@util/parsing";
import { MULTICALL } from "@abi";
import { chain, toArray } from "lodash";

export interface IRawCallDataProps {
  contractAddress: string;
  callData: string;
}

export interface ICallProps {
  contractAddress: string;
  abi: AbiItem[];
  method: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  callArgs?: string | any[];
}

export interface ICallPropsMapping {
  contractByAddr: Record<string, Contract>;
  abiDict: Record<string, Record<string, AbiItem>>;
}

export default class MulticallHelper {
  protected web3: Web3;
  protected contract: Contract;
  constructor(protected nodeUrl: string, public multicallAddr: string) {
    this.web3 = new Web3(nodeUrl);
    this.contract = new this.web3.eth.Contract(MULTICALL, multicallAddr);
  }
  public async aggregateCalls(propSets: ICallProps[]): Promise<string[][]> {
    const { contractByAddr, abiDict } = this.buildCallPropsMapping(propSets);
    const rawCallData = this.encodeCallProps(propSets, contractByAddr);
    const rawResults = await this.aggregateRawCallData(rawCallData);
    const decodedResults = propSets.map((props, index) => {
      const { contractAddress, method } = props;
      const abiOutputTypes = abiDict[contractAddress][method].outputs.map(
        ({ type }) => type
      );
      const decoded = this.web3.eth.abi.decodeParameters(
        abiOutputTypes,
        rawResults[index]
      );
      return toArray(decoded).slice(0, -1) as string[];
    });
    return decodedResults;
  }
  public encodeCallProps(
    propSets: ICallProps[],
    contractByAddr: ICallPropsMapping["contractByAddr"]
  ): IRawCallDataProps[] {
    return propSets.map(({ contractAddress, method, callArgs }) => {
      const contract = contractByAddr[contractAddress];
      const callData: string = callArgs
        ? contract.methods[method](callArgs).encodeABI()
        : contract.methods[method]().encodeABI();
      return {
        contractAddress,
        callData,
      };
    });
  }
  public async aggregateRawCallData(
    propSets: IRawCallDataProps[]
  ): Promise<string[]> {
    const params = this.constructCallParameters(propSets);
    const result = await this.contract.methods["aggregate"](params).call();
    return result.returnData;
  }
  protected constructCallParameters(propSets: IRawCallDataProps[]): string[][] {
    return propSets.map((props) => [props.contractAddress, props.callData]);
  }
  protected buildCallPropsMapping(propSets: ICallProps[]): ICallPropsMapping {
    const abiByAddr = chain(propSets)
      .keyBy("contractAddress")
      .mapValues("abi")
      .value();
    const contractByAddr = chain(abiByAddr)
      .mapValues((abi, addr) => new this.web3.eth.Contract(abi, addr))
      .value();
    const abiDict = chain(abiByAddr)
      .mapValues((items) => {
        const onlyFuncs = items.filter(({ type }) => type === "function");
        return chain(onlyFuncs).keyBy("name").value();
      })
      .value();
    return {
      contractByAddr,
      abiDict,
    };
  }
}

export const getMulticallHelper = (
  chain: string,
  network: string
): MulticallHelper => {
  const nodeUrl = process.env[getNodeUrlStr(chain, network)];
  const contractAddr =
    process.env[getMulticallContractAddressStr(chain, network)];
  return new MulticallHelper(nodeUrl, contractAddr);
};
