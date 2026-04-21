namespace Manager.API.Models
{
    public class RoomType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Capacity { get; set; }
        public string Description { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.Now;

        // Navigation
        public ICollection<Rooms> Rooms { get; set; }
        public ICollection<RoomRate> RoomRates { get; set; }
    }
}