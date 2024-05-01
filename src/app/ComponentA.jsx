// ComponentA.js
"use client"

import React, { useState } from "react";
import ComponentB from "./ComponentB";

const ComponentA = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Component B</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <ComponentB/>
    </div>
  );
};

export default ComponentA;
