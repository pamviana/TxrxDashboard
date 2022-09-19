import React from "react";
import AudioLevelsDashboard from "../AudioLevels/audio-levels.component";
import OutputBoxWithLabel from "../OutputDashboard/output-box-with-label.component";
import OutputBox from "../OutputDashboard/output-box.component";
import "./main-dashboard.styles.css";
import ThumbnailDashboard from "../ThumbnailDashboard/thumb-dashboard.component";
import GraphRMS from "../GraphRMS/graph-rms.component";
import GraphSTMRate from "../GraphSTMRate/GraphSTMRate";
import URLRow from "../URLRow/url-row.component";
import LogsTable from "../LogsTable/logs_table.component";
import ManifestBox from "../ManifestBox/manifest_box.component";
import ManifestBoxWithRule from "../ManifestBox/manifest_box_withrule.component";
import SerialDropDown from "../SerialDropDown/serial.component";

function MainDashboard(props) {
  const {
    statData,
    infoData,
    thumb1,
    thumb2,
    thumb3,
    fetchStatInfo,
    logsData,
    manifestSeqColor,
    manifestUpdateColor,
    serial,
    setSerial,
  } = props;

  return (
    <section className="main-dashboard">
      {/*--------------------First Row-----------------*/}
      <div className="row-container serial-row">
        <SerialDropDown setSerial={setSerial} serial={serial} />
      </div>
      <div className="row-container">
        <OutputBoxWithLabel
          id="created_at__dashboard"
          valueOutput={statData.created_at}
          label="Date/Time"
        />
        <ManifestBoxWithRule
          valueOutput={statData.mnfst_last_seq}
          label="Manifest Sequence"
          issueColor={manifestSeqColor}
        />
        <ManifestBox
          valueOutput={statData.mnfst_last_update}
          label="AWS Manifest Index"
          issueColor={manifestUpdateColor}
        />
      </div>
      {/*--------------------Second/Manifest Data-----------------*/}
      <div className="row-container manifest__row"></div>
      {/*--------------------Third/Graph Row-----------------*/}
      <div className="graph-container">
        <GraphSTMRate
          stmBitRateData={statData.stm_bit_rate}
          audioBitRateData={statData.audio_bit_rate}
          videoBitRateData={statData.video_bit_rate}
          xAxisTime={
            new Date(statData.created_at)?.toLocaleTimeString("en-GB") || "0"
          }
        />
        <p style={{ color: "#f8f8f8", paddingLeft: "10px" }}>
          <span style={{ fontWeight: "bold" }}>Active URL:</span> {statData.url}
        </p>
      </div>

      {/*--------------------Forth Row-----------------*/}

      <URLRow
        valueOutput={statData.url}
        fetchStatInfo={fetchStatInfo}
        loading={props.loading}
        setLoading={props.setLoading}
        urlSuccess={props.urlSuccess}
        setUrlSuccess={props.setUrlSuccess}
        serial = {serial}
      />

      {/*--------------------Fifth Row-----------------*/}
      <div className="row-container" id="fifth-row">
        <OutputBoxWithLabel
          valueOutput={statData.playstate}
          label="Playstate"
        />
        <OutputBoxWithLabel
          valueOutput={infoData.video_codec}
          label="Video Codec"
        />
        <OutputBoxWithLabel
          label="C-depth"
          valueOutput={infoData.c_depth || "8-bit"}
        />
        <OutputBoxWithLabel
          label="C-sample"
          valueOutput={infoData.chroma_format}
        />
        <OutputBoxWithLabel
          label="C-space"
          valueOutput={infoData.colorimetry}
        />
        <OutputBoxWithLabel label="Size" valueOutput={infoData.size} />
        <OutputBoxWithLabel
          valueOutput={infoData.video_frame || "-"}
          label="Video Frame Rate"
        />
      </div>
      {/*--------------------Sixth/Thumbnail Row-----------------*/}
      <div className="row-container" id="thumbnail-row">
        <GraphRMS
          valueOutputL={statData.audio_level_left}
          valueOutputR={statData.audio_level_right}
        />
        <ThumbnailDashboard
          label={new Date(statData.thumb_timestamp - 10000).toLocaleTimeString(
            "en-GB"
          )}
          thumbValue={thumb3}
        />
        <ThumbnailDashboard
          label={new Date(statData.thumb_timestamp - 5000).toLocaleTimeString(
            "en-GB"
          )}
          thumbValue={thumb2}
        />
        <ThumbnailDashboard
          label={new Date(statData.thumb_timestamp).toLocaleTimeString("en-GB")}
          thumbValue={thumb1}
        />
      </div>
      {/*--------------------Seventh Row-----------------*/}
      <div className="row-container" id="seventh-row">
        <AudioLevelsDashboard
          valueOutputL={statData.audio_level_left}
          valueOutputR={statData.audio_level_right}
        />
        <OutputBoxWithLabel
          valueOutput={infoData.audio_codec}
          label="Audio Codec"
        />
        <OutputBoxWithLabel valueOutput={infoData.channel} label="Channel" />
        <OutputBoxWithLabel valueOutput={infoData.language} label="Language" />
        <OutputBoxWithLabel
          valueOutput={infoData.audio_frame}
          label="Audio Frame Rate"
        />
      </div>

      {/*--------------------SCTE Row-----------------*/}

      <div className="row-container" id="scte-row">
        <OutputBoxWithLabel
          valueOutput={statData.scte_state}
          label="SCTE State"
        />
        <OutputBoxWithLabel valueOutput={statData.scte_pid} label="SCTE PID" />
        <div className="SCTE-time-stamps-container">
          <span style={{ fontSize: "16px !important" }}>
            <OutputBoxWithLabel
              valueOutput={statData.scte_start_timestamp}
              label="SCTE Time Stamps"
            />
          </span>
          <OutputBox valueOutput={statData.scte_stop_timestamp} />
        </div>
      </div>
      {/*---------------------LOGS TABLE-------------------*/}

      <div className="logs_table_wrapper">
        <LogsTable logsData={logsData} serial={serial} dateTime= {statData.created_at}/>
      </div>
    </section>
  );
}

export default MainDashboard;
