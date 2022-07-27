import "dotenv/config";
import { Command, Option } from "commander";
import { getStandarizedOption } from "@util/parsing";
import { registerCommand } from "@util/commander";
import { ICommandProps } from "@types";
import { tokenURIs } from "@logic";

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
    name: "tokenUrls",
    desc: "Query the metadata url given contract address and token Id set",
    args: [
      ["<contractAddress>", "Contract Address"],
      ["<numerical set>", "Numerical set (Example: 10-15,18)"],
    ],
    opts: chainOpts,
    action: (...args) => {
      const opt = getStandarizedOption(args[2]);
      tokenURIs(args[0], args[1], opt);
      // console.log(str);
      // const standardOpts = getStandarizedOption(options);
      // console.log(standardOpts);
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
    action: (...args) => {
      console.log(args);
      // const standardOpts = getStandarizedOption(options);
      // console.log(str);
      // console.log(options);
      // console.log(standardOpts);
    },
  },
];

commandPropsSet.forEach((props) => registerCommand(program, props));

program.parse();
