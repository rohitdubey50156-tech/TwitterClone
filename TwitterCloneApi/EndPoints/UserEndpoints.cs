using TwitterCloneApi.Dtos;
using TwitterCloneApi.Services;

namespace TwitterCloneApi.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {

        // Get all Users 
        app.MapGet("/api/users", (UserService userService) =>
        {
            var users = userService.GetUsers();

            return Results.Ok(users);
        });


        // Register Endpoint
        app.MapPost("/api/users/register", (RegisterDto dto, UserService userService) =>
        {
            var user = userService.Register(dto);

            if (user == null)
            {
                return Results.BadRequest("UserId already exists or input is invalid.");
            }

            return Results.Ok(user);
        });

        // Login Endpoint
        app.MapPost("/api/users/login", (LoginDto dto, UserService UserService) =>
        {
            LoginUserDto? user = UserService.Login(dto);

            if (user == null)
            {
                return Results.Unauthorized();
            }
            return Results.Ok(user);

        });

        // Search Endpoint
        app.MapGet("/api/users/search",
    (string name, UserService userService) =>
    {
        var users = userService.SearchUsers(name);
        if (users.Count == 0)
        {
            return Results.NotFound("User not found.");
        }


        return Results.Ok(users);
    });

        // Profile endpoint 
        app.MapGet("/api/users/{userId}",
    (string userId, UserService userService) =>
    {
        var user = userService.GetUserByUserId(userId);

        if (user == null)
        {
            return Results.NotFound("User not found.");
        }

        return Results.Ok(user);
    });
    }
}
