import React from 'react';
import ChartistGraph from 'react-chartist';

type Prop = { audio: Float32Array };

const WavGrapher: React.FC<Prop> = (props) => {
    const windowSize = 10000;
    const numPoints = 1000; // number of data points

    const audio = props.audio.subarray(0, windowSize)
    const downsampledAudio: Array<number> = [];

    for (let i = 0; i <= numPoints; i++) {
        downsampledAudio.push(audio[i * Math.floor(audio.length / numPoints)]);
    }

    const lineChartData = {
        series: [
            downsampledAudio
        ]
    };

    const chartOptions = {
        showPoint: false,
        axisX: {
            showGrid: false
        }
    };

    return (
        <ChartistGraph data={lineChartData} type={'Line'} options={chartOptions}/>
    )
}

export default WavGrapher;
