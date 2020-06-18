import React from 'react';
import { cumMeanNormDiff } from '../Algorithms/cmnd';
import { Graph } from './Graph';

type Prop = { audio: Float32Array };

// TODO: Make them adjustable
const windowSize = 500;
const startTime = 1000;

export const Cmnd: React.FC<Prop> = ({ audio }: Prop) => {
    const { cmnd, freq } = cumMeanNormDiff(windowSize, startTime, audio);
    const graph = <Graph array={cmnd} title='cmnd' />;
    return <div>
        Cumulative Mean Normalized Difference:<br />
        Frequency: {freq}.<br />
        {graph}
    </div>;
};
