using TwitterCloneApi.Data;
using TwitterCloneApi.Dtos;
using TwitterCloneApi.Entites;

namespace TwitterCloneApi.Services;

public class UserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public List<User> GetUsers()
    {
        return _context.Users.ToList();
    }


    // Register Dto with validations
    public User? Register(RegisterDto dto)
    {

        // if user send id null 
        if (string.IsNullOrWhiteSpace(dto.UserId))
        {
            return null;
        }
        // if User send name null
        if (string.IsNullOrWhiteSpace(dto.Name))
        {
            return null;
        }
        // if user send pass null
        if (string.IsNullOrWhiteSpace(dto.Password))
        {
            return null;
        }

        var existingUser = _context.Users
            .FirstOrDefault(u => u.UserId == dto.UserId); // ask database to check if userId already exist or not 

        if (existingUser != null)
        {
            return null;
        }
        // if everething is valid then this will work and saved user 
        var user = new User
        {
            UserId = dto.UserId,
            Name = dto.Name,
            Password = dto.Password
        };

        _context.Users.Add(user);

        _context.SaveChanges();

        return user;
    }
    public LoginUserDto? Login(LoginDto dto)
    {
        var user = _context.Users
            .FirstOrDefault(u =>
                u.UserId == dto.UserId &&
                u.Password == dto.Password);

        if (user == null)
        {
            return null;
        }

        return new LoginUserDto
        {
            Id = user.Id,
            UserId = user.UserId,
            Name = user.Name
        };
    }

    //Search Users By name 
    public List<User> SearchUsers(string name)
    {
        return _context.Users
            .Where(u => u.Name.Contains(name))
            .ToList();
    }

    //Profile information 
    public UserProfileDto? GetUserByUserId(string userId)
    {
        var user = _context.Users
            .FirstOrDefault(u => u.UserId == userId);

        if (user == null)
        {
            return null;
        }

        return new UserProfileDto
        {
            Id = user.Id,
            UserId = user.UserId,
            Name = user.Name
        };
    }
}

