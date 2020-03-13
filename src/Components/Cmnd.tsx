import React from 'react';
import { cumMeanNormDiff } from '../Algorithms/cmnd';
import Graph from './Graph';

type Prop = { audio: Float32Array };

// TODO: Make them adjustable
const windowSize = 500;
const startTime = 1000;

const Cmnd: React.FC<Prop> = ({ audio }: Prop) => {
    // const sampleRate = (new AudioContext()).sampleRate;
    const { cmnd, freq } = cumMeanNormDiff(windowSize, startTime, audio);
    const graph = <Graph array={cmnd} title='cmnd' />;
    return <div>
        Cumulative Mean Normalized Difference:<br />
        Frequency: {freq}.
        {graph}
    </div>;
};

export default Cmnd;
