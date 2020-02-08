import React, { useEffect, useState } from 'react';
import { initSubscriber } from './Subscriber'
import './App.css';

const CUSTOM_LISTENERS = [{
  type: 'custom',
  func: (event) => console.log('custom event handled', event)
}]

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
    const sse1 = initSubscriber(onUpdate, onError, 'http://localhost:4000/custom-streaming', CUSTOM_LISTENERS)
    return () => {
      sse.close()
      sse1.close()
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
