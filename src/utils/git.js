import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

async function runGit(args) {
    return execFileAsync("git", args, {
        cwd: process.cwd(),
        windowsHide: true
    });
}

export async function assertCleanWorkingTree() {
    try {
        const { stdout } = await runGit(["status", "--porcelain"]);

        if (stdout.trim()) {
            throw new Error(
                "Existem arquivos pendentes de commit. Faça o commit antes de publicar."
            );
        }

    } catch (error) {
        if (error.code === "ENOENT") {
            throw new Error("Git não encontrado no sistema.");
        }

        if (error.message?.includes("not a git repository")) {
            throw new Error("O comando publish precisa ser executado dentro de um repositório Git.");
        }

        throw error;
    }
}

export async function getCurrentBranch() {
    const { stdout } = await runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
    const branch = stdout.trim();

    if (!branch || branch === "HEAD") {
        throw new Error("Não foi possível identificar a branch atual.");
    }

    return branch;
}

export async function getRemoteUrl(remoteName = "origin") {
    try {
        const { stdout } = await runGit(["remote", "get-url", remoteName]);
        const url = stdout.trim();

        return url || null;

    } catch (error) {
        if (error.message?.includes("No such remote")) {
            return null;
        }

        throw error;
    }
}

export async function tagExists(tagName) {
    try {
        await runGit(["rev-parse", "--verify", `refs/tags/${tagName}`]);
        return true;
    } catch {
        return false;
    }
}

export async function createTag(tagName, message) {
    await runGit(["tag", "-a", tagName, "-m", message]);
}

export async function pushBranch(remoteName, branchName) {
    await runGit(["push", remoteName, branchName]);
}

export async function pushTag(remoteName, tagName) {
    await runGit(["push", remoteName, tagName]);
}

export async function remoteTagExists(remoteName, tagName) {
    const { stdout } = await runGit([
        "ls-remote",
        "--tags",
        remoteName,
        `refs/tags/${tagName}`
    ]);

    return Boolean(stdout.trim());
}
