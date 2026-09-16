using TwitterCloneApi.Data;
using TwitterCloneApi.Dtos;
using TwitterCloneApi.Entites;

namespace TwitterCloneApi.Services;

public class TweetService
{
    private readonly AppDbContext _context;

    public TweetService(AppDbContext context)
    {
        _context = context;
    }

    public Tweet? CreateTweet(CreateTweetDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Content))
        {
            return null;
        }

        if (dto.Content.Length > 140)
        {
            return null;
        }

        var tweet = new Tweet
        {
            Content = dto.Content,
            CreatedAt = DateTime.Now
        };

        _context.Tweets.Add(tweet);
        _context.SaveChanges();

        return tweet;
    }
}