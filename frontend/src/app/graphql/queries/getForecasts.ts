import { gql } from '@apollo/client';

export const GET_FORECASTS = gql`
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