import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Test {
    name
  }
`;

function App() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <h1>{`Tester der test er de test nog een keer ${data.name}`}</h1>;
}

export default App;
