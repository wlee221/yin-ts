import React, { useState, useEffect } from 'react';
import { RouteChildrenProps, useHistory } from 'react-router-dom';
import { AbsoluteThreshold, Autocorrelation, Cmnd, Difference, Interpolation, Graph } from '../Components';
import { Button } from 'react-bootstrap';

type PropType = RouteChildrenProps<{}, { file: File }>;

export const Analyze: React.FC<PropType> = (props: PropType) => {
    const [audio, setAudio] = useState<Float32Array>();
    const history = useHistory();
    const file = props.location.state.file;

    if (!file) {
        history.push('/');
    }

    const parseWav = () => {
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
    useEffect(parseWav, []); // run when it is mounted // TODO: test going back home then returning with new file

    if (!audio) return <div>Processing audio...</div>;

    const back = () => {
        console.log(history);
        history.goBack();
    };

    return <div>
        <Graph array={audio} windowSize={1000} title="Waveform" />
        <Autocorrelation audio={audio} />
        <Difference audio={audio} />
        <Cmnd audio={audio} />
        <AbsoluteThreshold audio={audio} />
        <Interpolation audio={audio} />
        <Button variant="outline-secondary" onClick={back} style={{ marginTop: '1em' }}>Back</Button>
    </div >;
};
