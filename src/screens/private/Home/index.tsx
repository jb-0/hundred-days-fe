import React from 'react';
import { Layout } from '@ui-kitten/components';

const Home: React.FunctionComponent = () => {
  return (
    <Layout
      style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 20 }}
      testID="home-page"
    ></Layout>
  );
};

export default Home;
