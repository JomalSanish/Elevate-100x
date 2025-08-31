import './App.css'
import { useState } from 'react'

function App() {
  const [array, setArray] = useState([]);
  const [input, setInput] = useState('');
  const [mid, setMid] = useState(null);

  function generateRandomArray() {
    // generate 10 two digit random numbers
    const randomArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    randomArr.sort((a, b) => a - b);
    setArray(randomArr  );
    setMid(null)
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function findBinary() {
    if (!input.trim()) {
      alert("Enter a number");
      return;
    }

    const target = Number(input);

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      setMid(mid);
      await sleep(1000);
      if (array[mid] === target) {
        alert(`Found ${target} at index ${mid}`);
        setInput('');
        return;
      } else if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    alert(`${target} not found in array.`);
    setInput('');
  }

  return (
    <div>
      <h2>Binary Search in Random Array</h2>
      <button onClick={generateRandomArray}>Generate Random Array</button>
      <div>
        <h3>Array:</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {array.map((num, index) => (
            <span
              key={index}
              style={{
                padding: '5px 10px',
                backgroundColor: mid === null ? 'black': index === mid ? 'red' : index < mid ? 'green' : index > mid ? 'blue' : 'black', color: 'white', border: '1px solid white', borderRadius: '5px',
              }}
            >
              {num}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number to search"
        />
        <button onClick={findBinary}>Find</button>
      </div>
    </div>
  );
}

export default App;
