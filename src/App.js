import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        console.log(result.data.data);
        console.log(result.data.data.invitationUrl);
        setData(result.data.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Invitation URL:</h2>
      <p>{data.invitationUrl}</p>
      <h2>QR Code:</h2>
      {data && data.invitationUrl && <QRCode value={data.invitationUrl} />}
    </div>
  );
}

export default App;