import { useState } from "react";

function App() {
  const item = [{id: 0, name:'Apple'}, {id: 1, name:'Banana'}, {id: 2, name:'Cherry'}, {id: 3, name:'Date'}, {id: 4, name:'Elderberry'}];
 
  // testtext
  const SelectItems = item.map(a => 
        <option key={a.id}>{a.name}</option>
    );

  return(
    <div>
      <label>
        フルーツを選んでください。
        <select>
          {SelectItems}
        </select>
      </label>
    </div>
  )
}

export default App;
