namespace Manager.API.Dtos.Services
{
    public class ServicesDto
    {
        public int Id { get; set; }
        public string ServiceType { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string unit { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
