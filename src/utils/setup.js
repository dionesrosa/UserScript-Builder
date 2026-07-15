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
    config.author = await ask("Autor");
    config.description = await ask("Descrição");
    
    config.bundle = (await ask(
        "Habilitar bundle? (s/n)",
        "n"
    )).toLowerCase() === "s";

    config.match = toList(await ask(
        "Match (separe por vírgula)",
        "*://*/*"
    ));

    return config;
}

async function askSection(question, collector) {
    const acceptedYes = [
        "s",
        "sim",
        "y",
        "yes"
    ];

    const answer = await ask(question, "n");

    if (!acceptedYes.includes(answer.toLowerCase())) {
        return {};
    }

    console.log("");

    return collector();
}

async function collectIdentityConfig() {
    return {
        namespace: await ask(
            "Namespace",
            "http://tampermonkey.net/"
        ),

        /*copyright: await ask(
            "Copyright"
        ),*/

        icon: await ask(
            "Icon URL"
        ),

        /*icon64: await ask(
            "Icon 64x64 URL"
        ),*/

        license: await ask(
            "License",
            "MIT"
        )
    };
}

async function collectLinkConfig() {
    return {
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

async function collectRuntimeConfig() {
    return {
        run_at: await ask(
            "Run at",
            "document-idle"
        ),

        run_in: await ask(
            "Run in"
        ),

        sandbox: await ask(
            "Sandbox"
        ),

        noframes: (await ask(
            "No frames? (s/n)"
        )).toLowerCase() === "s",

        tag: toList(await ask(
            "Tags (separe por vírgula)"
        ))
    };
}

async function collectPermissionConfig() {
    return {
        include: toList(await ask(
            "Include (separe por vírgula)"
        )),

        exclude: toList(await ask(
            "Exclude (separe por vírgula)"
        )),

        require: toList(await ask(
            "Require (separe por vírgula)"
        )),

        grant: toList(await ask(
            "Grant (separe por vírgula)"
        )),

        connect: toList(await ask(
            "Connect (separe por vírgula)"
        ))
    };
}

export async function collectAdvancedConfig() {
    console.log("⚙️ Configurações avançadas");
    console.log("");

    return {
        ...(await askSection("Configurar identidade avançada? (s/n)", collectIdentityConfig)),
        ...(await askSection("Configurar links do projeto? (s/n)", collectLinkConfig)),
        ...(await askSection("Configurar execução? (s/n)", collectRuntimeConfig)),
        ...(await askSection("Configurar permissões? (s/n)", collectPermissionConfig))
    };

}
