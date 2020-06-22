import React, { useState, useEffect } from 'react';
import { absoluteThreshold } from '../Algorithms/absoluteThreshold';
import { FormState } from '../Pages/Analyze';

type Prop = { audio: Float32Array, input: FormState };

export const AbsoluteThreshold: React.FC<Prop> = ({ audio, input }: Prop) => {
    const [freq, setFreq] = useState<number>();
    useEffect(() => {
        console.log('Computing absolute threshold');
        const { freq } = absoluteThreshold(input.windowSize, input.time, audio);
        setFreq(freq);
    }, [audio, input]);
    if (!freq) return null;
    return <div>
        AbsoluteThreshold:<br />
        Frequency: {freq}.
    </div>;
};
