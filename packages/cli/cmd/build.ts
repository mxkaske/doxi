import { build, emptyDir } from "https://deno.land/x/dnt@0.23.0/mod.ts";

const packageManager = "npm";
const outDir = "./dist";
const version = Deno.args[0] ?? "development";

await emptyDir(outDir);

Deno.writeTextFileSync(
  "./src/version.ts",
  `export const VERSION = "${version}"`
);

await build({
  packageManager,
  entryPoints: [{ kind: "bin", name: "create-doxi-app", path: "src/mod.ts" }],
  outDir,
  shims: {
    deno: true,
  },
  scriptModule: false,
  declaration: false,
  typeCheck: false,
  test: typeof Deno.env.get("TEST") !== "undefined",
  package: {
    name: "@mxkaske/create-doxi-app",
    version,
    // TODO: extend props
  },
});
Deno.writeTextFileSync(
  "./src/version.ts",
  `// This is set during build
export const VERSION = "development";`
);

// post build steps
Deno.copyFileSync("LICENSE", `${outDir}/LICENSE`);
Deno.copyFileSync("README.md", `${outDir}/README.md`);
