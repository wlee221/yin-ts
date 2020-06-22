import React, { useEffect, useState } from 'react';
import { difference } from '../Algorithms/difference';
import { Graph } from './Graph';
import { FormState } from '../Pages/Analyze';
import { Header } from 'semantic-ui-react';

type Prop = { audio: Float32Array, input: FormState };
type StateType = { diff: number[], freq: number }

export const Difference: React.FC<Prop> = ({ audio, input }: Prop) => {
    const [state, setState] = useState<StateType>();
    useEffect(() => {
        console.log('Computing difference');
        const result = difference(input.windowSize, input.time, audio);
        setState(result);
    }, [audio, input]);

    if (!state) return null;
    const { diff, freq } = state;

    const graph = <Graph array={diff} title='Difference Function' />;

    return <div>
        <Header>Step 2. Difference:</Header>
        Frequency: {freq} Hz.<br />
        {graph}
    </div>;
};
