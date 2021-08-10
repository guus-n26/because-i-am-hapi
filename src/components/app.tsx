import { useQuery } from "@apollo/client";
import React from "react";
import { Query } from "../@types/schema";
import TestQuery from "./query.graphql";

function App() {
  const { loading, error, data } = useQuery<Query>(TestQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <h1>{`Tester der test er de test nog een keer ${
      (data?.name, data?.address?.street)
    }`}</h1>
  );
}

export default App;
