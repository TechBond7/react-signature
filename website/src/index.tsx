import { createRoot } from 'react-dom/client';
import { ExampleSignature } from './Example';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <div>
      <ExampleSignature />
  </div>,
);
