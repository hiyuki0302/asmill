import { useState } from "react";
import {master} from './master_data.js';

function App() {
  const extraInfo = master[0].roles;

  const roles = extraInfo.map(role =>
    <option key={role.code}>{role.job}</option>
  )

  return(
    <div>
      <label>
        選択してください：
        <select>
          {roles}
        </select>
      </label>
    </div>
  )
}

export default App;
