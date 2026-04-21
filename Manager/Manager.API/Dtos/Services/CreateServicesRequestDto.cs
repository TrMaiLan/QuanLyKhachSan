namespace Manager.API.Dtos.Services
{
    public class CreateServicesRequestDto
    {
        public string ServiceType { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string unit { get; set; }
    }
}
