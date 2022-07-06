import './App.css';
import { Pin } from './Components/Pin';
import { useState } from 'react';

function App() {
  const [PinInput, setPinInput] = useState([]);
  return (
    <div className="App">
     <Pin
     length={4}
     setPinInput={setPinInput}
     />
     <h3>The OTP is: {PinInput}</h3>
    </div>
  );
}

export default App;
