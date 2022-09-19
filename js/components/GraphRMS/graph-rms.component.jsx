import React from "react";
import './graph-rms.styles.css'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


function GraphRMS(props) {
  const data = [ 
    {
      name: "L",
      value: props.valueOutputL,
    },
    {
      name: "R",
      value: props.valueOutputR,
    },
  ];

  const green = "#7ed834";
  const red= "#ff4141";
  const yellow="#d8c734"
  let color = green;
   

  return (
    <div className="rms-chart-container">
      <BarChart
        width={200}
        height={150}
        data={data}
        margin={{
            top: 25,
            right: 30,
            left: 0,
            bottom: 0
          }}
      >
        
        <CartesianGrid
        vertical={false}
        stroke="#292929"        
        strokeOpacity={0.5}
      />
        <XAxis
          dataKey="name"
          stroke="#5c5c5cea"
          tickLine={false}
          fontSize={"10px"}
        />
        <Tooltip cursor={{fill: '#292929'}}/>
        <YAxis
          stroke="#5c5c5c"
          tickCount={3}
          tickFormatter={(number) => `${number.toFixed(4)}`}
          tickLine= {false}
          fontSize={"10px"}
          domain={[0, 0.5]}
        />

        <Bar dataKey="value" barSize={20}>
          {data.map(
            (entry) => {
              const x = entry.value;              
              if ( x => 0 && x <= 0.2) {
                color = yellow;
              }
              if (x > 0.2 && x <= 0.8) {
                color = green;
              }
              if (x > 0.8 && x <= 1) {
                color = red;
                }
              return ( 
            <Cell key="entry.name" fill={color} />
          )})}
        </Bar>

        
      </BarChart>
    </div>
  );
}

export default GraphRMS;
