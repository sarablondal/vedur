using WeatherApp.Models;

public interface IWeatherService
{
    Task<List<Observation>> GetObservationsAsync(WeatherParameters parameters);
    Task<List<Forecast>> GetForecastsAsync(WeatherParameters parameters);
}