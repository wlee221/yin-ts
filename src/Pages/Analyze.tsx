import React, { useState, useEffect } from 'react';
import { RouteChildrenProps, useHistory } from 'react-router-dom';
import { AbsoluteThreshold, Autocorrelation, Cmnd, Difference, Interpolation, Graph } from '../Components';
import { Button, Icon, Message, Header, Form, Segment, InputOnChangeData, DropdownProps, FormProps } from 'semantic-ui-react';

type PropType = RouteChildrenProps<{}, { file: File }>;
export type FormState = {
    windowSize: number,
    time: number,
    tuning: number
};
export const Analyze: React.FC<PropType> = (props: PropType) => {
    const [audio, setAudio] = useState<Float32Array>();
    const [currentFormState, setCurrentFormState] = useState<FormState>({
        windowSize: 500,
        time: 1000,
        tuning: 440
    });
    const [submittedForm, setSubmittedForm] = useState<FormState>(currentFormState);
    const history = useHistory();

    const parseWav = () => {
        const reader = new FileReader();
        const audioContext = new AudioContext();
        if (audioContext.state === 'suspended' && !audio) {
            // user accessed this link through invalid flow (e.g. directly entered the link). Redirect user.
            history.push('/upload');
            return;
        }

        const file = props.location.state.file;
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
                }).catch(e => console.error(e));
            }
        };
        reader.onerror = console.error;
        reader.onload = onFileLoad;
        reader.onloadstart = (() => { console.log('load started'); });
        reader.readAsArrayBuffer(file);
    };
    useEffect(parseWav, []); // run when it is mounted // TODO: parse after the form is submitted

    if (!props.location.state || !props.location.state.file) {
        history.push('/upload');
        return null;
    }
    const file = props.location.state.file;
    const url = URL.createObjectURL(file);

    const handleChange = (_, data: InputOnChangeData | DropdownProps) => {
        const name = data.name;
        const value = Number(data.value);
        setCurrentFormState({ ...currentFormState, ...{ [name]: value } });
    };

    const handleSubmit = (_event: React.FormEvent<HTMLFormElement>, _data: FormProps) => {
        // TODO: validate inputs
        setSubmittedForm(currentFormState);
    };

    const back = () => {
        console.log(history);
        history.goBack();
    };

    if (!audio) return <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
            <Message.Header>Analyzing...</Message.Header>
        </Message.Content>
    </Message>;

    const audioJSX = <React.Fragment>
        <Header>Input audio file: <br /></Header>
        <audio src={url} controls style={{ marginTop: '1vh' }} />
        <br />
    </React.Fragment>;

    const options = [
        { key: '432hz', text: '432hz', value: 432 },
        { key: '440hz', text: '440hz', value: 440 }
    ];
    const parameterJSX = <React.Fragment>
        <Header>Parameters: </Header>
        <Form style={{ marginTop: '1vh' }} onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input
                    fluid value={currentFormState.windowSize} type='number' name='windowSize'
                    onChange={handleChange} label='Window Size (samples)' placeholder=''
                />
                <Form.Input
                    fluid type='number' name='time' onChange={handleChange} label='Time (samples)'
                    value={currentFormState.time} placeholder='1000'
                />
                <Form.Select
                    fluid name='tuning' value={currentFormState.tuning}
                    onChange={handleChange} label='Tuning' options={options}
                />
            </Form.Group>
            <Form.Button primary type='submit' content='Analyze' />
        </Form>
    </React.Fragment>;

    // TODO: separate this to a separate file
    const analysisJSX = <React.Fragment>
        <Header size='large'>Result:</Header>
        <Graph array={audio} windowSize={submittedForm.windowSize} startTime={submittedForm.time} title="Given Waveform" />
        <Autocorrelation audio={audio} input={submittedForm} />
        <Difference audio={audio} input={submittedForm} />
        <Cmnd audio={audio} input={submittedForm} />
        <AbsoluteThreshold audio={audio} input={submittedForm} />
        <br />
        <Interpolation audio={audio} input={submittedForm} />
    </React.Fragment>;

    return <div>
        <Segment>
            {audioJSX}
            {parameterJSX}
        </Segment>
        {analysisJSX}
        <Button variant="outline-secondary" onClick={back} style={{ marginTop: '1em' }}>Back</Button>
    </div >;
};
