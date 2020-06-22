import React, { useState, useEffect } from 'react';
import { autocorrelate } from '../Algorithms/autocorrelate';
import { Graph } from './Graph';
import { FormState } from '../Pages/Analyze';
import { Header } from 'semantic-ui-react';

type Prop = { audio: Float32Array, input: FormState }; // TODO: reverse the import direction
type StateType = { acf: number[], freq: number };

export const Autocorrelation: React.FC<Prop> = ({ audio, input }: Prop) => {
    const [state, setState] = useState<StateType>();
    useEffect(() => {
        console.log('Computing autocorrelation');
        const result = autocorrelate(input.windowSize, input.time, audio);
        setState(result);
    }, [audio, input]);

    if (!state) return null;
    const { acf, freq } = state;
    const graph = <Graph array={acf} title='Autocorrelation Function' />;
    return <div>
        <Header>Step 1. Autocorrelation:</Header>
        Frequency: {freq} Hz.<br />
        {graph}
    </div>;
};
