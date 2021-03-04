import React from 'react';
import { Line } from 'react-chartjs-2';
import {useQuery } from 'react-query'
import {getReport} from './api'


const Chart = ({club_id}) => {
  
  const {data: report} =  useQuery(["report", {club_id}], getReport)

  return(
    <Line
    data={{
      labels: report?.data.repot_label,
      datasets: [{
        label: '# daily report of members joining',
        data: report?.data.repot_value,
      }]

    }}
    height={50}
    width={100}
    options= {{
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
    }
    }
    />
  )
}

export default Chart