import * as React from 'react';
import { Layout, Spinner } from '@ui-kitten/components';

const SpinningLoader: React.FunctionComponent = () => {
  return (
    <Layout style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <Spinner size="small" testID="spinning-loader" />
    </Layout>
  );
};

export default SpinningLoader;
