export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  Treehouse = 'TREEHOUSE'
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
