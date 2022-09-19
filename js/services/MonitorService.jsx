import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MainDashboard from "../components/MainDashboard/main-dashboard.component";

export default function MonitorService() {
  //----------------DECLARING VARIABLES---------------
  const [statData, setStatData] = useState({});
  const [infoData, setInfoData] = useState({});
  const [thumb1, setThumb1] = useState("");
  const [thumb2, setThumb2] = useState("");
  const [thumb3, setThumb3] = useState("");

  //-------------- This function gets some vals that aren't always in the JSON ------
  // colorimetry, chroma-format, language-code, audio-codec -------------------
  function getCaps(infoData, dataName){    
    const stmCapsArray = infoData.info.data.vid_streams[0]?.stm_caps;
    const stmCapsSize = stmCapsArray.length;
    for (let i = 0; i < stmCapsSize; i++) {
      if (stmCapsArray[i][0] == dataName) {
        return stmCapsArray[i][1];
      }
      else{
        return "-"
      }
    }
  }

  function getTags(infoData, dataName){
    const stmTagsArray = infoData.info.data.aud_streams[0]?.stm_tags;
    const stmTagsSize = stmTagsArray.length;
    for (let i = 0; i < stmTagsSize; i++) {
      if (stmTagsArray[i][0] == dataName) {
        return stmTagsArray[i][1]
      }
      else{
        return "-"
      }
    }
  }

 // It calculates SCTE start and stop timestamp -------------------------------

  function calculateSCTEStarttimestamp(statDataValues) {
    if (statDataValues.stat.data.splcs.length == 0) {
      return "-";
    } else {
      return new Date(
        (statDataValues.stat.data.splcs[0].strt_rt_stmp -
          statDataValues.stat.data.stm_rt_stmp +
          statDataValues.stat.data.dev_utc_stmp) /
          1000000
      ).toString();
    }
  }

  function calculateSCTEStoptimestamp(statDataValues) {
    if (statDataValues.stat.data.splcs.length == 0) {
      return "-";
    } else {
      return new Date(
        (statDataValues.stat.data.splcs[0].stop_rt_stmp -
          statDataValues.stat.data.stm_rt_stmp +
          statDataValues.stat.data.dev_utc_stmp) /
          1000000
      ).toString();
    }
  }

  //----------------------- FETCHING DATA ---------------------------------------

  //Generalized function to get data from JSON files from assistir.cloud
  async function asyncFetch(url, successMsg, errMsg, other_params) {
    try {
      const response = other_params
        ? await fetch(`https://assistir.cloud/${url}`, other_params)
        : await fetch(`https://assistir.cloud/${url}`);
      const result = await response.json();
      console.log("sucess");
      return result;
    } catch (err) {
      console.log("SDP failed!");
      errMsg ? console.log(`${errMsg} \n ${err}`) : console.log(err);
    }
  }

  function updateVals() {
    asyncFetch("info/223344", "Success posting /info", "ERROR fetching /info")
      .then((infoData) => {
        setInfoData({
          video_codec: infoData.info.data.vid_streams[0].stm_tags[0][1],
          c_depth: infoData.info.data.aud_streams[0].stm_dpth,
          size: infoData.info.data.vid_streams[0].stm_mode
            .toString()
            .split(":")[0],
          video_frame: parseInt(infoData.info.data.vid_streams[0].stm_rate),
          channel: infoData.info.data.aud_streams[0].stm_num,
          audio_frame: infoData.info.data.aud_streams[0].stm_rate,
          colorimetry: getCaps(infoData, "colorimetry"),
          chroma_format: getCaps(infoData, "chroma-format"),
          language: getTags(infoData, "language"),
          audio_codec: getTags(infoData, "audio-codec"),
        });
      })
      .catch(function (error) {
        console.log("ERROR fetching /info \n", error);
      });

    asyncFetch("stat/223344", "Success posting /stat", "ERROR fetching /stat")
      .then((statData) => {
        setStatData({
          serial: statData.stat.serial,
          created_at: new Date(statData.stat.created_at).toString(),
          url: statData.stat.data.cur_uri,
          playstate: statData.stat.data.playstate,
          audio_level_left: statData.stat.data.lvl.decay[0].toFixed(4),
          audio_level_right: statData.stat.data.lvl.decay[1].toFixed(4),
          audio_bit_rate: (
            parseInt(statData.stat.data.aud_bitrate.bps) / 1000000
          ).toFixed(4),
          stm_bit_rate: (
            parseInt(statData.stat.data.stm_bitrate.bps) / 1000000
          ).toFixed(4),
          video_bit_rate: (
            parseInt(statData.stat.data.vid_bitrate.bps) / 1000000
          ).toFixed(4),
          scte_pid: statData.stat.data.splcs[0]?.src_pid || "-",
          scte_start_timestamp: calculateSCTEStarttimestamp(statData),
          scte_stop_timestamp: calculateSCTEStoptimestamp(statData),
          scte_state: statData.stat.data.splcs[0]?.state || "Idle",
          mnfst_last_seq: statData.stat.data?.mnfst_last_seq,
          mnfst_last_update: statData.stat.data?.mnfst_last_update,
        });
      })
      .catch(function (error) {
        console.log("ERROR fetching /stat \n", error);
      });
  }

  //Get thumbnails. There are 3 different thumbNumbers: 1,2,3.
  function get_LiveThumb(serial, index, thumbNumber, setThumb) {
    var time = new Date().getTime();
    var thumbURL = `https://assistir.cloud/thumbnail/${serial}-thumb-${index}.${thumbNumber}.jpg?timestamp='${time}'`;
    return setThumb(thumbURL);
  }

  // This is a generalized function that is also being called when a new URL is set
  // It is passed as props to MainDashboard and then to URLRow

  function fetchStatInfo() {
    updateVals();
    get_LiveThumb(223344, 0, 1, setThumb1);
    get_LiveThumb(223344, 0, 2, setThumb2);
    get_LiveThumb(223344, 0, 3, setThumb3);
  }

  useEffect(() => {
    fetchStatInfo();

    const interval = setInterval(() => {
      fetchStatInfo();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ----------------------- RETURNS: ---------------------------------------------

  return (
    <>
      <Example
        fetchStatInfo={fetchStatInfo}
        statData={statData}
        infoData={infoData}
        thumb1={thumb1}
        thumb2={thumb2}
        thumb3={thumb3}
      />
    </>
  );
}

if (document.getElementById("monitor-service")) {
  ReactDOM.render(
    <MonitorService />,
    document.getElementById("monitor-service")
  );
}
