const VERSION_PATTERN = /^(\d+)\.(\d+)\.(\d+)$/;

export function parseVersion(version) {
    const match = VERSION_PATTERN.exec(version);

    if (!match) {
        throw new Error(`Versão inválida: ${version}`);
    }

    return {
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3])
    };
}

export function bumpVersion(version, releaseType) {
    const current = parseVersion(version);

    switch (releaseType) {
        case "major":
            return `${current.major + 1}.0.0`;

        case "minor":
            return `${current.major}.${current.minor + 1}.0`;

        case "patch":
            return `${current.major}.${current.minor}.${current.patch + 1}`;

        default:
            throw new Error(`Tipo de release inválido: ${releaseType}`);
    }
}
