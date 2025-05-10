export const getDaysInMilliseconds = (days: number): number => {
    if (days < 1) {
        return 1000 * 60 * 60 * 24 * 1;
    }

    return 1000 * 60 * 60 * 24 * days;
}