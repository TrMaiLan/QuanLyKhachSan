namespace Manager.API.Models
{
    public class Rooms
    {
        public int Id { get; set; }
        public string RoomNumber { get; set; }
        public int RoomTypeId { get; set; }
        public string CurrentStatus { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.Now;

        // Navigation
        public RoomType RoomType { get; set; }
    }
}