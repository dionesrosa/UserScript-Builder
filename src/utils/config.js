import { readProjectFile, writeProjectFile } from "./files.js";

const CONFIG_FILE = "userscript.config.json";

export async function loadConfig() {

    try {

        const content = await readProjectFile(CONFIG_FILE);

        return JSON.parse(content);

    } catch (error) {

        if (error.code === "ENOENT") {
            throw new Error(
                `Arquivo de configuração não encontrado: ${CONFIG_FILE}`
            );
        }

        if (error instanceof SyntaxError) {
            throw new Error(
                `Arquivo de configuração inválido: ${CONFIG_FILE}`
            );
        }

        throw error;

    }

}

export async function saveConfig(config) {

    await writeProjectFile(
        CONFIG_FILE,
        JSON.stringify(config, null, 2)
    );

}
