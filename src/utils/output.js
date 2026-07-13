import { slugify } from "./normalize.js";

export function getOutputFile(config) {
    return config.output
        ? config.output
        : `dist/${slugify(config.name)}.user.js`;
}
