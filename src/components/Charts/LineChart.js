import './LineChart.css'
import React from 'react';
import { Line } from 'react-chartjs-2';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);




export default function LineChart({ datasetValues }) {

  datasetValues = [
    { "id": 7, "exercise_id": 1, "name": "Bench Press", "max_weight": 295, "date": "2022-06-05" },
    { "id": 4, "exercise_id": 9, "name": "Back Squat", "max_weight": 320, "date": "2022-03-15" },
    { "id": 3, "exercise_id": 9, "name": "Back Squat", "max_weight": 315, "date": "2021-09-09" },
    { "id": 6, "exercise_id": 1, "name": "Bench Press", "max_weight": 285, "date": "2022-01-03" },
    { "id": 2, "exercise_id": 9, "name": "Back Squat", "max_weight": 310, "date": "2021-02-14" },
    { "id": 5, "exercise_id": 1, "name": "Bench Press", "max_weight": 265, "date": "2021-07-26" },
    { "id": 10, "exercise_id": 14, "name": "Power Clean", "max_weight": 305, "date": "2020-10-07" },
    { "id": 9, "exercise_id": 14, "name": "Power Clean", "max_weight": 285, "date": "2020-10-06" },
    { "id": 1, "exercise_id": 9, "name": "Back Squat", "max_weight": 305, "date": "2020-10-05" },
    { "id": 8, "exercise_id": 14, "name": "Power Clean", "max_weight": 265, "date": "2020-10-05" },

  ];

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

  // get all unique dates
  let dates = values.map(pr => pr.date);
  // get rid of duplicate dates
  dates = new Set(dates);
  dates = [...dates];
  dates.sort((a, b) => a.replace(/-/g, '') - b.replace(/-/g, ''))

  let buckets = [];
  // loop through all data
  prLoop: for (let pr of values) {

    // put each pr into its own workout 'bucket' 
    for (let bucket of buckets) {
      // 'look at'/reference first item
      let firstItem = bucket[0];
      // if first pr.workoutId === pr.workoutId
      if (firstItem.exercise_id === pr.exercise_id) {
        //    true -> it goes in this bucket;
        insertPrIntoBucket(pr, bucket, dates)
        continue prLoop;
      }
    }
    // make a new bucket with 'empty' values
    let newBucket = []
    for (let foo of dates) {
      newBucket.push({
        exercise_id: pr.exercise_id, name: pr.name
      })
    }
    insertPrIntoBucket(pr, newBucket, dates)
    buckets.push(newBucket);
  }

  console.log(buckets)

  // then turn that into chart js stuff below

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
      console.log(dates.length - 1, endValue)
      let currentMax = endValue.max_weight;
      endValue.max_weight = Math.max(currentMax || 0, pr.max_weight);
      console.log(bucket)
      return;
    }
  }
}

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