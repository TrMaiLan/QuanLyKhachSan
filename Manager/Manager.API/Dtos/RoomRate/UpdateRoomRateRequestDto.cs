namespace Manager.API.Dtos.RoomRate
{
    public class UpdateRoomRateRequestDto
    {
        public string RentType { get; set; }
        public decimal Price { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsActive { get; set; }
    }
}
