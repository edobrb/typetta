import BigNumber from "bignumber.js";
import {Coordinates} from "@twinlogix/tl-commons";
import {LocalizedString} from "@twinlogix/tl-commons";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  Coordinates: Coordinates;
  Decimal: BigNumber;
  JSON: any;
  LocalizedString: LocalizedString;
  Password: string;
};

export type Address = {
  __typename?: 'Address';
  cities?: Maybe<Array<City>>;
  id: Scalars['ID'];
};

export type City = {
  __typename?: 'City';
  addressId: Scalars['String'];
  computedAddressName?: Maybe<Scalars['String']>;
  computedName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Device = {
  __typename?: 'Device';
  id: Scalars['ID'];
  name: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
};

export type Organization = {
  __typename?: 'Organization';
  address?: Maybe<Address>;
  computedName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  vatNumber?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  amount?: Maybe<Scalars['Decimal']>;
  amounts?: Maybe<Array<Scalars['Decimal']>>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  localization?: Maybe<Scalars['Coordinates']>;
  title?: Maybe<Scalars['LocalizedString']>;
  usernamePasswordCredentials?: Maybe<UsernamePasswordCredentials>;
};

export type UsernamePasswordCredentials = {
  __typename?: 'UsernamePasswordCredentials';
  password: Scalars['Password'];
  username: Scalars['String'];
};