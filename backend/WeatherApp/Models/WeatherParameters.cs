using System.ComponentModel.DataAnnotations;
namespace WeatherApp.Models
{
    public class WeatherParameters
    {            
        [Required]
        [RegularExpression("obs|forec", ErrorMessage = "Type must be 'obs' or 'forec'")]
        public string Type { get; set; } = "obs"; 
        [Required]
        [RegularExpression("is|en", ErrorMessage = "Lang must be 'is' or 'en'")]
        public string Lang { get; set; } = "is"; 
        [Required]
        [RegularExpression("xml|rss|csv", ErrorMessage = "View must be 'xml', 'rss', or 'csv'")]
        public string View { get; set; } = "xml"; 
        public string? Ids { get; set; } // Use stations.json file to make an object with all different station in the future
        public string? Params { get; set; } // Use params.json values to make an object with code and description in the future
        [RegularExpression("1h|3h|6h", ErrorMessage = "Time can only be '1h' or '3h' for type obs , or '3h' or '6h' for forec")]
        public string? Time { get; set; }    
        [RegularExpression("0|1", ErrorMessage = "Anytime must be '0' or '1'")]             
        public string? Anytime { get; set; } // Optional (only for type "obs") can be 0 or 1
    }

}
