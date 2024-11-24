namespace WeatherApp.Models
{
    public class Observation
    {
        public required string StationId { get; set; }
        public string? StationName { get; set; }
        public required DateTime ObservationTime { get; set; }
        public double? Temperature { get; set; }
        public string? WindDirection { get; set; }
        public int? WindSpeed { get; set; }
        public string? Link { get; set; }
    }

}
