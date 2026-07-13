export function validateConfig(config) {

    const required = [
        "name",
        "version",
        "description",
        "author",
        "match"
    ];

    const missing = required.filter(
        field => !config[field]
    );

    if (missing.length > 0) {
        throw new Error(
            `Missing required fields: ${missing.join(", ")}`
        );
    }

    return config;
}