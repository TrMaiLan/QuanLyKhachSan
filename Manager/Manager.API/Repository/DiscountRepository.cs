using Manager.API.Data;
using Manager.API.Dtos.Discount;
using Manager.API.Interfaces;
using Manager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Manager.API.Repository
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly ApplicationDBContext _dBContext;
        public DiscountRepository(ApplicationDBContext dBContext)
        {
            _dBContext = dBContext;
        }
        public async Task<Discount> CreateAsync(Discount Discount)
        {
            await _dBContext.Discounts.AddAsync(Discount);
            await _dBContext.SaveChangesAsync();
            return Discount;
        }

        public async Task<Discount?> DeleteAsync(int id)
        {
            var discount = await _dBContext.Discounts.FirstOrDefaultAsync(s => s.Id == id);
            if (discount == null)
            {
                return null;
            }
            _dBContext.Discounts.Remove(discount);
            await _dBContext.SaveChangesAsync();
            return discount;
        }

        public async Task<List<Discount>> GetAllAsync()
        {
            return await _dBContext.Discounts.ToListAsync();
        }

        public async Task<Discount?> GetByIdAsync(int id)
        {
            var discount = await _dBContext.Discounts.FindAsync(id);
            return discount;
        }

        public async Task<Discount?> UpdateAsync(int id, UpdateDiscountRequetsDto DiscountDto)
        {
            var discount = await _dBContext.Discounts.FirstOrDefaultAsync(s => s.Id == id);
            if (discount == null)
            {
                return null;
            }
            discount.Name = DiscountDto.Name;
            discount.DiscountType = DiscountDto.DiscountType;
            discount.DiscountValue = DiscountDto.DiscountValue;
            discount.FromDate = DiscountDto.FromDate;
            discount.ToDate = DiscountDto.ToDate;
            discount.UpdateAt = DateTime.Now;

            await _dBContext.SaveChangesAsync();
            return discount;
        }
    }
}
