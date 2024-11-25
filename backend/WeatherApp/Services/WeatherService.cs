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

        var stations = xml.Descendants("station");
        if (!stations.Any())
        {
            return new List<Observation>();
        }

        return stations.Select(station => new Observation
        {
            StationId = station.Attribute("id")?.Value ?? string.Empty,
            StationName = station.Element("name")?.Value,
            ObservationTime = DateTime.TryParse(station.Element("time")?.Value, out var observationTime) ? observationTime : DateTime.MinValue,
            Temperature = double.Parse(station.Element("T")?.Value ?? "0"),
            WindDirection = station.Element("D")?.Value,
            WindSpeed = int.Parse(station.Element("F")?.Value ?? "0"),
            Link = station.Element("link")?.Value
        }).ToList();
    }

    public async Task<List<Forecast>> GetForecastsAsync(WeatherParameters parameters)
    {
        var query = WeatherApiQueryBuilder.BuildQuery(parameters);
        var response = await _httpClient.GetStringAsync($"?op_w=xml&{query}");
        var xml = XDocument.Parse(response);

        var stations = xml.Descendants("station");
        if (!stations.Any())
        {
            return new List<Forecast>();
        }

        return stations.Select(station => new Forecast
        {
            StationId = station.Attribute("id")?.Value ?? string.Empty,
            StationName = station.Element("name")?.Value,
            GeneratedAt = DateTime.TryParse(station.Element("atime")?.Value, out var generatedAt) ? generatedAt : DateTime.MinValue,
            Link = station.Element("link")?.Value,
            ForecastDetails = station.Descendants("forecast").Select(forecast => new ForecastDetail
            {
                ForecastTime = DateTime.TryParse(forecast.Element("ftime")?.Value, out var forecastTime) ? forecastTime : DateTime.MinValue,
                Temperature = double.Parse(forecast.Element("T")?.Value ?? "0"),
                WindDirection = forecast.Element("D")?.Value,
                WindSpeed = int.Parse(forecast.Element("F")?.Value ?? "0"),
                WeatherDescription = forecast.Element("W")?.Value
            }).ToList()
        }).ToList();
    }
}
