import React, { useEffect, useState } from 'react';
import { initSubscriber } from './Subscriber'
import './App.css';

function App() {
  const [value, onValueChange] = useState(0)
  const [err, onErrorChange] = useState('')

  // this is passed a whole event object on message, do what you want with it 
  const onUpdate = (event) => {
    if (event.data) {
      onValueChange(event.data)
    }
  }

  const onError = (errEvent) => {
    if (errEvent) {
      onErrorChange('sse error occurred')
    }
  }

  useEffect(() => {
    const sse = initSubscriber(onUpdate, onError)
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
