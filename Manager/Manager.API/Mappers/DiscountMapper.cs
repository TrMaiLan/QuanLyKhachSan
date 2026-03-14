using Manager.API.Dtos.Discount;
using Manager.API.Models;

namespace Manager.API.Mappers
{
    public static class DiscountMapper
    {
        public static DiscountDto ToDiscountDto (this Discount discount)
        {
            return new DiscountDto
            {
                Id = discount.Id,
                Name = discount.Name,
                DiscountType = discount.DiscountType,
                DiscountValue = discount.DiscountValue,
                FromDate = discount.FromDate,
                ToDate = discount.ToDate,
                IsActive = discount.IsActive,
                CreateAt = discount.CreateAt,
                UpdateAt = discount.UpdateAt
            };
        }

        public static Discount ToDiscount (this CreateDiscountRequetsDto discount)
        {
            return new Discount
            {
                Name = discount.Name,
                DiscountType = discount.DiscountType,
                DiscountValue = discount.DiscountValue,
                FromDate = discount.FromDate,
                ToDate = discount.ToDate,
                IsActive = discount.IsActive,
                CreateAt = DateTime.Now,
            };
        }
    }
}
