using Microsoft.AspNetCore.Mvc;
using WeatherApp.Models;

[ApiController]
[Route("api/weather")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;

    public WeatherController(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet("forecasts")]
    public async Task<IActionResult> GetForecasts([FromQuery] WeatherParameters parameters)
    {
        try
        {
            var forecasts = await _weatherService.GetForecastsAsync(parameters);
            return Ok(forecasts);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message); // Handle validation errors
        }
    }

    [HttpGet("observations")]
    public async Task<IActionResult> GetObservations([FromQuery] WeatherParameters parameters)
    {
        try
        {
            var observations = await _weatherService.GetObservationsAsync(parameters);
            return Ok(observations);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message); // Handle validation errors
        }
    }
}
