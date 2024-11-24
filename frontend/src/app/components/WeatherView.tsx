import Forecasts from './Forecasts';
import Grid from '@mui/material/Grid2';

const WeatherView = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={6}>
        <Forecasts/>
      </Grid>
  </Grid>
  )
};

export default WeatherView;