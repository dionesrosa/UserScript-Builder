import { ask } from "./prompt.js";
import { getCurrentFolderName } from "./folder.js";
import { toList } from "./normalize.js";

export async function collectProjectConfig() {

    console.log("");
    console.log("📝 Configuração do projeto");
    console.log("");

    const config = {};

    const folderName = getCurrentFolderName();

    config.name = await ask("Nome do projeto", folderName);
    config.version = await ask("Versão", "1.0.0");
    config.description = await ask("Descrição");
    config.author = await ask("Autor");
    config.match = toList(await ask(
        "Match (separe por vírgula)",
        "*://*/*"
    ));

    return config;
}

export async function collectAdvancedConfig() {

    return {
        namespace: await ask(
            "Namespace",
            "http://tampermonkey.net/"
        ),

        license: await ask(
            "License",
            "MIT"
        ),

        icon: await ask(
            "Icon URL"
        ),

        homepageURL: await ask(
            "Homepage URL"
        ),

        supportURL: await ask(
            "Support URL"
        ),

        updateURL: await ask(
            "Update URL"
        ),

        downloadURL: await ask(
            "Download URL"
        )
    };

}
