using Manager.API.Dtos.Services;
using Manager.API.Models;

namespace Manager.API.Mappers
{
    public static class ServicesMapper
    {
        public static ServicesDto ToServicesDto (this Services service)
        {
            return new ServicesDto
            {
                Id = service.Id,
                ServiceType = service.ServiceType,
                Name = service.Name,
                Price = service.Price,
                unit = service.unit,
                CreateAt = service.CreateAt,
                UpdateAt = service.UpdateAt
            };
        }

        public static Services ToServicesUpdateDto (this CreateServicesRequestDto service)
        {
            return new Services
            {
                ServiceType = service.ServiceType,
                Name = service.Name,
                Price = service.Price,
                unit = service.unit,
                CreateAt = DateTime.Now
            };
        }
    }
}
