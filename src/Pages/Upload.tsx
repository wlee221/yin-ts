import React, { useState } from 'react';
import { Button, Header, Icon, Segment, Input, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

// Users can upload their own .wav file or use an example file given.
type UploadState = {
    status: 'userFile' | 'exampleFile' | 'notUploaded'
    file?: File,
    error?: string
}

export const Upload: React.FC<{}> = () => {
    const [uploadState, setUploadState] = useState<UploadState>({ status: 'notUploaded' });
    const history = useHistory();

    console.log(uploadState);

    // useEffect(() => {
    //     if (submitted === true) {
    //         history.push('/analyze', formState);
    //     }
    // });

    const uploadExampe = (event) => {
        event.target.blur(); // don't retain focus after clicking
        let filePath: string;
        if (process.env.PUBLIC_URL === '') {
            filePath = `${process.env.PUBLIC_URL}/Piano.pp.A3.wav`; // prod build
        } else {
            filePath = '../Piano.pp.A3.wav'; // dev build
        }
        fetch(filePath)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'Piano.pp.A3.wav');
                setUploadState({ file, status: 'exampleFile' });
            })
            .catch(console.error);
    };

    const onUserUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        event.target.value = null; // reset the onChange trigger
        setUploadState({ file, status: 'userFile' });
    };

    const onSubmit = () => {
        if (!uploadState.file) {
            setUploadState({ status: 'notUploaded', error: 'Please upload a file to proceed.' });
        } else {
            history.push('/analyze', { file: uploadState.file });
        }
    };

    const uploadLabel = (uploadState.status === 'userFile') ? uploadState.file.name : 'Upload';
    const uploadJSX = <div style={{ textAlign: 'center' }}>
        <Header icon>
            <Icon name='music' /> Upload a .wav file below
        </Header>
        <br />
        <Button.Group>
            <Button
                as='label'
                htmlFor='wavUpload'
                icon='upload'
                labelPosition='left'
                color={uploadState.status !== 'exampleFile' ? 'teal' : undefined}
                content={uploadLabel}
            />
            <Button.Or />
            <Button
                content='Use an example file'
                onClick={uploadExampe}
                color={uploadState.status === 'exampleFile' ? 'teal' : undefined}
            />
        </Button.Group>
        <br /> <br />
        <Input name='userUpload' type='file' id='wavUpload' accept='.wav' onChange={onUserUpload} style={{ display: 'none' }} />
    </div>;

    let error = null;
    if (uploadState.error) {
        error = <Message warning attached='bottom' style={{ margin: 'auto' }}>
            <Icon name='help' />
            {uploadState.error}
        </Message>;
    }
    return (
        <div style={{ padding: '2vh' }}>
            <h3 style={{ marginBottom: '1em' }}>File Input</h3>
            <Segment placeholder style={{ margin: 'auto', marginBottom: 0, display: 'inlineBlock' }}>
                {uploadJSX}
            </Segment>
            {error}
            <br />
            {uploadState.error ? null : <br />}
            <Button onClick={() => history.push('/')} floated='left' content={'Back'} />
            <Button primary onClick={onSubmit} floated='right' content={'Continue'} />
            <br /> <br /> <br />
            <p>* The example wav file is from&nbsp;
                <a rel="noopener noreferrer" href='http://theremin.music.uiowa.edu/MISpiano.html' target='_blank'>
                    University of Iowa Electronic Music Studios.</a>
            </p>
        </div >
    );
};
