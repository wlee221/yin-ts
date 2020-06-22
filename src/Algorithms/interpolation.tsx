/**
 * Returns the cumulative mean normalized difference array and the position of the first local minimum below threshold.
 * @param window {number} - size of the analysis window
 * @param startIndex {number} - starting index of the summation
 * @param audio {Float32Array} - Decoded audio array
 */

import { absoluteThreshold } from './absoluteThreshold';
import * as Util from '../Util/util';

export const interpolate = (window: number, startIndex: number, audio: Float32Array) => {
    if (window >= audio.length) {
        throw new Error('window size must be smaller than the size of the audio');
    } else if (startIndex + window >= audio.length) {
        throw new Error('Given window goes out of bound of the audio.');
    }
    const { cmnd, freq: absThresholdFreq, minIndex } = absoluteThreshold(window, startIndex, audio); // cmnd function computed from step 3
    if (minIndex === 0 || minIndex === cmnd.length - 1) {
        return { cmnd, freq: absThresholdFreq }; // not enough points to interpolate
    }

    // set up three points for interpolation
    const x = [minIndex - 1, minIndex, minIndex + 1];
    const y = [cmnd[minIndex - 1], cmnd[minIndex], cmnd[minIndex + 1]];

    const axis = Util.getQuadraticCriticalPoint(x, y); // axis of symmetry
    if (Math.abs(axis - minIndex) >= 1) {
        return { cmnd, freq: absThresholdFreq }; // axis of symmetry out of bounds
    }
    const freq = Util.numSamplesToFreq(axis);

    return { cmnd, freq };
};
