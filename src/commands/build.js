import { readProjectFile, writeProjectFile } from "../utils/files.js";
import { loadConfig } from "../utils/config.js";
import { validateConfig } from "../utils/validator.js";
import { generateMetadata } from "../utils/metadata.js";
import { generateScript } from "../utils/template.js";

export default async function build() {
    let config = await loadConfig();
    config = validateConfig(config);

    const script = await readProjectFile(config.entry);
    
    const metadata = generateMetadata(config);

    const output = generateScript(metadata, script);

    console.log("📦 Project:", config.name);
    console.log("🔖 Version:", config.version);
    console.log("");

    await writeProjectFile(
        config.output ? config.output : `dist/${config.name.toLowerCase().replaceAll(" ", "-")}.user.js`,
        output
    );
}