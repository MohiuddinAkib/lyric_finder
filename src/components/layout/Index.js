import React from 'react';
import Tracks from '../tracks/Tracks';
import Search from '../tracks/Search';

const Index = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Search />
      </section>
      <section className="section">
        <Tracks />
      </section>
    </React.Fragment>
  );
};

export default Index;
