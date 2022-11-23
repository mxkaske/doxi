import { Command } from "https://deno.land/x/cliffy@v0.25.4/command/mod.ts";
import { copySync } from "https://deno.land/std@0.165.0/fs/mod.ts";

await new Command()
  // Main command.
  .name("create-doxi-app")
  .version("0.0.1")
  .description("Command line framework for Doxi")
  .option("-d, --dir", "Name of the directory")
  .arguments("<directory>")
  .action((options, ...args) => {
    // copySync("./apps/web", args[0]);
    console.log(`Next steps:\ncd ${args[0]}\nnpm i\nnpm run dev`);
  })
  .parse(Deno.args);
