using TwitterCloneApi.Data;
using TwitterCloneApi.Dtos;
using TwitterCloneApi.Entites;
namespace TwitterCloneApi.Services;

public class FollowService
{
    private readonly AppDbContext _context;
    private readonly UserContextService _userContextService;

    public FollowService(
        AppDbContext context,
        UserContextService userContextService)
    {
        _context = context;
        _userContextService = userContextService;
    }

    public Follow? FollowUser(FollowDto dto)
    {
        // Get logged-in user from header
        var currentUserId = _userContextService.GetUserId();

        if (string.IsNullOrEmpty(currentUserId))
        {
            return null;
        }

        // Find logged-in user
        var currentUser = _context.Users
            .FirstOrDefault(u => u.UserId == currentUserId);

        if (currentUser == null)
        {
            return null;
        }

        // Find the user we want to follow
        var userToFollow = _context.Users
            .FirstOrDefault(u => u.UserId == dto.UserId);

        if (userToFollow == null)
        {
            return null;
        }

        // User cannot follow themselves
        if (currentUser.Id == userToFollow.Id)
        {
            return null;
        }

        // Check if already following
        var existingFollow = _context.Follows
            .FirstOrDefault(f =>
                f.FollowerId == currentUser.Id &&
                f.FollowingId == userToFollow.Id);

        if (existingFollow != null)
        {
            return null;
        }

        // Create follow
        var follow = new Follow
        {
            FollowerId = currentUser.Id,
            FollowingId = userToFollow.Id
        };

        _context.Follows.Add(follow);
        _context.SaveChanges();

        return follow;
    }
    // Follow Status 
    public bool IsFollowing(string userId)
    {
        var currentUserId = _userContextService.GetUserId();

        if (string.IsNullOrEmpty(currentUserId))
        {
            return false;
        }

        var currentUser = _context.Users
            .FirstOrDefault(u => u.UserId == currentUserId);

        var userToCheck = _context.Users
            .FirstOrDefault(u => u.UserId == userId);

        if (currentUser == null || userToCheck == null)
        {
            return false;
        }

        var follow = _context.Follows
            .FirstOrDefault(f =>
                f.FollowerId == currentUser.Id &&
                f.FollowingId == userToCheck.Id);

        return follow != null;
    }
}