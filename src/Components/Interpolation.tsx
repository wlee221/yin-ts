import React from 'react';
import { interpolate } from '../Algorithms/interpolation';

type Prop = { audio: Float32Array };

// TODO: Make them adjustable
const windowSize = 1000;
const startTime = 500;

const Interpolation: React.FC<Prop> = ({ audio }: Prop) => {
    const { freq } = interpolate(windowSize, startTime, audio);
    return <div>
        Polynomial Interpolation:<br />
        Frequency: {freq}.
    </div>;
};

export default Interpolation;
