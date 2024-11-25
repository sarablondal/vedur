import { useState, useEffect } from 'react';
import { Button, Typography, Card, Select, FormControl, InputLabel, Box, Chip, SelectChangeEvent, MenuItem, OutlinedInput, IconButton, CircularProgress, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useLazyQuery } from '@apollo/client';
import { GET_OBSERVATIONS } from '../graphql/queries/getObservations';

// Define the type for weather stations and parameters
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
    params: string;
}

const Observations = () => {
    const [locations, setLocations] = useState<string[]>([]);
    const [params, setParams] = useState<string[]>([]);
    const [language, setLanguage] = useState<string>('is');
    const [weatherParams, setWeatherParams] = useState<WeatherValues[]>([]);
    const [weatherStations, setWeatherStations] = useState<WeatherStation[]>([]);
    const [fetchObservations, { data, loading, error }] = useLazyQuery(GET_OBSERVATIONS);

    const handleFetchWeather = () => {
        const ids = locations.join(';');
        const weatherParams = params.join(';');
        const parameters: WeatherParameters = {
            type: 'obs',
            lang: language,
            view: 'xml',
            ids: ids,
            params: weatherParams,
        };
        fetchObservations({
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

    const handleLanguageChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
        if (newLanguage !== null) {
            setLanguage(newLanguage);
        }
    };

    // TODO: Færa í sameiginlegan component fyrir bæði observations og forecasts
    // Fetch weather stations from the JSON file
    useEffect(() => {
        fetch('/stations.json')
            .then(response => response.json())
            .then(data => setWeatherStations(data))
            .catch(error => console.error('Error fetching weather stations:', error));
    }, []);

    // Fetch params for the weather query
    useEffect(() => {
        fetch('/params.json')
            .then(response => response.json())
            .then(data => setWeatherParams(data))
            .catch(error => console.error('Error fetching weather parameters:', error));
    }, []);

    return (
        <Card sx={{ p: 2 }}>
            <Typography variant="h4">Veðurathuganir</Typography>
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
                                    <Chip key={value} label={weatherStations.find(station => station.value === value)?.name || value} />
                                ))}
                            </Box>
                        )}
                    >
                        {weatherStations && weatherStations.length > 0 && weatherStations.map((station) => (
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
                                    <Chip key={value} label={weatherParams.find(param => param.value === value)?.name || value} />
                                ))}
                            </Box>
                        )}
                    >
                        {weatherParams && weatherParams.length > 0 && weatherParams.map((param) => (
                            <MenuItem key={param.value} value={param.value}>
                                {param.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Button
                variant="contained"
                onClick={handleFetchWeather}
                sx={{ mt: 2 }}
            >
                Sækja veðurathuganir
            </Button>
            <Box>
                {loading && (
                    <>
                        <CircularProgress size='3rem' />
                        <Typography variant="body1">Hleður...</Typography>
                    </>
                )}
                {error && <Typography variant="body1" color="error">Error: {error.message}</Typography>}
                {data && data.observations && (
                    <Box sx={{ mt: 2 }}>
                        <div>
                            {data.observations.map((observation: any, index: number) => (
                                <div key={index}>
                                    <h3>{observation.stationName}</h3>
                                    <p>Time: {observation.time}</p>
                                    <p>Temperature: {observation.temperature}</p>
                                    <p>Wind Speed: {observation.windSpeed}</p>
                                    <p>Wind Direction: {observation.windDirection}</p>
                                    <p>Humidity: {observation.humidity}</p>
                                    <p>Pressure: {observation.pressure}</p>
                                </div>
                            ))}
                        </div>
                    </Box>
                )}
            </Box>
        </Card>
    );
};

export default Observations;
