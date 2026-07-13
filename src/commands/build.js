import { readProjectFile } from "../utils/files.js";
import { loadConfig } from "../utils/config.js";
import { validateConfig } from "../utils/validator.js";
import { generateMetadata } from "../utils/metadata.js";

export default async function build() {
    let config = await loadConfig();
    config = validateConfig(config);

    const script = await readProjectFile(config.entry);
    
    const metadata = generateMetadata(config);

    console.log("📦 Project:", config.name);
    console.log("🔖 Version:", config.version);
    //console.log("📝 Metadata:");
    //console.log(metadata);

    console.log("📝 Entry:");
    console.log(script);

}