import fs from "node:fs/promises";
import path from "node:path";
import { loadConfig } from "../utils/config.js";
import { validateConfig } from "../utils/validator.js";
import { getOutputFile } from "../utils/output.js";
import {
    assertCleanWorkingTree,
    createTag,
    getCurrentBranch,
    getRemoteUrl,
    pushBranch,
    pushTag,
    remoteTagExists,
    tagExists
} from "../utils/git.js";
import {
    createGitHubRelease,
    getGitHubRepository,
    getGitHubToken,
    uploadGitHubReleaseAsset
} from "../utils/github.js";

function getReleaseTag(version) {
    return `v${version}`;
}

export default async function publish() {
    console.log("🚀 Comando publish");

    let config = await loadConfig();

    console.log("⚙️ Configurações carregadas");

    config = validateConfig(config);

    await assertCleanWorkingTree();

    console.log("✅ Árvore de trabalho limpa");

    const remoteName = process.env.USERSCRIPT_PUBLISH_REMOTE || "origin";
    const remoteUrl = await getRemoteUrl(remoteName);

    if (!remoteUrl) {
        throw new Error(
            `Remote Git não encontrado: ${remoteName}. Configure o remote antes de publicar.`
        );
    }

    const token = getGitHubToken();

    if (!token) {
        throw new Error(
            "Token do GitHub não encontrado. Defina GITHUB_TOKEN ou GH_TOKEN."
        );
    }

    const repository = await getGitHubRepository();
    const branchName = await getCurrentBranch();
    const releaseTag = getReleaseTag(config.version);
    const sourceFile = path.resolve(process.cwd(), getOutputFile(config));

    await fs.access(sourceFile);

    if (await tagExists(releaseTag)) {
        throw new Error(`A tag ${releaseTag} já existe localmente.`);
    }

    if (await remoteTagExists(remoteName, releaseTag)) {
        throw new Error(`A tag ${releaseTag} já existe no remoto ${remoteName}.`);
    }

    await createTag(releaseTag, releaseTag);

    console.log("✅ Tag criada:", releaseTag);

    await pushBranch(remoteName, branchName);
    await pushTag(remoteName, releaseTag);

    console.log("✅ Branch e tag enviados para o Git");

    const release = await createGitHubRelease({
        owner: repository.owner,
        repo: repository.repo,
        tagName: releaseTag,
        targetCommitish: branchName,
        name: releaseTag,
        body: `Release automática da versão ${config.version}.`,
        token
    });

    console.log("✅ Release criada no GitHub:", release.html_url);

    const asset = await uploadGitHubReleaseAsset({
        uploadUrl: release.upload_url,
        assetPath: sourceFile,
        assetName: path.basename(sourceFile),
        token
    });

    console.log("✅ Asset enviado:", asset.browser_download_url);
}
