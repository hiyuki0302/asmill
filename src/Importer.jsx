import React, { useState } from "react";
import Papa from 'papaparse';

function CsvImporter() {
    const [data, setData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        Papa.parse(file, {
            header: true,  // 最初の行をヘッダーとして扱う
            complete: (results) => {
                console.log(results.data);
                setData(results.data);
            },
            error: (error) => {
                console.error('Error:', error);
            }
        });
    };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CsvImporter;