export function generateScript(metadata, code) {

    const formattedCode = code
        .split("\n")
        .map(line => `    ${line}`)
        .join("\n");

    return `${metadata}

(function() {
    'use strict';

${formattedCode}
})();`;
}