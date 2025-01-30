import React from 'react';
import { StyledBox } from 'common-components';


const App: React.FC = () => (
  <StyledBox borderColor="blue" bgColor="#e0f7fa" headerColor="blue" textColor="blue">
    <h2>Hello from APP2</h2>
    <ul>
      <li>I'm defined has a Web Component designed to be used in another application</li>
    </ul>
  </StyledBox>
);

export default App;