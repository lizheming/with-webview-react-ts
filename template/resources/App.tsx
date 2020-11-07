import React, { useCallback, useEffect, useState } from 'react';

import './style.css';

declare global {
  interface Window {
    setRandomNumber: (num: number) => void
  }
}

export default function App() {
  const [num, setNum] = useState<number>(NaN);

  // call the plugin from the webview
  const onClick = useCallback(() => 
    window.postMessage('nativeLog', 'Called from the webview')
  , []);

  useEffect(() => {
    // disable the context menu (eg. the right click menu) to have a more native feel
    document.addEventListener('contextmenu', e => e.preventDefault());

    // call the webview from the plugin
    window.setRandomNumber = setNum;
  }, []);

  return (
    <>
      template
      <div>
        <button id="button" onClick={onClick}>Get a random number</button>
      </div>
      <div id="answer">
        {isNaN(num) ? null : `Random number from the plugin: ${num}`}
      </div>
    </>
  )
}