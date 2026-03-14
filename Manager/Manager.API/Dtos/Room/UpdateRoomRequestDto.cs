namespace Manager.API.Dtos.Room
{
    public class UpdateRoomRequestDto
    {
        public string RoomNumber { get; set; }
        public int RoomTypeId { get; set; }
        public string CurrentStatus { get; set; }
    }
}
