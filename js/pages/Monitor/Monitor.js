import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../../../css/App.css";
import MainDashboard from "../../components/MainDashboard/main-dashboard.component";
import Footer from "../../components/Footer/footer.component";

function Monitor() {
  //----------------DECLARING VARIABLES-------------------
  const [statData, setStatData] = useState({});
  const [infoData, setInfoData] = useState({});
  const [thumb1, setThumb1] = useState("");
  const [thumb2, setThumb2] = useState("");
  const [thumb3, setThumb3] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlSuccess, setUrlSuccess] = useState(false);
  const [logsData, setLogsData] = useState([]);
  const [manifestSeqColor, setManifestSeqColor] = useState("");
  const [manifestUpdateColor, setManifestUpdateColor] = useState("");
  let manifestSeqArray = [0, 0, 0, 0, 0];
  let manifestUpdateArray = [0, 0, 0, 0, 0];
  let tempUrl = "";
  const [serial, setSerial] = useState(223344);

  //-------------- This function gets some vals that aren't always in the JSON ------
  // colorimetry, chroma-format, language-code, audio-codec -------------------
  function getCaps(infoData, dataName) {
    const stmCapsArray = infoData.info.data.vid_streams[0]?.stm_caps;
    const stmCapsSize = stmCapsArray.length;
    for (let i = 0; i < stmCapsSize; i++) {
      if (stmCapsArray[i][0] == dataName) {
        return stmCapsArray[i][1];
      }
    }
  }

  function getTags(infoData, dataName) {
    const stmTagsArray = infoData.info.data.aud_streams[0]?.stm_tags;
    const stmTagsSize = stmTagsArray.length;
    for (let i = 0; i < stmTagsSize; i++) {
      if (stmTagsArray[i][0] == dataName) {
        return stmTagsArray[i][1];
      }
    }
  }

  // It calculates SCTE start and stop timestamp -------------------------------

  function calculateSCTEStarttimestamp(statDataValues) {
    // (strt_start_timestamp - stm_rt_stmp + dev_utc_stmp)
    if (statDataValues.stat.data.splcs.length == 0) {
      return "-";
    } else {
      return new Date(
        (statDataValues.stat.data.splcs[0].strt_rt_stmp -
          statDataValues.stat.data.stm_rt_stmp +
          statDataValues.stat.data.dev_utc_stmp) /
          1000000 //converting from nanoseconds to miliseconds
      ).toString();
    }
  }

  function calculateSCTEStoptimestamp(statDataValues) {
    // (strt_stop_timestamp - stm_rt_stmp + dev_utc_stmp)
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

  // Sometimes the stream wont have manifest info, so when that happens the data is negative
  // Manifest info= mnfst_last_seq and mnfst_last_update
  function checkManifestSeq(manifest) {
    if (manifest < 0) {
      return "-";
    } else {
      return manifest;
    }
  }

  function checkManifestUpdate(manifest) {
    if (manifest < 0) {
      return "-";
    } else {
      return (manifest / 1000000000).toFixed();
    }
  }
  // ------- Video Frame is a string in the JSON, so it needs to be converted to a int to calculate it, e.g. '25/1' = 25
  function extractVideoFrame(data) {
    const number = parseInt(data.split("/")[0]) / parseInt(data.split("/")[1]);

    if (number % 1 != 0) { //because number has decimal places
      return number.toFixed(2);
    } else {
      return number //so 25 is not 25.00
    }
  }

  // --------------------- CHECK IF DATA HAS CHANGED IN THE LAST X SECONDS AND SET THE COLOR OF THE DATA BOX ------------
  function setManifestColor(array, setter) {
    if (array[4] != 0 && array[3] != 0) {
      if (array[4] == array[1]) {
        setter("issues__yellow");
      } else {
        setter("");
      }
      if (array.every((value) => value === array[0])) {
        setter("issues__red");
      }
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
    asyncFetch(
      `info/${serial}`,
      "Success posting /info",
      "ERROR fetching /info"
    )
      .then((infoData) => {
        setInfoData({
          video_codec: infoData.info.data.vid_streams[0].stm_tags[0][1] || "-",
          c_depth: infoData.info.data.aud_streams[0].stm_dpth || "-",
          size:
            infoData.info.data.vid_streams[0].stm_mode
              ?.toString()
              .split(":")[0] || "-",
          video_frame: infoData.info.data.vid_streams[0].stm_rate ? extractVideoFrame(infoData.info.data.vid_streams[0].stm_rate) : "-",
          channel: infoData.info.data.aud_streams[0].stm_num || "-",
          audio_frame: infoData.info.data.aud_streams[0].stm_rate || "-",
          colorimetry: getCaps(infoData, "colorimetry") || "N/A",
          chroma_format: getCaps(infoData, "chroma-format") || "-",
          language: getTags(infoData, "language-code") || "-",
          audio_codec: getTags(infoData, "audio-codec") || "-",
        });
      })
      .catch(function (error) {
        console.log("ERROR fetching /info \n", error);
      });

    asyncFetch(
      `stat/${serial}`,
      "Success posting /stat",
      "ERROR fetching /stat"
    )
      .then((statDataJSON) => {
        setStatData({
          serial: statDataJSON.stat.serial,
          created_at: new Date(statDataJSON.stat.created_at)?.toString() || "0",
          url: statDataJSON.stat.data.cur_uri,
          playstate: statDataJSON.stat.data.playstate,
          audio_level_left: statDataJSON.stat.data.lvl.decay[0].toFixed(4),
          audio_level_right: statDataJSON.stat.data.lvl.decay[1].toFixed(4),
          audio_bit_rate: (
            parseInt(statDataJSON.stat.data.aud_bitrate.bps) / 1000000
          ).toFixed(4),
          stm_bit_rate: (
            parseInt(statDataJSON.stat.data.stm_bitrate.bps) / 1000000
          ).toFixed(4),
          video_bit_rate: (
            parseInt(statDataJSON.stat.data.vid_bitrate.bps) / 1000000
          ).toFixed(4),
          scte_pid: statDataJSON.stat.data.splcs[0]?.src_pid || "-",
          scte_start_timestamp: calculateSCTEStarttimestamp(statDataJSON),
          scte_stop_timestamp: calculateSCTEStoptimestamp(statDataJSON),
          scte_state: statDataJSON.stat.data.splcs[0]?.state || "Idle",
          mnfst_last_seq: checkManifestSeq(
            statDataJSON.stat.data?.mnfst_last_seq
          ),
          mnfst_last_update: checkManifestUpdate(
            statDataJSON.stat.data?.mnfst_last_update
          ),
          thumb_timestamp:
            (statDataJSON.stat.data.thm.rt_stmp -
              statDataJSON.stat.data.stm_rt_stmp +
              statDataJSON.stat.data.dev_utc_stmp) /
            1000000,
        });
        //---------------- CONFIRMING STAT GOT UPDATED AFTER URL SET ---------------
        const curUrl = statDataJSON.stat.data.cur_uri;
        if (tempUrl != "") {
          if (curUrl != tempUrl) {
            setLoading(false); // turn off loading page
            setUrlSuccess(true); // show Success message (popup message)
          }
        }
        tempUrl = statDataJSON.stat.data.cur_uri;
        manifestSeqArray.push(statDataJSON.stat.data.mnfst_last_seq);
        manifestSeqArray = manifestSeqArray.slice(1, 6);

        manifestUpdateArray.push(statDataJSON.stat.data.mnfst_last_update);
        manifestUpdateArray = manifestUpdateArray.slice(1, 6);

        setManifestColor(manifestSeqArray, setManifestSeqColor);
        setManifestColor(manifestUpdateArray, setManifestUpdateColor);
        //---------------------------------------------------------------
      })
      .catch(function (error) {
        console.log("ERROR fetching /stat \n", error);
      });

    asyncFetch(
      `stat/breaks/${serial}`,
      "Success posting /breaks",
      "ERROR fetching /breaks"
    )
      .then((logsDataJSON) => {
        setLogsData(logsDataJSON.breaks);
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

  // This is a generalized function that is also being called when a new URL is set -----------------------------
  // It is passed as props to MainDashboard and then to URLRow

  function fetchStatInfo() {
    updateVals();
    get_LiveThumb(`${serial}`, 0, 1, setThumb1);
    get_LiveThumb(`${serial}`, 0, 2, setThumb2);
    get_LiveThumb(`${serial}`, 0, 3, setThumb3);
  }

  // -----------------------------------

  useEffect(() => {
    fetchStatInfo();
    const interval = setInterval(() => {
      fetchStatInfo();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [serial]);

  return (
    <>
      <div className="dashboard-demo">
        <MainDashboard
          fetchStatInfo={fetchStatInfo}
          statData={statData}
          infoData={infoData}
          thumb1={thumb1}
          thumb2={thumb2}
          thumb3={thumb3}
          loading={loading}
          setLoading={setLoading}
          urlSuccess={urlSuccess}
          setUrlSuccess={setUrlSuccess}
          logsData={logsData}
          manifestSeqColor={manifestSeqColor}
          manifestUpdateColor={manifestUpdateColor}
          setSerial={setSerial}
          serial={serial}
        />
        <Footer />
      </div>
    </>
  );
}

export default Monitor;

if (document.getElementById("monitor")) {
  ReactDOM.render(<Monitor />, document.getElementById("monitor"));
}
