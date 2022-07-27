export interface ICommandProps {
  name: string;
  desc: string;
  args: string[][];
  opts: string[][];
  action: (str: string, opt: any) => any;
}
