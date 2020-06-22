import React, { useState, useEffect } from 'react';
import { interpolate } from '../Algorithms/interpolation';
import { FormState } from '../Pages/Analyze';
import { freqToNoteName } from '../Util/freqConversion';
import { Header } from 'semantic-ui-react';

type Prop = { audio: Float32Array, input: FormState };

export const Interpolation: React.FC<Prop> = ({ audio, input }: Prop) => {
    const [freq, setFreq] = useState<number>();
    useEffect(() => {
        console.log('Computing polynomial interpolation');
        const { freq } = interpolate(input.windowSize, input.time, audio);
        setFreq(freq);
    }, [audio, input]);
    if (!freq) return null;
    const noteName = freqToNoteName(freq, input.tuning);
    return <div>
        <Header>Polynomial Interpolation:</ Header>
        Frequency: {freq} Hz<br />
        This note is <b>{noteName}</b>.
    </div>;
};
