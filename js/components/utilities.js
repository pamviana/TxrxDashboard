

//Generalized function to get data from JSON files from assistir.cloud
async function asyncFetch(url, successMsg, errMsg, other_params) {
  try {
    //successMsg ? console.log(successMsg) : null;
    const response = other_params
      ? await fetch(`https://assistir.cloud/${url}`, other_params)
      : await fetch(`https://assistir.cloud/${url}`);
    const result = await response.json();
    console.log("sucess")
    return result;
  } catch (err) {
    console.log('SDP failed!');
    errMsg ? console.log(`${errMsg} \n ${err}`) : console.log(err);
  }
}

export function updateVals(setInfoData, setStatData, setStmBitRate, setAudioBitRate, setVideoBitRate) {
  asyncFetch("info/223344", "Success posting /info", "ERROR fetching /info")
    .then((infoData) => {
      setInfoData({...infoData});
      
    })
    .catch(function (error) {
      console.log("ERROR fetching /info \n", error);
    });

  asyncFetch("stat/223344", "Success posting /stat", "ERROR fetching /stat")
    .then((statData) => {
      setStatData({...statData}); 
      //set stm, audio, video bit rates for the graph.
      setAudioBitRate(((parseInt(statData.stat.data.aud_bitrate.bps))/1000000).toFixed(4));
      setStmBitRate(((parseInt(statData.stat.data.stm_bitrate.bps))/1000000).toFixed(4));
      setVideoBitRate(((parseInt(statData.stat.data.vid_bitrate.bps))/1000000).toFixed(4));
      
    })
    .catch(function (error) {
      console.log("ERROR fetching /stat \n", error);
    });
}

//Get thumbnails. There are 3 different thumbNumbers: 1,2,3.
export function get_LiveThumb(serial, index, thumbNumber, setThumb, setTimestamp) {
  var time = new Date().getTime();
  setTimestamp(time);
  var thumbURL = `https://assistir.cloud/thumbnail/${serial}-thumb-${index}.${thumbNumber}.jpg?timestamp='${time}'`
  return setThumb(thumbURL)
}

