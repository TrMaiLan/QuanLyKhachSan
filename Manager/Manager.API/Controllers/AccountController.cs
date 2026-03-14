using Manager.API.Dtos.Account;
using Manager.API.Interfaces;
using Manager.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Manager.API.Controllers
{
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerRequestDto)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var appUser = new AppUser
                {
                    UserName = registerRequestDto.Username,
                    Email = registerRequestDto.Email,
                };

                var createUserResult = await _userManager.CreateAsync(appUser, registerRequestDto.Password);

                if (createUserResult.Succeeded)
                {
                    var addRoleResult = await _userManager.AddToRoleAsync(appUser, "Guest");
                    if (addRoleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Token = _tokenService.createToken(appUser)
                            }
                            );
                    }
                    else
                    {
                        return StatusCode(500, addRoleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createUserResult.Errors);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while registering the user: {ex.Message}");
            }

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(loginRequestDto.Username);
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequestDto.Password, false);
            if (!result.Succeeded)
            {

                return Unauthorized("Invalid username or password.");
            }
            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.createToken(user)
                }
                );
        }
        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] AssignRoleDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.Username);

            if (user == null)
                return NotFound("User not found");

            var result = await _userManager.AddToRoleAsync(user, dto.Role);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok($"Role {dto.Role} assigned to {dto.Username}");
        }
        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var username = User.FindFirst(ClaimTypes.Name)?.Value;

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
                return NotFound();

            return Ok(new
            {
                user.UserName,
                user.Email
            });
        }
    }
}
