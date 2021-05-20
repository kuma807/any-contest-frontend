import React from 'react';
import { Bar } from 'react-chartjs-2';

const RatingGraph = ({rate}) => {
  const rateData = [0].concat(rate.revRate.slice().reverse());
  const labels = [''];
  for (let index = 1; index <= rateData.length; index++) {
    if (index === 1 || index % 5 === 0) {
      labels.push(index.toString());
    }
    else {
      labels.push('');
    }
  }
  labels.push('');
  const colors = ['rgba(90, 90, 90, 1)', 'rgba(205, 205, 205, 1)', 'rgba(250, 217, 174, 1)', 'rgba(163, 239, 170, 1)', 'rgba(192, 255, 243, 1)', 'rgba(109, 129, 255, 1)', 'rgba(246, 255, 139, 1)', 'rgba(255, 165, 58, 1)', 'rgba(255, 119, 119, 1)'];
  const background = [];
  for (let i = 0; i < colors.length; i++) {
    const colorData = [];
    for (let index = 0; index < rateData.length + 2; index++) {
      if (i === colors.length - 1) {
        colorData.push(5000);
      }
      else {
        colorData.push((i + 1) * 400);
      }
    }
    background.push({colorData: colorData, color: colors[i]});
  }

  const datasets = [];
  datasets.push(
    {
      type: 'line',
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 3,
      borderCapStyle: 'round',
      pointBorderColor: 'rgba(0, 0, 0, 1)',
      pointBackgroundColor: 'rgba(255, 255, 255, 1)',
      data: rateData,
      pointRadius: 4,
      pointHitRadius: 0,
      pointBorderWidth: 1,
      label: "rate",
    }
  );
  for (let index = 0; index < background.length; index++) {
    datasets.push(
      {
        type: 'line',
        data: background[index]['colorData'],
        fill: true,
        borderWidth: 0,
        pointRadius: 0,
        backgroundColor: background[index]['color'],
        label: background[index]['color'],
      }
    );
  }

  /** グラフデータ */
  const graphData = {
    labels: labels,
    datasets: datasets,
  };

  /** グラフオプション */
  const graphOption = {
    scales: {
      x: {
        beforeFit: true,
        offset: false,
      },
      y: {
        min: 0,
        max: Math.ceil(Math.max(...rateData) / 200) * 200 + 200,
        ticks: {
          stepSize: 400
        }
      },
    },
    plugins: {
      legend: false,
    },
    animation: {
      duration: 0,
    }
  };

  return (
    <div className="App">
      {/* グラフコンポーネントの呼び出し */}
      <Bar data={graphData} options={graphOption} />
    </div>
  );
}

export default RatingGraph;