import React from 'react';
import { CommonComponent } from 'common-components';

const App: React.FC = () => (
  <div>
    <h2>Hello from APP2</h2>
    <ul>
      <li>{CommonComponent()}</li>
      <li>I'm defined has a Web Component designed to be used in another application</li>
    </ul>
  </div>
);

export default App;