export default class MathUtils {
    static roundNumber(number: number, decimals: number) {
        const coeff = Math.pow(10, decimals);
        return Math.round(number * coeff) / coeff;
    }
}