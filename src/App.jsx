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
    <p key={g.id}>{g.name}</p>
  )

  return test
}

function App() {
  const extraInfo = master[0].roles;

  const roles = extraInfo.map(role =>
    <option key={role.code}>{role.job}</option>
  )

  return(
    <>
      <header>
        <h1>ようこそ</h1>
      </header>
    
      <body class="border-2 rounded-sm w-40 h-100">
        <Side_bar />
          <form>
            <label>
              選択してください：
              <select>
                {roles}
              </select>
            </label>
          </form>
      </body>
    </>
  )
}

export default App;
