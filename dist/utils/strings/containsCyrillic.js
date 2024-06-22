export default function containsCyrillic(text) {
    return /[\u0400-\u04FF]/.test(text);
}
//# sourceMappingURL=containsCyrillic.js.map