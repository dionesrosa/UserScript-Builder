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
