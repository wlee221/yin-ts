/**
 * Returns the cumulative mean normalized difference array and the position of the minimum peak
 * @param window {number} - size of the analysis window
 * @param startIndex {number} - starting index of the summation
 * @param audio {Float32Array} - Decoded audio array
 */

import { difference } from './difference';
import * as Util from '../Util/util';

export const cumMeanNormDiff = (window: number, startIndex: number, audio: Float32Array) => {
    if (window >= audio.length) {
        throw new Error('window size must be smaller than the size of the audio');
    } else if (startIndex + window >= audio.length) {
        throw new Error('Given window goes out of bound of the audio.');
    }
    const { diff } = difference(window, startIndex, audio); // difference function computed from step 2
    const cmnd: Array<number> = [];
    const halfWindow = Math.floor(window / 2);
    cmnd[0] = 1;

    for (let tau = 1; tau <= halfWindow; tau++) {
        const lagSum = Util.sum(diff, 1, tau + 1);
        const denominator = lagSum / tau;
        cmnd[tau] = diff[tau] / denominator;
    }

    const minIndex = Util.getMinIndex(cmnd);
    const freq = Util.numSamplesToFreq(minIndex);
    return { cmnd, freq };
};
