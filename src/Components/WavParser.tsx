import React, { useState } from 'react';
import WavGrapher from './WavGrapher'

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
                    setAudio(audio);
                });
            }
        };

        reader.onload = onFileLoad;
        reader.readAsArrayBuffer(file);
    }

    let graph = null;
    if (audio) {
        graph = <WavGrapher audio={audio} />
    }

    // TODO: Add upload button
    return (
        <div style={{ padding: '2vh' }}>
            <input type='file' accept='.wav' onChange={handleChange} />
            {graph}
        </div>
    )
};

export default WavParser;