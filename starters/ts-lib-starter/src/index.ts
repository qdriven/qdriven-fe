import { program } from "commander";
import * as pkg from "./pkg";
import { listAllApps } from "./action/appInstaller";
import figlet from "figlet";
import { info } from "./console-logger";

figlet("starter", function (error, result) {
  if (error) {
    info("something went wrong .......");
    return;
  }
  console.log(result);
});

program.name("starter").version(pkg.version);
program
  .command("list")
  .description("list all will be installed.")
  .action(function () {
    listAllApps();
  });
