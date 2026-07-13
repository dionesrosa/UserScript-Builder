function addLine(lines, tag, value) {
    if (value) {
        lines.push(`// ${tag.padEnd(13)} ${value}`);
    }
}

function addMany(lines, tag, values = []) {
    for (const value of values) {
        addLine(lines, tag, value);
    }
}

export function generateMetadata(config) {

    const lines = [
        "// ==UserScript=="
    ];

    addLine(lines, "@name", config.name);
    addLine(lines, "@namespace", config.namespace);
    addLine(lines, "@copyright", config.copyright);
    addLine(lines, "@version", config.version);
    addLine(lines, "@description", config.description);
    addLine(lines, "@author", config.author);
    addLine(lines, "@license", config.license);
    addLine(lines, "@icon", config.icon);
    addLine(lines, "@icon64", config.icon64);
    addLine(lines, "@homepageURL", config.homepageURL);
    addLine(lines, "@supportURL", config.supportURL);
    addLine(lines, "@updateURL", config.updateURL);
    addLine(lines, "@downloadURL", config.downloadURL);
    addMany(lines, "@match", config.match);
    addMany(lines, "@include", config.include);
    addMany(lines, "@exclude", config.exclude);
    addMany(lines, "@require", config.require);
    addMany(lines, "@grant", config.grant);
    addMany(lines, "@connect", config.connect);
    addMany(lines, "@tag", config.tag);
    addLine(lines, "@run-at", config.run_at);
    addLine(lines, "@run-in", config.run_in);
    addLine(lines, "@sandbox", config.sandbox);

    if (config.noframes) {
        lines.push("// @noframes");
    }

    lines.push("// ==/UserScript==");

    return lines.join("\n");
}
