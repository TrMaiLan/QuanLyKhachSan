using Manager.API.Dtos.Services;
using Manager.API.Models;

namespace Manager.API.Interfaces
{
    public interface IServicesRepository
    {
        Task<List<Services>> GetAllAsync();
        Task<Services?> GetByIdAsync(int id);
        Task<Services> CreateAsync(Services Services);
        Task<Services?> UpdateAsync(int id, UpdateServicesRequestDto ServicesDto);
        Task<Services?> DeleteAsync(int id);

    }
}
