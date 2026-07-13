import { getOutputFile } from "./output.js";
import { toList } from "./normalize.js";
import { getEntryFile } from "./entry.js";

export function generateConfig(config) {
    const match = toList(config.match, ["*://*/*"]);
    const grant = toList(config.grant);
    const include = toList(config.include);
    const exclude = toList(config.exclude);
    const require = toList(config.require);
    const connect = toList(config.connect);

    return {
        name: config.name,
        entry: getEntryFile(config),
        output: getOutputFile(config),

        namespace: config.namespace || "",
        version: config.version,
        description: config.description,
        author: config.author,
        license: config.license || "MIT",

        icon: config.icon || "",

        homepageURL: config.homepageURL || "",
        supportURL: config.supportURL || "",
        updateURL: config.updateURL || "",
        downloadURL: config.downloadURL || "",

        match,
        include,
        exclude,
        require,
        grant,
        connect,

        run_at: config.run_at || "document-idle",
        noframes: config.noframes || false
    };
}
