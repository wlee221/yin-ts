import React from 'react';
import { difference } from '../Algorithms/difference';
import Graph from './Graph';

type Prop = { audio: Float32Array };

// TODO: Make them adjustable
const windowSize = 500;
const startTime = 1000;

const Difference: React.FC<Prop> = ({ audio }: Prop) => {
    // const sampleRate = (new AudioContext()).sampleRate;
    const {diff, freq} = difference(windowSize, startTime, audio);
    const graph = <Graph array = {diff} title='Difference Function'/>;
    return <div>
        Difference:<br/>
        Frequency: {freq}.
        {graph}
    </div>;
};

export default Difference;