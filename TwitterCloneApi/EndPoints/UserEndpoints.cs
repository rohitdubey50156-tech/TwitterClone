
using TwitterCloneApi.Dtos;
using TwitterCloneApi.DTOs;
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
            var user = UserService.Login(dto);

            if (user == null)
            {
                return Results.Unauthorized();
            }
            return Results.Ok(user);

        });
    }
}
