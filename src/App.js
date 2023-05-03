import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [schemaId, setSchemaId] = useState(null);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchSchemaData = async () => {
      try {
        const result = await axios.post(
          "https://gaiax.vereign.com/ocm/attestation/v1/schemas?alias=trust",
          {
            name: "Hackaton-Poc",
            createdBy: "BenoitAndTobias",
            version: "1.0",
            attributes: ["firstname", "lastname"],
          }
        );
        setSchemaId(result.data.schemaId);
        setAttributes(result.data.attributes);
      } catch (error) {
        setError(error);
      }
    };
    fetchSchemaData();

    const fetchData = async () => {
      try {
        const result = await axios.post(
          "https://gaiax.vereign.com/ocm/connection/v1/invitation-url?alias=trust",
          {
            autoAcceptConnection: true,
            myLabel: "ConnexionRequest"
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

      <h2>Schema ID:</h2>
      <p>{schemaId}</p>
      <h2>Attributes:</h2>
      <ul>
        {attributes.map((attribute, index) => (
          <li key={index}>{attribute}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;