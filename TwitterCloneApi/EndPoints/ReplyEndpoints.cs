using TwitterCloneApi.Dtos;
using TwitterCloneApi.Services;

namespace TwitterCloneApi.Endpoints;

public static class ReplyEndpoints
{
    public static void MapReplyEndpoints(this WebApplication app)
    {
        app.MapPost("/api/tweets/{tweetId}/replies",
            (int tweetId, ReplyDto dto, ReplyService replyService) =>
            {
                var reply = replyService.CreateReply(tweetId, dto);

                if (reply == null)
                {
                    return Results.BadRequest("Invalid reply, user, or tweet.");
                }

                return Results.Ok(reply);
            });

        app.MapGet("/api/tweets/{tweetId}/replies",
    (int tweetId, ReplyService replyService) =>
    {
        var replies = replyService.GetReplies(tweetId);

        return Results.Ok(replies);
    });
    }
}
