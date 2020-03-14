// computes the sum of array[start] to array[end]
export const sum = (array: Array<number>, start?: number, end?: number) => {
    return array.slice(start, end).reduce((accum, val) => accum + val);
};

// returns the max value and its index from array[start] to array[end]
export const getMaxIndex = (array: Array<number>, start: number = 0, end?: number) => {
    return array.slice(start, end).reduce((maxIndex, val, index, arr) => val > arr[maxIndex] ? index : maxIndex, 0) + start;
};

// returns the min value and index from array[start] to array[end]
export const getMinIndex = (array: Array<number>, start: number = 0, end?: number) => {
    return array.slice(start, end).reduce((minIndex, val, index, arr) => val < arr[minIndex] ? index : minIndex, 0) + start;
};

// converts period (in samples) to frequency (Hz)
export const numSamplesToFreq = (numSamples: number) => {
    return (new AudioContext()).sampleRate / numSamples;
};

// given 3 points, performs a quadratic interpolation and returns the x-coordinate of the critical point.
export const getQuadraticCriticalPoint = (x: Array<number>, y: Array<number>) => {
    if (!x || !y || x.length !== 3 || y.length !== 3) {
        throw new Error('Three distinct points must be given for quadratic.');
    }
    // formula derived by performing lagrange polynomial interpolation and equating its derivative to zero.
    const [x0, x1, x2] = x;
    const [y0, y1, y2] = y;

    const numerator = y0 * (x1 ** 2 - x2 ** 2) + y1 * (x2 ** 2 - x0 ** 2) + y2 * (x0 ** 2 - x1 ** 2);
    const denominator = y0 * (x1 - x2) + y1 * (x2 - x0) + y2 * (x0 - x1);

    return 0.5 * numerator / denominator;
};
