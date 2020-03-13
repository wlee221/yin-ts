/**
 * Returns the difference function array and the position of the minimum peak
 * @param window {number} - size of the analysis window
 * @param startIndex {number} - starting index of the summation
 * @param audio {Float32Array} - Decoded audio array
 */
export const difference = (window: number, startIndex: number, audio: Float32Array) => {
    if (window >= audio.length) {
        throw new Error('window size must be smaller than the size of the audio');
    } else if (startIndex + window >= audio.length) {
        throw new Error('Given window goes out of bound of the audio.');
    }

    const diff: Array<number> = [];
    const halfWindow = Math.floor(window / 2);

    for (let tau = 0; tau <= halfWindow; tau++) {
        let sum = 0;
        for (let i = startIndex; i < startIndex + window; i++) {
            sum += Math.pow(audio[i] - audio[i + tau], 2);
        }
        diff[tau] = sum;
    }

    const minVal = Math.min(...diff.slice(20));
    const minIndex = diff.findIndex((val, idx) => val === minVal && idx > 0);

    const sampleRate = (new AudioContext()).sampleRate;
    const freq = sampleRate / minIndex;
    console.log({ sampleRate, minIndex, freq });

    return { diff, freq };
};
