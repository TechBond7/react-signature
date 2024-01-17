react-signature
===

A signature board component for react.

## Quick Start

```bash
npm install @uiw/react-signature
```

```jsx mdx:preview
import React, { useRef } from "react";
import Signature from '@uiw/react-signature';

export default function App() {
  const $svg = useRef(null);
  const handle = (evn) => $svg.current?.clear();
  return (
    <>
      <Signature ref={$svg} />
      <button onClick={handle}>Clear</button>
    </>
  );
}
```

## Canvas

**Experimental** components

```jsx mdx:preview
import React, { useRef } from "react";
import Signature from '@uiw/react-signature';


const points = {
  "path-1": [[83.52734375,63.6015625],[83.22265625,64.02734375],[81.86328125,66.0390625],[78.69140625,70.90625],[72.76171875,80.44140625],[67.01171875,91.421875],[64.5390625,98.19921875],[63.83203125,101.25390625],[63.640625,102.5078125],[63.62109375,102.7109375],[63.96484375,102.22265625],[64.890625,100.87890625],[66.3671875,98.515625]],
  "path-2": [[116.5546875,65.8359375],[117.3125,65.8359375],[119.23046875,65.90625],[122.078125,66.39453125],[125.44140625,67.51171875],[128.33203125,69.2421875],[130.6484375,71.53515625],[131.94140625,73.6796875],[132.28125,75.65234375],[132.0625,77.5],[130.33203125,79.78125],[126.4921875,83.24609375],[120.9375,87.5234375],[114.859375,91.13671875],[108.09765625,93.66796875],[101.8359375,94.7734375],[96.26953125,94.7734375],[92.23828125,94.90625],[89.94921875,94.96484375],[88.234375,95.04296875],[88.03515625,95.08984375],[89.6015625,95.4296875],[94.75,96.640625],[107.55859375,98.640625],[123.6171875,100.09375],[135.5546875,100.734375],[141.140625,101.03515625],[142.2578125,101.08984375]]
}

export default function App() {
  const $canvas = useRef(null);
  const handle = (evn) => $canvas.current?.clear();
  return (
    <>
      <Signature ref={$canvas} width="450" height="230" defaultPoints={points} />
      <br />
      <button onClick={handle}>Clear</button>
    </>
  );
}
```
