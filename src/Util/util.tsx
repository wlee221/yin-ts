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
