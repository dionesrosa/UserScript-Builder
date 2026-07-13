import fs from "node:fs/promises";
import path from "node:path";
import { loadConfig } from "../utils/config.js";
import { validateConfig } from "../utils/validator.js";
import { getOutputFile } from "../utils/output.js";
import { assertCleanWorkingTree } from "../utils/git.js";

export default async function publish() {
    console.log("🚀 Comando publish");

    let config = await loadConfig();

    console.log("⚙️ Configurações carregadas");

    config = validateConfig(config);

    await assertCleanWorkingTree();

    console.log("✅ Árvore de trabalho limpa");

    const sourceFile = path.resolve(process.cwd(), getOutputFile(config));
    await fs.access(sourceFile);

    console.log("✅ Artefato pronto para publicação:", sourceFile);
}
