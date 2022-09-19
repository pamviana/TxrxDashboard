import React, { useEffect, useState } from "react";
import "./url-row.styles.css";
import axios from "axios";
import Loading from "../Loading/loading.component";
import SuccessAlert from '../SuccessAlert/success_alert.component';

function URLRow(props) {
  const [url, setURL] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true); 
  const [currentUrl, setCurrentUrl] = useState(props.valueOutput) 

  const handleSubmitURL = (e) => {
    props.setLoading(true); //Monitor.js
    
    //to change URL on JSON cfg
    e.preventDefault();
    const dataToSetURL = {
      serial: props.serial,
      data: {
        index: 0,
        uri: url,
      },
    };
    if (url != "") {
      axios
        .post("https://assistir.cloud/api/cfgs", dataToSetURL) //http request
        .then((resp) => {
          console.log(resp);          
          props.fetchStatInfo();     
        })
        .catch((error) => console.log(error));        
    }
    setURL("");
  };

  useEffect(() => {
    //So the SET button is disabled when the input is empty, avoiding not updating the state when "clearing" the input
    setCurrentUrl(props.valueOutput)
    if (url == "" || url == currentUrl) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [url, buttonDisabled]);

  return (
    <div className="url-container">
      <Loading open={props.loading} />
      <SuccessAlert open={props.urlSuccess} setOpen={props.setUrlSuccess}/>
      <label htmlFor="url-input"> URL</label>
      <div className="url-input-buttom">
        <input
          id="url-input"
          type="text"
          placeholder={props.valueOutput}
          value={url}
          onChange={(event) => {
            setURL(event.target.value);
          }}
        ></input>
        <button
          disabled={buttonDisabled}
          id="button-set"
          onClick={handleSubmitURL}
        >
          Set
        </button>
      </div>
    </div>
  );
}

export default URLRow;
