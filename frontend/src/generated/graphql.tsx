import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Forecast = {
  __typename?: 'Forecast';
  forecastDetails?: Maybe<Array<ForecastDetail>>;
  generatedAt: Scalars['DateTime']['output'];
  link?: Maybe<Scalars['String']['output']>;
  stationId: Scalars['String']['output'];
  stationName?: Maybe<Scalars['String']['output']>;
};

export type ForecastDetail = {
  __typename?: 'ForecastDetail';
  forecastTime?: Maybe<Scalars['DateTime']['output']>;
  temperature?: Maybe<Scalars['Float']['output']>;
  weatherDescription?: Maybe<Scalars['String']['output']>;
  windDirection?: Maybe<Scalars['String']['output']>;
  windSpeed?: Maybe<Scalars['Int']['output']>;
};

export type Observation = {
  __typename?: 'Observation';
  link?: Maybe<Scalars['String']['output']>;
  observationTime: Scalars['DateTime']['output'];
  stationId: Scalars['String']['output'];
  stationName?: Maybe<Scalars['String']['output']>;
  temperature?: Maybe<Scalars['Float']['output']>;
  windDirection?: Maybe<Scalars['String']['output']>;
  windSpeed?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  forecasts: Array<Forecast>;
  observations: Array<Observation>;
};


export type QueryForecastsArgs = {
  parameters: WeatherParametersInput;
};


export type QueryObservationsArgs = {
  parameters: WeatherParametersInput;
};

export type WeatherParametersInput = {
  anytime?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Scalars['String']['input']>;
  lang: Scalars['String']['input'];
  params?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  view: Scalars['String']['input'];
};

export type GetForecastsQueryVariables = Exact<{
  parameters: WeatherParametersInput;
}>;


export type GetForecastsQuery = { __typename?: 'Query', forecasts: Array<{ __typename?: 'Forecast', stationId: string, stationName?: string | null, generatedAt: any, link?: string | null, forecastDetails?: Array<{ __typename?: 'ForecastDetail', forecastTime?: any | null, temperature?: number | null, windDirection?: string | null, windSpeed?: number | null, weatherDescription?: string | null }> | null }> };

export type GetObservationsQueryVariables = Exact<{
  parameters: WeatherParametersInput;
}>;


export type GetObservationsQuery = { __typename?: 'Query', observations: Array<{ __typename?: 'Observation', stationId: string, stationName?: string | null, observationTime: any, temperature?: number | null, windDirection?: string | null, windSpeed?: number | null, link?: string | null }> };


export const GetForecastsDocument = gql`
    query GetForecasts($parameters: WeatherParametersInput!) {
  forecasts(parameters: $parameters) {
    stationId
    stationName
    generatedAt
    link
    forecastDetails {
      forecastTime
      temperature
      windDirection
      windSpeed
      weatherDescription
    }
  }
}
    `;

/**
 * __useGetForecastsQuery__
 *
 * To run a query within a React component, call `useGetForecastsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForecastsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForecastsQuery({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useGetForecastsQuery(baseOptions: Apollo.QueryHookOptions<GetForecastsQuery, GetForecastsQueryVariables> & ({ variables: GetForecastsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetForecastsQuery, GetForecastsQueryVariables>(GetForecastsDocument, options);
      }
export function useGetForecastsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetForecastsQuery, GetForecastsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetForecastsQuery, GetForecastsQueryVariables>(GetForecastsDocument, options);
        }
export function useGetForecastsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetForecastsQuery, GetForecastsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetForecastsQuery, GetForecastsQueryVariables>(GetForecastsDocument, options);
        }
export type GetForecastsQueryHookResult = ReturnType<typeof useGetForecastsQuery>;
export type GetForecastsLazyQueryHookResult = ReturnType<typeof useGetForecastsLazyQuery>;
export type GetForecastsSuspenseQueryHookResult = ReturnType<typeof useGetForecastsSuspenseQuery>;
export type GetForecastsQueryResult = Apollo.QueryResult<GetForecastsQuery, GetForecastsQueryVariables>;
export const GetObservationsDocument = gql`
    query GetObservations($parameters: WeatherParametersInput!) {
  observations(parameters: $parameters) {
    stationId
    stationName
    observationTime
    temperature
    windDirection
    windSpeed
    link
  }
}
    `;

/**
 * __useGetObservationsQuery__
 *
 * To run a query within a React component, call `useGetObservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetObservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetObservationsQuery({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useGetObservationsQuery(baseOptions: Apollo.QueryHookOptions<GetObservationsQuery, GetObservationsQueryVariables> & ({ variables: GetObservationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetObservationsQuery, GetObservationsQueryVariables>(GetObservationsDocument, options);
      }
export function useGetObservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetObservationsQuery, GetObservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetObservationsQuery, GetObservationsQueryVariables>(GetObservationsDocument, options);
        }
export function useGetObservationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetObservationsQuery, GetObservationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetObservationsQuery, GetObservationsQueryVariables>(GetObservationsDocument, options);
        }
export type GetObservationsQueryHookResult = ReturnType<typeof useGetObservationsQuery>;
export type GetObservationsLazyQueryHookResult = ReturnType<typeof useGetObservationsLazyQuery>;
export type GetObservationsSuspenseQueryHookResult = ReturnType<typeof useGetObservationsSuspenseQuery>;
export type GetObservationsQueryResult = Apollo.QueryResult<GetObservationsQuery, GetObservationsQueryVariables>;