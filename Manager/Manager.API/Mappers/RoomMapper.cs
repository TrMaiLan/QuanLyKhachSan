using Manager.API.Dtos.Room;
using Manager.API.Models;

namespace Manager.API.Mappers
{
    public static class RoomMapper
    {

        public static RoomDto ToRoomDto(this Rooms room)
        {
            return new RoomDto
            {
                Id = room.Id,
                RoomNumber = room.RoomNumber,
                RoomTypeId = room.RoomTypeId,
                CurrentStatus = room.CurrentStatus,
                CreateAt = room.CreateAt,
                UpdateAt = room.UpdateAt
            };
        }

        public static Rooms ToCreateRoomDto(this CreateRoomRequestDto roomDto)
        {
            return new Rooms
            {
                RoomNumber = roomDto.RoomNumber,
                CurrentStatus = roomDto.CurrentStatus,
                CreateAt = DateTime.Now,
            };
        }
    }
}
