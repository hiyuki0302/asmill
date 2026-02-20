import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import {master} from './master_data.js';

const columnMaps = {
    Example01: { "11": "部長", "12": "主任", "13": "一般" },
};

function CsvImporter({ columns }) {
    const [data, setData] = useState([]);

    const handleLoadCsv = async () => {
        try {
            const result = await invoke("read_csv", { path: "../src/test.csv" });
            console.log(result);
            setData(result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

  return (
    <div>
      <button onClick={handleLoadCsv}>CSVを読み込む</button>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {(columns || Object.keys(data[0])).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {(columns || Object.keys(row)).map((key) => (
                  <td key={key}>{columnMaps[key] ? (columnMaps[key][row[key]] ?? "") : row[key]}</td>
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
