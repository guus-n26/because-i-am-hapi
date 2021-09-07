import { gql, useSubscription } from '@apollo/client';
import React from 'react';

import { useTestQuery } from './hooks';

const COMMENTS_SUBSCRIPTION = gql`
  subscription {
    numberIncremented
  }
`;

function App() {
  const { loading, error, data } = useTestQuery({});
  const stuff = useSubscription(COMMENTS_SUBSCRIPTION);
  // const { data: subscriptionData } = useSubscription({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1>{`Tester der test er de test nog een keer ${(data?.name, data?.address?.street)}`}</h1>
      <h2>{stuff?.data?.numberIncremented}</h2>
    </>
  );
}

export default App;
