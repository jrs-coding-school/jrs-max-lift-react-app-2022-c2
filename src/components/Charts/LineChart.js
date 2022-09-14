import './LineChart.css'
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export default function LineChart({ datasetValues }) {

  const lineData = generateLineData(datasetValues);


  return (
    <div className='line-chart-container'>
      <Line
        data={lineData}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  )
}

/**
 * 
 * @param {[{"id":number,"exercise_id":number,"name":string,"max_weight":number,"date":string}]} values 
 * @returns 
 */
function generateLineData(values) {

  let dates = values.map(pr => pr.date);
  dates = new Set(dates);
  dates = [...dates];
  dates.sort((a, b) => a.replace(/-/g, '') - b.replace(/-/g, ''))

  let buckets = [];

  prLoop: for (let pr of values) {
    for (let bucket of buckets) {

      let firstItem = bucket[0];

      if (firstItem.exercise_id === pr.exercise_id) {
        insertPrIntoBucket(pr, bucket, dates)
        continue prLoop;
      }
    }

    let newBucket = []

    for (let foo of dates) {

      newBucket.push({
        exercise_id: pr.exercise_id, name: pr.name
      })
    }

    insertPrIntoBucket(pr, newBucket, dates)
    buckets.push(newBucket);
  }

  let datasets = buckets.map((bucket, i) => {

    let workoutName = bucket[0].name;

    return {
      label: workoutName,
      fill: false,
      lineTension: 0,
      backgroundColor: lineColors[i],
      borderColor: lineColors[i],
      borderWidth: 2, spanGaps: true,
      data: bucket.map(d => d.max_weight)
    }
  })

  var lineData = {
    labels: dates,
    datasets
  }

  return lineData
}


/**
 * Inserts a pr into the bucket in the correct index according to its date property
 * @param {{"id":number,"exercise_id":number,"name":string,"max_weight":number,"date":string}} pr 
 * @param {[{"id":number,"exercise_id":number,"name":string,"max_weight":number,"date":string}]} buckets 
 * @param {[string]} dates 
 * @returns 
 */
function insertPrIntoBucket(pr, bucket, dates) {

  for (let i = 0; i < dates.length; i++) {

    const date = dates[i];

    if (date === pr.date) {
      bucket[i] = pr;
      let endValue = bucket[dates.length - 1];
      let currentMax = endValue.max_weight;
      endValue.max_weight = Math.max(currentMax || 0, pr.max_weight);
      return;
    }
  }
}


// TODO: fix list of colors so they match our style somewhat
const lineColors = [
  "#ff3333",
  "#33ff33",
  "#3333ff",
  "#ffff33",
  "#ff33ff",
  "#33ffff",
  "#ff3333",
  "#ff3333",
  "#ff3333",
  "#ff3333",
  "#ff3333",
  "#ff3333",
]