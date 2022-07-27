import "dotenv/config";
import { Command } from "commander";
import { getStandarizedOption } from "@util/parsing";
import { registerCommand } from "@util/commander";
import { ICommandProps } from "@types";

// import { getWeb3 } from "@/src/utils/web3";

const program = new Command();

program
  .name("yarn main")
  .description("CLI to make multicall constant function easier")
  .version("0.0.1");

const defaultOpts = [
  ["-c, --chain <chain>", "specify the chain name (Default: ethereum)"],
  ["-n, --network <network>", "specify the chain name (Default: mainnet)"],
];

const commandPropsSet: ICommandProps[] = [
  // {
  //   name: "interfaceId",
  //   desc: "Check the interface Id given contract address",
  //   args: [["<contractAddress>", "Contract Address"]],
  //   opts: defaultOpts,
  //   action: (str, options) => {
  //     console.log(str);
  //     console.log(options);
  //     console.log(getStandarizedOption(options));
  //   },
  // },
  {
    name: "tokenAbiUrls",
    desc: "Query the metadata url given contract address and token Id set",
    args: [
      ["<contractAddress>", "Contract Address"],
      ["<numerical set>", "Numerical set (Example: 10-15,18)"],
    ],
    opts: defaultOpts,
    action: (str, options) => {
      console.log(str);
      console.log(options);
      console.log(getStandarizedOption(options));
    },
  },
  {
    name: "tokenByIndex",
    desc: "Query the token Ids given contract address and index",
    args: [
      ["<contractAddress>", "Contract Address"],
      ["<numerical set>", "Numerical set (Example: 10-15,18)"],
    ],
    opts: defaultOpts,
    action: (str, options) => {
      console.log(str);
      console.log(options);
      console.log(getStandarizedOption(options));
    },
  },
];

commandPropsSet.forEach((props) => registerCommand(program, props));

program.parse();
