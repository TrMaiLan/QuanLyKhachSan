using Manager.API.Data;
using Manager.API.Dtos.RoomType;
using Manager.API.Interfaces;
using Manager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Manager.API.Repository
{
    public class RoomTypeRepository : IRoomTypeRepository
    {
        private readonly ApplicationDBContext _dBContext;
        public RoomTypeRepository(ApplicationDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<RoomType> CreateAsync(RoomType RoomType)
        {
            await _dBContext.RoomTypes.AddAsync(RoomType);
            await _dBContext.SaveChangesAsync();
            return RoomType;
        }

        public async Task<RoomType?> DeleteAsync(int id)
        {
            var Roomtype = await _dBContext.RoomTypes.FirstOrDefaultAsync(r => r.Id == id);
            if (Roomtype == null)
            {
                return null;
            }
            _dBContext.RoomTypes.Remove(Roomtype);
            await _dBContext.SaveChangesAsync();
            return Roomtype;
        }

        public async Task<List<RoomType>> GetAllAsync()
        {
            var RoomTypes = await _dBContext.RoomTypes.ToListAsync();
            return RoomTypes;
        }

        public async Task<RoomType?> GetByIdAsync(int id)
        {
            var RoomType = await _dBContext.RoomTypes.FindAsync(id);
            return (RoomType);
        }

        public async Task<RoomType?> UpdateAsync(int id, UpdateRoomTypeRequestDto RoomTypeDto)
        {
            var RoomType = await _dBContext.RoomTypes.FirstOrDefaultAsync(r => r.Id == id);
            if (RoomType == null)
            {
                return (null);
            }
            RoomType.Name = RoomTypeDto.Name;
            RoomType.Capacity = RoomTypeDto.Capacity;
            RoomType.Description = RoomTypeDto.Description;
            RoomType.UpdateAt = DateTime.Now;

            await _dBContext.SaveChangesAsync();
            return RoomType;
        }
    }
}
