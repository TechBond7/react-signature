import { createRoot } from 'react-dom/client';
import { ExampleSignature } from './Example';
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <div id="signature-pad">
      <ExampleSignature />
  </div>,
);
