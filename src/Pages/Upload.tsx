import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

type FormStateType = Record<string, any>;

export const Upload: React.FC<{}> = () => {
    const [formState, setFormState] = useState<FormStateType>({ file: null });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const history = useHistory();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // TODO: input validation
        event.preventDefault();
        setSubmitted(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const name = target.name;
        const value = (name === 'file') ? target.files[0] : target.value;
        setFormState({ [name]: value });
    };

    useEffect(() => {
        if (submitted === true) {
            history.push('/analyze', formState);
        }
    });

    const back = () => {
        history.goBack();
    };

    return (
        <div style={{ padding: '2vh' }}>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId='controlInput1'>
                    <Form.Label>Upload a .wav file below: </Form.Label> <br />
                    <input name='file' type='file' onChange={handleInputChange} accept='.wav' required /> <br />
                    <Button variant='primary' type='submit' style={{ marginTop: '1em' }}>
                        Submit
                    </Button>
                </Form.Group>
            </Form>
            <Button variant="outline-secondary" onClick={back} style={{ marginTop: '1em' }}>Back</Button>
        </div>
    );
};
