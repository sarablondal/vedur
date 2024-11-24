namespace WeatherApp.Models
{
public class Forecast
{
        
    public required string StationId { get; set; }
    public string? StationName { get; set; }
    public required DateTime GeneratedAt { get; set; }
    public List<ForecastDetail>? ForecastDetails { get; set; } = new();
    public string? Link { get; set; }
}

public class ForecastDetail
{
    public DateTime? ForecastTime { get; set; }
    public double? Temperature { get; set; }
    public string? WindDirection { get; set; }
    public int? WindSpeed { get; set; }
    public string? WeatherDescription { get; set; }
}

}
