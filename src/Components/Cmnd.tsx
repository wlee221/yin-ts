import React, { useState, useEffect } from 'react';
import { cumMeanNormDiff } from '../Algorithms/cmnd';
import { Graph } from './Graph';
import { FormState } from '../Pages/Analyze';

type Prop = { audio: Float32Array, input: FormState };
type StateType = { cmnd: number[], freq: number };

export const Cmnd: React.FC<Prop> = ({ audio, input }: Prop) => {
    const [state, setState] = useState<StateType>();
    useEffect(() => {
        console.log('Computing cmnd');
        const result = cumMeanNormDiff(input.windowSize, input.time, audio);
        setState(result);
    }, [audio, input]);

    if (!state) return null;
    const { cmnd, freq } = state;

    const graph = <Graph array={cmnd} title='cmnd' />;
    return <div>
        Cumulative Mean Normalized Difference:<br />
        Frequency: {freq}.<br />
        {graph}
    </div>;
};
