import React from 'react';
import { CommonComponent } from 'common-components';

const App: React.FC = () => (
  <div>
    <h1>Hello from APP1</h1>
    <ul>
      <li>{CommonComponent()}</li>
      <li>I'm defined has standard React</li>
    </ul>
  </div>
);

export default App;