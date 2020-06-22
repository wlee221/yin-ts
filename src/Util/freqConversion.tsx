// TODO: error checking
export const freqToNoteName = (freq: number, tuning: number) => {
    const midiNumber: number = Math.round(69 + 12 * Math.log2(freq / tuning));
    return midiNumberToNoteName(midiNumber);
};

export const midiNumberToNoteName = (midiNumber: number) => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const note = notes[midiNumber % 12];
    const octave = Math.floor(midiNumber / 12) - 1;
    return note + octave;
};
