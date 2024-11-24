import { gql } from '@apollo/client';

export const GET_OBSERVATIONS = gql`
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