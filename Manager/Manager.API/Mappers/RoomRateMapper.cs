using Manager.API.Dtos.RoomRate;
using Manager.API.Models;

namespace Manager.API.Mappers
{
    public static class RoomRateMapper
    {
        public static RoomRateDto ToRoomRateDto(this RoomRate roomRate)
        {
            return new RoomRateDto
            {
                Id = roomRate.Id,
                RoomTypeId = roomRate.RoomTypeId,
                Price = roomRate.Price,
                CreateAt = roomRate.CreateAt,
                UpdateAt = roomRate.UpdateAt
            };
        }
        public static RoomRate ToCreateRoomRateDto(this CreateRoomRateRequestDto roomRateDto)
        {
            return new RoomRate
            {
                Price = roomRateDto.Price,
                FromDate = roomRateDto.FromDate,
                ToDate = roomRateDto.ToDate,
                IsActive = true,
                CreateAt = DateTime.Now,
            };
        }
    }
}
