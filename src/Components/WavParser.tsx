import React, {useState, useRef} from 'react';
import Graph from './Graph';
import Autocorrelation from './Autocorrelation';
import Difference from './Difference';
import Cmnd from './Cmnd';
import AbsoluteTreshold from './AbsoluteThreshold';
import Interpolation from './Interpolation';
import {Form, Button} from 'react-bootstrap';

const WavParser: React.FC<{}> = () => {
    const [audio, setAudio] = useState<Float32Array>(null);
    const fileRef = useRef<HTMLInputElement>();

    if (fileRef.current !== undefined) {
        console.log(fileRef.current.files[0]);
    }

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

                    setAudio(audio.slice(playStart, playEnd));
                });
            }
        };

        reader.onload = onFileLoad;
        reader.readAsArrayBuffer(file);
    };

    const graph = audio ? <Graph array={audio} windowSize={1000} title="Waveform" /> : null;
    const autocorrelation = audio ? <Autocorrelation audio={audio} /> : null;
    const difference = audio ? <Difference audio={audio} /> : null;
    const cmnd = audio ? <Cmnd audio={audio} /> : null;
    const absoluteThreshold = audio ? <AbsoluteTreshold audio={audio} /> : null;
    const intepolation = audio ? <Interpolation audio={audio} /> : null;

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const file = fileRef.current.files[0];
        event.preventDefault();
        parseWav(file);
    };

    return (
        <div style={{padding: '2vh'}}>
            <Form onSubmit={onSubmit} hidden={audio !== null}>
                <Form.Group controlId = 'controlInput1'>
                    <Form.Label>Upload a .wav file below: </Form.Label> <br/>
                    <input type='file' ref={fileRef} accept='.wav' required /> <br />
                    <Button variant='primary' type='submit' style={{marginTop: '1em'}}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
            {graph}
            {autocorrelation}
            {difference}
            {cmnd}
            {absoluteThreshold}
            {intepolation}
        </div>
    );
};

export default WavParser;