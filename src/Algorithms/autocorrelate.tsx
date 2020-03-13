/**
 * Returns the autocorrelated array and the position of the maximum peak
 * @param window {number} - size of the analysis window
 * @param startIndex {number} - starting index of the summation
 * @param audio {Float32Array} - Decoded audio array
 */
import * as Util from '../Util/util';

export const autocorrelate = (window: number, startIndex: number, audio: Float32Array) => {
    if (window >= audio.length) {
        throw new Error('window size must be smaller than the size of the audio');
    } else if (startIndex + window >= audio.length) {
        throw new Error('Given window goes out of bound of the audio.');
    }
    const acf: Array<number> = [];  // autocorrelation function
    const halfWindow = Math.floor(window / 2);

    for (let tau = 0; tau <= halfWindow; tau++) {
        let sum = 0;
        for (let i = startIndex; i < startIndex + window; i++) {
            sum += audio[i] * audio[i + tau];
        }
        acf[tau] = sum;
    }
    const maxIndex = Util.getMaxIndex(acf, 20); // find the highest nonzero lag autocorrelation value.
    const freq = Util.numSamplesToFreq(maxIndex);

    return { acf, freq };
};
