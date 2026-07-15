import { readProjectFile, writeProjectFile } from "../utils/files.js";
import { loadConfig } from "../utils/config.js";
import { validateConfig } from "../utils/validator.js";
import { generateMetadata } from "../utils/metadata.js";
import { generateScript } from "../utils/template.js";
import { getOutputFile } from "../utils/output.js";
import { getEntryFile } from "../utils/entry.js";
import { bundleProject } from "../utils/bundle.js";

export default async function build() {

    console.log("🚀 Comando build");

    let config = await loadConfig();

    console.log("⚙️ Configurações carregadas");

    config = validateConfig(config);

    console.log("✅ Configurações validadas");

    console.log("");
    console.log("📦 Projeto:", config.name);
    console.log("🔖 Versão:", config.version);
    console.log("");

    const entryFile = getEntryFile(config);

    let script;
    
    if(config.bundle) {
        script = await bundleProject(entryFile);
    } else {
        script = await readProjectFile(entryFile);
    }

    console.log("📄 Entrada:", entryFile);

    const metadata = generateMetadata(config);

    console.log("📝 Metadados gerados");

    const output = generateScript(metadata, script);

    console.log("🛠️ Script gerado");

    const outputFile = getOutputFile(config);

    await writeProjectFile(outputFile, output);

    console.log("");
    console.log("✅ Build completo!");
    console.log("📁 Saída:", outputFile);
}
