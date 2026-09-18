using TwitterCloneApi.Dtos;
using TwitterCloneApi.Services;

namespace TwitterCloneApi.Endpoints;

public static class FollowEndpoints
{
    public static void MapFollowEndpoints(this WebApplication app)
    {
        app.MapPost("/api/follows",
            (FollowDto dto, FollowService followService) =>
            {
                var follow = followService.FollowUser(dto);

                if (follow == null)
                {
                    return Results.BadRequest(
                        "Invalid user, self-follow, or already following.");
                }

                return Results.Ok(follow);
            });
        app.MapGet("/api/follows/{userId}",
                (string userId, FollowService followService) =>
    {
        var isFollowing = followService.IsFollowing(userId);

        return Results.Ok(new
        {
            isFollowing = isFollowing
        });
    });
    }
}