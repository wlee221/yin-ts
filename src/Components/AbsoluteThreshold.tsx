import React from 'react';
import { absoluteTreshold } from '../Algorithms/absoluteThreshold';

type Prop = { audio: Float32Array };

// TODO: Make them adjustable
const windowSize = 1000;
const startTime = 500;

export const AbsoluteThreshold: React.FC<Prop> = ({ audio }: Prop) => {
    const { freq } = absoluteTreshold(windowSize, startTime, audio);
    return <div>
        AbsoluteThreshold:<br />
        Frequency: {freq}.
    </div>;
};
