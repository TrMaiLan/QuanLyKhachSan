using Manager.API.Models;

namespace Manager.API.Interfaces
{
    public interface ITokenService
    {
        string createToken(AppUser user);
    }
}
