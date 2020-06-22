import React from 'react';
import ChartistGraph from 'react-chartist';

type Prop = {
    array: Float32Array | Array<number>,
    windowSize?: number,
    startTime ?: number,
    title: string
};

export const Graph: React.FC<Prop> = ({array, windowSize, startTime, title}: Prop) => {
    if (!windowSize) windowSize = array.length;
    if (!startTime) startTime = 0;
    const numPoints = Math.min(windowSize, 1000);

    array = array.slice(startTime, startTime + windowSize);
    const downsampledAudio: Array<number> = [];

    for (let i = 0; i <= numPoints; i++) {
        downsampledAudio.push(array[i * Math.floor(array.length / numPoints)]);
    }

    const labels: Array<number> = [];
    for (let i = 0; i <= 10; i++) {
        labels[i * Math.floor(downsampledAudio.length / 10)] = i * Math.floor(array.length / 10);
    }

    const lineChartData = {
        labels: labels,
        series: [
            downsampledAudio
        ]
    };

    const chartOptions = {
        showPoint: false,
        axisX: {
            showGrid: false,
            showLabel: true,
            labelOffset: {
                x: -15,
                y: 0
            }
        },
    };

    return (
        <React.Fragment>
            {title}, {windowSize} points:
            <ChartistGraph data={lineChartData} type={'Line'} options={chartOptions} />
        </React.Fragment>
    );
};
