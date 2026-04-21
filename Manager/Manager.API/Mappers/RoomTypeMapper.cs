using Manager.API.Dtos.RoomType;
using Manager.API.Models;

namespace Manager.API.Mappers
{
    public static class RoomTypeMapper
    {
        public static RoomTypeDto ToRoomTypeDto(this RoomType roomTypeModel)
        {
            return new RoomTypeDto
            {
                Id = roomTypeModel.Id,
                Name = roomTypeModel.Name,
                Capacity = roomTypeModel.Capacity,
                Description = roomTypeModel.Description,
                CreateAt = roomTypeModel.CreateAt,
                UpdateAt = roomTypeModel.UpdateAt

            };

        }
        public static RoomType ToRoomTypeCreateDto(this CreateRoomTypeRequestDto createRoomTypeRequestDto)
        {
            return new RoomType
            {
                Name = createRoomTypeRequestDto.Name,
                Capacity = createRoomTypeRequestDto.Capacity,
                Description = createRoomTypeRequestDto.Description,
                CreateAt = DateTime.Now,
            };
        }
    }
}
