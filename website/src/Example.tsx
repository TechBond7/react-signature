import { useRef, useState } from 'react';
import Signature, { defaultOptions, type StrokeOptions, type SignatureRef, useStore } from './core/src/index';
import copyTextToClipboard from '@uiw/copy-to-clipboard';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 4px;
  flex: 1;
`;

export const ExampleSignature = () => {
  const $svg = useRef<SignatureRef>(null);
  const [options, setOptions] = useState<StrokeOptions>(defaultOptions);
  const [undoPaths, setUndoPaths] = useState<SVGPathElement[]>([])
  const [fillColor, setFillColor] = useState('#000000');
  const handle = (evn: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    while ($svg.current?.svg?.lastChild) {
      $svg.current.svg.lastChild.remove();
    }
  };

  const resetOption = () => setOptions(defaultOptions);
  const handleCopy = () => copyTextToClipboard(JSON.stringify(options, null, 2));
  const handleSVGCopy = () => {
    const svgelm = $svg.current?.svg?.cloneNode(true) as SVGSVGElement;
    const clientWidth = $svg.current?.svg?.clientWidth;
    const clientHeight = $svg.current?.svg?.clientHeight;
    svgelm.removeAttribute('style');
    svgelm.setAttribute('width', `${clientWidth}px`);
    svgelm.setAttribute('height', `${clientHeight}px`);
    svgelm.setAttribute('viewbox', `${clientWidth} ${clientHeight}`);
    copyTextToClipboard(svgelm.outerHTML);
  };

  const handleUndo = () => {
    $svg.current?.svg?.lastChild!.remove();
  }

  const downloadImage = () => {
    const svgelm = $svg.current?.svg?.cloneNode(true) as SVGSVGElement;
    const clientWidth = $svg.current?.svg?.clientWidth;
    const clientHeight = $svg.current?.svg?.clientHeight;
    svgelm.removeAttribute('style');
    svgelm.setAttribute('width', `${clientWidth}px`);
    svgelm.setAttribute('height', `${clientHeight}px`);
    svgelm.setAttribute('viewbox', `${clientWidth} ${clientHeight}`);
    const data = new XMLSerializer().serializeToString(svgelm);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = clientWidth || 0;
      canvas.height = clientHeight || 0;
      ctx?.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.download = 'signature.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(data)))}`;
  };

  return (
    <Wrapper>
      <Signature
        style={{ borderRadius: 5, height: 210, border: '1px solid var(--color-border-default, #30363d)' }}
        ref={$svg}
        options={options}
        fill={fillColor}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.51rem', paddingTop: '0.46rem' }}>
        <button onClick={handle}>Clear</button>
        <button onClick={resetOption}>Reset Options</button>
        <button onClick={handleCopy}>Copy Options</button>
        <button onClick={handleSVGCopy}>Copy to SVG</button>
        <button onClick={downloadImage}>Download Image</button>
        <button onClick={handleUndo}>Undo</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem' }}>
        <label>
          <div>Size: {options.size}</div>
          <input
            type="range"
            value={options.size}
            max={50}
            min={1}
            onChange={(evn) => {
              setOptions({
                ...options,
                size: Number(evn.target.value),
              });
            }}
          />
        </label>
        <label>
          <div>Smoothing: {options.smoothing}</div>
          <input
            type="range"
            value={options.smoothing}
            max={0.99}
            min={-0.99}
            step={0.01}
            onChange={(evn) => {
              setOptions({
                ...options,
                smoothing: Number(evn.target.value),
              });
            }}
          />
        </label>
        <label>
          <div>Thinning: {options.thinning}</div>
          <input
            type="range"
            value={options.thinning}
            max={0.99}
            min={-0.99}
            step={0.01}
            onChange={(evn) => {
              setOptions({
                ...options,
                thinning: Number(evn.target.value),
              });
            }}
          />
        </label>
        <label>
          <div>Streamline: {options.streamline}</div>
          <input
            type="range"
            value={options.streamline}
            max={0.99}
            min={0.01}
            step={0.01}
            onChange={(evn) => {
              setOptions({
                ...options,
                streamline: Number(evn.target.value),
              });
            }}
          />
        </label>
        <label>
          <div>Color: {fillColor}</div>
          <input
            type="color"
            value={fillColor}
            onChange={(evn) => {
              setFillColor(evn.target.value);
            }}
          />
        </label>
      </div>
    </Wrapper>
  );
};
