export function getIdFromName(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
}