import React from 'react';
import ChartistGraph from 'react-chartist';

type Prop = {
    array: Float32Array | Array<number>,
    windowSize?: number,
    title: string
};

const Graph: React.FC<Prop> = ({ array, windowSize, title }: Prop) => {
    if (!windowSize) windowSize = array.length;
    const numPoints = Math.min(windowSize, 1000);

    array = array.slice(0, windowSize);
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
        },
    };

    return (
        <div>
            {title}, {windowSize} points:
            <ChartistGraph data={lineChartData} type={'Line'} options={chartOptions} />
        </div>
    );
};

export default Graph;
