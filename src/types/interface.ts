import { Option } from "commander";

export interface ICommandProps {
  name: string;
  desc: string;
  args: string[][];
  opts: Option[];
  action: (...args: any[]) => any;
}
