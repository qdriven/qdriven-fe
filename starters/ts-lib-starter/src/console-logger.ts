import chalk from "chalk";

type MSG = string | object;

export const info = (message?: MSG, ...optionalParams: MSG[]) => {
  console.log(chalk.blue(`[INFO] ${message}`), ...optionalParams);
};

export const warn = (message?: MSG, ...optionalParams: MSG[]) => {
  console.log(chalk.yellow(`[WARN] ${message}`), ...optionalParams);
};

export const error = (message?: MSG, ...optionalParams: MSG[]) => {
  console.log(chalk.red(`[ERROR] ${message}`), ...optionalParams);
};
