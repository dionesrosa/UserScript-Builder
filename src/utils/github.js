import fs from "node:fs/promises";
import path from "node:path";
import { getRemoteUrl } from "./git.js";

const GITHUB_API_VERSION = "2026-03-10";

function parseGitHubSlug(url) {
    if (!url) {
        return null;
    }

    const cleaned = url
        .trim()
        .replace(/\.git$/i, "");

    const httpsMatch = cleaned.match(/github\.com[/:]([^/]+)\/(.+)$/i);

    if (httpsMatch) {
        return {
            owner: httpsMatch[1],
            repo: httpsMatch[2]
        };
    }

    return null;
}

async function readPackageRepositoryUrl() {
    try {
        const packageJsonPath = path.join(process.cwd(), "package.json");
        const content = await fs.readFile(packageJsonPath, "utf-8");
        const pkg = JSON.parse(content);

        if (typeof pkg.repository === "string") {
            return pkg.repository;
        }

        if (pkg.repository && typeof pkg.repository.url === "string") {
            return pkg.repository.url;
        }

        return null;
    } catch {
        return null;
    }
}

export async function getGitHubRepository() {
    const remoteUrl = await getRemoteUrl();
    const sourceUrl = remoteUrl || await readPackageRepositoryUrl();
    const repository = parseGitHubSlug(sourceUrl);

    if (!repository) {
        throw new Error(
            "Não foi possível identificar o repositório GitHub. Configure um remote origin apontando para github.com ou informe repository.url no package.json."
        );
    }

    return repository;
}

export function getGitHubToken() {
    return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
}

function getGitHubHeaders(token) {
    return {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": GITHUB_API_VERSION
    };
}

async function throwForResponse(response, fallbackMessage) {
    const text = await response.text();

    throw new Error(
        `${fallbackMessage}${text ? `: ${text}` : ""}`
    );
}

export async function createGitHubRelease({
    owner,
    repo,
    tagName,
    targetCommitish,
    name,
    body,
    token
}) {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/releases`,
        {
            method: "POST",
            headers: getGitHubHeaders(token),
            body: JSON.stringify({
                tag_name: tagName,
                target_commitish: targetCommitish,
                name,
                body,
                draft: false,
                prerelease: false,
                generate_release_notes: true
            })
        }
    );

    if (!response.ok) {
        await throwForResponse(response, "Falha ao criar release no GitHub");
    }

    return response.json();
}

export async function uploadGitHubReleaseAsset({
    uploadUrl,
    assetPath,
    assetName,
    token
}) {
    const buffer = await fs.readFile(assetPath);
    const url = new URL(uploadUrl.replace(/{\?name,label}$/, ""));
    url.searchParams.set("name", assetName);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            ...getGitHubHeaders(token),
            "Content-Type": "application/octet-stream"
        },
        body: buffer
    });

    if (!response.ok) {
        await throwForResponse(response, "Falha ao enviar asset da release");
    }

    return response.json();
}
