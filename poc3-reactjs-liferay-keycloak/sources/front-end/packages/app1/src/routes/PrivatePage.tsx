import React from 'react';
// This will works well in monorepo configuration but not in multi repo
import '../../../app2/build/static/js/bundle.js';

const PrivatePage: React.FC = () => {

  return (
    <div>
      <h1>Private Page</h1>
      <app2-docker-example/>
    </div>
  );
};

export default PrivatePage;
