import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import "./graph-stm.styles.css";

function GraphSTMRate(props) {
  /*-------------- DECLARING VARIABLES -----------------*/
  const grey = "#666";

  const [legendColor, setLegendColor] = useState({
    videoValue: "#7ed834",
    audioValue: "#d8c734",
    stmValue: "#2C5CFF",
    all: "#f8f8f8",
    anc: "#aa41ff71",
  });

  const [dataKey, setDataKey] = useState({
    videoValue: "videoValue",
    audioValue: "audioValue",
    stmValue: "stmValue",
  });

  /*Data used to plot the graph. We initiate the array with size 5 because that is how many plots are showing in the graph */
  const [data, setData] = useState([
    {
      videoValue: 0, //it can be 0 instead of props.videoBitRateData
      audioValue: 0,
      stmValue: 0,
      tick: 0,
    },
    {
      videoValue: 0, 
      audioValue: 0,
      stmValue: 0,
      tick: 0,
    },
    {
      videoValue: 0, 
      audioValue: 0,
      stmValue: 0,
      tick: 0,
    },
    {
      videoValue: 0, 
      audioValue: 0,
      stmValue: 0,
      tick: 0,
    },
    {
      videoValue: 0, 
      audioValue: 0,
      stmValue: 0,
      tick: 0,
    },
  ]);

  /*Every time the data changes, what is inside the useEffect is being rendered. */
  useEffect(() => {
    const interval = setInterval(() => {
      setData((currentData) => {
        //Pick the last 5 values
        return [
          ...currentData.slice(1, 6), /*So it displays the last 5 bit rates*/
          {
            videoValue: props.videoBitRateData,
            audioValue: props.audioBitRateData,
            stmValue: props.stmBitRateData,
            tick: props.xAxisTime,
          },
        ];
      });
    }, 5000); /* The graph is rendered every 5 seconds */
    return () => clearInterval(interval);
  }, [data]);

  /* When the Legend is clicked*/
  /*TODO: Simplify this handle. It is too long */
  const handleClick = (o) => {
    const { dataKey } = o;
    if (dataKey == "audioValue") {
      setDataKey({
        videoValue: "",
        audioValue: "audioValue",
        stmValue: "",
      });
      setLegendColor({
        videoValue: grey,
        audioValue: "#d8c734",
        stmValue: grey,
        all: grey,
        anc: grey,
      });
    } else if (dataKey == "videoValue") {
      setDataKey({
        videoValue: "videoValue",
        audioValue: "",
        stmValue: "",
      });
      setLegendColor({
        videoValue: "#7ed834",
        audioValue: grey,
        stmValue: grey,
        all: grey,
        anc: grey,
      });
    } else if (dataKey == "stmValue") {
      setDataKey({
        videoValue: "",
        audioValue: "",
        stmValue: "stmValue",
      });
      setLegendColor({
        videoValue: grey,
        audioValue: grey,
        stmValue: "#2C5CFF",
        all: grey,
        anc: grey,
      });
    } else if (dataKey == "all") {
      setDataKey({
        videoValue: "videoValue",
        audioValue: "audioValue",
        stmValue: "stmValue",
      });
      setLegendColor({
        videoValue: "#7ed834",
        audioValue: "#d8c734",
        stmValue: "#2C5CFF",
        all: "#f8f8f8",
        anc: "#aa41ff71",
      });
    }
  };

  return (
    <div className="stm-chart-container">
      <ResponsiveContainer>
        <AreaChart
          width={920}
          height={200}
          data={data}
          margin={{
            top: 30,
            right: 40,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="fill-color-blue" gradientTransform="rotate(90)">
              <stop offset="10%" stopColor="#2C5CFF" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#2C5CFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient
              id="fill-color-green"
              gradientTransform="rotate(90)"
            >
              <stop offset="10%" stopColor="#7ed834" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#7ed834" stopOpacity={0} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient
              id="fill-color-yellow"
              gradientTransform="rotate(90)"
            >
              <stop offset="10%" stopColor="#d8c734" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#d8c734" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#292929"
            strokeOpacity={0.6}
          />
          <Tooltip />
          <Legend
            onClick={handleClick}
            iconType="square"
            verticalAlign="top"
            align="center"
            payload={[
              {
                value: "All",
                type: "square",
                color: legendColor.all,
                dataKey: "all",
              },
              {
                value: "Stream Bit Rate",
                type: "square",
                color: legendColor.stmValue,
                dataKey: "stmValue",
              },
              {
                value: "Audio Bit Rate",
                type: "square",
                color: legendColor.audioValue,
                dataKey: "audioValue",
              },
              {
                value: "Video Bit Rate",
                type: "square",
                color: legendColor.videoValue,
                dataKey: "videoValue",
              },
              {
                value: "ANC",
                type: "square",
                color: legendColor.anc,
                dataKey: "anc",
              },
            ]}
          />
          <YAxis domain={[0, "auto"]} tickCount={40}/>
          <XAxis dataKey="tick" />
          <Area
            name="STM Bit Rate"
            type="monotone"
            dataKey={dataKey.stmValue}
            stroke="#2C5CFF"
            fill="url(#fill-color-blue)"
          ></Area>
          <Area
            name="Video Bit Rate"
            type="monotone"
            dataKey={dataKey.videoValue}
            stroke="#7ed834"
            fill="url(#fill-color-green)"
          ></Area>
          <Area
            name="Audio Bit Rate"
            type="monotone"
            dataKey={dataKey.audioValue}
            stroke="#d8c734"
            fill="url(#fill-color-yellow)"
          ></Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphSTMRate;
