using TwitterCloneApi.Data;
using TwitterCloneApi.Dtos;
using TwitterCloneApi.Entites;

namespace TwitterCloneApi.Services;

public class ReplyService
{
    private readonly AppDbContext _context;
    private readonly UserContextService _userContextService;

    public ReplyService(
        AppDbContext context,
        UserContextService userContextService)
    {
        _context = context;
        _userContextService = userContextService;
    }

    public Reply? CreateReply(int tweetId, ReplyDto dto)
    {
        // Check reply content
        if (string.IsNullOrWhiteSpace(dto.Content))
        {
            return null;
        }

        // Get logged-in user from header
        var userId = _userContextService.GetUserId();

        if (string.IsNullOrEmpty(userId))
        {
            return null;
        }

        // Find  user
        var user = _context.Users
            .FirstOrDefault(u => u.UserId == userId);

        if (user == null)
        {
            return null;
        }

        // Check   tweet exists or not
        var tweet = _context.Tweets
            .FirstOrDefault(t => t.Id == tweetId);

        if (tweet == null)
        {
            return null;
        }

        // Create reply
        var reply = new Reply
        {
            TweetId = tweetId,
            UserId = user.Id,
            Content = dto.Content,
            CreatedAt = DateTime.Now
        };

        _context.Replies.Add(reply);
        _context.SaveChanges();

        return reply;
    }
    public List<Reply> GetReplies(int tweetId)
    {
        return _context.Replies
            .Where(r => r.TweetId == tweetId)
            .OrderBy(r => r.CreatedAt)
            .ToList();
    }
}
