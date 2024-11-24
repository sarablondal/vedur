using WeatherApp.Models;

public class Query
{
    public async Task<IEnumerable<Forecast>> GetForecasts([Service] IWeatherService weatherService, WeatherParameters parameters)
    {
        return await weatherService.GetForecastsAsync(parameters);
    }

    public async Task<IEnumerable<Observation>> GetObservations([Service] IWeatherService weatherService, WeatherParameters parameters)
    {
        return await weatherService.GetObservationsAsync(parameters);
    }
}