import React, { useState, useEffect } from 'react';

function tossCoin() {
  return Math.random() > 0.5 ? "heads" : "tails";
}

function fiveHeads() {
  return new Promise((resolve, reject) => {
    let headsCount = 0;
    let attempts = 0;

    const interval = setInterval(() => {
      attempts++;
      let result = tossCoin();
      console.log(`${result} was flipped`);

      if (result === "heads") {
        headsCount++;
        if (headsCount === 5) {
          clearInterval(interval);
          resolve(`It took ${attempts} tries to flip five "heads"`);
        }
      } else {
        headsCount = 0;
      }

      if (attempts > 100) {
        clearInterval(interval);
        reject(new Error("Too many attempts"));
      }
    }, 0);
  });
}

function CoinFlipComponent() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fiveHeads()
      .then((res) => setResult(res))
      .catch((err) => setError(err));
  }, []);

  return (
    <div>
      {result ? (
        <p>{result}</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Flipping the coin...</p>
      )}
    </div>
  );
}

export default CoinFlipComponent;