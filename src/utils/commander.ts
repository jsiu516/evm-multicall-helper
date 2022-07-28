import { Command } from "commander";
import { ICommandProps } from "@types";

export const registerCommand = (program: Command, props: ICommandProps) => {
  const { name, desc, args, opts, action } = props;
  const command = program.command(name).description(desc);
  args.forEach((arg) => {
    command.argument(arg[0], arg[1]);
  });
  opts.forEach((opt) => {
    command.addOption(opt);
  });
  command.action(
    (...args) => {
      try {
        action(args);
      } catch (err) {
        console.error(err);
      }
    }
  );
};
