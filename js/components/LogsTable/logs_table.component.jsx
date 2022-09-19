import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./logs_table.styles.css";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import { CSVLink } from "react-csv";

// -------------- Styling Table -------------------

// const useStyles = makeStyles((theme) => ({
//   tableHeaderCell: {
//     backgroundColor: "rgba(73, 73, 73, 0.376) !important",
//   },
// }));

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2F2F2F",
    color: "white",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "#383838",
    color: "white",
    whiteSpace: "nowrap",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#525252",
  },
}));

// ----------- END of Styling Table -------------

function LogsTable({ logsData, serial, dateTime}) {
  const [logsTable, setLogsTable] = useState([]);
  const [timeCSVName, setTimeCSVName] = useState("");
  const [dateCSVName, setDateCSVName] = useState("");

  function calculateSCTEStarttimestamp(statDataValues) {
    // (strt_start_timestamp - stm_rt_stmp + dev_utc_stmp)
    if (statDataValues.data.splcs.length == 0) {
      return "-";
    } else {
      const data = new Date(
        (statDataValues.data.splcs[0].strt_rt_stmp -
          statDataValues.data.stm_rt_stmp +
          statDataValues.data.dev_utc_stmp) /
          1000000
      );

      return `${data.toLocaleDateString()} ${data.toLocaleTimeString()}`;
    }
  }

  function calculateSCTEStoptimestamp(statDataValues) {
    // (strt_stop_timestamp - stm_rt_stmp + dev_utc_stmp)
    if (statDataValues.data.splcs.length == 0) {
      return "-";
    } else {
      const data = new Date(
        (statDataValues.data.splcs[0].stop_rt_stmp -
          statDataValues.data.stm_rt_stmp +
          statDataValues.data.dev_utc_stmp) /
          1000000
      );

      return `${data.toLocaleDateString()} ${data.toLocaleTimeString()}`;
    }
  }

  // function createLogsTable() {
  //   const currLogsTable = [];
  //   logsData.forEach((currData) => {
  //     currLogsTable.push({
  //       updated_at: `${new Date(
  //         currData.updated_at
  //       ).toLocaleDateString()} ${new Date(
  //         currData.updated_at
  //       ).toLocaleTimeString()}`,
  //       scte_pid: currData.data.splcs[0]?.src_pid || "-",
  //       scte_start_timestamp: calculateSCTEStarttimestamp(currData),
  //       scte_stop_timestamp: calculateSCTEStoptimestamp(currData),
  //       scte_state: currData.data.splcs[0]?.state || "Idle",
  //       index: currData.data?.mnfst_last_seq,
  //       index_time: currData.data?.mnfst_last_update,
  //       audio_bps: (parseInt(currData.data.aud_bitrate.bps) / 1000000).toFixed(
  //         4
  //       ),
  //       stm_bps: (parseInt(currData.data.stm_bitrate.bps) / 1000000).toFixed(4),
  //       video_bps: (parseInt(currData.data.vid_bitrate.bps) / 1000000).toFixed(
  //         4
  //       ),
  //       audio_level_left: currData.data.lvl.decay[0].toFixed(4),
  //       audio_level_right: currData.data.lvl.decay[1].toFixed(4),
  //       url: currData.data.cur_uri,
  //     });
  //   });
  //   setLogsTable(currLogsTable);
  // }

  function createLogsTest() {
    let currKey = "";
    let dataBreaks = [];
    let dataRow = {};

    const traverse = (obj) => {  
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] !== "object") { //It will distinguish "stm bps" from "audio bps" for ex, so it won't be saved as "bps" only
          dataRow[`${currKey} ${key}`] = obj[key];
        }
    
        if (typeof obj[key] === "object" && obj[key] !== null) { //So the children of some objects can be read as well
          currKey = key; //reseting it
          traverse(obj[key]);
        }
      });  
      return dataRow;
    }

    function add(dataArray) {
      for (let i = 0; i < dataArray.length; i++) {
        currKey = ""; //reseting it for the next index of the array
        dataRow = {}; //reseting it
        dataBreaks.push(traverse(dataArray[i]));
      }
      return dataBreaks;
    }
    setLogsTable(add(logsData));    
  }

  // const headers = [
  //   { label: "Updated at", key: "updated_at" },
  //   { label: "SCTE PID", key: "scte_pid" },
  //   { label: "SCTE Start Timestamp", key: "scte_start_timestamp" },
  //   { label: "SCTE Stop Timestamp	", key: "scte_stop_timestamp" },
  //   { label: "SCTE State", key: "scte_state" },
  //   { label: "Index", key: "index" },
  //   { label: "Index Time", key: "index_time" },
  //   { label: "Audio bps", key: "audio_bps" },
  //   { label: "STM bps", key: "stm_bps" },
  //   { label: "Video bps", key: "video_bps" },
  //   { label: "Audio Level Left", key: "audio_level_left" },
  //   { label: "Audio Level Right", key: "audio_level_right" },
  //   { label: "URL", key: "url" },
  // ];

  useEffect(() => {
    createLogsTest();
  }, [logsData]);

  return (
    <div className="logs_table_container">
      <h2> Logs </h2>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 280,
          "&::-webkit-scrollbar": {
            width: 10,
            height: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#2F2F2F",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#6c6868",
            borderRadius: 1,
          },
          "&::-webkit-scrollbar-corner": {
            backgroundColor: "#2F2F2F",
          },
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          styles={{ backgroundColor: "rgba(73, 73, 73, 0.376)" }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Updated At</StyledTableCell>
              <StyledTableCell>SCTE PID</StyledTableCell>
              <StyledTableCell>SCTE Start Timestamp</StyledTableCell>
              <StyledTableCell>SCTE Stop Timestamp</StyledTableCell>
              <StyledTableCell>SCTE State</StyledTableCell>
              <StyledTableCell>Index</StyledTableCell>
              <StyledTableCell>Index Time</StyledTableCell>
              <StyledTableCell>Audio bps</StyledTableCell>
              <StyledTableCell>STM bps</StyledTableCell>
              <StyledTableCell>Video bps</StyledTableCell>
              <StyledTableCell>Audio Level Left</StyledTableCell>
              <StyledTableCell>Audio Level Right</StyledTableCell>
              <StyledTableCell>URL</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logsData.map((currData) => {
              return (
                <StyledTableRow key={currData._id}>
                  <StyledTableCell>
                    {`${new Date(
                      currData.updated_at
                    ).toLocaleDateString()} ${new Date(
                      currData.updated_at
                    ).toLocaleTimeString()}`}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currData.data.splcs[0]?.src_pid || "-"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {calculateSCTEStarttimestamp(currData)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {calculateSCTEStoptimestamp(currData)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currData.data.splcs[0]?.state || "Idle"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currData.data?.mnfst_last_seq}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currData.data?.mnfst_last_update}
                  </StyledTableCell>
                  <StyledTableCell>
                    {(
                      parseInt(currData.data.aud_bitrate.bps) / 1000000
                    ).toFixed(4)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {(
                      parseInt(currData.data.stm_bitrate.bps) / 1000000
                    ).toFixed(4)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {(
                      parseInt(currData.data.vid_bitrate.bps) / 1000000
                    ).toFixed(4)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currData.data.lvl.decay[0].toFixed(4)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {currData.data.lvl.decay[1].toFixed(4)}
                  </StyledTableCell>

                  <StyledTableCell>{currData.data.cur_uri}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="logs__export">
        <p>Export:</p>
        <CSVLink
          data={logsTable}          
          onClick= {()=> {
            setDateCSVName(new Date(dateTime).toLocaleDateString());
            setTimeCSVName(new Date(dateTime).toLocaleTimeString());            
          }}
          filename={`sonda_${serial}_${dateCSVName}_${timeCSVName}.csv`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#fff"
            className="bi bi-filetype-csv"
            viewBox="0 0 16 16"
            cursor="pointer"
          >
            <path
              fillRule="evenodd"
              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.517 14.841a1.13 1.13 0 0 0 .401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.566-.21l-.621-.144a.97.97 0 0 1-.404-.176.37.37 0 0 1-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.2-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 0 1 .152.326.505.505 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.223-.013-.32-.04a.838.838 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 0 1 .302-.399.814.814 0 0 1 .475-.137c.15 0 .283.032.398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.441 1.441 0 0 0-.489-.272 1.838 1.838 0 0 0-.606-.097c-.356 0-.66.074-.911.223-.25.148-.44.359-.572.632-.13.274-.196.6-.196.979v.498c0 .379.064.704.193.976.131.271.322.48.572.626.25.145.554.217.914.217.293 0 .554-.055.785-.164.23-.11.414-.26.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.799.799 0 0 1-.118.363.7.7 0 0 1-.272.25.874.874 0 0 1-.401.087.845.845 0 0 1-.478-.132.833.833 0 0 1-.299-.392 1.699 1.699 0 0 1-.102-.627v-.495Zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879l-1.327 4Z"
            />
          </svg>
        </CSVLink>
      </div>
    </div>
  );
}

export default LogsTable;
