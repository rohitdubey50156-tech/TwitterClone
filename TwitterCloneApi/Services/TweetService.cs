using TwitterCloneApi.Data;
using TwitterCloneApi.Dtos;
using TwitterCloneApi.Entites;

namespace TwitterCloneApi.Services;

public class TweetService
{
    private readonly AppDbContext _context;
    private readonly UserContextService _userContextService;
    public TweetService(
        AppDbContext context,
        UserContextService userContextService)
    {
        _context = context;
        _userContextService = userContextService;
    }

    public Tweet? CreateTweet(TweetDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Content))
        {
            return null;
        }

        if (dto.Content.Length > 140)
        {
            return null;
        }
        var userId = _userContextService.GetUserId();

        if (string.IsNullOrEmpty(userId))
        {
            return null;
        }
        var user = _context.Users
    .FirstOrDefault(u => u.UserId == userId);

        if (user == null)
        {
            return null;
        }
        var tweet = new Tweet
        {
            UserId = user.Id,
            Content = dto.Content,
            CreatedAt = DateTime.Now
        };

        _context.Tweets.Add(tweet);
        _context.SaveChanges();

        return tweet;
    }
    public List<TweetDto> GetLatestTweets()
    {
        var tweets = _context.Tweets
            .OrderByDescending(t => t.CreatedAt)
            .Take(20)
            .Select(t => new TweetDto
            {
                Id = t.Id,
                UserId = _context.Users
                    .Where(u => u.Id == t.UserId)
                    .Select(u => u.UserId)
                    .FirstOrDefault() ?? "",
                Content = t.Content,
                CreatedAt = t.CreatedAt
            })
            .ToList();

        return tweets;
    }
    public List<TweetDto>? GetUserTweets(string userId)
    {
        var user = _context.Users
            .FirstOrDefault(u => u.UserId == userId);

        if (user == null)
        {
            return null;
        }

        var tweets = _context.Tweets
            .Where(t => t.UserId == user.Id)
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new TweetDto
            {
                Id = t.Id,
                UserId = user.UserId,
                Content = t.Content,
                CreatedAt = t.CreatedAt
            })
            .ToList();

        return tweets;
    }
}