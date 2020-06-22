import React, { useState, useEffect } from 'react';
import { interpolate } from '../Algorithms/interpolation';
import { FormState } from '../Pages/Analyze';

type Prop = { audio: Float32Array, input: FormState };

export const Interpolation: React.FC<Prop> = ({ audio, input }: Prop) => {
    const [freq, setFreq] = useState<number>();
    useEffect(() => {
        console.log('Computing polynomial interpolation');
        const { freq } = interpolate(input.windowSize, input.time, audio);
        setFreq(freq);
    }, [audio, input]);
    if (!freq) return null;
    return <div>
        Polynomial Interpolation:<br />
        Frequency: {freq}.
    </div>;
};
