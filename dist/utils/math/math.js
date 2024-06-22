export default class MathUtils {
    static roundNumber(number, decimals) {
        const coeff = Math.pow(10, decimals);
        return Math.round(number * coeff) / coeff;
    }
}
//# sourceMappingURL=math.js.map