export function toList(value, fallback = []) {
    if (Array.isArray(value)) {
        return value.filter(Boolean);
    }

    if (typeof value === "string") {
        return value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);
    }

    return fallback;
}

export function toText(value, fallback = "") {
    if (typeof value !== "string") {
        return fallback;
    }

    const trimmed = value.trim();

    return trimmed || fallback;
}

export function slugify(value, fallback = "userscript") {
    const text = toText(value, fallback);

    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || fallback;
}
