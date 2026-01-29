import { useState } from "react";
import {master} from './master_data.js';
import React from "react";
import './demo.css'

function Side_bar() {
  const groups = [
    { id: '01', name: 'Title01', icon: '✒️'},
    { id: '02', name: 'Title02', icon: '✒️'}
  ]
  
  const test = groups.map(g => 
    <p class="bg-cyan-500 py-1 my-1 w-12.5 " key={g.id}>{g.name}</p>
  )

  return test
}

function App() {
  const extraInfo = master[0].roles;

  const roles = extraInfo.map(role =>
    <option key={role.code}>{role.job}</option>
  )

  return(
    <body>

      <aside>
        <Side_bar />
      </aside>
      
      <form>
        <label>
          選択してください：
          <select>
            {roles}
          </select>
        </label>
      </form>

    </body>
  )
}

export default App;
