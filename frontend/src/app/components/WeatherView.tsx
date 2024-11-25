import Forecasts from './Forecasts';
import Observations from './Observations';
import Grid from '@mui/material/Grid2';

const WeatherView = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={6}>
        <Forecasts/>
      </Grid>
      <Grid size={6}>
        <Observations/>
      </Grid>
  </Grid>
  )
};

export default WeatherView;