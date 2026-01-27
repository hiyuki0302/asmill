import { useState } from "react";

function App() {
  const item = [{id: 0, name:'Apple'}, {id: 1, name:'Banana'}, {id: 2, name:'Cherry'}, {id: 3, name:'Date'}, {id: 4, name:'Elderberry'}];
 
  const SelectItems = item.map(a => 
        <option key={a.id}>{a.name}</option>
    );

  return(
    <div>
      <select>
        {SelectItems}
      </select>
    </div>
  )
}

export default App;
