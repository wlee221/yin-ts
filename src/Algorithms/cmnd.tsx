/**
 * Returns the cumulative mean normalized difference array and the position of the maximum peak
 * @param window {number} - size of the analysis window
 * @param startIndex {number} - starting index of the summation
 * @param audio {Float32Array} - Decoded audio array
 */

import { difference } from './difference';

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
        let lagSum = 0;
        for (let i = 1; i <= tau; i++) {
            lagSum += diff[i];
        }
        const denominator = lagSum / tau;
        cmnd[tau] = diff[tau] / denominator;
    }

    const minVal = Math.min(...cmnd.slice(20));
    const minIndex = cmnd.findIndex((val, idx) => val === minVal && idx > 0);

    const sampleRate = (new AudioContext()).sampleRate;
    const freq = sampleRate / minIndex;
    console.log({ cmnd, sampleRate, minIndex, freq });

    return { cmnd, freq };
};
