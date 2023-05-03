import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        "https://gaiax.vereign.com/ocm/connection/v1/invitation-url?alias=trust",
        {
          autoAcceptConnection: true,
          alias: "string",
          myLabel: "string",
          myImageUrl: "string",
        }
      );
      console.log(result.data);
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Invitation URL:</h2>
      <p>{data.invitationURL}</p>
      <h2>QR Code:</h2>
      <QRCode value={data.invitationURL} />
    </div>
  );
}

export default App;
