using System.Xml.Linq;
using WeatherApp.Models;
using WeatherApp.Services;

public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
    }

    public async Task<List<Observation>> GetObservationsAsync(WeatherParameters parameters)
    {
        var query = WeatherApiQueryBuilder.BuildQuery(parameters);
        var response = await _httpClient.GetStringAsync($"?op_w=xml&{query}");
        var xml = XDocument.Parse(response);

        return xml.Descendants("station").Select(station => new Observation
        {
            StationId = station.Attribute("id")?.Value ?? string.Empty,
            StationName = station.Element("name")?.Value ?? string.Empty,
            ObservationTime = DateTime.TryParse(station.Element("time")?.Value, out var observationTime) ? observationTime : DateTime.MinValue,
            Temperature = double.TryParse(station.Element("T")?.Value, out var temperature) ? temperature : 0,
            WindDirection = station.Element("D")?.Value ?? string.Empty,
            WindSpeed = int.TryParse(station.Element("F")?.Value, out var windSpeed) ? windSpeed : 0,
            Link = station.Element("link")?.Value ?? string.Empty
        }).ToList();
    }

    public async Task<List<Forecast>> GetForecastsAsync(WeatherParameters parameters)
    {
        var query = WeatherApiQueryBuilder.BuildQuery(parameters);
        var response = await _httpClient.GetStringAsync($"?op_w=xml&{query}");
        var xml = XDocument.Parse(response);

        return xml.Descendants("station").Select(station => new Forecast
        {
            StationId = station.Attribute("id")?.Value ?? string.Empty,
            StationName = station.Element("name")?.Value ?? string.Empty,
            GeneratedAt = DateTime.TryParse(station.Element("atime")?.Value, out var generatedAt) ? generatedAt : DateTime.MinValue,
            Link = station.Element("link")?.Value ?? string.Empty,
            ForecastDetails = station.Descendants("forecast").Select(forecast => new ForecastDetail
            {
                ForecastTime = DateTime.TryParse(forecast.Element("ftime")?.Value, out var forecastTime) ? forecastTime : DateTime.MinValue,
                Temperature = double.TryParse(forecast.Element("T")?.Value, out var temperature) ? temperature : 0,
                WindDirection = forecast.Element("D")?.Value ?? string.Empty,
                WindSpeed = int.TryParse(forecast.Element("F")?.Value, out var windSpeed) ? windSpeed : 0,
                WeatherDescription = forecast.Element("W")?.Value ?? string.Empty
            }).ToList()
        }).ToList();
    }
}
