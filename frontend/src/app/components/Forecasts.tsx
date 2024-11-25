import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Card,
  Select,
  FormControl,
  InputLabel,
  Box,
  Chip,
  SelectChangeEvent,
  MenuItem,
  OutlinedInput,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  List,
  Collapse,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useLazyQuery } from '@apollo/client';
import { GET_FORECASTS } from '../graphql/queries/getForecasts';
import { format } from 'date-fns';
import { is } from 'date-fns/locale';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface WeatherStation {
  name: string;
  value: string;
}

interface WeatherValues {
  name: string;
  value: string;
}

interface WeatherParameters {
  type: string;
  lang: string;
  view: string;
  ids: string;
  params: string | null;
}

const Forecasts = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [params, setParams] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>('is');
  const [weatherParams, setWeatherParams] = useState<WeatherValues[]>([]);
  const [weatherStations, setWeatherStations] = useState<WeatherStation[]>([]);
  const [fetchWeather, { data, loading, error }] = useLazyQuery(GET_FORECASTS);
  const [openItems, setOpenItems] = useState<boolean[]>([]);

  const handleListClick = (index: number) => {
    setOpenItems((prevOpenItems) => {
      const newOpenItems = [...prevOpenItems];
      newOpenItems[index] = !newOpenItems[index];
      return newOpenItems;
    });
  };

  const handleFetchWeather = () => {
    const ids = locations.join(';');
    const weatherParams = params.join(';');
    const parameters: WeatherParameters = {
      type: 'forec',
      lang: language,
      view: 'xml',
      ids: ids,
      params: weatherParams ? weatherParams : null,
    };
    fetchWeather({
      variables: { parameters },
    });
  };

  const handleLocationChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setLocations(typeof value === 'string' ? value.split(';') : value);
  };

  const handleParamChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setParams(typeof value === 'string' ? value.split(';') : value);
  };

  const handleLanguageChange = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string
  ) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  useEffect(() => {
    fetch('/stations.json')
      .then((response) => response.json())
      .then((data) => setWeatherStations(data))
      .catch((error) =>
        console.error('Error fetching weather stations:', error)
      );
  }, []);

  useEffect(() => {
    fetch('/params.json')
      .then((response) => response.json())
      .then((data) => setWeatherParams(data))
      .catch((error) =>
        console.error('Error fetching weather parameters:', error)
      );
  }, []);

  useEffect(() => {
    if (data && data.forecasts) {
      setOpenItems(new Array(data.forecasts.length).fill(false));
    }
  }, [data]);

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h4">Sjálfvirkar veðurspár</Typography>
      <Grid container py={2}>
        <Box sx={{ mb: 2 }}>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={handleLanguageChange}
            aria-label="language selection"
          >
            <ToggleButton value="is" aria-label="Icelandic">
              IS
            </ToggleButton>
            <ToggleButton value="en" aria-label="English">
              EN
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <FormControl fullWidth>
          <InputLabel id="location-label">Velja stöðvanúmer *</InputLabel>
          <Select
            labelId="location-label"
            multiple
            value={locations}
            onChange={handleLocationChange}
            input={<OutlinedInput label="Velja stöðvanúmer" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      weatherStations.find((station) => station.value === value)
                        ?.name || value
                    }
                  />
                ))}
              </Box>
            )}
          >
            {weatherStations &&
              weatherStations.length > 0 &&
              weatherStations.map((station) => (
                <MenuItem key={station.value} value={station.value}>
                  {station.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="params-label">Velja mælistærðir</InputLabel>
          <Select
            labelId="params-label"
            multiple
            value={params}
            onChange={handleParamChange}
            input={<OutlinedInput label="Velja mælistærðir" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      weatherParams.find((param) => param.value === value)
                        ?.name || value
                    }
                  />
                ))}
              </Box>
            )}
          >
            {weatherParams &&
              weatherParams.length > 0 &&
              weatherParams.map((param) => (
                <MenuItem key={param.value} value={param.value}>
                  {param.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Button variant="contained" onClick={handleFetchWeather} sx={{ mt: 2 }}>
        Sækja sjálfvirkar veðurspár
      </Button>
      <Box>
        {loading && (
          <>
            <CircularProgress size="3rem" />
            <Typography variant="body1">Hleður...</Typography>
          </>
        )}
        {error && (
          <Typography variant="body1" color="error">
            Error: {error.message}
          </Typography>
        )}
        {data && data.forecasts && (
          <Box sx={{ mt: 2 }}>
            {data.forecasts.map((forecast: any, index: number) => (
              <List key={index}>
                <ListItemButton onClick={() => handleListClick(index)}>
                  <ListItemText
                    primary={forecast.stationName}
                    secondary={`Sótt: ${format(
                      new Date(forecast.generatedAt),
                      'PPPPp',
                      { locale: is }
                    )}`}
                  />
                  {openItems[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
                  {forecast.forecastDetails.map((detail: any, idx: number) => (
                    <List key={idx}>
                      <ListItemText

                        primary={format(
                          new Date(detail.forecastTime),
                          'PPPPp',
                          { locale: is }
                        )}
                      />
                      {detail.temperature !== 0 && (
                        <ListItemText
                          secondary={`Hitastig: ${detail.temperature}°C`}
                        />
                      )}
                      {detail.windDirection && (
                        <ListItemText
                          secondary={`Vindstefna: ${detail.windDirection}`}
                        />
                      )}
                      {detail.windSpeed !== 0 && (
                        <ListItemText
                          secondary={`Vindhraði:${detail.windSpeed}(m/s)`}
                        />
                      )}
                      {detail.weatherDescription && (
                        <ListItemText
                          secondary={`Lýsing: ${detail.weatherDescription}`}
                        />
                      )}
                      <Divider />
                    </List>
                  ))}
                </Collapse>
              </List>
            ))}
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default Forecasts;