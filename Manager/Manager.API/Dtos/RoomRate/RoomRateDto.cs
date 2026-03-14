namespace Manager.API.Dtos.RoomRate
{
    public class RoomRateDto
    {
        public int Id { get; set; }
        public int RoomTypeId { get; set; }
        public string RentType { get; set; }
        public decimal Price { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
