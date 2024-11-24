using WeatherApp.Models;

namespace WeatherApp.Services
{
    public class WeatherApiQueryBuilder
    {
        private static readonly HashSet<string> ValidLanguages = new() { "is", "en" };
        private static readonly HashSet<string> ValidViews = new() { "xml", "rss", "csv" };
        private static readonly HashSet<string> ObsTimes = new() { "1h", "3h" };
        private static readonly HashSet<string> ForecTimes = new() { "3h", "6h" };

        public static string BuildQuery(WeatherParameters parameters)
        {
            // Validate common fields
            if (!ValidLanguages.Contains(parameters.Lang))
                throw new ArgumentException("Invalid language. Allowed values are 'is', 'en'.");
            if (!ValidViews.Contains(parameters.View))
                throw new ArgumentException("Invalid view. Allowed values are 'xml', 'rss', 'csv'.");

            var query = $"type={parameters.Type}&lang={parameters.Lang}&view={parameters.View}";

            // Add type-specific rules
            switch (parameters.Type)
            {
                case "obs":
                    if (string.IsNullOrEmpty(parameters.Ids))
                        throw new ArgumentException("'ids' is required for type 'obs'.");
                    query += $"&ids={parameters.Ids}";

                    if (!string.IsNullOrEmpty(parameters.Params))
                        query += $"&params={parameters.Params}";

                    if (!string.IsNullOrEmpty(parameters.Time))
                    {
                        if (!ObsTimes.Contains(parameters.Time))
                            throw new ArgumentException("Invalid 'time' for type 'obs'. Allowed values are '1h', '3h'.");
                        query += $"&time={parameters.Time}";
                    }

                    if (!string.IsNullOrEmpty(parameters.Anytime))
                    {
                        if (parameters.Anytime != "0" && parameters.Anytime != "1")
                            throw new ArgumentException("Invalid 'anytime'. Allowed values are '0', '1'.");
                        query += $"&anytime={parameters.Anytime}";
                    }
                    break;

                case "forec":
                    if (string.IsNullOrEmpty(parameters.Ids))
                        throw new ArgumentException("'ids' is required for type 'forec'.");
                    query += $"&ids={parameters.Ids}";

                    if (!string.IsNullOrEmpty(parameters.Params))
                        query += $"&params={parameters.Params}";

                    if (!string.IsNullOrEmpty(parameters.Time))
                    {
                        if (!ForecTimes.Contains(parameters.Time))
                            throw new ArgumentException("Invalid 'time' for type 'forec'. Allowed values are '3h', '6h'.");
                        query += $"&time={parameters.Time}";
                    }
                    break;

                case "txt":
                    if (string.IsNullOrEmpty(parameters.Ids))
                        throw new ArgumentException("'ids' is required for type 'txt'.");
                    query += $"&ids={parameters.Ids}";
                    break;

                case "forec-info":
                    // No additional parameters needed
                    break;

                default:
                    throw new ArgumentException("Invalid 'type'.");
            }

            return query;
        }
    }

}
