using Manager.API.Dtos.Discount;
using Manager.API.Models;

namespace Manager.API.Interfaces
{
    public interface IDiscountRepository
    {
        Task<List<Discount>> GetAllAsync();
        Task<Discount?> GetByIdAsync(int id);
        Task<Discount> CreateAsync(Discount Discount);
        Task<Discount?> UpdateAsync(int id, UpdateDiscountRequetsDto DiscountDto);
        Task<Discount?> DeleteAsync(int id);
    }
}
