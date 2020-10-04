export function dateFormat(date: string) {
    if (!Date.parse(date)) return false;

    return new Date(date).getFullYear();
}