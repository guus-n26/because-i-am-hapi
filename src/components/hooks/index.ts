/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  street?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  type?: Maybe<Living>;
};

export enum Living {
  House = 'House',
  Garden = 'Garden',
  Treehouse = 'TREEHOUSE',
}

export type Query = {
  __typename?: 'Query';
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
};

export type Subscription = {
  __typename?: 'Subscription';
  numberIncremented?: Maybe<Scalars['Int']>;
};

export type TestQueryVariables = Exact<{ [key: string]: never }>;

export type TestQuery = {
  __typename?: 'Query';
  name?: Maybe<string>;
  address?: Maybe<{ __typename?: 'Address'; street?: Maybe<string> }>;
};

export type Unnamed_1_SubscriptionVariables = Exact<{ [key: string]: never }>;

export type Unnamed_1_Subscription = {
  __typename?: 'Subscription';
  numberIncremented?: Maybe<number>;
};

export const TestDocument = gql`
  query Test {
    name
    address {
      street
    }
  }
`;

/**
 * __useTestQuery__
 *
 * To run a query within a React component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQuery(baseOptions?: Apollo.QueryHookOptions<TestQuery, TestQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TestQuery, TestQueryVariables>(TestDocument, options);
}
export function useTestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TestQuery, TestQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, options);
}
export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestQueryResult = Apollo.QueryResult<TestQuery, TestQueryVariables>;
export const Document = gql`
  subscription {
    numberIncremented
  }
`;

/**
 * __useSubscription__
 *
 * To run a query within a React component, call `useSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscription(baseOptions?: Apollo.SubscriptionHookOptions<Subscription, any>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<Subscription, any>(Document, options);
}
export type SubscriptionHookResult = ReturnType<typeof useSubscription>;
export type SubscriptionResult = Apollo.SubscriptionResult<Subscription>;
