import React from 'react';

const PublicPage: React.FC = () => {

  return (
    <div>
      <h3>Public Page</h3>
      <nav>
        <a href="#/dashboard">Go to Dashboard</a>
      </nav>
      <div>
        <h4>Hello</h4>
        <ul>
          <li>I'm defined has standard React</li>
        </ul>
      </div>    
    </div>
  );
};

export default PublicPage;
