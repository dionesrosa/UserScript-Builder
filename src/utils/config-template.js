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
    const tag = toList(config.tag);

    return {
        name: config.name,
        entry: getEntryFile(config),
        output: getOutputFile(config),

        namespace: config.namespace || "",
        copyright: config.copyright || "",
        version: config.version,
        description: config.description,
        author: config.author,
        license: config.license || "MIT",

        icon: config.icon || "",
        icon64: config.icon64 || "",

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
        tag,

        run_at: config.run_at || "document-idle",
        run_in: config.run_in || "",
        sandbox: config.sandbox || "",
        noframes: config.noframes || false
    };
}
