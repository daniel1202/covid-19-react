import React, { useEffect, useState, useContext } from 'react';
import { getDaily } from '../../api/index';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import styles from './Chart.module.css';
import Switch from '@material-ui/core/Switch';
const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [daily, setDaily] = useState([]);
  const [barChart, setBarChart] = useState(true);
  useEffect(() => {
    getAPI();
  }, []);
  const getAPI = async () => {
    setDaily(await getDaily());
  };
  const toggleBarChart = () => {
    setBarChart(!barChart);
  };
  const line = daily.length ? (
    <Line
      data={{
        labels: daily.map(({ date }) => date),
        datasets: [
          {
            data: daily.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#7798FF',
            fill: false,
            pointStyle: 'rectRot',
          },
          {
            data: daily.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'rgb(225, 87, 87)',
            fill: false,
            pointStyle: 'rectRot',
          },
        ],
      }}
      legend={{
        display: true,
        labels: { fontColor: 'white' },
      }}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
              gridLines: {
                color: '#494949',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
              gridLines: {
                color: '#494949',
              },
            },
          ],
        },
      }}
    />
  ) : null;
  const bar = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Deaths', 'Recovered'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgb(119, 152, 255)',
              'rgb(225, 87, 87)',
              'rgb(147, 255, 134)',
            ],
            data: [confirmed.value, deaths.value, recovered.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Current state in ${country}`,
          fontSize: 14,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(255, 255, 255, 0.7)',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(255, 255, 255, 0.7)',
              },
            },
          ],
        },
      }}
      legend={{
        display: true,
        labels: { fontColor: 'white' },
      }}
    />
  ) : null;
  const pie = confirmed ? (
    <Doughnut
      data={{
        labels: ['Infected', 'Deaths', 'Recovered'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgb(119, 152, 255)',
              'rgb(225, 87, 87)',
              'rgb(147, 255, 134)',
            ],
            data: [confirmed.value, deaths.value, recovered.value],
            borderWidth: 2,
            borderColor: '#202020',
          },
        ],
      }}
      options={{
        legend: { display: true },
        title: {
          display: true,
          text: `Current state in ${country}`,
          fontColor: 'rgba(255, 255, 255, 0.7)',
          fontSize: 14,
        },
      }}
      legend={{
        display: true,
        labels: { fontColor: 'white' },
      }}
    />
  ) : null;

  return <div className={styles.container}>{country ? pie : line}</div>;
};
export default Chart;
