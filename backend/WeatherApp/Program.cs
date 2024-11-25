using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.OpenApi.Models;
using HotChocolate.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin() // Allow all origins (not recommended for production)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddControllers(); // Enable controllers for the API

// Validate the base URL configuration
var baseUrl = builder.Configuration["WeatherApi:BaseUrl"];
if (string.IsNullOrWhiteSpace(baseUrl))
{
    throw new InvalidOperationException("Base URL for Weather API is not configured properly.");
}

// Register WeatherService and configure HttpClient
builder.Services.AddHttpClient<IWeatherService, WeatherService>(client =>
{
    client.BaseAddress = new Uri(baseUrl); 
});

// Register Swagger services for API documentation
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "WeatherApp API",
        Version = "v1",
        Description = "An API to fetch weather data from Vedur.is",
    });
});

// Register health checks
builder.Services.AddHealthChecks()
    .AddCheck("WeatherAPI", () => new HealthCheckResult(HealthStatus.Healthy));

// Register GraphQL services
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

var app = builder.Build();

// Use CORS policy
app.UseCors("AllowAllOrigins");

// Use Swagger for API documentation
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "WeatherApp API v1");
});

// Use GraphQL
app.UseRouting();
app.MapControllers();
app.MapGraphQL(); // Map GraphQL endpoint
app.MapHealthChecks("/health");

app.Run();