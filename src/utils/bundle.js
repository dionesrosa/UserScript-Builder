import { build } from "esbuild";

export async function bundleProject(entry) {

    console.log("📦 Gerando bundle...");

    const result = await build({

        entryPoints: [entry],

        bundle: true,

        write: false,

        format: "esm",

        platform: "browser",

        target: "es2020"

    });

    return result.outputFiles[0].text;

}