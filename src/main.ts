import "dotenv/config";
import { Command, Option } from "commander";
import { getStandarizedOption } from "@util/parsing";
import { registerCommand } from "@util/commander";
import { ICommandProps } from "@types";
import { getTokenURIs, getTokenByIndex, getSupportedStandard } from "@logic";

// import { getWeb3 } from "@/src/utils/web3";

const program = new Command();

program
  .name("yarn main")
  .description("CLI to make multicall constant function easier")
  .version("0.0.1");

const chainOpts: Option[] = [
  new Option("-c, --chain <chain>", "specify the chain name")
    .choices(["ethereum", "polygon", "cronos"])
    .default("ethereum"),
  new Option("-n, --network <network>", "Specify the network")
    .choices(["mainnet", "testnet"])
    .default("mainnet"),
];

const commandPropsSet: ICommandProps[] = [
  {
    name: "supportInterface",
    desc: "Check the support interface contract address",
    args: [["<contractAddress>", "Contract Address"]],
    opts: chainOpts,
    action: (args) => {
      const opt = getStandarizedOption(args[1]);
      getSupportedStandard(args[0], opt);
    },
  },
  {
    name: "tokenUrls",
    desc: "Query the metadata url given contract address and token Id set",
    args: [
      ["<contractAddress>", "Contract Address"],
      ["<numerical set>", "Numerical set (Example: 10-15,18)"],
    ],
    opts: chainOpts,
    action: (args) => {
      const opt = getStandarizedOption(args[2]);
      getTokenURIs(args[0], args[1], opt);
    },
  },
  {
    name: "tokenByIndex",
    desc: "Query the token Ids given contract address and index",
    args: [
      ["<contractAddress>", "Contract Address"],
      ["<numerical set>", "Numerical set (Example: 10-15,18)"],
    ],
    opts: chainOpts,
    action: (args) => {
      const opt = getStandarizedOption(args[2]);
      getTokenByIndex(args[0], args[1], opt);
    },
  },
];

commandPropsSet.forEach((props) => registerCommand(program, props));

program.parse();
