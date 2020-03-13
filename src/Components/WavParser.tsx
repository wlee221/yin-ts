import React, { useState } from 'react';
import Graph from './Graph';
import Autocorrelation from './Autocorrelation';
import Difference from './Difference';
import Cmnd from './Cmnd';

const WavParser: React.FC<{}> = () => {
    const [audio, setAudio] = useState<Float32Array>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length !== 0) {
            parseWav(files[0]);
        }
    };

    const parseWav = (file: File) => {
        const reader = new FileReader();
        const audioContext = new AudioContext();

        const onFileLoad = (event: ProgressEvent<FileReader>) => {
            if (event.target.result) {
                audioContext.decodeAudioData(reader.result as ArrayBuffer).then(buffer => {
                    const audio: Float32Array = buffer.getChannelData(0);
                    // preprocess
                    let maxAmplitude = 0;
                    for (const amplitude of audio) {
                        maxAmplitude = Math.max(maxAmplitude, Math.abs(amplitude));
                    }
                    const threshold = maxAmplitude * 0.1;
                    const playStart = audio.findIndex(val => val >= threshold);
                    const playEnd = audio.length - [...audio].reverse().findIndex(val => val >= threshold);
                    console.log(playStart, playEnd);

                    setAudio(audio.slice(playStart, playEnd));
                });
            }
        };

        reader.onload = onFileLoad;
        reader.readAsArrayBuffer(file);
    };

    const graph = audio ? <Graph array={audio} windowSize={1000} title="Waveform" /> : null;
    const autocorrelation = audio ? <Autocorrelation audio={audio} /> : null;
    const difference = audio ? <Difference audio = {audio} /> : null;
    const cmnd = audio ? <Cmnd audio = {audio} /> : null;

    // TODO: Add upload button
    return (
        <div style={{ padding: '2vh' }}>
            <div hidden={audio !== null}>Upload a .wav file below: <br /> <br /> </div>
            <input type='file' accept='.wav' onChange={handleChange} hidden={audio !== null} />
            {graph}
            {autocorrelation}
            {difference}
            {cmnd}
        </div>
    );
};

export default WavParser;