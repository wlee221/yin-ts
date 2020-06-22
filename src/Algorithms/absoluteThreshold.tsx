/**
 * Returns the cumulative mean normalized difference array and the position of the first local minimum below threshold.
 * @param window {number} - size of the analysis window
 * @param startIndex {number} - starting index of the summation
 * @param audio {Float32Array} - Decoded audio array
 */

import { cumMeanNormDiff } from './cmnd';
import * as Util from '../Util/util';

export const absoluteThreshold = (window: number, startIndex: number, audio: Float32Array) => {
    if (window >= audio.length) {
        throw new Error('window size must be smaller than the size of the audio');
    } else if (startIndex + window >= audio.length) {
        throw new Error('Given window goes out of bound of the audio.');
    }
    const { cmnd, freq: cmndFreq } = cumMeanNormDiff(window, startIndex, audio); // cmnd function computed from step 3
    const threshold = 0.1;

    let minIndex = cmnd.findIndex((val => val < threshold)); // first instance of cmnd value going below threshold
    if (minIndex === -1) return { cmnd, cmndFreq }; // return the result from cmnd step if search fails.
    while (minIndex + 1 < cmnd.length && cmnd[minIndex + 1] < cmnd[minIndex]) minIndex++; // advance towards local minimum

    const freq = Util.numSamplesToFreq(minIndex);
    return { cmnd, freq, minIndex };
};
