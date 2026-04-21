using Manager.API.Data;
using Manager.API.Dtos.Services;
using Manager.API.Interfaces;
using Manager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Manager.API.Repository
{
    public class ServicesRepository : IServicesRepository
    {
        private readonly ApplicationDBContext _dBContext;
        public ServicesRepository(ApplicationDBContext dBContext)
        {
            _dBContext = dBContext;
        }
        public async Task<Services> CreateAsync(Services Services)
        {
            await _dBContext.Services.AddAsync(Services);
            await _dBContext.SaveChangesAsync();
            return Services;
        }

        public async Task<Services?> DeleteAsync(int id)
        {
            var services = await _dBContext.Services.FindAsync(id);
            if (services == null)
            {
                return null;
            }
            _dBContext.Services.Remove(services);
            await _dBContext.SaveChangesAsync();
            return services;
        }

        public async Task<List<Services>> GetAllAsync()
        {
            return await _dBContext.Services.ToListAsync();
        }

        public async Task<Services?> GetByIdAsync(int id)
        {
            var services = await _dBContext.Services.FindAsync(id);
            return services;
        }

        public async Task<Services?> UpdateAsync(int id, UpdateServicesRequestDto ServicesDto)
        {
            var services = await _dBContext.Services.FindAsync(id);
            if (services == null)
            {
                return null;
            }
            services.Name = ServicesDto.Name;
            services.Price = ServicesDto.Price;
            services.unit = ServicesDto.unit;
            services.ServiceType = ServicesDto.ServiceType;
            services.UpdateAt = DateTime.Now;

            await _dBContext.SaveChangesAsync();
            return services;
        }
    }
}
