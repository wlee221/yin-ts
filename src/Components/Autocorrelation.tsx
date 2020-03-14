import React from 'react';
import { autocorrelate } from '../Algorithms/autocorrelate';
import Graph from './Graph';

type Prop = { audio: Float32Array };

// TODO: Make them adjustable
const windowSize = 500;
const startTime = 1000;

const Autocorrelation: React.FC<Prop> = ({ audio }: Prop) => {
    const { acf, freq } = autocorrelate(windowSize, startTime, audio);
    const graph = <Graph array={acf} title='Autocorrelation Function' />;
    return <div>
        Autocorrelation:<br />
        Frequency: {freq}.
        {graph}
    </div>;
};

export default Autocorrelation;
