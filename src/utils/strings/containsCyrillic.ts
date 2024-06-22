export default function containsCyrillic(text: string) {
    return /[\u0400-\u04FF]/.test(text);
}