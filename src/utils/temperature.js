export function formatTemp(valueC, units = 'C') {
    if (units === 'F') {
        return `${Math.round((valueC * 9) / 5 + 32)}°F`;
    }
    return valueC > 0 ? `+${valueC}°` : `${valueC}°`;
}
