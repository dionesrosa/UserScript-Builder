import fs from "node:fs/promises";
import path from "node:path";

export async function readProjectFile(file) {

    const root = process.cwd();
    const filePath = path.join(root, file);

    try {
        return await fs.readFile(filePath, "utf-8");

    } catch (error) {

        if (error.code === "ENOENT") {
            const notFoundError = new Error(`Arquivo não encontrado: ${file}`);
            notFoundError.code = "ENOENT";
            throw notFoundError;
        }

        throw error;
    }
}

export async function writeProjectFile(file, content) {

    const root = process.cwd();
    const filePath = path.join(root, file);

    await fs.mkdir(path.dirname(filePath), {
        recursive: true
    });

    await fs.writeFile(filePath, content, "utf-8");
}
