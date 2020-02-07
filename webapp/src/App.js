import React, { useEffect, useState } from 'react';
import { initSubscriber } from './Subscriber'
import './App.css';

function App() {
  const [value, onUpdate] = useState(0)
  const [err, onError] = useState('')
  useEffect(() => {
    const sse = initSubscriber('http://localhost:4000/streaming', onUpdate, onError)
    return () => {
      sse.close()
    }
  }, [])
  if (err) {
    return err
  }
  return (
    <div className="App">
      TEST: {value}
    </div>
  );
}

export default App;
