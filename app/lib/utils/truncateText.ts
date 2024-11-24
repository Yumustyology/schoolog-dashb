export function truncateText(text: string, length: number = 20): string {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}