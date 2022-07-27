import { Option } from "commander";

export interface ICommandProps {
  name: string;
  desc: string;
  args: string[][];
  opts: Option[];
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  action: (...args: any[]) => void;
}
