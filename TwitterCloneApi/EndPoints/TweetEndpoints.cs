using TwitterCloneApi.Dtos;
using TwitterCloneApi.Services;

namespace TwitterCloneApi.Endpoints
{
    public static class TweetEndpoints
    {
        public static void MapTweetEndpoints(this WebApplication app)
        {
            //Create Tweet
            app.MapPost("/api/tweets", (TweetDto dto, TweetService tweetservice) =>
            {
                var tweet = tweetservice.CreateTweet(dto);

                if (tweet == null)
                {
                    return Results.BadRequest("Invalid tweet or user.");
                }

                return Results.Ok(tweet);
            });

            //Latest Tweet
            app.MapGet("/api/tweets", (TweetService tweetservice) =>
            {
                var tweets = tweetservice.GetLatestTweets();

                return Results.Ok(tweets);
            });

            //User tweets
            app.MapGet("/api/users/{userId}/tweets",
                (string userId, TweetService tweetService) =>
            {
                var tweets = tweetService.GetUserTweets(userId);
                if (tweets == null)
                {
                    return Results.NotFound("User not found");
                }
                return Results.Ok(tweets);
            });

           
        }
    }
}