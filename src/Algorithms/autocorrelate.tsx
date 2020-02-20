/**
 * Returns the autocorrelated array and the position of the maximum peak
 * @param window {number} - size of the analysis window
 * @param startIndex {number} - starting index of the summation
 * @param audio {Float32Array} - Decoded audio array
 */
export const autocorrelate = (window: number, startIndex: number, audio: Float32Array) => {
    if (window >= audio.length) {
        throw new Error('window size must be smaller than the size of the audio');
    } else if (startIndex + window >= audio.length) {
        throw new Error('Given window goes out of bound of the audio.');
    }
    return autocorrelateType1(window, startIndex, audio);
};

// Equation (2.5), Mcleod
const autocorrelateType1 = (window: number, startIndex: number, audio: Float32Array) => {
    const acf: Array<number> = [];  // autocorrelation function
    const halfWindow = Math.floor(window / 2);

    for (let tau = 0; tau <= halfWindow; tau++) {
        let sum = 0;
        for (let i = startIndex; i < startIndex + window; i++) {
            sum += audio[i] * audio[i + tau];
        }
        acf[tau] = sum;
    }
    const maxVal = Math.max(...acf.slice(20)); // find the highest nonzero lag autocorrelation value. Ignores first 10 samples (1/2450 s)
    const maxIndex = acf.findIndex((val, idx) => val === maxVal && idx > 0);

    const sampleRate = (new AudioContext()).sampleRate;
    const freq = sampleRate / maxIndex;
    console.log({ sampleRate, maxIndex, freq });

    return { acf, freq };
};
