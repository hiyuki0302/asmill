import { useState } from "react";
import {master} from './master_data.js';
import React from "react";
import './demo.css'

function Side_bar() {
  const groups = [
    { id: '01', name: 'SideMenu01', icon: '✒️'},
    { id: '02', name: 'SideMenu02', icon: '✒️'}
  ]
  
  const test = groups.map(g => 
    <li class="hover:underline" key={g.id}>{g.name}</li>
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
      <header class="flex items-center justify-between bg-gray-800 text-white">
        <h1 class="text-2xl font-bold">Title</h1>
        <nav>
          <ul class="flex gap-6">
            <li><a href="#" className="hover:underline">menu1</a></li>
            <li><a href="#" className="hover:underline">menu2</a></li>
            <li><a href="#" className="hover:underline">menu3</a></li>
          </ul>
        </nav>
      </header>

      <div class="flex h-screen">
        <aside class="bg-sky-200/50 w-30">
            <ul>
              <Side_bar />
            </ul>
        </aside>

        <main class="border-l-1 border-slate-100/50 w-40">
          <label class="ml-2">
            Select:
            <select>
              {roles}
            </select>
          </label>
        </main>
      </div>
    </>
  )
}

export default App;
