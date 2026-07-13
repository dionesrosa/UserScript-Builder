function addLine(lines, tag, value) {
    if (value) {
        lines.push(`// ${tag.padEnd(13)} ${value}`);
    }
}

export function generateMetadata(config) {

    const lines = [
        "// ==UserScript=="
    ];

    addLine(lines, "@name", config.name);
    addLine(lines, "@namespace", config.namespace);
    addLine(lines, "@version", config.version);
    addLine(lines, "@description", config.description);
    addLine(lines, "@author", config.author);
    addLine(lines, "@license", config.license);
    addLine(lines, "@icon", config.icon);
    addLine(lines, "@homepageURL", config.homepageURL);
    addLine(lines, "@updateURL", config.updateURL);
    addLine(lines, "@downloadURL", config.downloadURL);
    addLine(lines, "@supportURL", config.supportURL);

    for (const match of config.match ?? []) {
        addLine(lines, "@match", match);
    }

    for (const grant of config.grant ?? []) {
        addLine(lines, "@grant", grant);
    }

    addLine(lines, "@run-at", config.run_at);

    if (config.noframes) {
        lines.push("// @noframes");
    }

    lines.push("// ==/UserScript==");

    return lines.join("\n");
}